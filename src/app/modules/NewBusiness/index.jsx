import React, { useCallback, useEffect, useState } from "react";
import BusinessType from "./components/BusinessType";
import BusinessLocation from "./components/BusinessLocation";
import BusinessLicense from "./components/BusinessLicense";
import BusinessSelectBank from "./components/BusinessSelectBank";
import BusinessSignIn from "./components/BusinessSignIn";
import BusinessConnectingBank from "./components/BusinessConnectingBank";
import BusinessSetupComplete from "./components/BusinessSetupComplete";
import { Box } from "@mui/material";

const NewBusiness = ({ step }) => {
  const [active, setActive] = useState();

  const [location, setLocation] = useState("");
  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const [completeSetup, setCompleteSetup] = useState(false);

  console.log("step", step);
  useEffect(() => {
    if (step === 6) {
      setTimeout(() => {
        setCompleteSetup(true);
      }, 2000);
    }
  });

  return (
    <>
      {step === 1 && <BusinessType />}
      {step === 2 && (
        <BusinessLocation fxn={handleChange} locationState={location} />
      )}
      {step === 3 && <BusinessLicense />}
      {step === 4 && <BusinessSelectBank />}
      {step === 5 && <BusinessSignIn />}
      {!completeSetup && step === 6 && <BusinessConnectingBank />}
      {completeSetup && <BusinessSetupComplete />}
    </>
  );
};

export default NewBusiness;
