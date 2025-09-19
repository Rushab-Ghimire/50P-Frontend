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

export const singleBookingDataset = (booking_id) => {
  return gql`
    query Q {
      salonBookingById(id: ${booking_id}) {
        rows
        totalCount
      }
    }
  `;
};

export const bookingDocument = (d) => {
  var bookingDateTime = moment(d.bookingDateTime).format("YYYY-MM-DD HH:mmZZ");
  var checkinDateTime = moment(d.checkinDateTime).format("YYYY-MM-DD HH:mmZZ");
  var checkoutDateTime = moment(d.checkoutDateTime).format(
    "YYYY-MM-DD HH:mmZZ"
  );
  return gql`
    mutation M {
      createBooking(
        beauticianIds: [${d.beauticianIds}]
        bookingDateTime: "${bookingDateTime}"
        checkinDateTime: "${checkinDateTime}"
        checkoutDateTime: "${checkoutDateTime}"
        customerId: ${d.customerId}
        serviceIds: [${d.serviceIds}]
      ) {
        ok
      }
    }
  `;
};

export const updateDocument = (d) => {
  //console.log("resc", d);
  //return;

  var bookingDateTime = moment(d.bookingDateTime).format("YYYY-MM-DD HH:mmZZ");
  var checkinDateTime = moment(d.checkinDateTime).format("YYYY-MM-DD HH:mmZZ");
  var checkoutDateTime = moment(d.checkoutDateTime).format(
    "YYYY-MM-DD HH:mmZZ"
  );
  return gql`
    mutation M {
      updateBooking(
        beauticianIds: [${d.beauticianIds}]
        bookingDateTime: "${bookingDateTime}"
        checkinDateTime: "${checkinDateTime}"
        checkoutDateTime: "${checkoutDateTime}"
        bookingId: ${d.bookingId}
        serviceIds: [${d.serviceIds}]
      ) {
        ok
      }
    }
  `;
};
