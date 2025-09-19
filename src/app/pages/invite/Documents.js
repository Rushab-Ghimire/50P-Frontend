import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const getDocument = (code) => gql`
  query Query {
    invitationByUniqueId(uniqueId: "${code}") {
      id
      organization {
        name
        id
      }
      linkedUser {
        firstName,
        lastName
      }
      uniqueId
    }
  }
`;

export const createDocument = (d) => gql`
  mutation Mutation {
    salonCategoryCreate(
          entityTypeId: ${d.entity_type_id},
          title: "${d.title}")
      {
        ok
      }
  }
`;

export const updateDocument = (d) => gql`
  mutation Mutation {
    salonCategoryUpdate(
            entityTypeId: ${d.entity_type_id},
            title: "${d.title}",
            id: ${d.id}
      ) {
      ok
    }
  }
`;
