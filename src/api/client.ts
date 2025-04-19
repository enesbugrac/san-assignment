const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://jsonplaceholder.typicode.com";

export async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        // Ignore if response body is not JSON
      }
      console.error("API Error Response:", {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        errorData,
      });
      throw new Error(
        `API request failed: ${response.statusText} (status: ${response.status})`
      );
    }

    if (response.status === 204 || response.headers.get("Content-Length") === "0") {
      return undefined as T;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("API Client Error:", error);
    throw error;
  }
}
