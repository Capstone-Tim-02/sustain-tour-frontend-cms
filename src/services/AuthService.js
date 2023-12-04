import Cookies from 'js-cookie';

export const AuthService = {
  isAuthorized() {
    if (Cookies.get('token')) return true;
    return false;
  },

  getToken() {
    return Cookies.get('token');
  },

  storeCredentialsToCookie(token) {
    //(14 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    const expires = new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000);
    if (token) Cookies.set('token', token, { expires });
  },

  clearCredentialsFromCookie() {
    Cookies.remove('token');
  },
};
