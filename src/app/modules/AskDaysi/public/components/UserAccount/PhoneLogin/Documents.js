import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const sendOTP = (d) => gql`
  mutation Mutation {
    sendOtp(phone: "${d.phone}", app: "daysiai")
    {
      smsCode {
      totalCount
      rows {
        id
        smsCode
      }
    }
  }
}
`;
