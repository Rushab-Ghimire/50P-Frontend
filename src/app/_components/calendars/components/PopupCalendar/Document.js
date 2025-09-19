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

export const updateBookingServiceStatus = (
  booking_service_id,
  status,
  pos_id
) => {
  if (pos_id == -1) {
    return gql`
    mutation M {
      salonUpdateBookingServiceStatus(
        status: "${status}"
        bookingServiceId: ${booking_service_id}
      ) {
        bookingServiceId
        status
        posId
      }
    }
  `;
  }
  return gql`
    mutation M {
      salonUpdateBookingServiceStatus(
        status: "${status}"
        bookingServiceId: ${booking_service_id}
        posId: ${pos_id}
      ) {
        bookingServiceId
        status
        posId
      }
    }
  `;
};

export const cancelBookingDocument = (booking_id) => {
  return gql`
    mutation M {
      salonCancelBooking(
        bookingId: ${booking_id}
      ) {
        bookingId
      }
    }
  `;
};

export const completeOrder = (booking_id, payment_mode) => {
  console.log("completeOrder", booking_id, payment_mode);
  //return;
  return gql`
      mutation M {
        salonCompleteOrder(
          paymentMode: ${payment_mode}
          bookingId: ${booking_id}
        ) {
          bookingId
          paymentMode
        }
      }
    `;
};
