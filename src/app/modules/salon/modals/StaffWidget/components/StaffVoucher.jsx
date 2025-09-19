import React from "react";
import { JumboCard } from "@jumbo/components";
import { Box, Stack, Typography } from "@mui/material";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { CWNotification } from "@app/_styles/CustomerWidgets";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

const voucherList = [
  {
    id: 1,
    title: "Voucher 1",
    discount: "25% Flat",
  },
  {
    id: 2,
    title: "Voucher 2",
    discount: "5% Flat",
  },
  {
    id: 3,
    title: "Voucher 3",
    discount: "10% On First Visit",
  },
];

const StaffVoucher = ({ vouchers }) => {
  return (
    <JumboCard
      title={
        <Typography variant={"h3"} mb={0} fontWeight={"500"}>
          Vouchers
        </Typography>
      }
      action={
        <Stack direction={"row"} spacing={1}>
          <DiscountOutlinedIcon fontSize={"medium"} />
        </Stack>
      }
      contentSx={{}}
      contentWrapper={true}
      headerSx={{ borderBottom: 1, borderBottomColor: "divider" }}
      sx={{ marginBottom: "25px" }}
    >
      {vouchers.map((data, index) => (
        <CWNotification key={index}>
          <Typography variant={"h4"} fontWeight={"500"}>
            <LocalOfferOutlinedIcon
              sx={{
                fontSize: "20px",
                position: "relative",
                marginRight: "5px",
                top: "5px",
              }}
            />
            {data.title}
          </Typography>
        </CWNotification>
      ))}
    </JumboCard>
  );
};

export default StaffVoucher;
