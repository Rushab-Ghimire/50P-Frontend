import { CalendarWrapper } from "@app/_components/calendars/components/CalendarWrapper";
import { SelectableCalendar } from "@app/_components/calendars/components/SelectableCalendar";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { JumboCard } from "@jumbo/components/JumboCard";
import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PopupCalendar } from "@app/_components/calendars/components/PopupCalendar";

const calendar = () => {
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
      <Typography variant={"h1"}>Calendar</Typography>
      <JumboCard contentWrapper>
        <CalendarWrapper>
          <PopupCalendar />
        </CalendarWrapper>
      </JumboCard>
    </Container>
  );
}

export default calendar
