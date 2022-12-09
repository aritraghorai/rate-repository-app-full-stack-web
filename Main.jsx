import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import RepositoryList from "./src/components/ RepositoryList";
import AppBar from "./src/components/AppBar";
import SignIn from "./src/components/signIn";
import theme from "./src/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </View>
  );
};

export default Main;
