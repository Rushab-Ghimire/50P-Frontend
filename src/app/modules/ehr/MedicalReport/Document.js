import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const getDocument = (id) => gql`
  query Query {
    agentEhrById(id: ${id}) {
        bookingDateTime
        createdDate
        fullName
        id
        phoneNumber
        json
    }
  }
`;


export const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
      agentEhr(search: "${search}", skip: ${page_num * PER_PAGE}, first: ${PER_PAGE}) {
          totalCount
          rows {
            id
            fullName
            phoneNumber
          }
        }
    }
`;
};