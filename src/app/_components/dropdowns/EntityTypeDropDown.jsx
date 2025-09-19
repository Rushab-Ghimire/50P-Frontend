import { JumboSelect } from "@jumbo/vendors/react-hook-form";
import { useQuery } from "react-query";
import { queryClient, gqlQuery } from "@app/_utilities/http.js";
import React, { useState, useCallback, useEffect } from "react";
import { gql } from "graphql-request";

const EntityTypeDropDown = ({ selected, name }) => {
  selected = selected === undefined ? "" : selected;

  const [dropData, setDropData] = useState([]);
  const [val, setVal] = useState(selected);
  const [fetched, setFetched] = useState(false);

  const handleChange = useCallback((e) => {
    setVal((prev) => e.target.value);
  });

  useEffect(() => {
    setVal((prev) => selected);
  }, [selected]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "entity_type",
      {
        gql: gql`
          query Q {
            salonEntityType {
              id
              title
            }
          }
        `,
      },
    ],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
  });

  if (data && !fetched) {
    let datax = data.map((item) => {
      return {
        value: item["id"],
        label: item["title"],
      };
    });
    setDropData((prev) => datax);
    setVal((prev) => selected);
    setFetched(true);
  }

  return (
    <JumboSelect
      onChange={handleChange}
      fieldName={name}
      label="Resource Type"
      formControl={true}
      options={dropData}
      value={val}
      defaultValue={val}
      size="small"
    />
  );
};

export default EntityTypeDropDown;
