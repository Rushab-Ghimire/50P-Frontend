import { JumboInput, JumboSelect } from "@jumbo/vendors/react-hook-form";
import { useMutation, useQuery } from "react-query";
import { queryClient, gqlQuery, gqlMutate } from "@app/_utilities/http.js";
import React, { useState, useCallback, useEffect } from "react";
import { gql } from "graphql-request";
import {
  getDropDataCity,
  getDropDataState,
  GLOBAL,
} from "@app/_utilities/globals";

const AddressDropDown = ({ postal_code, state_id, city_id, address }) => {
  const [dropDataState, setDropDataState] = useState(getDropDataState());
  const [valS, setValS] = useState(
    state_id == null ? dropDataState[0].value : state_id
  );

  const [dropDataCity, setDropDataCity] = useState(getDropDataCity(valS));
  const [val, setVal] = useState(
    city_id == null ? dropDataCity[0].value : city_id
  );

  const [fetched, setFetched] = useState(false);

  const handleChange = useCallback((e) => {
    setVal((prev) => e.target.value);
  });

  const handleChangeState = useCallback((e) => {
    if (e.target.value === undefined) {
      return;
    }
    setValS((prev) => e.target.value);
    //setDropDataCity(getDropDataCity(e.target.value));
    mutate({
      onSuccess: (dx) => {
        let datax = dx.allCities.rows.map((item) => {
          return {
            value: item["id"],
            label: item["name"],
          };
        });
        setDropDataCity((prev) => datax);
        //setVal((v) => (city_id == null ? dropDataCity[0].value : city_id));
      },
      inData: {
        gql: gql`
          query Q {
            allCities(first: 1000, search: "", skip: 0, stateId: ${e.target.value}) {
              rows {
                id
                name
              }
            }
          }
        `,
      },
      path: `/graphql`,
    });
  });

  const {
    mutate,
    isPending,
    isError: isErrorCities,
    error: errorCities,
  } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: (e) => {},
  });

  const { data, isLoading, isError, error } = useQuery({
    onSuccess: (d) => {
      if (state_id !== null || state_id !== undefined) {
        handleChangeState({
          target: {
            value: state_id,
          },
        });
      }
    },
    queryKey: [
      "all_states",
      {
        gql: gql`
          query Q {
            allStates(countryId: 395, search: "", first: 100, skip: 0) {
              totalCount
              rows {
                id
                name
              }
            }
          }
        `,
      },
    ],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
  });

  if (data && !fetched) {
    //console.log("data", data);
    let datax = data.rows.map((item) => {
      return {
        value: item["id"],
        label: item["name"],
      };
    });
    setDropDataState((prev) => datax);
    setFetched(true);
  }

  return (
    <>
      <JumboSelect
        onChange={handleChangeState}
        fieldName={"state_id"}
        label="State"
        formControl={true}
        options={dropDataState}
        value={valS}
        defaultValue={valS}
        size="small"
        sx={{ marginBottom: "25px" }}
      />

      <JumboSelect
        onChange={handleChange}
        fieldName={"city_id"}
        label="City"
        formControl={true}
        options={dropDataCity}
        defaultValue={val}
        value={val}
        size="small"
        sx={{ marginBottom: "25px" }}
      />

      <JumboInput
        fullWidth
        size="small"
        defaultValue={address}
        fieldName={"address"}
        label={"Address"}
        sx={{ marginBottom: "25px" }}
      />

      {postal_code !== undefined && (
        <JumboInput
          fullWidth
          size="small"
          defaultValue={postal_code}
          fieldName={"postal_code"}
          label={"Postal Code"}
          sx={{ marginBottom: "25px" }}
        />
      )}
    </>
  );
};

export default AddressDropDown;
