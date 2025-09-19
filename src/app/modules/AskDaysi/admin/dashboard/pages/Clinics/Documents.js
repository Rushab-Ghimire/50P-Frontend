import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
      clinic(search: "${search}", skip: ${page_num * PER_PAGE}, first: ${PER_PAGE}) {
        totalCount
        rows {
          title
          id
        }
      }
    }
`;
};

export const deleteDocument = (id) => gql`
mutation Mutation {
    clinicDelete(id: ${id}) {
      ok
    }
}
`;

export const getDocument = (id) => gql`
  query Query {
    clinicById(id: ${id}) {
      address
      id
      title
    }
  }
`;

export const createDocument = (d) => {
  return gql`
  mutation Mutation {
    clinicAdd(
          title: "${d.title}"
          address: "${d.address}")
      {
        clinic {
          id
        }
      }
  }
`};

export const updateDocument = (d) => {
  return gql`
  mutation Mutation {
    clinicUpdate(
          title: "${d.title}",
          address: "${d.address}",
          id: ${d.id}
      ) {
      Clinic {
        id
      }
    }
  }
`};
