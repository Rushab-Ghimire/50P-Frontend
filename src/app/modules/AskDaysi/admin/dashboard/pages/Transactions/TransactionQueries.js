import { PER_PAGE } from "@app/_utilities/constants/paths";

// =======================
// Fetch paginated list
// =======================
export const GET_TRANSACTIONS = (search = "", page_num = 1) => `
  query {
    allTokensTransactions(
      search: "${search}",
      skip: ${(page_num - 1) * PER_PAGE},
      first: ${PER_PAGE}
    ) {
      totalRows
      rows {
        id
        moduleCode
        status
        tokens
        uniqueId
      }
    }
  }
`;

// =======================
// Fetch single transaction (backend does NOT support single fetch)
// So we fetch all and pick one on client
// =======================
export const GET_TRANSACTION = (id) => `
  query {
    allTokensTransactions {
      rows {
        id
        moduleCode
        status
        tokens
        uniqueId
      }
    }
  }
`;

// =======================
// Create (GraphQL: addTransaction)
// =======================
export const createTransaction = (data) => `
  mutation {
    addTransaction(
      moduleCode: "${data.moduleCode}",
      status: "${data.status}",
      tokens: ${data.tokens}
    ) {
      transaction {
        moduleCode
        status
        tokens
      }
    }
  }
`;

// =======================
// Update (GraphQL: updateTransaction)
// =======================
export const updateTransaction = (data) => `
  mutation {
    updateTransaction(
      id: ${data.id},
      moduleCode: "${data.moduleCode}",
      status: "${data.status}",
      tokens: ${data.tokens}
    ) {
      transaction {
        id
        moduleCode
        status
        tokens
      }
    }
  }
`;

// =======================
// Delete (GraphQL: deleteTransaction)
// =======================
export const deleteTransaction = (id) => `
  mutation {
    deleteTransaction(id: ${id}) {
      ok
    }
  }
`;
