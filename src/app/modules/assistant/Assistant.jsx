import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { JumboCard } from "@jumbo/components";
import { Link } from "react-router-dom";
import QbImage from "/assets/images/tax/tax-filing/qb.png";
import TxImage from "/assets/images/tax/tax-filing/tx.jpg";

import Insight from "./tax/Insight";
import Learn from "./tax/Learn";
import Marketing from "./marketing/Marketing";
import Report from "./marketing/Report";

const Assistant = () => {
  const params = useParams();

  console.log("params", params);

  return (
    <>
      {params.type == "TIPS-LEARN" && <Learn />}
      {params.type == "TIPS-ACT" && <Insight />}
      {params.type == "MARKETING" && <Marketing />}
      {params.type == "REPORT" && <Report type={params.param} />}
    </>
  );
};

export default Assistant;
