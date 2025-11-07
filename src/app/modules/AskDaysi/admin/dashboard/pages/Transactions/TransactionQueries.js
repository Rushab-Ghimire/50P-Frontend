// TransactionQueries.js
// Simple, backend-matching GraphQL strings (snake_case names to match your Graphene schema)list
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const GET_TRANSACTIONS = (search = "", page_num = 1) => `
{
  allTokensTransactions(search: "${search}", skip: ${(page_num - 1) * PER_PAGE}, first: ${PER_PAGE}) {
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


// There is no single-item query on backend, so fetch all and pick client-side.[form]
export const GET_TRANSACTION = (id) => `
{
  allTokensTransactions {
    rows {
      id
      moduleCode
      status
      tokens
      uniqueID
      
    }
  }
}
`;

// Create (calls add_transaction)
export const createTransaction = (data) => `
mutation {
  addTransaction(moduleCode: "${data.moduleCode}", status: "${data.status}", tokens: ${data.tokens}) {
    transaction {
      moduleCode
      status
      tokens
    }
  }
}
`;

// Update (calls update_transaction)
export const updateTransaction = (data) => `
mutation {
  updateTransaction(id: ${data.id}, moduleCode: "${data.moduleCode}", status: "${data.status}", tokens: ${data.tokens}) {
    transaction {
      id
      moduleCode
      status
      tokens
    }
  }
}
`;

// Delete (calls delete_transaction)
export const deleteTransaction = (id) => `
mutation {
  deleteTransaction(id: ${id}) {
    ok
  }
}
`;
