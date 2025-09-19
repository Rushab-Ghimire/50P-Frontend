import { JumboSelect } from "@jumbo/vendors/react-hook-form";
import { useQuery } from "react-query";
import { queryClient, gqlQuery } from "@app/_utilities/http.js";
import React, { useState, useCallback, useEffect } from "react";
import { gql } from "graphql-request";

const BillingPeriodDropDown = ({ selected, name }) => {
  selected = selected === undefined ? "" : selected;

  const [val, setVal] = useState(selected);

  const handleChange = useCallback((e) => {
    setVal((prev) => e.target.value);
  });

  useEffect(() => {
    setVal((prev) => selected);
  }, [selected]);

  return (
    <JumboSelect
      onChange={handleChange}
      fieldName={name}
      label="Billing Period"
      formControl={true}
      options={[
        {
          label: "Yearly",
          value: "1",
        },
        {
          label: "Monthly",
          value: "2",
        },
      ]}
      value={val}
      defaultValue={val}
    />
  );
};

export default BillingPeriodDropDown;
