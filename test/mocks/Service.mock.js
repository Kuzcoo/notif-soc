export const serviceStatus = {
  ON: true,
  OFF: false
};

const ServiceMock = {
  status: serviceStatus.ON,
  setData(data) {
    this.data = data;
  },
  setStatus(serviceStatus) {
    this.status = serviceStatus;
  },
  fetch() {
    if (!this.data) {
      throw new Error("Feed the service with data before fetching");
    }

    return new Promise((resolve, reject) => {
      switch (this.status) {
        case serviceStatus.ON:
          fakeServiceCallWithData(this.data, resolve);
        break;
        case serviceStatus.OFF:
          fakeServiceCallWithError(reject);
        break;
      }
    });
  },
}

function fakeServiceCallWithData(data, resolve) {
  const SERVICE_CALL_TIMEOUT = 2000;

  setTimeout(() => {
    resolve(data);
  }, SERVICE_CALL_TIMEOUT);
}

function fakeServiceCallWithError(reject) {
  const SERVICE_CALL_TIMEOUT = 2000;
  const ServiceUnreachableException = new Error("Service unreachable");

  setTimeout(() => {
   reject(ServiceUnreachableException);
  }, SERVICE_CALL_TIMEOUT);
}

export default ServiceMock;