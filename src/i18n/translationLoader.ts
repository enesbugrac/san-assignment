export interface TranslationResource {
  key: string;
  loaded: boolean;
}

export const fetchTranslationResource = async (
  key: string
): Promise<TranslationResource> => {
  console.log(`[i18n] Simulating fetch for resource: ${key}`);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        key,
        loaded: true,
      });
    }, 100);
  });
};
