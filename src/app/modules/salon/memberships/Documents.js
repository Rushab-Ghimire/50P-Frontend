import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
    salonAllMembershipType(search: "${search}", skip: ${page_num * PER_PAGE}, first: ${PER_PAGE}) {
        totalCount
        rows {
          billingPeriod
          fee
          title
          id
        }
      }
    }
`;
};

export const deleteDocument = (id) => gql`
mutation Mutation {
    salonMembershipTypeDelete(id: ${id}) {
      ok
    }
}
`;

export const getDocument = (id) => gql`
  query Query {
      salonMembershipTypeById(id: ${id}) {
        billingPeriod
        fee
        id
        title
      }
  }
`;

export const createDocument = (d) => gql`
  mutation Mutation {
    salonMembershipTypeCreate(title: "${d.title}",
                  billingPeriod: ${d.billingPeriod},
                  fee: ${d.fee})
      {
        ok
      }
  }
`;

export const updateDocument = (d) => gql`
  mutation Mutation {
    salonMembershipTypeUpdate(
            title: "${d.title}",
            billingPeriod: ${d.billingPeriod},
            fee: ${d.fee},
            id: ${d.id}
      ) {
      ok
    }
  }
`;
