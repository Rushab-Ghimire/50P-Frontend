import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
    salonCustomer(search: "${search}", skip: ${page_num * PER_PAGE}, first: ${PER_PAGE}) {
        totalCount
        rows {
          email
          firstName
          id
          lastName
          phone
        }
      }
    }
`;
};

export const deleteDocument = (id) => gql`
mutation Mutation {
    salonCustomerDelete(id: ${id}) {
      ok
    }
}
`;

export const getDocument = (id) => gql`
  query Query {
    salonCustomerById(id: ${id}) {
      email
      firstName
      lastName
      id
      phone
    }
  }
`;
export const getMedia = (key, owner_id, owner_type, unique_id = -1) => {
  if (owner_type == "organization") {
    return gql`
      query Query {
        salonMediaByUniqueId(uniqueId: "${unique_id}")
      }
    `;
  }

  return gql`
    query Query {
      salonMedia(key: "${key}", ownerId: ${owner_id}, ownerType: "${owner_type}")
    }
  `;
};

export const getCustomerSummary = (id) => gql`
  query Query {
    salonCustomerById(id: ${id}) {
      email
      firstName
      lastName
      id
      phone
    }
  }
`;

export const getCustomerDataset = (id) => gql`
  query Query {
    salonCustomerDataset(customerId: ${id}) {
      rows
    totalCount
    }
  }
`;



export const createDocument = (d) => gql`
  mutation Mutation {
    salonCustomerCreate(
      email: "${d.email}",
      firstName: "${d.firstName}",
      lastName: "${d.lastName}",
      phone: "${d.phone}",
      uniqueId: "${d.unique_id}")
      {
        ok
      }
  }
`;

export const updateDocument = (d) => gql`
  mutation Mutation {
    salonCustomerUpdate(
            email: "${d.email}",
            firstName: "${d.firstName}",
            id: ${d.id},
            lastName: "${d.lastName}",
            phone: "${d.phone}",
            uniqueId: "${d.unique_id}"
      ) {
      ok
    }
  }
`;
