import { PER_PAGE } from "@app/_utilities/constants/paths";

// =====================================
// Fetch paginated list
// =====================================
export const GET_SUBSCRIPTIONS = (search = "", page_num = 1) => `
  query {
    allSubscriptions(
      search: "${search}",
      skip: ${(page_num - 1) * PER_PAGE},
      first: ${PER_PAGE}
    ) {
      totalRows
      rows {
        id
        name
        price
        status
      }
    }
  }
`;


// =====================================
// Fetch single subscription
// (If backend supports direct fetch)
// =====================================
export const GET_SUBSCRIPTION = (id) => `
  query {
    subscription(id: "${id}") {
      id
      name
      price
      status
    }
  }
`;


// =====================================
// Create subscription
// =====================================
export const CREATE_SUBSCRIPTION = (data) => `
  mutation {
    createSubscription(
      name: "${data.name}",
      price: ${data.price},
      status: "${data.status}"
    ) {
      id
      name
      price
      status
    }
  }
`;


// =====================================
// Update subscription
// =====================================
export const UPDATE_SUBSCRIPTION = (data) => `
  mutation {
    updateSubscription(
      id: "${data.id}",
      name: "${data.name}",
      price: ${data.price},
      status: "${data.status}"
    ) {
      id
      name
      price
      status
    }
  }
`;


// =====================================
// Delete subscription
// =====================================
export const DELETE_SUBSCRIPTION = (id) => `
  mutation {
    deleteSubscription(id: "${id}") {
      ok
    }
  }
`;
