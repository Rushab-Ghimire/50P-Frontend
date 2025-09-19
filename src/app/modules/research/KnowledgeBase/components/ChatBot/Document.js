import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";
import moment from "moment";

export const createDocument = (d) => {
  return gql`
  mutation Mutation {
    captureParams(
          action: "${d.action}",
          name: "${d.name}"
          dateTime: "${d.dateTime}"
          email: "${d.email}"
          phone: "${d.phone}"
          note: "${d.note}"
          orgId: ${d.org_id}
        ) {
        qItem {
          id
        }
      }
  }
`;
};
