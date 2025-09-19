import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
    contact(search: "${search}", skip: ${page_num * PER_PAGE}, first: ${PER_PAGE}) {
        totalCount
        rows {
        id
        firstName
        lastName
        email
        }
      }
    }
`;
};

export const deleteDocument = (id) => gql`
mutation Mutation {
    deleteContact(id: ${id}) {
    ok
    }
}
`;

export const getDocument = (id) => gql`
  query Query {
    contactById(id: ${id}) {
      id
      firstName
      lastName
      email
      primaryAddress
      primaryPhone
    }
  }
`;

export const uiDocument = gql`
  query Query {
    contactUi {
      title
      ui
    }
  }
`;

export const createDocument = (d) => gql`
  mutation Mutation {
    createContact(first_name: "${d.first_name}",
                  last_name: "${d.last_name}",
                  email: "${d.email}",
                  primaryAddress : "${d.primary_address}",
                  primaryPhone: "${d.primary_phone}")
      {
      ok
      contact {
        id
      }
    }
  }
`;

export const updateDocument = (d) => gql`
  mutation Mutation {
    updateContact(
            first_name: "${d.first_name}",
            last_name: "${d.last_name}",
            email: "${d.email}",
            primaryAddress : "${d.primary_address}",
            primaryPhone: "${d.primary_phone}",
            id: ${d.id}
      ) {
      ok
      contact {
        id
      }
    }
  }
`;
