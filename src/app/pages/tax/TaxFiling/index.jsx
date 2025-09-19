import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

import TaxSoftware from "./components/TaxSoftware";
import ConnectAccount from "./components/ConnectAccount";
import SignIn from "./components/SignIn";
import ConnectingBank from "./components/ConnectingBank";
import SuccessfulMessage from "./components/SuccessfulMessage";
import { JumboCard } from "@jumbo/components";
import { Colors } from "@app/_themes/TileFlex";

const TaxFiling = () => {
  const [showTaxSoftware, setTaxSoftware] = useState(true);
  const [showConnectAccount, setConnectAccount] = useState(false);
  const [showSignIn, setSignIn] = useState(false);
  const [showConnectingBank, setConnectingBank] = useState(false);
  const [showSuccesfullyConnected, setSuccesfullyConnected] = useState(false);

  const handleAcc = () => {
    setTaxSoftware(false);
    setConnectAccount(true);
  };

  const handleSignIn = () => {
    setConnectAccount(false);
    setSignIn(true);
  };

  const handleConnecting = () => {
    setSignIn(false);
    setConnectingBank(true);
    setTimeout(() => {
      setConnectingBank(false);
      setSuccesfullyConnected(true);
    }, 3000);
  };

  return (
    <>
      <JumboCard contentWrapper>
        <Typography
          variant={"h2"}
          mb={3}
          sx={{
            borderBottom: `1px solid ${Colors.light_gray}`,
            paddingBottom: "5px",
          }}
        >
          Tax Filing Automation
        </Typography>
        {showTaxSoftware && <TaxSoftware fxn={handleAcc} />}
        {showConnectAccount && <ConnectAccount fxn={handleSignIn} />}
        {showSignIn && <SignIn fxn={handleConnecting} />}
        {showConnectingBank && <ConnectingBank />}
        {showSuccesfullyConnected && <SuccessfulMessage />}
      </JumboCard>
    </>
  );
};

export default TaxFiling;
