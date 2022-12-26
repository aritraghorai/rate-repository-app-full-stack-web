import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Constants from "expo-constants";

const httpLink = createHttpLink({
  // Replace the IP address part with your own IP address!
  uri: Constants.manifest.extra.url,
});

const createApolloClient = (token) => {
  const authLink = setContext(async (_, { header }) => {
    return {
      header: {
        ...header,
        Authorization: `Bearer ${await token.getAccessToken()}`,
      },
    };
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
