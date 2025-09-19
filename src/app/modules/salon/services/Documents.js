import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
    salonService(search: "${search}", skip: ${page_num * PER_PAGE}, first: ${PER_PAGE}) {
        totalCount
        rows {
          title
          salesPrice
          costPrice
          code
          id
          category {
            title
            id
          }
        }
      }
    }
`;
};

export const deleteDocument = (id) => gql`
mutation Mutation {
    salonServiceDelete(id: ${id}) {
      ok
    }
}
`;

export const getDocument = (id) => gql`
  query Query {
    salonServiceById(id: ${id}) {
      code
      costPrice
      salesPrice
      title
      category {
        id
        title
      }
    }
  }
`;

export const createDocument = (d) => gql`
  mutation Mutation {
    salonServiceCreate(
      code: "${d.code}"
      title: "${d.title}"
      costPrice: ${d.costPrice}
      salesPrice: ${d.salesPrice}
      categoryId: ${d.categoryId}
    ) {
      ok
    }
  }
`;

export const updateDocument = (d) => gql`
  mutation Mutation {
      salonServiceUpdate(
        categoryId: ${d.categoryId}
        code: "${d.code}"
        costPrice: ${d.costPrice}
        id: ${d.id}
        salesPrice: ${d.salesPrice}
        title: "${d.title}"
      ) {
        ok
      }
  }
`;
