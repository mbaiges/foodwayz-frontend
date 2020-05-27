export { Api };

class Api {
  static get baseUrl() {
    return 'http://127.0.0.1:8080/api';
  }

  static get timeout() {
    return 60 * 1000;
  }

  static fetch(url, init, controller) {
    return new Promise((resolve, reject) => {
      controller = controller || new AbortController();
      setTimeout(() => controller.abort(), Api.timeout);
      init.signal = controller.signal

      fetch(url, init)
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data.error)
            reject(data.error);
          else
            resolve(data);
        })
        .catch(error => {
          reject({ "code": 99, "description": error.message.toLowerCase() });
        });
    });
  }

  static get(url, controller) {
    return Api.fetch(url, {}, controller)
  }

  static post(url, data, controller) {
    return Api.fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    }, controller);
  }

  static put(url, data, controller) {
    console.log(JSON.stringify(data));
    return Api.fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    }, controller);
  }

  static delete(url, controller) {
    return Api.fetch(url, {
      method: 'DELETE',
    }, controller);
  }
}
