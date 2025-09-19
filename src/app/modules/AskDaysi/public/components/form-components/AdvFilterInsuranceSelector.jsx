import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { assertNonNullType } from "graphql";

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
    title: "Medicare",
  },
  {
    id: 2,
    title: "Cigna",
  },
  {
    id: 3,
    title: "United Health",
  },
  {
    id: 4,
    title: "Blue Cross",
  },
  {
    id: 5,
    title: "Humana",
  },
  {
    id: 6,
    title: "Aetna",
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

export default function AdvFilterInsuranceSelector({
  labelTitle,
  setSelectedInsurance,
  selected,
  is_multiple,
}) {
  const theme = useTheme();
  const [insurance, setInsurance] = React.useState(selected);

  const handleChange = (event) => {
    var {
      target: { value },
    } = event;
    if (!is_multiple) {
      value = [value[value.length - 1]];
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
    setInsurance(value);

    //console.log("value", value, insurance);
    setSelectedInsurance(value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel sx={labelStyle}> {labelTitle} </InputLabel>
      <Select
        label={labelTitle}
        multiple
        size="small"
        value={insurance}
        onChange={handleChange}
        input={
          <OutlinedInput
            id="select-insurance-multiple-chip"
            label={labelTitle}
          />
        }
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((vx) => {
              if (vx == -1 || vx == null) return;
              if (typeof vx == "number") {
                vx = names.filter((o) => o.id == vx);
                vx = vx[0];
              }

              return <Chip key={"insurance-" + vx.id} label={vx.title} />;
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
