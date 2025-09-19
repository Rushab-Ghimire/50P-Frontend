import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";
import moment from "moment";

export const queryDocument = () => {
  var queueDateTime = moment(new Date()).format("YYYY-MM-DD");
  return gql`
    query Query {
    getProviderTimeSlotsByMonth(date: "${queueDateTime}") {
        data {
          date
          slots {
            fullDateTime
            id
            slot
          }
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

export const getProviderTimeSlotsByDateDocument = (d, providerId, mode = "doctor") => {
  
  var queueDateTime = moment(d).format("YYYY-MM-DD");
  if(providerId !== undefined)
  {
    return gql`
    query Query {
    getProviderTimeSlotsByDate(date: "${queueDateTime}", providerId: ${providerId}, mode: "${mode}") {
        data {
          date
          slots {
            fullDateTime
            id
            slot
          }
        }
      }
    }
`;
  }
  return gql`
    query Query {
    getProviderTimeSlotsByDate(date: "${queueDateTime}") {
        data {
          date
          slots {
            fullDateTime
            id
            slot
          }
        }
      }
    }
`;
};

export const providerTimeslotCreateDocument = (d,h,m) => {
  const dateTime = moment(`${d} ${h}:${m}:00`, 'YYYY-MM-DD HH:mm:ss').toDate();
  var queueDateTime = moment(dateTime).format("YYYY-MM-DD HH:mm:ss+0000");
  console.log("queueDateTime", `${d} ${h}:${m}`, queueDateTime);
  return gql`
  mutation Mutation {
    providerTimeslotCreate(
          dateTime: "${queueDateTime}"
        ) {
        providerTimeslot {
          id
        }
      }
  }
`;
};

export const providerTimeslotDeleteDocument = (id) => {
  return gql`
  mutation Mutation {
    providerTimeslotDelete(
          id: ${id}
        ) {
        ok
      }
  }
`;
};