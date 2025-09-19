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

export const getBusiness = (id) => gql`
  query Query {
    businessById(id: ${id}) {
      id
      title
    }
  }
`;

export const getContextTreeByKey = (key = "", organization_id) => gql`
  query Query {
    cardTreeByKey(key: "${key}", organizationId: ${organization_id}) {
      totalCount
      rows {
        id
        parent
        title
        context
        description
        graphAttributes
      }
    }
  }
`;

export const getCard = (key, parent = -1, organization_id) => gql`
  query Query {
    card(key: ${key}, parent: ${parent}, organizationId: ${organization_id}) {
      totalCount
      rows {
        id
        context
        title
        description
        parent
        graphAttributes
      }
    }
  }
`;

export const uiDocument = gql`
  query Query {
    cardUi {
      title
      ui
    }
  }
`;

export const deleteCard = (id) => gql`
mutation Mutation {
    deleteCard(id: ${id}) {
    ok
    }
}
`;

export const detachCard = (id) => gql`
mutation Mutation {
    detachCard(id: ${id}) {
    ok
    }
}
`;

export const attachCard = (id, parent) => gql`
mutation Mutation {
    attachCard(id: ${id}, parent: ${parent}) {
    ok
    }
}
`;

export const createCard = (d) => {
  return gql`
  mutation Mutation {
    createCard(context: "${d.context}",
                  description: "${d.description}",
                  title: "${d.title}",
                  parent: ${d.parent},
                  organizationId: ${d.organization_id})
      {
      ok
      card {
        id
      }
    }
  }
`;
};

export const updateCard = (d) => gql`
  mutation Mutation {
    updateCard(
            context: "${d.context}",
            description: "${d.description}",
            title: "${d.title}",
            id: ${d.id}
      ) {
      ok
      card {
        id
      }
    }
  }
`;

export const updateGraph = (d) => gql`
  mutation Mutation {
    updateCardGraph(
            id: ${d.id},
            graphAttributes: "${Math.trunc(d["graph_attributes"].x)},${Math.trunc(d["graph_attributes"].y)}"
      ) {
      ok
      card {
        id
      }
    }
  }
`;
