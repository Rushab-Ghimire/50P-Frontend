import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
     labs(search: "${search}", skip: ${page_num * PER_PAGE}, first: ${PER_PAGE}) {
        totalCount
        rows {
          id
          title
          logo
        }
      }
    }
`;
};

export const deleteDocument = (id) => gql`
mutation Mutation {
    labDelete(id: ${id}) {
      ok
    }
}
`;

export const getDocument = (id) => gql`
  query Query {
    labById(id: ${id}) {
      id
      description
      lattitude
      logo
      logoUuid
      address
      longitude
      title
      city {
        id
      }
      country {
        id
      }
      state {
        id
      }
      insuranceProviders {
        id
        name
      }
    }
  }
`;

export const createDocument = (d) => {

  var lineLogoUUID = "";
  if(d.logo_uuid !== "")
  {
    lineLogoUUID = `logoUuid: "${d.logo_uuid}"`;
  }
  
  return gql`
  mutation Mutation {
    labAdd(
          title: "${d.title}"
          cityId: ${d.city_id}
          countryId: ${d.country_id}
          description: "${d.description}"
          address: "${d.address}"
          insuranceProviderIds: "${d.insurance_providers}"
          lattitude: ${d.lattitude}
          ${lineLogoUUID}
          longitude: ${d.longitude}
          stateId: ${d.state_id})
      {
        lab {
          id
        }
      }
  }
`};

export const updateDocument = (d) => {
  var lineLogoUUID = "";
  if(d.logo_uuid !== "")
  {
    lineLogoUUID = `logoUuid: "${d.logo_uuid}",`;
  }

  return gql`
  mutation Mutation {
    labUpdate(
          title: "${d.title}",
          cityId: ${d.city_id},
          countryId: ${d.country_id},
          description: "${d.description}",
          address: "${d.address}",
          insuranceProviderIds: "${d.insurance_providers}",
          lattitude: ${d.lattitude},
          ${lineLogoUUID}
          longitude: ${d.longitude},
          stateId: ${d.state_id},
          id: ${d.id}
      ) {
      lab {
        id
      }
    }
  }
`};
