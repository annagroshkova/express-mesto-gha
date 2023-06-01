const KEY = 'token';

/**
 * @returns {string | null}
 */
export function getToken() {
  return localStorage.getItem(KEY);
}

/**
 * @param {string} token
 * @returns {void}
 */
export function saveToken(token) {
  return localStorage.setItem(KEY, token);
}

/**
 * @returns {void}
 */
export function removeToken() {
  return localStorage.removeItem(KEY);
}
