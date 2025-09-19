import React from "react";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AddIcon from "@mui/icons-material/Add";
import visaCard from "/assets/images/askdaysi/pricing/visa.png";
import masterCard from "/assets/images/askdaysi/pricing/mastercard.png";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { getCall, postCall } from "@app/_utilities/http";
import CircularProgress from "@mui/material/CircularProgress";

const card_brads = {
  visa: {
    name: "Visa",
  },
  mastercard: {
    name: "Mastercard",
  },
  american_express: {
    name: "American Express",
  },
  discover: {
    name: "Discover",
  },
  jcb: {
    name: "JCB",
  },
  diners_club: {
    name: "Diners Club",
  },
  other: {
    name: "Other",
  },
  bancontact: {
    name: "Bancontact",
  },
  cmr_falabella: {
    name: "CMR Falabella",
  },
  tarjeta_naranja: {
    name: "Tarjeta Naranja",
  },
  nativa: {
    name: "Nativa",
  },
  cencosud: {
    name: "Cencosud",
  },
  cabal: {
    name: "Cabal",
  },
  argencard: {
    name: "Argencard",
  },
  elo: {
    name: "Elo",
  },
  hipercard: {
    name: "Hipercard",
  },
  carnet: {
    name: "Carnet",
  },
  rupay: {
    name: "Rupay",
  },
  maestro: {
    name: "Maestro",
  },
  dankort: {
    name: "Dankort",
  },
  cartes_bancaires: {
    name: "Cartes Bancaires",
  },
};

const PaymentMethods = () => {
  const theme = useTheme();
  const { userDetail } = useAuth();
  const currentSubscription = userDetail.subscription;
  const [paymentMethods, setPaymentMethods] = React.useState([]);
  const [loadingData, setLoadingData] = React.useState(false);

  const getPaymentMethods = React.useCallback(async () => {
    try {
      setLoadingData(true);
      const response = await getCall({
        path: "/payment/get-all-customer-cards",
      });
      setPaymentMethods(response);
      setLoadingData(false);
    } catch (error) {
      console.log(error);
      sweetAlerts("error", "Faild to load PaymentMethods.", Swal, theme);
      setPaymentMethods([]);
      setLoadingData(true);
    }
  }, []);

  React.useEffect(() => {
    getPaymentMethods();
  }, []);

  const managePaymentMethod = async () => {
    var cbInstance = Chargebee.getInstance();
    cbInstance.openCheckout({
      hostedPage: () => {
        return postCall({
          path: "/payment/manage-payment-source",
        });
      },
      success(hostedPageId) {},
      error: (e) => {
        // showError(
        //   "There was an error. <br/>Please retry again. <br/>If the issue persits, please contact our support team."
        // );
        console.log(e);
      },
      close: () => {},
      step(step) {},
    });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
          },
        }}
      >
        <Stack>
          <Typography variant="h3">
            Manage multiple payment methods you have
          </Typography>
        </Stack>
        <Stack>
          <Button
            variant="contained"
            size="small"
            onClick={managePaymentMethod}
          >
            Manage Payment Method
          </Button>
        </Stack>
      </Box>
      {loadingData && <CircularProgress />}
      {paymentMethods?.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #DEE2E6",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "16px",
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
            },
          }}
        >
          {/* <Stack>
            <img
              src={item?.image}
              alt=""
              style={{
                verticalAlign: "middle",
                width: "90px",
                marginRight: "16px",
              }}
            />
          </Stack> */}
          <Stack sx={{ flex: 1 }}>
            <Typography variant="h5" mb={0.5} mt={0.5}>
              {item.card?.brand in card_brads
                ? card_brads[item.card.brand]["name"]
                : item.card?.brand}{" "}
              {item.card?.masked_number}
            </Typography>
            <Typography
              variant="body1"
              color={"text.secondary"}
              component={"span"}
              display={"block"}
            >
              {item.card?.expiry_month}/{item.card?.expiry_year}
            </Typography>
          </Stack>
          <Stack sx={{ flex: 1 }}>
            <Box textAlign="right">
              {item.is_primary_payment_source && (
                <Button variant="contained" size="small" disableElevation>
                  Primary
                </Button>
              )}
            </Box>
          </Stack>
        </Box>
      ))}
    </>
  );
};

export default PaymentMethods;
