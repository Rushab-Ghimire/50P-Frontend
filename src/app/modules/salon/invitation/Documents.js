import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
    invitation(search: "${search}", skip: ${page_num * PER_PAGE}, first: ${PER_PAGE}) {
        totalCount
        rows {
          id
          linkedUser {
            firstName
            lastName
            email
          }
          createdDate
          email
        }
      }
    }
`;
};

export const deleteDocument = (id) => gql`
mutation Mutation {
    invitationDelete(id: ${id}) {
    ok
    }
}
`;

export const getDocument = (id) => gql`
  query Query {
    invitationById(id: ${id}) {
      linkedUser {
        email
      }
    }
  }
`;

export const createDocument = (d) => {
  if (d.to_user == -1) {
    return gql`
      mutation Mutation {
        invitationCreate(
              email: "${d.email}")
          {
            ok
          }
      }
    `;
  }
  return gql`
  mutation Mutation {
    invitationCreate(
          toUser: ${d.to_user},
          email: "${d.email}")
      {
        ok
      }
  }
`;
};
