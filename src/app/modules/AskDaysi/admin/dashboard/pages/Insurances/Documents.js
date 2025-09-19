import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
      insuranceProvider(search: "${search}", skip: ${page_num * PER_PAGE}, first: ${PER_PAGE}) {
        totalCount
        rows {
          id
          name
          location
          logo
        }
      }
    }
`;
};

export const deleteDocument = (id) => gql`
mutation Mutation {
    insuranceProviderDelete(id: ${id}) {
      ok
    }
}
`;

export const getDocument = (id) => gql`
  query Query {
    insuranceProviderById(id: ${id}) {
      id
      location
      logo
      name
      logoUuid
    }
  }
`;

export const createDocument = (d) => {

  var lineLogoUUID = "";
  if(d.logo_uuid !== "")
  {
    lineLogoUUID = `logo: "${d.logo_uuid}"`;
  }
  
  return gql`
  mutation Mutation {
    insuranceProviderAdd(
          name: "${d.name}"
          ${lineLogoUUID}
          location: "${d.location}")
      {
        insuranceProvider {
          id
        }
      }
  }
`};

export const updateDocument = (d) => {
  var lineLogoUUID = "";
  if(d.logo_uuid !== "")
  {
    lineLogoUUID = `logo: "${d.logo_uuid}",`;
  }

  return gql`
  mutation Mutation {
    insuranceProviderUpdate(
          name: "${d.name}",
          location: "${d.location}",
          ${lineLogoUUID}
          id: ${d.id}
      ) {
      InsuranceProvider {
        id
      }
    }
  }
`};
