import assert from "assert";
import sinon from "sinon";
import { mockDOMElement } from "./mocks/dom";
import SessionStorageMock from "./mocks/SessionStorage.mock";
import ServiceMock, {serviceStatus} from "./mocks/Service.mock";
import NotifStore from "../src/NotifStore";

describe("NotifStore", () => {
  const stubGetDataFromStorage = sinon.stub(
    NotifStore.prototype,
    "_getDataFromStorage"
  );
  stubGetDataFromStorage
    .withArgs("alert")
    .callsFake(SessionStorageMock.get.bind(this, "alert"));

  describe("_getDataFromStorage()", () => {
    it("should get data from session storage, or null if no data is associated with the key", () => {
      const alertStorageData = { notifications: 2 };
      SessionStorageMock.set("alert", alertStorageData);

      assert.deepEqual(
        NotifStore.prototype._getDataFromStorage("alert"),
        alertStorageData
      );
    });
  });

  describe("save()", () => {
    it("should save the data to session storage", () => {
      const key = "alert";
      const data = {
        notifications: 4
      };
      const stubSave = sinon
        .stub(NotifStore.prototype, "save")
        .withArgs(data)
        .callsFake(SessionStorageMock.set.bind(SessionStorageMock, key, data));

      NotifStore.prototype.save(data);
      assert.deepEqual(SessionStorageMock.get(key), data);
    });
  });

  describe("fetch()", () => {
    it("should fetch the data from storage if storage is not empty", () => {
      const storeId = "alert";
      const alertDataInStorage = { notifications: 4 };
      SessionStorageMock.set(storeId, alertDataInStorage);
      const notifStore = new NotifStore(storeId, null);

      notifStore.fetch().then(data => {
        assert.deepEqual(data, alertDataInStorage);
      });
    });

    it("should fetch the data from service if there is nothing in storage", () => {
      const storeId = "alert";
      const alertDataFromService = { notifications: 8 };
      SessionStorageMock.deleteKey(storeId);

      const notifService = ServiceMock;
      notifService.setData(alertDataFromService);
      const notifStore = new NotifStore(storeId, notifService);

      notifStore.fetch().then(data => {
        assert.deepEqual(data, alertDataFromService);
      });
    });

    it("should throw an error if the service is unreachable", () => {
      const storeId = "alert";
      const alertDataFromService = { notifications: 8 };

      const notifService = ServiceMock;
      notifService.setData(alertDataFromService);
      notifService.setStatus(serviceStatus.OFF);
      const notifStore = new NotifStore(storeId, notifService);

      notifStore.fetch()
        .catch(error => {
          assert.throws(notifService.fetch, Error);
        });
    });
  });
});
