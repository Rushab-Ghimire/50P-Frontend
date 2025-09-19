import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
    salonCategory(search: "${search}", skip: ${page_num * PER_PAGE}, first: ${PER_PAGE}) {
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
    salonCategoryDelete(id: ${id}) {
    ok
    }
}
`;

export const getDocument = (id) => gql`
  query Query {
    salonCategoryById(id: ${id}) {
      entityType {
        id
        title
      }
      id
      title
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
