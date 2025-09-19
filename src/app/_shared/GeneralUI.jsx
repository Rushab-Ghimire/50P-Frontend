import { Span } from "@jumbo/shared";
import { styled } from "@mui/material";

export function LoadingIndicator() {
  return <div className="loader"></div>;
}

export const TFItem = styled(Span)(({ theme }) => ({
  padding: theme.spacing(0, 1),
}));
