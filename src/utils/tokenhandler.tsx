export const setAccessToken = (token: string): void => {
  sessionStorage.setItem('accessToken', token);
};

export const getAccessToken = (): string | null => {
  return sessionStorage.getItem('accessToken');
};

export const removeAccessToken = (): void => {
  sessionStorage.removeItem('accessToken');
};
