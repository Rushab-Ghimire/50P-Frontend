import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
    salonFloorPlan(search: "${search}", skip: ${page_num * PER_PAGE}, first: ${PER_PAGE}) {
        totalCount
        rows {
          id
          title
        }
      }
    }
`;
};

export const deleteDocument = (id) => gql`
mutation Mutation {
    salonFloorPlanDelete(id: ${id}) {
    ok
    }
}
`;

export const getDocument = (id) => gql`
  query Query {
    salonFloorPlanById(id: ${id}) {
      id
      position
      title
    }
  }
`;

export const createDocument = (d) => gql`
  mutation Mutation {
    salonFloorPlanCreate(
          position: ${d.position},
          title: "${d.title}")
      {
        ok
      }
  }
`;

export const updateDocument = (d) => gql`
  mutation Mutation {
    salonFloorPlanUpdate(
            position: ${d.position},
            title: "${d.title}",
            id: ${d.id}
      ) {
      ok
    }
  }
`;
