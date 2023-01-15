import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import RepositoryList from "./src/components/ RepositoryList";
import AppBar from "./src/components/AppBar";
import CreateReview from "./src/components/CreateReview";
import RepositoryDetail from "./src/components/RepositoryDetail";
import SignIn from "./src/components/signIn";
import SignUp from "./src/components/SignUp";
import UserInfo from "./src/components/UserInfo";
import UsersReview from "./src/components/UsersReview";
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
        <Route path="/me" element={<UserInfo />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/repository/:id" element={<RepositoryDetail />} />
        <Route path="/create_review" element={<CreateReview />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/my_reviews" element={<UsersReview />} />
      </Routes>
    </View>
  );
};

export default Main;
