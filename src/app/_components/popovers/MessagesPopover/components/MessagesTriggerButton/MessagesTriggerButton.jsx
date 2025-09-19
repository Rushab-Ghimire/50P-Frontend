import { JumboIconButton } from "@jumbo/components/JumboIconButton";
import { useJumboHeaderTheme } from "@jumbo/components/JumboTheme/hooks";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { ThemeProvider, Badge } from "@mui/material";

const MessagesTriggerButton = ({ count }) => {
  const { headerTheme } = useJumboHeaderTheme();
  return (
    <ThemeProvider theme={headerTheme}>
      <JumboIconButton elevation={1}>
        <Badge
          badgeContent={`${count}`}
          color="primary"
          invisible={count <= 0 ? true : false}
        >
          <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: "1.5rem" }} />
        </Badge>
      </JumboIconButton>
    </ThemeProvider>
  );
};

export { MessagesTriggerButton };
