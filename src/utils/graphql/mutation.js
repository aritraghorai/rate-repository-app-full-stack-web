import { gql } from "@apollo/client";

export const LOG_IN = gql`
  mutation ($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
      user {
        createdAt
        id
        reviewCount
        username
      }
    }
  }
`;
