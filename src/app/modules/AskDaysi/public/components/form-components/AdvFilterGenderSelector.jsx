import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

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

const names = [
  {
    id: 1,
    title: "Male",
  },
  {
    id: 2,
    title: "Female",
  },
  {
    id: 3,
    title: "LGBTQ Friendly",
  },
];

const labelStyle = {
  top: "-7px",
  "&.Mui-focused": {
    top: "0",
  },
  "&.MuiFormLabel-filled": {
    top: "0",
  },
};

const selectStyle = {
  "& .MuiChip-filled": {
    height: "auto",
  },
};

export default function AdvFilterGenderSelector({
  labelTitle,
  setSelectedGender,
  selected,
  is_multiple,
}) {
  const theme = useTheme();
  const [gender, setGender] = React.useState(selected);

  const handleChange = (event) => {
    var {
      target: { value },
    } = event;
    if (!is_multiple) {
      value = [value[value.length - 1]];
    }
    setGender(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setSelectedGender(value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel sx={labelStyle}> {labelTitle} </InputLabel>
      <Select
        label={labelTitle}
        multiple
        size="small"
        value={gender}
        onChange={handleChange}
        input={
          <OutlinedInput id="select-gender-multiple-chip" label={labelTitle} />
        }
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((vx) => {
              return <Chip key={"gender-drp-" + vx.id} label={vx.title} />;
            })}
          </Box>
        )}
        MenuProps={MenuProps}
        sx={selectStyle}
      >
        {names.map((name) => (
          <MenuItem key={name.id} value={name}>
            {name.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
