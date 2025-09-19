import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";
import moment from "moment";

export const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
    salonQueue(search: "${search}", skip: ${page_num * PER_PAGE}, first: ${PER_PAGE}) {
        totalCount
        rows {
          id
          customer {
            firstName
            lastName
            phone
            email
            profilePic
          }
          booking {
            id
          }
          note
          queueDateTime
        }
      }
    }
`;
};

export const deleteDocument = (id) => gql`
mutation Mutation {
    salonQueueDelete(id: ${id}) {
      ok
    }
}
`;

export const getDocument = (id) => gql`
  query Query {
    salonQueueById(id: ${id}) {
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
    salonQueueCreate(
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
    salonQueueUpdate(
            note: "${d.note}",
            queueDateTime: "${queueDateTime}",
            id: ${d.id}
      ) {
      ok
    }
  }
`;
};
