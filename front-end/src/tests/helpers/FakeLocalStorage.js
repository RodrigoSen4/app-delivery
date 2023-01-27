class FakeLocalStorage {
  storage = {};

  setItem(key, item) {
    this.storage = { ...this.storage, [key]: item };
  }

  getItem(key) {
    return this.storage[key];
  }
}

export default FakeLocalStorage;
