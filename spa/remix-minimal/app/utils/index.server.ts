export const languages = process.env.MGNL_LANGUAGES?.split(' ') ?? ['en'];

export const getCurrentLanguage = (url: string): string => {
  for (let i = 0; i < languages.length; i++) {
    const language = languages[i];

    if (url.indexOf('/' + language) > -1) return language;
  }

  return languages[0];
};
