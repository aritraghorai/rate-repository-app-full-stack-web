import { useMutation } from "@apollo/client";
import { LOG_IN } from "../graphql/mutation";

const useSignIn = () => {
  const [mutate, result] = useMutation(LOG_IN);

  const signIn = async ({ username, password }) => {
    mutate({
      variables: {
        credentials: {
          password,
          username,
        },
      },
    });
  };

  return [signIn, result];
};
export default useSignIn;
