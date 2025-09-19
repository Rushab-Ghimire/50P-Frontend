import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
    salonSettingByOrganizationId(keys: [${search}]) {
        rows {
          id
          key
          value
        }
        totalCount
      }
    }
`;
};

export const updateDocument = (data) => {
  let keys = Object.keys(data).map((i) => `"${i}"`);
  let values = Object.values(data).map((i) =>
    i === undefined ? `""` : `"${i}"`
  );
  //console.log("to save", keys, values);
  //return;
  return gql`
  mutation Mutation {
    salonSettingUpdate(
            keys: [${keys}]
            values: [${values}]
      ) {
      ok
    }
  }
`;
};
