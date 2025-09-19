import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
      salonBeautician(first: 10, search: "", skip: 0) {
        totalCount
        rows {
          id
          phone
          linkedUser {
            id
            firstName
            lastName
            email
          }
        }
      }
    }
  `;
};

export const deleteDocument = (id) => gql`
mutation Mutation {
    salonBeauticianDelete(id: ${id}) {
      ok
    }
}
`;

export const getUserDocument = (id) => gql`
  query Query {
    salonBeauticianByUserId(id: ${id}) {
      id
      phone
      linkedUser {
        firstName
        lastName
        email
        id
      }
    }
  }
`;

export const getStaffSummary = (id) => gql`
  query Query {
    salonBeauticianDataset(beauticianId: ${id}) {
      rows
      totalCount
    }
  }
`;

export const getDocument = (id) => gql`
  query Query {
    salonBeauticianById(id: ${id}) {
      id
      phone
      linkedUser {
        firstName
        lastName
        email
        id
      }
    }
  }
`;

export const createDocument = (d) => gql`
  mutation Mutation {
    salonBeauticianCreate(
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
    salonBeauticianUpdate(
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

export const updateUserProfile = (d) => gql`
  mutation Mutation {
    editMyProfile(
            email: "${d.email}",
            firstName: "${d.firstName}",
            lastName: "${d.lastName}",
            phone: "${d.phone}",
            uniqueId: "${d.unique_id}"
      ) {
      ok
    }
  }
`;
