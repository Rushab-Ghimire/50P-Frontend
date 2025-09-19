import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";


export const updateRole = (roleIdentifier) => {
  return gql`mutation M {
        udpateRole(roleIdentifier: "${roleIdentifier}") {
          ok
        }
    }`;
};


export const checkInsurance = (d) => gql`
  query Query {
    checkInsurance(insuranceProvider: "${d.insurance_provider}", 
    memberId: "${d.member_id}", 
    subscriptionNumber: "${d.subscription_number}") {
      rows
      totalCount
    }
  }
`;

export const getPatientProfile = (id) => gql`
  query Query {
    patientProfile{
      rows
      totalCount
    }
  }
`;

export const updatePatientProfile = (d) => { 

  var kx = Object.keys(d).join("|||");
  var vx = Object.values(d).join("|||");
  
  return gql`
    mutation Mutation {
      updatePatientProfile(keys: "${kx}", values: "${vx}") {
        status
      }
    }
  `;
}


export const getProviderProfile = (id) => gql`
  query Query {
    providerProfile{
      rows
      totalCount
    }
  }
`;

export const updateProviderProfile = (d) => { 

  var kx = Object.keys(d).join("|||");
  var vx = Object.values(d).join("|||");
  
  return gql`
    mutation Mutation {
      updateProviderProfile(keys: "${kx}", values: "${vx}") {
        status
      }
    }
  `;
}
