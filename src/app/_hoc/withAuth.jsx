import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import Spinner from "@app/_shared/Spinner";
import { Box, Typography } from "@mui/material";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const withAuth = (Component) => {
  const location = useLocation();
  return (props) => {
    const { isAuthenticated, loading, userDetail } = useAuth();

    if (loading) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div className="loader">
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
          </div>
          {/* <Typography
            variant="h3"
            sx={{ marginTop: "200px", color: "#268ccc" }}
          >
            Preparing to Launch Dashboard
          </Typography> */}
        </Box>
      );
    }

    // if (isAuthenticated && userDetail?.organizations?.length <= 0) {
    //   return <Navigate to="/organization-details" />;
    // }

    if (isAuthenticated && location.pathname == "/") {
      //return <Navigate to="/salon/calendar" />;
      return <Navigate to="/bridge" />;
    }

    if (
      !isAuthenticated &&
      location.pathname != "/" &&
      location.pathname != "/signup"
    ) {
      return <Navigate to="/" />;
    }

    // if (!isAuthenticated) {
    //   return <Navigate to="/login" />;
    // }
    return <Component {...props} />;
  };
};

export default withAuth;
