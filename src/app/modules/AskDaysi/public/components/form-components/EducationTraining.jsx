import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useArrayState } from "@app/_utilities/helpers";
import { Button, Stack } from "@mui/material";
import { JumboInput } from "@jumbo/vendors/react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.map((i) => i.id).includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function EducationTraining({
  name,
  setEducationTraining,
  selected,
}) {
  const theme = useTheme();
  const [item, setItem] = React.useState(selected);

  const addRow = React.useCallback(() => {
    setItem((prev) => [...prev, ""]);
  });

  const removeRow = React.useCallback((ind) => {
    var t = item.filter((v, i) => {
      if (i != ind) {
        return v;
      }
    });
    setItem((prev) => [...t]);
  });

  const updateText = React.useCallback((ind, val) => {});

  return (
    <Box>
      <Button
        variant="contained"
        onClick={addRow}
        size="small"
        endIcon={<AddOutlinedIcon />}
        sx={{ marginBottom: "25px" }}
      >
        Add
      </Button>
      {item !== undefined &&
        item.map((i, ind) => (
          <Box
            key={ind}
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "25px",
              [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "15px",
              },
            }}
          >
            <JumboInput
              key={"kx-" + ind}
              name={"abcd"}
              fullWidth
              size="small"
              defaultValue={i.title}
              onChange={() => updateText(ind, val)}
              fieldName={name + "[" + ind + "]"}
              label={"Education/Training"}
            />

            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() => removeRow(ind)}
              startIcon={<DeleteIcon />}
            >
              Remove
            </Button>
          </Box>
        ))}
    </Box>
  );
}
