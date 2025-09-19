import React, { useEffect } from "react";
import MedicalHeader from "./components/header";
import BasicInformation from "./components/BasicInformation";
import Insurance from "./components/insurance";
import Diagnostics from "./components/diagnostics";
import { useParams } from "react-router-dom";
import { getDocument } from "./Document";
import { useQuery } from "react-query";
import { gqlQuery, queryClient } from "@app/_utilities/http";

var ehrData = -1;
var oldId = -1;
const MedicalReport = () => {
  const params = useParams();

  useEffect(() => {
    if (params.id != oldId) {
      queryClient.invalidateQueries({ queryKey: ["ehr", { id: params.id }] });
    }
  }, []);

  const {
    data,
    isLoading: isLoadingFetch,
    isError: isErrorFetch,
    error: errorFetch,
  } = useQuery({
    queryKey: ["ehr", { id: params.id }],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: params.id === undefined ? -1 : { gql: getDocument(params.id) },
      }),
    onSuccess: (d) => {
      //console.log("loaded...", params.id, oldId, d);
      if (params.id != oldId) {
        ehrData = JSON.parse(d.json);
        oldId = d.id;
      }
    },
  });

  // if (data?.json != undefined && ehrData == -1) {
  //   ehrData = JSON.parse(data.json);
  // }

  return (
    <>
      {ehrData != -1 && <MedicalHeader ehrData={ehrData} />}
      {ehrData != -1 && <BasicInformation ehrData={ehrData} />}
      {ehrData != -1 && <Insurance ehrData={ehrData} />}
      {ehrData != -1 && <Diagnostics ehrData={ehrData} />}
    </>
  );
};

export default MedicalReport;
