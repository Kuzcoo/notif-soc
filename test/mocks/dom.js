export function mockDOMElement(name) {
  return {
    id: name,
    textContent: 0,
    addEventListener: mockAddEventListener,
    triggerEvent: mockTriggerEvent
  };
}

function mockAddEventListener(name, handler) {
  if (!this.events) this.events = {};
  if (!this.events[name]) this.events[name] = [];
  this.events[name].push(handler);
}

function mockTriggerEvent(name) {
  if (!this.events || !this.events[name]) {
    throw new Error("No events of name:", name);
  }

  this.events[name].forEach(eventHandler => eventHandler());
}