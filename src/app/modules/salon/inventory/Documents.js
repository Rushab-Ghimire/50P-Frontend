import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
    salonProduct(search: "${search}", skip: ${page_num * PER_PAGE}, first: ${PER_PAGE}) {
        totalCount
        rows {
          title
          salesPrice
          id
          costPrice
        }
      }
    }
`;
};

export const deleteDocument = (id) => gql`
mutation Mutation {
    salonProductDelete(id: ${id}) {
    ok
    }
}
`;

export const getDocument = (id) => gql`
  query Query {
    salonProductById(id: ${id}) {
      costPrice
      id
      salesPrice
      title
      category
      {
        id
        title
      }
    }
  }
`;

export const createDocument = (d) => gql`
  mutation Mutation {
    salonProductCreate(title: "${d.title}",
                  categoryId: ${d.categoryId},
                  costPrice: ${d.costPrice},
                  salesPrice: ${d.salesPrice})
      {
        ok
      }
  }
`;

export const updateDocument = (d) => gql`
  mutation Mutation {
    salonProductUpdate(
            id: ${d.id},
            categoryId: ${d.categoryId},
            costPrice: ${d.costPrice},
            salesPrice: ${d.salesPrice},
            title: "${d.title}"
      ) {
        ok
    }
  }
`;
