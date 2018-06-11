import NotifView from "./NotifView";

export default class NotifController {
  constructor(view, store) {
    this.view = view;
    this.store = store;
  }

  initialize() {
    this.store
      .fetch()
      .then(data => {
        this.view.render(data);
      })
      .catch(error => {
        console.error(error);
      });

    this.view.bindOpenNotif(this.onOpenNotif.bind(this));
  }

  onOpenNotif() {
    this.store.reset();
    this.view.render(null);
  }
}
