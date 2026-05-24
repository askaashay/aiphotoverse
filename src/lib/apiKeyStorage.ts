/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const STORAGE_KEY = 'gemini_api_key';
const TIMESTAMP_KEY = 'gemini_key_timestamp';
const EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export function saveApiKey(key: string) {
  localStorage.setItem(STORAGE_KEY, key);
  localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
}

export function getApiKey(): string | null {
  const key = localStorage.getItem(STORAGE_KEY);
  const timestamp = localStorage.getItem(TIMESTAMP_KEY);

  if (!key || !timestamp) return null;

  const age = Date.now() - parseInt(timestamp, 10);
  if (age > EXPIRY_MS) {
    clearApiKey();
    return null;
  }

  return key;
}

export function clearApiKey() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(TIMESTAMP_KEY);
}
