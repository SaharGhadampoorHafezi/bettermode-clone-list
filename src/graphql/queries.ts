import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts(
    $after: String
    $before: String
    $excludePins: Boolean
    $filterBy: [PostListFilterByInput!]
    $limit: Int!
    $offset: Int
    $orderBy: PostListOrderByEnum
    $orderByString: String
    $postTypeIds: [String!]
    $reverse: Boolean
    $spaceIds: [ID!]
    $query: String
  ) {
    posts(
      after: $after
      before: $before
      excludePins: $excludePins
      filterBy: $filterBy
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      orderByString: $orderByString
      postTypeIds: $postTypeIds
      reverse: $reverse
      spaceIds: $spaceIds
      query: $query
    ) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        id
        slug
        fields {
          key
          value
        }
        mappingFields {
          key
          type
          value
        }
        subscribersCount
        postTypeId
        reactionsCount
        shortContent
        createdAt
        createdById
        ownerId
        totalRepliesCount
        title
        description
        reactions {
          count
          reacted
          reaction
        }
      }
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      slug
      fields {
        key
        value
      }
      mappingFields {
        key
        type
        value
      }
      owner {
        member {
          name
          id
          email
          createdAt
        }
      }
      subscribersCount
      postTypeId
      reactionsCount
      shortContent
      createdAt
      createdById
      ownerId
      totalRepliesCount
      title
      description
      reactions {
        count
        reacted
        reaction
      }
    }
  }
`;

export const GET_REPLIES = gql`
  query replies(
    $after: String
    $before: String
    $excludePins: Boolean
    $limit: Int!
    $offset: Int
    $orderBy: PostListOrderByEnum
    $postId: ID!
    $reverse: Boolean
  ) {
    replies(
      after: $after
      before: $before
      excludePins: $excludePins
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      postId: $postId
      reverse: $reverse
    ) {
      totalCount
      nodes {
        id
        slug
        owner {
          member {
            name
          }
        }
        publishedAt
        reactions {
          count
          reacted
          participants(limit: $limit) {
            nodes {
              participant {
                name
                id
              }
            }
          }
        }
        replies(limit: $limit, reverse: $reverse) {
          nodes {
            id
            slug
          }
        }
      }
    }
  }
`;
