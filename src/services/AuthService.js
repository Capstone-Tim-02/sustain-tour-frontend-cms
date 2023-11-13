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
    // set expires 1 minute
    const expires = new Date().getMinutes() + 1;
    if (token) Cookies.set('token', token, { expires });
  },

  clearCredentialsFromCookie(callback) {
    Cookies.remove('token');
    if (callback) callback();
  },
};
