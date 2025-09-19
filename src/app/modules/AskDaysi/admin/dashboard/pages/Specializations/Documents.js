import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
     allSpecializations(search: "${search}", skip: ${page_num * PER_PAGE}, first: ${PER_PAGE}) {
        totalCount
        rows {
          id
          title
        }
      }
    }
`;
};

export const deleteDocument = (id) => gql`
mutation Mutation {
    specializationCategoryDelete(id: ${id}) {
      ok
    }
}
`;

export const getDocument = (id) => gql`
  query Query {
    specializationById(id: ${id}) {
      description
      id
      title
      specializationCategory {
        id
        title
      }
    }
  }
`;

export const createDocument = (d) => {
  return gql`
  mutation Mutation {
    specializationCreate(
          title: "${d.title}"
          categoryId: ${d.categoryId}
          description: "${d.description}")
      {
        specialization {
          id
        }
      }
  }
`};

export const updateDocument = (d) => {
  return gql`
  mutation Mutation {
    specializationUpdate(
          title: "${d.title}",
          categoryId: ${d.categoryId},
          description: "${d.description}",
          id: ${d.id}
      ) {
      specialization {
        id
      }
    }
  }
`};
