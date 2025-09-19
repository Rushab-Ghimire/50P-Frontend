import { RouterProvider } from "react-router-dom";
import { router } from "@app/_routes";
import { JumboTheme } from "@jumbo/components";
import { CONFIG } from "@app/_config";
import { AuthProvider } from "@app/_components/_core";
import JumboRTL from "@jumbo/components/JumboRTL/JumboRTL";
import { Suspense } from "react";
import Spinner from "@app/_shared/Spinner";
import { Container, CssBaseline, Grid, Stack } from "@mui/material";
import { AppProvider } from "@app/_components/AppProvider";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";



import WelcomeTileflexai from "./components/WelcomeTileflexai/WelcomeTileflexai";
import BusinessOption from "./components/BusinessOption/BusinessOption";




const FlexHome = () => {

  return (
    <AuthProvider>
      <AppProvider>
        <JumboTheme init={CONFIG.THEME}>
          <CssBaseline />
          <Suspense fallback={<Spinner />}>
            <JumboRTL>
              <WelcomeTileflexai/>
            </JumboRTL>
          </Suspense>
        </JumboTheme>
      </AppProvider>
    </AuthProvider>
  )
}

export default FlexHome
