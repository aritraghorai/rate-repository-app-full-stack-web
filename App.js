import { StatusBar } from "expo-status-bar";
import { NativeRouter } from "react-router-native";
import Main from "./Main";

export default function App() {
  return (
    <>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
}
