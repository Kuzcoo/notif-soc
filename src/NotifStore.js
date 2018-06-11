export default class NotifStore {
  constructor(id, service) {
    this.id = id;
    this.service = service;
  }

  fetch() {
    return new Promise((resolve, reject) => {
      let data = this._getDataFromStorage(this.id);
      if (!data) {
        this.service.fetch()
          .then(resolve)
          .catch(reject);
      } else {
        resolve(data);
      }
    });
  }

  save(data) {
    window.sessionStorage.setItem(this.id, data);
  }

  reset() {
    window.sessionStorage.setItem(this.id, {notifications: 0})
  }

  _getDataFromStorage(id) {
    return window.sessionStorage.getItem(id);
  }
}