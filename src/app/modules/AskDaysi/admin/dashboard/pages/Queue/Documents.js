import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";
import moment from "moment";

export const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
    patientQueue(search: "${search}", skip: ${page_num * PER_PAGE}, first: ${PER_PAGE}) {
        totalCount
        rows {
          id
          customer {
            email
            firstName
            lastName
            phone
          }
          note
          queueDateTime
          booking {
            bookingDateTime
            id
            customNote
            insuranceFileUuid
            status
            providerUserId
            provider {
                id
            }            
            user {
                    id
                    firstName
                    lastName
                    email
                    profilePic
                    phone
                }
          }
        }
      }
    }
`;
};

export const deleteDocument = (id) => gql`
mutation Mutation {
    patientQueueDelete(id: ${id}) {
      ok
    }
}
`;

export const getDocument = (id) => gql`
  query Query {
    patientQueueById(id: ${id}) {
      id
      note
      queueDateTime
      customer {
        email
        firstName
        lastName
        phone
      }
    }
  }
`;

export const createDocument = (d) => {
  //console.log("queue", d);
  var queueDateTime = moment(d.queueDateTime).format("YYYY-MM-DD HH:mmZZ");
  d.lastName = d.lastName == undefined ? "" : d.lastName;
  d.note = d.note == undefined ? "" : d.note;
  d.email = d.email == undefined ? "" : d.email;
  d.phone = d.phone == undefined ? "" : d.phone;
  return gql`
  mutation Mutation {
    patientQueueCreate(
          email: "${d.email}"
          firstName: "${d.firstName}"
          lastName: "${d.lastName}"
          note: "${d.note}"
          phone: "${d.phone}"
          queueDateTime: "${queueDateTime}"
        ) {
        ok
      }
  }
`;
};

export const updateDocument = (d) => {
  //console.log("queue updateDocument", d);
  var queueDateTime = moment(d.queueDateTime).format("YYYY-MM-DD HH:mmZZ");
  return gql`
  mutation Mutation {
    patientQueueUpdate(
            note: "${d.note}",
            queueDateTime: "${queueDateTime}",
            id: ${d.id}
      ) {
      ok
    }
  }
`;
};
