import React from "react";
import CampaignType from "./CampaignType";
import CampaignFields from "./CampaignFields";
import CampaignSchedule from "./CampaignSchedule";

const CampaignComponents = ({ step }) => {
  return (
    <>
      {step === 1 && <CampaignType />}
      {step === 2 && <CampaignFields />}
      {step === 3 && <CampaignSchedule />}
    </>
  );
};

export default CampaignComponents;
