import AsyncStorage from "@react-native-async-storage/async-storage";

export const TOKEN = "TOKEN";
class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(`${this.namespace}:${TOKEN}`);
    return token ?? undefined;
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(`${this.namespace}:${TOKEN}`, accessToken);
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:${TOKEN}`);
  }
}

export default AuthStorage;
