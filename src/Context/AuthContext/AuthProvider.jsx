import React, { useCallback, useReducer } from "react";
import AuthStorage from "../../utils/storage/authStorage";
import AuthStorageContext from "./authStorageContext";

export const actions = {
  SET_TOKEN: "SET_TOKEN",
  REMOVE_TOKEN: "REMOVE_TOKEN",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_TOKEN:
      return { ...state, token: action.payload };
    case actions.REMOVE_TOKEN:
      return { ...state, token: undefined };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});
  const authStorage = new AuthStorage("auth");
  const addToken = useCallback(async (token) => {
    console.info("Add" + token);
    await authStorage.setAccessToken(token);
    return dispatch({
      type: actions.SET_TOKEN,
      payload: token,
    });
  }, []);
  const removeToken = useCallback(async () => {
    console.log("remoe");
    await authStorage.removeAccessToken();
    return dispatch({
      type: actions.REMOVE_TOKEN,
    });
  }, []);
  return (
    <AuthStorageContext.Provider
      value={{ state, addToken, removeToken, authStorage }}
    >
      {children}
    </AuthStorageContext.Provider>
  );
};

export default AuthProvider;
