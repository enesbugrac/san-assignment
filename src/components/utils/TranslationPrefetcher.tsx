import React, { useState, useEffect, ReactNode } from "react";
import { fetchTranslationResource } from "@/i18n/translationLoader";
import { LoadingSpinner } from "@/components/ui";

interface TranslationPrefetcherProps {
  translationKeys: string[];
  children: ReactNode;
}

const TranslationPrefetcher: React.FC<TranslationPrefetcherProps> = ({
  translationKeys,
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadResources = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log("[i18n] Starting prefetch for keys:", translationKeys);
        await Promise.all(translationKeys.map(fetchTranslationResource));
        if (isMounted) {
          console.log("[i18n] Prefetch complete for keys:", translationKeys);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("[i18n] Error prefetching translation resources:", err);
        if (isMounted) {
          setError(
            err instanceof Error ? err : new Error("Failed to load translation resources")
          );
          setIsLoading(false);
        }
      }
    };

    if (translationKeys && translationKeys.length > 0) {
      loadResources();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [translationKeys]);

  if (isLoading) {
    return (
      <LoadingSpinner
        text="Loading language resources..."
        className="flex justify-center items-center min-h-screen"
      />
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        Error loading language resources: {error.message}
      </div>
    );
  }

  return <>{children}</>;
};

export default TranslationPrefetcher;
