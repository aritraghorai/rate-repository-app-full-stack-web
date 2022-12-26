import { StatusBar } from "expo-status-bar";
import { NativeRouter } from "react-router-native";
import Main from "./Main";
import { ApolloProvider } from "@apollo/client";
import appoloClient from "./src/utils/apolloClient";
import AuthProvider from "./src/Context/AuthContext/AuthProvider";
import AuthStorage from "./src/utils/storage/authStorage";

const authStorage = new AuthStorage("auth");

export default function App() {
  return (
    <NativeRouter>
      <ApolloProvider client={appoloClient(authStorage)}>
        <AuthProvider>
          <Main />
        </AuthProvider>
        <StatusBar style="auto" />
      </ApolloProvider>
    </NativeRouter>
  );
}
