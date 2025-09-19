import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
    processflow(search: "${search}", skip: ${page_num * PER_PAGE}, first: ${PER_PAGE}) {
        totalCount
        rows {
          id
          title
        }
    }
    }
`;
};

export const getDocument = (id) => gql`
  query Query {
    processflowById(id: ${id}) {
      id
      title
      specification
    }
  }
`;

export const uiDocument = gql`
  query Query {
    processflowUi {
      title
      ui
    }
  }
`;

export const createDocument = (d) => gql`
  mutation Mutation {
    createProcessFlow(title: "${d.title}",
                  specification: "${d.specification}")
      {
      ok
      processflow {
        id
      }
    }
  }
`;

export const updateDocument = (d) => gql`
  mutation Mutation {
    updateProcessFlow(
            specification: "${d.specification}",
            title: "${d.title}",
            id: ${d.id}
      ) {
      ok
      processflow {
        id
      }
    }
  }
`;
