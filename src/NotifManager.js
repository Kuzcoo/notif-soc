import NotifView from "./NotifView";
import NotifStore from "./NotifStore";
import NotifController from "./NotifController";
import { getServiceByName } from "./services/ServiceFactory";
import { NOTIF } from "./NotifConstants";

export default (NotifManager = {
  initialize
});

function initialize() {
  initFeatures();
}

function initFeatures() {
  NOTIF.FEATURES.forEach(featureName => {
    if (isFeatureInPage(featureName)) {
      initFeatureByName(featureName);
    }
  });
}

function isFeatureInPage(featureName) {
  return !!document.getElementById(NOTIF[featureName].ROOT_ID)
}

function initFeatureByName(featureName) {
  const notifView = new NotifView({
    counter: NOTIF[featureName].COUNTER_ID,
    message: NOTIF[featureName].MESSAGE_ID
  });

  const notifStore = new NotifStore(getServiceByName(featureName));

  const notifController = new NotifController(notifView, notifStore);

  notifController.initialize();
}
