import test from "node:test";
import assert from "node:assert/strict";
import { authStorage } from "../src/utils/storage.js";

function createLocalStorageMock() {
  const store = new Map();

  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
    clear() {
      store.clear();
    },
  };
}

test("authStorage persists and clears auth data", () => {
  globalThis.localStorage = createLocalStorageMock();

  authStorage.setToken("jwt-token");
  authStorage.setUser({ email: "user@reliefsync.com", role: "ROLE_USER" });

  assert.equal(authStorage.getToken(), "jwt-token");
  assert.deepEqual(authStorage.getUser(), {
    email: "user@reliefsync.com",
    role: "ROLE_USER",
  });

  authStorage.clear();

  assert.equal(authStorage.getToken(), null);
  assert.equal(authStorage.getUser(), null);
});

test("authStorage handles empty user state safely", () => {
  globalThis.localStorage = createLocalStorageMock();

  assert.equal(authStorage.getUser(), null);
});
