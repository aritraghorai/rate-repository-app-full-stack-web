import { gql } from "@apollo/client";

const getAllRepository = gql`
  query Query {
    repositories {
      edges {
        node {
          createdAt
          description
          fullName
          name
          ownerName
          ownerAvatarUrl
          stargazersCount
          forksCount
          language
          openIssuesCount
          ratingAverage
          reviewCount
          url
        }
      }
    }
  }
`;

const USER_DETAIL = gql`
  query Me {
    me {
      username
      id
    }
  }
`;

export default {
  getAllRepository,
  USER_DETAIL,
};
