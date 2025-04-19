export const fetchTranslationResource = async (key: string): Promise<void> => {
  console.log(`[i18n] Simulating fetch for resource: ${key}`);
  return Promise.resolve();
};
