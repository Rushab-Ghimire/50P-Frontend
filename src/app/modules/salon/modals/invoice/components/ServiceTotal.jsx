import React from "react";
import { JumboCard } from "@jumbo/components";
import {
  BACusAvatar,
  BACusName,
  BACusProDetail,
  BACusProDetailWrapper,
  BACusProWapper,
  BAServices,
  BAServicesPrice,
  BAServicesTime,
  BAServicesTitle,
} from "@app/_styles/BookAppointment";
import { Button, Divider, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import OrderReceipt from "../OrderReceipt";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ServiceTotal = ({ order_id, service_total }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <JumboCard contentWrapper sx={{ marginBottom: "25px" }}>
      <BAServices>
        <Stack>
          <BAServicesTitle variant="h3" fontWeight="600 !important">
            Paid VIA - {service_total.payment_mode}
          </BAServicesTitle>
        </Stack>
      </BAServices>

      <Divider sx={{ marginBottom: 2 }} />
      <BAServices>
        <Stack>
          <BAServicesTitle variant="h3">Sub-Total</BAServicesTitle>
        </Stack>
        <Stack>
          <BAServicesPrice>{service_total.sub_total_display}</BAServicesPrice>
        </Stack>
      </BAServices>
      {service_total.taxes.map((item) => (
        <BAServices key={item.key}>
          <Stack>
            <BAServicesTitle variant="h3">
              {item.key}
              <br />
              {item.value}
            </BAServicesTitle>
          </Stack>
          <Stack>
            <BAServicesPrice>{item.amount_display}</BAServicesPrice>
          </Stack>
        </BAServices>
      ))}

      <BAServices>
        <Stack>
          <BAServicesTitle variant="h3" fontWeight="500 !important">
            Total
          </BAServicesTitle>
        </Stack>
        <Stack>
          <BAServicesPrice fontWeight="500 !important">
            {service_total.total_display}
          </BAServicesPrice>
        </Stack>
      </BAServices>

      <Button variant="contained" size="small" onClick={handleClickOpen}>
        View Receipt
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ position: "absolute", right: "20px " }}
        >
          <CloseIcon />
        </IconButton>
        <OrderReceipt order_id={order_id} />
      </Dialog>
    </JumboCard>
  );
};

export default ServiceTotal;
