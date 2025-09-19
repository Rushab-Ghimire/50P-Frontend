import { useJumboHeaderTheme } from "@jumbo/components/JumboTheme/hooks";
import { AppBar, ThemeProvider, Toolbar } from "@mui/material";
import React from "react";
import { useAppBarSx, useJumboLayout } from "../../hooks";

function JumboLayoutHeader({ children }) {
  const { headerOptions } = useJumboLayout();
  const { headerTheme } = useJumboHeaderTheme();

  //TODO: need to cross check this calculation
  const appBarSx = useAppBarSx();

  if (headerOptions?.hide) return null;

  return (
    <ThemeProvider theme={headerTheme}>
      <AppBar
        elevation={0}
        position={headerOptions?.fixed ? "fixed" : "relative"}
        sx={{ ...appBarSx }}
      >
        <Toolbar sx={{ height: "100%", px: { lg: 6, xs: 4 } }}>
          {children}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export { JumboLayoutHeader };
