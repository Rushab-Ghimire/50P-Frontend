import { Stack, Chip } from "@mui/material";
import { getArrayElementFromKey } from "@jumbo/utilities/systemHelpers";

const TextIndicator = ({ label }) => {
  return (
    <Stack direction={"row"} sx={{ marginBottom: "5px" }}>
      {label}
    </Stack>
  );
};

export { TextIndicator };
