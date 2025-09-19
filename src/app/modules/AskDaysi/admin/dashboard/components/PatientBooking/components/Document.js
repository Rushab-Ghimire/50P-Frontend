import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";
import moment from "moment";


export const reschedulePatientBooking = (qId, newDate) => {
  // console.log("updateBookingStatus", qId, newDate);
  // return;
  newDate = moment(newDate).format("YYYY-MM-DD HH:mm:00ZZ");

  return gql`mutation MyMutation {
        patientBookingReschedule(newBookingDate: "${newDate}", queueId: ${qId}) {
            ok
        }
    }`;
};

export const updateBookingStatus = (bookingId, newStatus) => {
  //console.log("updateBookingStatus", bookingId, newStatus);
  return gql`mutation MyMutation {
        updateAdBookingStatus(bookingId: ${bookingId}, status: "${newStatus}") {
            status
        }
    }`;
};

export const moveToQueue = (bookingId) => {
  return gql`mutation MyMutation {
        moveToQueue(bookingId: ${bookingId}) {
            ok
        }
    }`;
};


export const addUserChatHistory = (d) => {
    return gql`
    mutation Mutation {
      userChatHistoryAdd(
            content: "${d.content}"
            destinationUserId: ${d.destination_user_id}
            destinationUserLang: "${d.destination_user_lang}"
            bookingId: ${d.booking_id }
          ) {
          userChatHistory {
            id
          }
        }
    }
  `;
  };


  export const notifyIsTypingGQL = (booking_id, destination_user_id) => {
    return gql`
    mutation Mutation {
      notifyIsTyping(
            bookingId: ${booking_id}, 
            destinationUserId: ${destination_user_id}
          ) {
          ok
        }
    }
  `;
  };


  export const getUserChatHistory = (bookingId) => {
    return gql`
    query Q {
          userChatHistory(first: 1000, search: "", skip: 0, bookingId: ${bookingId}) {
            rows {
                content
                contentDestination
                id
                destinationUser {
                    id
                }
                user {
                    id
                }
                createdDate
            }
            totalCount
        }
      }
  `;
};