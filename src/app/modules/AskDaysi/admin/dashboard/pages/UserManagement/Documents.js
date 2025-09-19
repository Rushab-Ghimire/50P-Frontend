import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
    user(search: "${search}", skip: ${page_num * PER_PAGE}, first: ${PER_PAGE}) {
        rows {
          email
          firstName
          lastName
          phone
          profilePic
          role
          doctor {
            id
            specialization {
              id
              title
            }
            address
          }
        }
        totalCount
    }
}
`;
};

export const deleteDocument = (id) => gql`
mutation Mutation {
    patientBookingDelete(id: ${id}) {
      ok
    }
}
`;
