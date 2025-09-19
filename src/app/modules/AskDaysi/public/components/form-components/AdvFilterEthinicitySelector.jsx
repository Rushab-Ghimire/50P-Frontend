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
    title: "Black or African American",
  },
  {
    id: 2,
    title: "Hispanic or Latino",
  },
  {
    id: 3,
    title: "Indian",
  },
  {
    id: 4,
    title: "Chinese",
  },
  {
    id: 5,
    title: "English",
  },
  {
    id: 6,
    title: "French",
  },
  {
    id: 7,
    title: "Asian",
  },
  {
    id: 8,
    title: "Middle Eastern or North American",
  },
  {
    id: 9,
    title: "Pacific Islander",
  },
  {
    id: 10,
    title: "White",
  },
  {
    id: 11,
    title: "Multiracial",
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

export default function AdvFilterEthinicitySelector({
  labelTitle,
  setSelectedEthnicity,
  selected,
  is_multiple,
}) {
  const theme = useTheme();
  const [ethinicity, setEthinicity] = React.useState(
    selected === undefined ? [] : selected
  );

  const handleChange = (event) => {
    var {
      target: { value },
    } = event;

    console.log("value", value);

    if (is_multiple) {
      value = [value[value.length - 1]];
    } else {
      value = [value];
      setEthinicity(value);
      setSelectedEthnicity([value[0].id]);
      return;
    }

    value = value.map((i) => {
      if (typeof i == "number") {
        return i;
      } else {
        return i.id;
      }
    });
    value = value.filter(
      (value, index, array) => array.indexOf(value) === index
    );
    setEthinicity(value);
    setSelectedEthnicity(value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel sx={labelStyle}> {labelTitle} </InputLabel>
      <Select
        label={labelTitle}
        multiple={is_multiple}
        size="small"
        value={ethinicity}
        onChange={handleChange}
        input={
          <OutlinedInput
            id="select-ethnicity-multiple-chip"
            label={labelTitle}
          />
        }
        renderValue={(ethinicity) => {
          var selectedI = ethinicity;
          console.log(
            "ethinicity selected ==== ",
            typeof ethinicity,
            ethinicity
          );
          if (typeof ethinicity == "number") {
            selectedI = names.filter((o) => o.id == ethinicity);
          } else if (typeof ethinicity == "object") {
            selectedI = ethinicity;
          }
          console.log("selectedI ==== ", typeof selectedI, selectedI);
          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selectedI.map((vx) => {
                if (vx == -1 || vx == null || vx === undefined) return;
                return <Chip key={"ethnicity-" + vx.id} label={vx.title} />;
              })}
            </Box>
          );
        }}
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
