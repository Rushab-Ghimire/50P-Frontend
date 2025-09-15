import { RouterProvider } from "react-router-dom";
import { router } from "./_routes";
import { AppProvider } from "./_components";
import {
  JumboDialog,
  JumboDialogProvider,
  JumboTheme,
} from "@jumbo/components";
import { CONFIG } from "./_config";
import { AuthProvider } from "./_components/_core/AuthProvider";
import JumboRTL from "@jumbo/components/JumboRTL/JumboRTL";
import { Suspense } from "react";
import Spinner from "./_shared/Spinner";
import { CssBaseline } from "@mui/material";
import { AppSnackbar } from "./_components/_core";

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <JumboTheme init={CONFIG.THEME}>
          <CssBaseline />
          <Suspense fallback={<Spinner />}>
            <JumboRTL>
              <JumboDialogProvider>
                <JumboDialog />
                <AppSnackbar>
                  <RouterProvider router={router} />
                </AppSnackbar>
              </JumboDialogProvider>
            </JumboRTL>
          </Suspense>
        </JumboTheme>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
