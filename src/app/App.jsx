import { RouterProvider } from "react-router-dom";
import { router } from "./_routes";
import { JumboTheme } from "@jumbo/components";
import { CONFIG } from "./_config";
import { AuthProvider } from "./_components/_core";
import JumboRTL from "@jumbo/components/JumboRTL/JumboRTL";
import { Suspense } from "react";
import Spinner from "./_shared/Spinner";
import { CssBaseline } from "@mui/material";
import { AppProvider } from "./_components/AppProvider";
//import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClientProvider } from "react-query";
import { queryClient } from "@app/_utilities/http.js";
import { CHARGEBEE_API_KEY, CHARGEBEE_SITE, API_URL } from "@app/_utilities/constants/paths-env";
import { useEffect } from "react";

function App() {
  if (
    document.location.href.includes("localhost:5173") ||
    document.location.href.includes("daysi")
  ) {
    useEffect(() => {
      try {
        Chargebee.getInstance();
      } catch (error) {
        Chargebee.init({
          site: CHARGEBEE_SITE,
          publishableKey: CHARGEBEE_API_KEY,
        });
        Chargebee.registerAgain();
      }
    }, []);
  }

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <JumboTheme init={CONFIG.THEME}>
            <CssBaseline />
            <Suspense fallback={<Spinner />}>
              <JumboRTL>
                <RouterProvider router={router} />
              </JumboRTL>
            </Suspense>
          </JumboTheme>
        </AppProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
