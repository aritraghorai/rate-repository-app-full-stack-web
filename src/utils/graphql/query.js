import { gql } from "@apollo/client";

const getAllRepository = gql`
  query Query(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
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
          id
        }
      }
      pageInfo {
        hasNextPage
        endCursor
        startCursor
      }
    }
  }
`;

export const USER_DETAIL = gql`
  query Me($includeReviews: Boolean = false) {
    me {
      username
      id
      reviews @include(if: $includeReviews) {
        edges {
          node {
            user {
              username
            }
            id
            text
            rating
            repositoryId
            createdAt
          }
        }
        pageInfo {
          endCursor
          hasPreviousPage
          hasNextPage
          startCursor
        }
        totalCount
      }
    }
  }
`;
const REPOSITORY_DETAIL = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      description
      fullName
      createdAt
      forksCount
      id
      language
      name
      ownerAvatarUrl
      ownerName
      ratingAverage
      reviewCount
      url
      reviews {
        totalCount
        edges {
          node {
            createdAt
            id
            rating
            text
            user {
              createdAt
              id
              reviewCount
              username
            }
          }
        }
        pageInfo {
          endCursor
          hasPreviousPage
          hasNextPage
          startCursor
        }
      }
    }
  }
`;

export default {
  getAllRepository,
  USER_DETAIL,
  REPOSITORY_DETAIL,
};
