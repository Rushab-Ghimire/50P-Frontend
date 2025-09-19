import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import { useTheme } from "@mui/material";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { getFormattedDate } from "@app/_utilities/helpers";
import { postCall, putCall, sweetAlerts } from "@app/_utilities/http";
import { json } from "react-router-dom";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";

const Overview = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const planStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      gap: "20px",
      alignItems: "flex-start",
    },
  };
  const Swal = useSwalWrapper();

  const { userDetail, loading, getCurrentSubscription } = useAuth();
  const currentSubscription = userDetail.subscription;
  const [autoRenewal, setAutoRenewal] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const updateAutoRenewal = async (event) => {
    try {
      setAutoRenewal(event.target.checked);
      await putCall({
        inData: { "auto_collection": event.target.checked },
        path: '/subscription/update-current-subscription'
      });

      sweetAlerts("success", "Auto renewal updated", Swal, theme);
    } catch (error) {
      if (error != undefined && error.info) {
        sweetAlerts("error", "<strong>Auto renewal Failed</strong>", Swal, theme, error.info.error);
      }
    }
  };

  const cancelSubscription = async (event) => {
    try {
      setInProgress(true);
      await postCall({
        inData: { "subscriptionId": currentSubscription.id },
        path: "/subscription/cancel-current-subscription"
      });
      getCurrentSubscription(true)
      setInProgress(false);
      sweetAlerts("success", "Subscription scheduled for cancellation", Swal, theme);
    } catch (error) {
      setInProgress(false);
      sweetAlerts("error", "<strong>Failed to cancel</strong>", Swal, theme, "If error persists, please contact support");
    }
  };

  const removeScheduledCancellationSubscription = async (event) => {
    try {
      setInProgress(true);
      await postCall({
        inData: { "subscriptionId": currentSubscription.id },
        path: "/subscription/remove-current-subscription-scheduled-cancellation"
      });
      setInProgress(false);
      sweetAlerts("success", "Subscription is activated", Swal, theme);
    } catch (error) {
      setInProgress(false);
      sweetAlerts("error", "<strong>Failed to cancel</strong>", Swal, theme, "If error persists, please contact support");
    }
  };

  useEffect(() => {
    if (userDetail.subscription == undefined) {
      navigate(`/bridge`);
    }
    setAutoRenewal(currentSubscription.auto_collection)
  }, [currentSubscription])

  return (
    <>
      {currentSubscription &&
        <>
          <Box>
            <Typography variant="h2">{currentSubscription.plan.name}</Typography>
            <Typography variant="h2" fontWeight={"600"}>
              {currentSubscription.plan.amount > 0 && ('$' + (currentSubscription.plan.amount / 100) +'/'+ currentSubscription.billing_period_unit)}
            </Typography>
            {/* <Typography variant="p" sx={{ fontSize: "16px" }}>
          For users who need more flexibility and communication.
        </Typography> */}
            <hr style={{ margin: "20px 0" }} />
          </Box>
          <Box sx={planStyle}>
            {
              currentSubscription.status == "non_renewing" &&
              <Stack>
                <Typography color='warning' variant="h4">Ends on</Typography>
                <Typography variant="h3" fontWeight="500">
                  {getFormattedDate(currentSubscription.cancelled_at, "MMMM DD, YYYY")}
                </Typography>
              </Stack>
            }
            {currentSubscription.status == "active" &&
              <Stack>
                <Typography variant="h4">Next Renewal Date</Typography>
                <Typography variant="h3" fontWeight="500">
                  {getFormattedDate(currentSubscription.current_term_end, "MMMM DD, YYYY")}
                </Typography>
              </Stack>
            }

            {/* <Stack>
          <Typography variant="h4" fontWeight="500">
            Auto Renewal
          </Typography>
          <Switch checked={autoRenewal} onChange={updateAutoRenewal} />
        </Stack> */}
            {currentSubscription.status == "cancelled" &&
              <Typography variant="h3" sx={{ fontSize: "28px", fontWeight: "500" }}>
                <Typography
                  variant="span"
                  sx={{
                    display: "inline-block",
                    backgroundColor: Colors.gray_1,
                    color: Colors.white,
                    borderRadius: "30px",
                    padding: "5px 10px",
                    fontSize: "16px",
                    textTransform: "capitalize",
                  }}
                >
                  {currentSubscription.status}
                </Typography>
              </Typography>
            }
            <Stack>
              <Box>
                <Button variant="contained" sx={{ mr: 2, mb: { xs: 2, sm: 0 } }} onClick={() => {
                  window.showGeneralDialog("PricingPlan", -1, { "currentSubscription": currentSubscription });
                }} disabled={inProgress}>
                  Change Plan
                </Button>
                {(currentSubscription.status == "active" && currentSubscription.plan.amount > 0) &&
                  <LoadingButton variant="contained" color="error" onClick={cancelSubscription} disabled={inProgress} loading={inProgress}>
                    Cancel Subscription
                  </LoadingButton>
                }
                {(currentSubscription.status == "non_renewing" && currentSubscription.plan.amount > 0) &&
                  <LoadingButton variant="contained" color="success" onClick={removeScheduledCancellationSubscription} disabled={inProgress} loading={inProgress}>
                    Activate Subscription
                  </LoadingButton>
                }
              </Box>
            </Stack>
          </Box>
        </>
      }
    </>
  );
};

export default Overview;
