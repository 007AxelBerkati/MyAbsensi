import EncryptedStorage from 'react-native-encrypted-storage';

export async function storeDataSecure(key: any, value: any) {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(value));
    // Congrats! You've just stored your first value!
  } catch (error) {
    // There was an error on the native side
  }
}

export async function getDataSecure(key: any) {
  try {
    const session = await EncryptedStorage.getItem(key);
    if (session !== null) {
      return JSON.parse(session);
    }
    return null;
  } catch (e) {
    return null;
  }
}

export async function removeDataSecure(key: any) {
  try {
    await EncryptedStorage.removeItem(key);
    // Congrats! You've just removed your first value!
  } catch (error) {
    // There was an error on the native side
  }
}
