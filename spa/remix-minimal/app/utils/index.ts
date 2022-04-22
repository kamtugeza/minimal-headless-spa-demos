export const getEnv = (key: string): string | undefined => {
  if (typeof window !== 'undefined') {
    return (window.ENV as any)[key];
  }

  return process.env[key];
};

export const setURLSearchParams = (url: string, param: string): string =>
`${url}${url.indexOf('?') > -1 ? '&' : '?'}${param}`;
