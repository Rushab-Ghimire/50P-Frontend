import { BFormTitle } from "@app/_styles/business";
import { JumboCard } from "@jumbo/components";
import React, { useState } from "react";
import PatientQuickStats from "./components/patient";
import DoctorsQuickStats from "./components/doctor";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { getRoles } from "@app/_utilities/helpers";

const QuickStats = () => {
  const { userDetail } = useAuth();
  const [role, setRole] = useState("");

  if (role == "") {
    var roles = getRoles(userDetail.organizations);
    //console.log("roles", roles, userDetail);
    setRole(roles[0]);
  }

  return (
    <>
      <BFormTitle variant={"h2"} fontWeight={"500"}>
        Quick Statistics
      </BFormTitle>
      {role == "patient" && <PatientQuickStats />}
      {role == "doctor" && <DoctorsQuickStats />}
    </>
  );
};

export default QuickStats;
