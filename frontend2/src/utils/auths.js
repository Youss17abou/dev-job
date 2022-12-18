// notre code 

const STORE_NAME = 'user';

const getAuthenticatedUser = () => {
  const serializedUser = localStorage.getItem(STORE_NAME);
  if (!serializedUser) return undefined;

  const currentUser = JSON.parse(serializedUser);
  return currentUser;
};

const setAuthenticatedUser = (authenticatedUser) => {
  const serializedUser = JSON.stringify(authenticatedUser);
  localStorage.setItem(STORE_NAME, serializedUser);
};

const isAuthenticated = () => localStorage.getItem(STORE_NAME) !== null;

const isDev = () => getAuthenticatedUser().isDev;

const clearAuthenticatedUser = () => {
  localStorage.removeItem(STORE_NAME);
};

// eslint-disable-next-line object-curly-newline
export { getAuthenticatedUser, setAuthenticatedUser, isAuthenticated, clearAuthenticatedUser, isDev };


