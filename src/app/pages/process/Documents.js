import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";

export const queryDocument = (search, page_num = 1) => {
  return gql`
    query Query {
    process(search: "${search}", skip: ${page_num * PER_PAGE}, first: ${PER_PAGE}) {
        totalCount
        rows {
          id
          title
          apiEndpoint
        }
    }
    }
`;
};

export const getDocument = (id) => gql`
  query Query {
    processById(id: ${id}) {
      id
      title
      inParams
      outParams
      apiEndpoint
    }
  }
`;

export const uiDocument = gql`
  query Query {
    processUi {
      title
      ui
    }
  }
`;

export const createDocument = (d) => gql`
  mutation Mutation {
    createProcess(
                  title: "${d.title}",
                  apiEndpoint: "${d.apiEndpoint}",
                  outParams: "${d.outParams}",
                  inParams: "${d.inParams}"
                )
      {
      ok
      process {
        id
      }
    }
  }
`;

export const updateDocument = (d) => gql`
  mutation Mutation {
    updateProcess(
            inParams: "${d.inParams}",
            apiEndpoint: "${d.apiEndpoint}",
            outParams: "${d.outParams}",
            title: "${d.title}",
            id: ${d.id}
      ) {
      ok
      process {
        id
      }
    }
  }
`;
