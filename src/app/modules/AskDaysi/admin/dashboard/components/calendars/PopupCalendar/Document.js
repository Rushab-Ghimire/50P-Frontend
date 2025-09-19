import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";
import moment from "moment";

export const getBookingAD = (inDate, status) => {
    if(status === undefined)
    {
        status = "status=" + "new,confirmed";
    }
    else{
        status = "status=" + status;
    }
  inDate = moment(inDate).format("YYYY-MM-DD");
  return gql`
  query Q {
        patientBooking(skip: 0, search: "${status}", first: 100) {
            rows {
                bookingDateTime
                id
                providerDefaultLang
                userDefaultLang
                customNote
                subscriptionNumber
                memberId
                insuranceProvider
                insuranceFileUuid
                reportFileUuid
                status
                providerUserId
                provider {
                    id
                }
                userProfilePic
                user {
                        id
                        firstName
                        lastName
                        email
                    }
            }
            totalCount
        }
    }
`;
};