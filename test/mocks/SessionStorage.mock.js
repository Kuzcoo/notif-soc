const SessionStorageMock = {
  set,
  get,
  deleteKey
};

export default SessionStorageMock;

let data = {};

function set(id, dataObject) {
  data[id] = JSON.stringify(dataObject);
}

function get(id) {
  let sessionData = data[id];

  return (sessionData && JSON.parse(sessionData)) || null;
}

function deleteKey(key) {
  if (!data[key]) {
    throw new Error('No such key to delete:', key);
  }

  delete data[key];
}