import Cookies from 'js-cookie';

export const AuthService = {
  isAuthorized() {
    if (Cookies.get('token')) return true;
    return false;
  },

  getToken() {
    return Cookies.get('token');
  },

  storeCredentialsToCookie({ token, expires_at }) {
    const expires = new Date(expires_at * 1000);
    if (token) Cookies.set('token', token, { expires });
  },

  clearCredentialsFromCookie() {
    Cookies.remove('token');
  },
};
