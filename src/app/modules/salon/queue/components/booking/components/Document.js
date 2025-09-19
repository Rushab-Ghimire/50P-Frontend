import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";
import moment from "moment";

export const bookingDataset = (inKey, params = "") => {
  //console.log("inKey", inKey);
  if (inKey == "booking_dataset") {
    return gql`
    query Q {
      salonDataset(inKey: "${inKey}") {
        rows
        totalCount
      }
    }
  `;
  }
  return gql`
    query Q {
      salonDataset(inKey: "${inKey}", bookingId: ${params}) {
        rows
        totalCount
      }
    }
  `;
};

export const bookingFromQueueDocument = (d) => {
  var bookingDateTime = moment(d.bookingDateTime).format("YYYY-MM-DD HH:mmZZ");
  var checkinDateTime = moment(d.checkinDateTime).format("YYYY-MM-DD HH:mmZZ");
  var checkoutDateTime = moment(d.checkoutDateTime).format(
    "YYYY-MM-DD HH:mmZZ"
  );

  console.log("calling gql", d);

  return gql`
    mutation M {
      createBookingFromQueue(
        beauticianIds: [${d.beauticianIds}]
        bookingDateTime: "${bookingDateTime}"
        checkinDateTime: "${checkinDateTime}"
        checkoutDateTime: "${checkoutDateTime}"
        queueId: ${d.queueId}
        serviceIds: [${d.serviceIds}]
      ) {
        ok
      }
    }
  `;
};
