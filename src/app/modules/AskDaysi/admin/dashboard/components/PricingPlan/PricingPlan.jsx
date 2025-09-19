import { Span } from "@jumbo/shared";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import {
  PricePlanItem,
  PricePlanItemPremium,
  PricePlanItemPremiumPlus,
} from "./components";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import {
  CHARGEBEE_API_KEY,
  CHARGEBEE_SITE,
  API_URL,
} from "@app/_utilities/constants/paths-env";
import { getCookie } from "@jumbo/utilities/cookies";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { postCall, putCall } from "@app/_utilities/http";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";

const ADPricingPlan = ({handleClose, params = null}) => {
  const Swal = useSwalWrapper();
  const { getCurrentSubscription } = useAuth();
  const [checkoutInProgress, setCheckoutInProgress] = React.useState(false);
  const [hostedPage, setHostedPage] = React.useState({
    "checkout_existing": {},
    "checkout_new": {},
  });

  const currentSubscription = params?.currentSubscription;
  const planId = currentSubscription?.plan.id;

  const PLANS = {
    free: {
      month: {
        id: "Free-plan-USD-Monthly",
        displayName: "Freemium",
      }
    },
    premium: {
      month: {
        id: "Premium-USD-Monthly",
        displayName: "Premium",
      }
    },
    premiumPlus: {
      month: {
        id: "Premium-plus-USD-Monthly",
        displayName: "Premium Plus",
      }
    },
  };

  const HOSTED_PAGE_TYPE = {
    "CHECKOUT_EXISTING": "checkout_existing",
    "CHECKOUT_NEW": "checkout_new"
  }

  const showMessage = (title, type) => {
    Swal.fire({
      icon: type,
      title: title,
      showCloseButton: true,
      showConfirmButton: false,
    });
  };

  const openCheckout = (planId) => {
    const cbInstance = Chargebee.getInstance();
    cbInstance.openCheckout({
      hostedPage: async () => {
        try {
          setCheckoutInProgress(true);
          const nowInSec = Math.floor(Date.now() / 1000) + 30;
          let res;

          const getCachedHostedPage = (type) => {
            const hostedPageData = hostedPage[type]?.[planId];
            if (hostedPageData && hostedPageData.expires_at > nowInSec) {
              return hostedPageData;
            }
            return null;
          };

          if (currentSubscription) {
            const KEY = HOSTED_PAGE_TYPE.CHECKOUT_EXISTING
            const cachedPage = getCachedHostedPage(KEY);
            if (cachedPage) return cachedPage;

            res = await putCall({
              inData: {
                planId: planId,
                subscriptionId: currentSubscription.id,
              },
              path: "/payment/chargebee/hosted_page",
            });
            setHostedPage((prev) => {
              return { ...prev, [KEY]: { ...prev[KEY], [planId]: res } }
            });
          } else {
            const KEY = HOSTED_PAGE_TYPE.CHECKOUT_NEW
            const cachedPage = getCachedHostedPage(HOSTED_PAGE_TYPE.CHECKOUT_NEW);
            if (cachedPage) return cachedPage;

            res = await postCall({
              inData: { planId: planId },
              path: "/payment/chargebee/hosted_page",
            });
            setHostedPage((prev) => {
              return { ...prev, [KEY]: { ...prev[KEY], [planId]: res } }
            });
          }
          return res;
        } finally {
          setCheckoutInProgress(false);
        }
      },
      success: async (hostedPageId) => {
        await getCurrentSubscription(true);
        cbInstance.closeAll();
        let message = ""
        const displayName = Object.values(PLANS).find(plan => plan.month.id === planId)?.month.displayName;
        if (currentSubscription) {
          message = `Your subscription has been updated to ${displayName} successfully.`;
        } else {
          message = `You have successfully subscribed to Plan ${displayName}.`;
        }
        handleClose();
        showMessage(message, "success");
      },
      loaded() { },
      error: (e) => {
        showMessage(
          "There was an error. <br/>Please retry again. <br/>If the issue persits, please contact our support team.",
          "error"
        );
      },
      close: () => {
        cbInstance.closeAll();
      },
      step(step) { },
    });
  };

  return (
    <React.Fragment>
      <Container>
        <Box textAlign={"center"}>
          <Typography variant="h2" sx={{ fontSize: "32px", fontWeight: 600 }}>
            Plan & Pricing
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: "28px", fontWeight: 400, mb: 4 }}
          >
            Choose the plan that fits you best
          </Typography>
        </Box>
      </Container>
      <Grid container spacing={3.75} mb={4}>
        <Grid item xs={12} md={6} lg={4}>
          <PricePlanItem
            title={"Always Free"}
            subheader={"Freemium"}
            tagline="Your basic companion for everyday health needs."
            headerSx={{
              textAlign: "center",
              bgcolor: Colors.primary,
            }}
          >
            {planId == PLANS.free.month.id ? (
              <Button
                variant={"contained"}
                size="large"
                color="success"
                disableElevation
                sx={{
                  width: "100%",
                  mb: 2,
                  borderRadius: "30px",
                  fontSize: "24px",
                  width: "100%",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#3BD2A2",
                    color: Colors.white,
                  },
                }}
              >
                Current subscription
              </Button>
            ) : (
              <Button
                variant={"contained"}
                size="large"
                disableElevation
                sx={{
                  width: "100%",
                  mb: 2,
                  borderRadius: "30px",
                  fontSize: "24px",
                  textTransform: "capitalize",
                  backgroundColor: Colors.primary,
                  "&:hover": {
                    backgroundColor: Colors.blue_1,
                    color: Colors.white,
                  },
                }}
                onClick={(event) => openCheckout(PLANS.free.month.id)}
                disabled={checkoutInProgress}
              >
                Get Started
              </Button>
            )}
          </PricePlanItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <PricePlanItemPremium
            title={"$5/month"}
            subheader={"Premium"}
            tagline="For users who need more flexibility and communication."
            tagline1="Everything in Freemium, plus"
            headerSx={{
              textAlign: "center",
              bgcolor: Colors.primary,
            }}
            sx={{
              transform: "scale(1)",
              // color: "common.white",
              // bgcolor: "primary.main",
              // bgcolor: Colors.blue_1,
            }}
          >
            {planId == PLANS.premium.month.id ? (
              <Button
                variant={"contained"}
                size="large"
                color="success"
                disableElevation
                sx={{
                  width: "100%",
                  mb: 2,
                  borderRadius: "30px",
                  fontSize: "24px",
                  width: "100%",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#3BD2A2",
                    color: Colors.white,
                  },
                }}
              >
                Current subscription
              </Button>
            ) : (
              <Button
                variant={"contained"}
                disableElevation
                sx={{
                  width: "100%",
                  mb: 2,
                  borderRadius: "30px",
                  fontSize: "24px",
                  textTransform: "capitalize",
                  backgroundColor: Colors.secondary,
                  color: Colors.white,
                  "&:hover": {
                    backgroundColor: Colors.blue,
                    color: Colors.white,
                  },
                }}
                onClick={(event) => openCheckout(PLANS.premium.month.id)}
                disabled={checkoutInProgress}
              >
                Get Started
              </Button>
            )}
          </PricePlanItemPremium>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <PricePlanItemPremiumPlus
            title={"$20/month"}
            subheader={"Premium Plus"}
            tagline="Your personal health assistant, always by your side."
            tagline1="Everything in Premium, plus"
            headerSx={{
              textAlign: "center",
              bgcolor: Colors.primary,
            }}
          >
            {planId == PLANS.premiumPlus.month.id ? (
              <Button
                variant={"contained"}
                size="large"
                color="success"
                disableElevation
                sx={{
                  width: "100%",
                  mb: 2,
                  borderRadius: "30px",
                  fontSize: "24px",
                  width: "100%",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#3BD2A2",
                    color: Colors.white,
                  },
                }}
              >
                Current subscription
              </Button>
            ) : (
              <Button
                variant={"contained"}
                disableElevation
                sx={{
                  width: "100%",
                  mb: 2,
                  borderRadius: "30px",
                  fontSize: "24px",
                  textTransform: "capitalize",
                  backgroundColor: Colors.primary,
                  "&:hover": {
                    backgroundColor: Colors.blue_1,
                    color: Colors.white,
                  },
                }}
                onClick={(event) => openCheckout(PLANS.premiumPlus.month.id)}
                disabled={checkoutInProgress}
              >
                Get Started
              </Button>
            )}
          </PricePlanItemPremiumPlus>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export { ADPricingPlan };
