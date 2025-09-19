import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";
import moment from "moment";

export const queryDocument = (inDate) => {
  inDate = moment(inDate).format("YYYY-MM-DD");
  return gql`
  query Q {
        calendar(inDate: "${inDate}") {
            totalCount
            rows
        }
    }
`;
};

export const bookingFromQueueDocument = (qid) => {
  return gql`
    mutation M {
      createPatientBookingFromQueue(
        queueId: ${qid}
      ) {
        ok
      }
    }
  `;
};
