import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";


export const queryDocumentLab = (search, page_num = 1) => {

  var kx = "";
  var vx = "";

  if(search.trim() != "")
  {
    var d = JSON.parse(search);
    var adv = [];
    if(d.advancedFilterParams !== undefined)
    {
      Object.keys(d.advancedFilterParams).map((kx) => {
        adv.push(kx + "-" + d.advancedFilterParams[kx].join("~"));
      });
    }
    d.advancedFilterParams = adv.join("@@");
    kx = Object.keys(d).join("|||");
    vx = Object.values(d).join("|||");
  }

  

  //console.log("search zz", search)
  return gql`
    query Query {
    allLabs(keys: "${kx}", values: "${vx}", skip: ${page_num * 12}, first: ${12}) {
        rows {
                id
                title
                description
                address
                logo
                insuranceProviders {
                  id
                  name
                  logo
                }
                state {
                  id
                  name
                }
                country {
                  name
                  id
                }
                city {
                  id
                  name
                  lat
                  lng
                }
              }
        totalCount
      }
    }
`;
};



export const queryDocument = (search, page_num = 1) => {

  var kx = "";
  var vx = "";

  if(search.trim() != "")
  {
    var d = JSON.parse(search);
    var adv = [];
    if(d.advancedFilterParams !== undefined)
    {
      Object.keys(d.advancedFilterParams).map((kx) => {
        adv.push(kx + "-" + d.advancedFilterParams[kx].join("~"));
      });
    }
    d.advancedFilterParams = adv.join("@@");
    kx = Object.keys(d).join("|||");
    vx = Object.values(d).join("|||");
  }

  

  //console.log("search zz", search)
  return gql`
    query Query {
    allDoctors(keys: "${kx}", values: "${vx}", skip: ${page_num * 12}, first: ${12}) {
        rows {
                id
                name
                phone
                postalCode
                slug
                timezone
                website
                description
                address
                isPremium
                profilePic
                languages {
                  id
                  title
                }
                insuranceAccepted {
                  id
                  name
                  logo
                }
                educationTraining {
                  id
                  title
                }
                specialization {
                  id
                  title
                }
                state {
                  id
                  name
                }
                country {
                  name
                  id
                }
                city {
                  id
                  name
                  lat
                  lng
                }
              }
        totalCount
      }
    }
`;
};

export const createDocument = (d) => gql`
  mutation Mutation {
    salonCategoryCreate(
          entityTypeId: ${d.entity_type_id},
          title: "${d.title}")
      {
        ok
      }
  }
`;

export const jsonEmailDocument = (d, subject = "Site Email") => { 
  var vx = [];
  for (const [key, value] of Object.entries(d)) {
    vx.push(`${key}::${value}`);
  }
  vx = vx.join("||");
  return gql`
    mutation Mutation {
      emailJson(dataset: "${vx}", subject: "${subject}") {
        status
      }
    }`;
  };