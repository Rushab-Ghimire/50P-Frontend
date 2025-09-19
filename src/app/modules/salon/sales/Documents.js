import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
    salonOrder(search: "${search}", skip: ${page_num * PER_PAGE}, first: ${PER_PAGE}) {
        rows {
            id
            orderCode
            receiptNumber
            customer {
              firstName
              lastName
              email
            }
          }
        totalCount
      }
    }
`;
};

export const deleteDocument = (id) => gql`
mutation Mutation {
    deleteBusiness(id: ${id}) {
    ok
    }
}
`;

export const getDocument = (id) => gql`
  query Query {
    businessById(id: ${id}) {
      id
      description
      title
    }
  }
`;

export const uiDocument = gql`
  query Query {
    businessUi {
      title
      ui
    }
  }
`;

export const createDocument = (d) => gql`
  mutation Mutation {
    createBusiness(title: "${d.title}",
                  description: "${d.description}")
      {
      ok
      business {
        id
      }
    }
  }
`;

export const updateDocument = (d) => gql`
  mutation Mutation {
    updateBusiness(
            description: "${d.description}",
            title: "${d.title}",
            id: ${d.id}
      ) {
      ok
      business {
        id
      }
    }
  }
`;

/////////////////////////////

export const getOrderDetail = (order_id) => {
  //console.log("order_id", order_id);
  return gql`
  query Query {
    salonOrderDataset(orderId: ${order_id}) {
      totalCount
      rows
    }
  }
`;
};
