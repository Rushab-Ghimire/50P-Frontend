import { Card, CardContent, Container, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { PortfolioBalance } from "@app/_components/widgets/PortfolioBalance";
import { EarningExpenses } from "@app/_components/widgets/EarningExpenses";
import { NewsLetterSubscription } from "@app/_components/widgets/NewsLetterSubscription";
import { YourCurrentPlan } from "@app/_components/widgets/YourCurrentPlan";
import { TaskListExpandable } from "@app/_components/widgets/TaskListExpandable";
import { NewConnections } from "@app/_components/widgets/NewConnections";
import { BusinessTile } from "./Business/Tile";
import { LastMonthSales } from "@app/_components/widgets/LastMonthSales";
import { OnlineSignupsFilled } from "@app/_components/widgets/OnlineSignupsFilled";
import { NewVisitorsThisMonth } from "@app/_components/widgets/NewVisitorsThisMonth";
import { TotalRevenueThisYear } from "@app/_components/widgets/TotalRevenueThisYear";
import { UpgradePlan } from "@app/_components/widgets/UpgradePlan";
import { SalesReport1 } from "@app/_components/widgets/SalesReport1";
import { AppUsers } from "@app/_components/widgets/AppUsers";
import { SalesOverview } from "@app/_components/widgets/SalesOverview";
import { FeaturedCard1 } from "@app/_components/cards";
import { Orders } from "@app/_components/widgets/Orders";
import { UserSummary } from "@app/_components/widgets/UserSummary";
import { EmojiObjectsOutlined, FolderOpen } from "@mui/icons-material";
import { CalendarWrapper } from "@app/_components/calendars/components/CalendarWrapper";
import { PopupCalendar } from "@app/_components/calendars/components/PopupCalendar";

const DashboardWidgets = () => {
  const { t } = useTranslation();
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: CONTAINER_MAX_WIDTH,
        display: "flex",
        minWidth: 0,
        flex: 1,
        flexDirection: "column",
      }}
      disableGutters
    >
      <Grid container spacing={4}>
        <Grid item xs={12} lg={12}>
          <CalendarWrapper>
            <PopupCalendar />
          </CalendarWrapper>
        </Grid>
      </Grid>
      {/* <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <SalesOverview title={t("widgets.title.salesOverview")} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3.75}>
            <Grid item xs={12} sm={6} lg={12}>
              <Orders title={t("widgets.title.orders")} />
            </Grid>
            <Grid item xs={12} sm={6} lg={12}>
              <FeaturedCard1
                title={"23"}
                subheader="Leads"
                icon={<EmojiObjectsOutlined sx={{ fontSize: 42 }} />}
                bgcolor={["135deg", "#FBC79A", "#D73E68"]}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <LastMonthSales subheader={t("widgets.subheader.latestMonthSales")} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <OnlineSignupsFilled
            subheader={t("widgets.subheader.onlineSignups")}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <NewVisitorsThisMonth
            subheader={t("widgets.subheader.newVisitors")}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TotalRevenueThisYear
            subheader={t("widgets.subheader.totalRevenueYear")}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <UpgradePlan />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <SalesReport1 title={t("widgets.title.salesReport1")} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <AppUsers
            title={t("widgets.title.appUsers")}
            subheader={t("widgets.subheader.appUsers")}
          />
        </Grid>
      </Grid> */}
    </Container>
  );
};

export default DashboardWidgets;
