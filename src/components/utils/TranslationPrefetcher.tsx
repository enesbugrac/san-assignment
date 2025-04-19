import React, { ReactNode } from "react";
import { LoadingSpinner } from "@/components/ui";
import { useTranslations } from "@/hooks/useTranslations";

interface TranslationPrefetcherProps {
  translationKeys: string[];
  children: ReactNode;
}

const TranslationPrefetcher: React.FC<TranslationPrefetcherProps> = ({
  translationKeys,
  children,
}) => {
  const { isLoading, isError, error } = useTranslations(translationKeys);

  if (isLoading) {
    return (
      <LoadingSpinner
        text="Loading language resources..."
        className="flex justify-center items-center min-h-screen"
      />
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-red-600">
        Error loading language resources:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return <>{children}</>;
};

export default TranslationPrefetcher;
