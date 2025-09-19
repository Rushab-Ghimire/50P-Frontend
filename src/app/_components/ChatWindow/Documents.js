import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const getContextCardChildren = (
  key,
  parent = 0,
  detached = false
) => gql`
  query Query {
    cardChildren(parent: ${key}) {
      totalCount
      rows {
        id
        parent
        title
        context
        description
      }
    }
  }
`;

export const getContextCardByKey = (key = "") => gql`
  query Query {
    cardByKey(key: "${key}") {
      totalCount
      rows {
        id
        parent
        title
        context
        description
      }
    }
  }
`;

export const getReplyToUser = (message = "") => gql`
  query Query {
    cardByMessage(message: "${message}") {
      totalCount
      rows {
        id
        parent
        title
        context
        description
      }
    }
  }
`;

export const createMessage = (d) => gql`
  mutation Mutation {
    createMessage(message: "${d.message}")
      {
      ok
      message {
        id
      }
    }
  }
`;
