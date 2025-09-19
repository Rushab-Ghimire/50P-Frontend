import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const getDocument = (code) => gql`
  query Query {
    feedbackByCode(code: "${code}") {
      order {
        organization {
            name
            }
        }
    }
  }
`;

export const updateDocument = (d) => gql`
  mutation Mutation {
    submitFeedback(
            rating: ${d.rating},
            comment: "${d.comment}",
            uniqueId: "${d.code}"
      ) {
      feedback {
            id
        }
    }
  }
`;
