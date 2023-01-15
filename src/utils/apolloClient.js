import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { relayStylePagination } from "@apollo/client/utilities";
import Constants from "expo-constants";

const httpLink = createHttpLink({
  // Replace the IP address part with your own IP address!
  uri: Constants.manifest.extra.url,
});
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
    Repository: {
      fields: {
        reviews: relayStylePagination(),
      },
    },
  },
});

const createApolloClient = (token) => {
  const authLink = setContext(async (_, { headers }) => {
    const bearerToken = `Bearer ${await token.getAccessToken()}`;
    console.log(bearerToken);
    return {
      headers: {
        ...headers,
        authorization: bearerToken ? bearerToken : "hi",
      },
    };
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });
};

export default createApolloClient;
