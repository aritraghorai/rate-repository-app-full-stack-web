import { useContext } from "react";
import AuthStorageContext from "../../Context/AuthContext/authStorageContext";

const useAuthStorage = () => {
  const authStorage = useContext(AuthStorageContext);

  return authStorage;
};

export default useAuthStorage;
