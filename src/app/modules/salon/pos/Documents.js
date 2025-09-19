import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const queryDocument = (floorplan_id, search, page_num = 1) => {
  return gql`
    query Query {
    salonPos(floorplanId: ${floorplan_id}, search: "${search}", skip: ${page_num * PER_PAGE}, first: ${PER_PAGE}) {
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
    salonPosDelete(id: ${id}) {
      ok
    }
}
`;

export const getDocument = (id) => gql`
  query Query {
    salonPosById(id: ${id}) {
      id
      position
      title
      floorplan {
        id
        title
      }
    }
  }
`;

export const createDocument = (d) => gql`
  mutation Mutation {
    salonPosCreate(
          entityTypeId: ${d.entity_type_id},
          floorplanId: ${d.floorplan_id},
          title: "${d.title}",
          position: ${d.position})
      {
        ok
      }
  }
`;

export const updateDocument = (d) => gql`
  mutation Mutation {
    salonPosUpdate(
            entityTypeId: ${d.entity_type_id},
            floorplanId: ${d.floorplan_id},
            id: ${d.id},
            title: "${d.title}",
            position: ${d.position}
      ) {
      ok
    }
  }
`;
