export default class NotifView {
  constructor({ counter, message }) {
    try {
      this.ui = this._cacheUI({ counter, message });
    }
    catch (error) {
      console.error(error);
    }
  }

  _updateCounter(n) {
    this.ui.counter.textContent = n;
  }

  _updateMessage(data) {
    this.ui.message.textContent = data.message;
  }

  bindOpenNotif(handler) {
    this.ui.counter.addEventListener("click", handler);
  }

  _cacheUI(elements) {
    let ui = {};

    [].forEach.call(Object.keys(elements), name => {
      ui[name] = this._getElementById(elements[name]);
    });

    return ui;
  }

  _getElementById(id) {
    return document.getElementById(id);
  }

  render(data) {
    if (!data) {
      this._updateCounter({notifications: 0});
    }
    
    this._updateCounter(data.notifications);
    //this._updateMessage(data.message);
  }
}
