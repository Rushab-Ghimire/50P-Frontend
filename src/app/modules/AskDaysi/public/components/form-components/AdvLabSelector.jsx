import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { JumboSelect } from "@jumbo/vendors/react-hook-form";

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
    name: "Quest Diagnostics",
  },
  {
    id: 2,
    name: "Northwell Health",
  },
  {
    id: 3,
    name: "Start",
  },
  {
    id: 4,
    name: "American Hospital Association",
  },
  {
    id: 5,
    name: "Florida Hospital",
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

function getStyles(name, personName, theme) {
  // return {
  //   fontWeight: personName.map((i) => i.id).includes(name)
  //     ? theme.typography.fontWeightMedium
  //     : theme.typography.fontWeightRegular,
  // };
}

export default function AdvLabSelector({
  field_name,
  setSelectedLab,
  is_multiple,
  labelTitle,
  selected,
  bgColor,
}) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState(selected);

  const handleChange = (event) => {
    var {
      target: { value },
    } = event;
    if (!is_multiple) {
      value = [value[value.length - 1]];
    }
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setSelectedLab(value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel sx={labelStyle}>{labelTitle}</InputLabel>
      <Select
        label={labelTitle}
        multiple
        size="small"
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label={labelTitle} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((vx) => (
              <Chip key={vx.id} label={vx.name} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
        sx={selectStyle}
        style={{ backgroundColor: bgColor }}
      >
        {names.map((name) => (
          <MenuItem
            key={name.id}
            value={name}
            style={getStyles(name.id, personName, theme)}
          >
            {name.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
