import AlertService from "./services/AlertService";
import MailService from "./services/MailService";

const services = {
  ALERT: AlertService,
  MAIL: MailService
};

export function getServiceByName(serviceName) {
  return services[serviceName];
}
