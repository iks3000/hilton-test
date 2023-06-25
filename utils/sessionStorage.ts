export function setSessionItem(key: string, value: any): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting session item:", error);
  }
}

export function getSessionItem(key: string): any {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error getting session item:", error);
    return null;
  }
}

export function removeSessionItem(key: string): void {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing session item:", error);
  }
}

export function clearSessionStorage(): void {
  try {
    sessionStorage.clear();
  } catch (error) {
    console.error("Error clearing session storage:", error);
  }
}
