import { useQueries } from "@tanstack/react-query";
import { fetchTranslationResource } from "@/i18n/translationLoader";

export function useTranslations(translationKeys: string[] = []) {
  const results = useQueries({
    queries: translationKeys.length
      ? translationKeys.map((key) => ({
          queryKey: ["translations", key],
          queryFn: () => fetchTranslationResource(key),
          staleTime: 5 * 60 * 1000,
          cacheTime: 60 * 60 * 1000,
          retry: false,
        }))
      : [],
  });

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  const error = results.find((result) => result.error)?.error;

  return {
    isLoading,
    isError,
    error,
    isSuccess: !isLoading && !isError,
  };
}
