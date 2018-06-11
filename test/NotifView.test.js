import assert from "assert";
import sinon from "sinon";
import { mockDOMElement } from "./mocks/dom";
import NotifView from "../src/NotifView";

describe("NotifView", () => {
  const stubGetElementById = sinon.stub(NotifView.prototype, "_getElementById");
  stubGetElementById.withArgs("alert").returns(mockDOMElement("alert"));
  stubGetElementById
    .withArgs("alert-counter")
    .returns(mockDOMElement("alert-counter"));
  stubGetElementById
    .withArgs("alert-message")
    .returns(mockDOMElement("alert-message"));

  describe("_getElementById()", () => {
    it("should return a DOM object", () => {
      const expected = mockDOMElement("alert");
      const actual = NotifView.prototype._getElementById("alert");

      assert.deepEqual(actual, expected);
    });
  });

  describe("_cacheUI()", () => {
    it("should have a _cacheUI method", () => {
      assert.equal(typeof NotifView.prototype._cacheUI, "function");
    });

    it("should return an object with DOM cached elements", () => {
      const given = {
        counter: "alert-counter",
        message: "alert-message"
      };

      const expected = {
        counter: mockDOMElement("alert-counter"),
        message: mockDOMElement("alert-message")
      };

      const actual = NotifView.prototype._cacheUI(given);
      assert.deepEqual(actual, expected);
    });
  });

  describe("_updateCounter()", () => {
    it("should update text of counter Dom element by n", () => {
      const notifView = new NotifView({
        counter: "alert-counter",
        message: "alert-message"
      });

      assert.equal(notifView.ui.counter.textContent, 0);
      notifView._updateCounter(2);
      assert.equal(notifView.ui.counter.textContent, 2);
    });
  });

  describe("bindOpenNotif()", () => {
    it("should have a bindOpenNotif method", () => {
      assert.equal(typeof NotifView.prototype.bindOpenNotif, "function");
    });

    it("should bind counter DOM element to click event", () => {
      const notifView = new NotifView({
        counter: "alert-counter",
        message: "alert-message"
      });

      const eventHandler = () => {};
      const spyEventHandler = sinon.spy(eventHandler);

      notifView.bindOpenNotif(spyEventHandler);
      notifView.ui.counter.triggerEvent("click");
      assert.equal(spyEventHandler.calledOnce, true);
    });
  });
});
