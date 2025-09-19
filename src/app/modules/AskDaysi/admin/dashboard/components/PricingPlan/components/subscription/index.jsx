import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Overview from "./overview";
import { JumboCard } from "@jumbo/components";
import PaymentMethods from "./PaymentMethods";
import PaymentDetails from "./PaymentDetails";
import { Colors } from "@app/modules/AskDaysi/theme/colors";

const Subscription = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <JumboCard contentWrapper>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Overview" value="1" sx={{ color: Colors.gray_1 }} />
                <Tab label="Payment" value="2" sx={{ color: Colors.gray_1 }} />
                <Tab label="History" value="3" sx={{ color: Colors.gray_1 }} />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ pl: 0, pr: 0 }}>
              <Overview />
            </TabPanel>
            <TabPanel value="2" sx={{ pl: 0, pr: 0 }}>
              <PaymentMethods />
            </TabPanel>
            <TabPanel value="3" sx={{ pl: 0, pr: 0 }}>
              <PaymentDetails />
            </TabPanel>
          </TabContext>
        </Box>
      </JumboCard>
    </>
  );
};

export default Subscription;
