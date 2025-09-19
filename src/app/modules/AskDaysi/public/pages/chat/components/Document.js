import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";
import moment from "moment";

export const createDocument = (d) => {
  return gql`
  mutation Mutation {
    captureParams(
          action: "${d.action}",
          name: "${d.name}"
          dateTime: "${d.dateTime}"
          email: "${d.email}"
          phone: "${d.phone}"
          note: "${d.note}"
          orgId: ${d.org_id}
        ) {
        qItem {
          id
        }
      }
  }
`;
};

export const addHistory = (d) => {
  return gql`
  mutation Mutation {
    addHistoryItem(
          content: "${d.content}",
          source: "${d.source}"
          chatHistoryCategoryId: ${d.chatHistoryCategoryId}
        ) {
        chatHistory {
          id
          chatHistoryCategory {
            id
          }
        }
      }
  }
`;
};

export const updateThread = (title, chatCategoryId) => {
  return gql`
  mutation Mutation {
    chatHistoryCategoryUpdate(
          id: ${chatCategoryId}, 
          title: "${title}"
        ) {
        ChatHistoryCategory {
          id
          title
        }
      }
  }
`;
};