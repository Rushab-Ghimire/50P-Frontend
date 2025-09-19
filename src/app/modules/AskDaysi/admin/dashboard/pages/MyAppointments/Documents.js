import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
    myAppointments(search: "${search}", skip: ${page_num * PER_PAGE}, first: ${PER_PAGE}) {
        totalCount
        rows {
          id
          provider {
            specialization {
              id
              title
            }
            languages {
              id
              title
            }
            address
            city {
              id
              name
            }
            state {
              id
              name
            }
            profilePic
            name
            id
          }
          status
          insuranceFileUuid
          reportFileUuid
          customNote
          bookingDateTime
          postalCode
          userProfilePic
          providerDefaultLang
          userDefaultLang
          subscriptionNumber
          memberId
          insuranceProvider
      }
    }
}
`;
};

export const deleteDocument = (id) => gql`
mutation Mutation {
    patientBookingDelete(id: ${id}) {
      ok
    }
}
`;
