class Auth {
  /**
   * @param {{ baseUrl: string; headers: HeadersInit}} _options
   */
  constructor(_options) {
    this._options = _options;
  }

  /**
   * @param res {Response}
   * @returns {Promise<any>}
   */
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  /**
   * @param url {string}
   * @param options {RequestInit}
   * @returns {Promise<any>}
   */
  _request(url, options = {}) {
    return fetch(`${this._options.baseUrl}/${url}`, {
      headers: this._options.headers,
      ...options,
    }).then(this._checkResponse);
  }

  /**
   * @param {import("../types").Credentials} body
   * @returns {Promise<void>}
   */
  signup(body) {
    return this._request(`signup`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  /**
   * @param {import("../types").Credentials} body
   * @returns {Promise<import("../types").SigninResponse>}
   */
  signin(body) {
    return this._request(`signin`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }
}

export const auth = new Auth({
  // baseUrl: 'https://auth.nomoreparties.co',
  baseUrl: 'https://api.anna.nomoredomains.rocks',
  headers: {
    'Content-Type': 'application/json',
  },
});
