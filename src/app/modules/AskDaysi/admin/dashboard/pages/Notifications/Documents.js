import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
    notification(search: "${search}", skip: ${page_num * PER_PAGE}, first: ${PER_PAGE}) {
        totalCount
        rows {
          content
          createdDate
          id
          dataX
        }
      }
    }
`;
};

export const deleteDocument = (id) => gql`
mutation Mutation {
    notificationDelete(id: ${id}) {
      ok
    }
}
`;
