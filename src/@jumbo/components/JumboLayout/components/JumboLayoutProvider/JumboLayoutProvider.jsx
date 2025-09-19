import { LAYOUT_ACTIONS, SIDEBAR_VARIANTS } from "@jumbo/utilities/constants";
import React from "react";
import { JumboLayoutContext, defaultLayoutOptions } from "./JumboLayoutContext";
import { jumboLayoutReducer } from "./reducer";
import { useMediaQuery } from "@mui/system";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import PropTypes from "prop-types";
import { LayoutOptions } from "../../prop-types";

let prevLayoutOptions = null;

function JumboLayoutProvider({ children, layoutConfig }) {
  const [layoutOptions, setLayoutOptions] = React.useReducer(
    jumboLayoutReducer,
    layoutConfig ?? defaultLayoutOptions
  );

  //handle mobile screen sizes
  const { theme } = useJumboTheme();
  const isBelowLg = useMediaQuery(
    theme.breakpoints.down(layoutOptions.sidebar?.drawerBreakpoint ?? "xl")
  );
  React.useEffect(() => {
    if (!layoutOptions.sidebar?.hide) {
      if (isBelowLg) {
        prevLayoutOptions = layoutOptions.sidebar;
        setLayoutOptions({
          type: LAYOUT_ACTIONS.SET_SIDEBAR_OPTIONS,
          payload: {
            variant: SIDEBAR_VARIANTS.TEMPORARY,
            open: false,
          },
        });
      } else {
        if (prevLayoutOptions) {
          setLayoutOptions({
            type: LAYOUT_ACTIONS.SET_SIDEBAR_OPTIONS,
            payload: prevLayoutOptions,
          });
        }
      }
    }
  }, [isBelowLg, layoutOptions.sidebar?.hide]);

  React.useEffect(() => {
    if (layoutConfig)
      setLayoutOptions({
        type: LAYOUT_ACTIONS.SET_OPTIONS,
        payload: layoutConfig,
      });
  }, [layoutConfig]);

  const setHeaderOptions = React.useCallback((options) => {
    setLayoutOptions({
      type: LAYOUT_ACTIONS.SET_HEADER_OPTIONS,
      payload: options,
    });
  }, []);

  const setSidebarOptions = React.useCallback((options) => {
    setLayoutOptions({
      type: LAYOUT_ACTIONS.SET_SIDEBAR_OPTIONS,
      payload: options,
    });
  }, []);

  const setFooterOptions = React.useCallback((options) => {
    setLayoutOptions({
      type: LAYOUT_ACTIONS.SET_FOOTER_OPTIONS,
      payload: options,
    });
  }, []);

  const setRootOptions = React.useCallback((options) => {
    setLayoutOptions({
      type: LAYOUT_ACTIONS.SET_ROOT_OPTIONS,
      payload: options,
    });
  }, []);

  const setContentOptions = React.useCallback((options) => {
    setLayoutOptions({
      type: LAYOUT_ACTIONS.SET_CONTENT_OPTIONS,
      payload: options,
    });
  }, []);

  const setOptions = React.useCallback((options) => {
    setLayoutOptions({
      type: LAYOUT_ACTIONS.SET_OPTIONS,
      payload: options,
    });
  }, []);

  const layoutContext = React.useMemo(
    () => ({
      layoutOptions,
      headerOptions: layoutOptions.header,
      sidebarOptions: layoutOptions.sidebar,
      footerOptions: layoutOptions.footer,
      contentOptions: layoutOptions.content,
      rootOptions: layoutOptions.root,
      setHeaderOptions,
      setSidebarOptions,
      setFooterOptions,
      setContentOptions,
      setRootOptions,
      setOptions,
    }),
    [
      layoutOptions,
      setHeaderOptions,
      setFooterOptions,
      setSidebarOptions,
      setContentOptions,
      setRootOptions,
      setOptions,
    ]
  );

  return (
    <JumboLayoutContext.Provider value={layoutContext}>
      {children}
    </JumboLayoutContext.Provider>
  );
}

export { JumboLayoutProvider };

JumboLayoutProvider.propTypes = {
  children: PropTypes.node,
  layoutConfig: PropTypes.shape({ ...LayoutOptions }),
};
