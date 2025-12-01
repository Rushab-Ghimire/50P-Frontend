import { PER_PAGE } from "@app/_utilities/constants/paths";

// Fetch subscriptions
export const GET_SUBSCRIPTIONS = (search = "", page = 1) => `
  query {
    allSubscriptions(
      search: "${search}",
      skip: ${(page - 1) * PER_PAGE},
      first: ${PER_PAGE}
    ) {
      totalRows
      rows {
        subscriptionId
        subscriptionType
        price
        paymentStatus
        isActive
      }
    }
  }
`;

// Fetch single subscription
export const GET_SUBSCRIPTION = (id) => `
  query {
    subscriptionById(subscriptionId: ${id}) {
      subscriptionId
      subscriptionType
      price
      paymentStatus
      isActive
    }
  }
`;

// Create subscription
export const createSubscription = (data) => `
  mutation {
    addSubscription(
      subscriptionType: "${data.subscriptionType}",
      price: ${data.price},
      paymentStatus: "${data.paymentStatus}",
      isActive: ${data.isActive}
    ) {
      subscriptionId
      subscriptionType
      price
      paymentStatus
      isActive
    }
  }
`;

// Update subscription
export const updateSubscription = (data) => `
  mutation {
    updateSubscription(
      subscriptionId: ${data.subscriptionId},
      subscriptionType: "${data.subscriptionType}",
      price: ${data.price},
      paymentStatus: "${data.paymentStatus}",
      isActive: ${data.isActive}
    ) {
      subscriptionId
      subscriptionType
      price
      paymentStatus
      isActive
    }
  }
`;

// Delete subscription
export const deleteSubscription = (id) => `
  mutation {
    deleteSubscription(subscriptionId: ${id}) {
      ok
    }
  }
`;
