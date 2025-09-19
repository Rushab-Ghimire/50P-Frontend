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
import { JumboInput } from "@jumbo/vendors/react-hook-form";
import { Input, TextField } from "@mui/material";

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

export const HEAR_ABOUT = [
  {
    id: 1,
    title: "Google",
  },
  {
    id: 2,
    title: "Facebook",
  },
  {
    id: 3,
    title: "Instagram",
  },
  {
    id: 4,
    title: "TikTok",
  },
  {
    id: 5,
    title: "Youtube",
  },
  {
    id: 6,
    title: "WhatsApp or Messenger",
  },
  {
    id: 7,
    title: "From a Friend or Family Member",
  },
  {
    id: 8,
    title: "Doctor or Healthcare Provider",
  },
  {
    id: 9,
    title: "Community Center or Organization",
  },
  {
    id: 10,
    title: "Local Event or Health Fair",
  },
  {
    id: 11,
    title: "Blog or Article",
  },
  {
    id: 12,
    title: "News or Media",
  },
  {
    id: 13,
    title: "Other (Please Specify)",
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

export default function AdvFilterHearAboutSelector({
  labelTitle,
  setSelected,
  selected,
  is_multiple,
}) {
  const theme = useTheme();
  const [insurance, setInsurance] = React.useState(selected);
  const [other, setOther] = React.useState("");
  const [showOther, setShowOther] = React.useState(false);

  const handleChange = (event) => {
    var {
      target: { value },
    } = event;

    if (is_multiple) {
      value = [value[value.length - 1]];
    } else {
      value = [value];
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
    setSelected(value, other);

    if (value.includes(13)) {
      setShowOther(true);
    } else {
      setShowOther(false);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel sx={labelStyle}> {labelTitle} </InputLabel>
      <Select
        label={labelTitle}
        multiple={is_multiple}
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
                vx = HEAR_ABOUT.filter((o) => o.id == vx);
                vx = vx[0];
              }

              return <Chip key={"insurance-" + vx.id} label={vx.title} />;
            })}
          </Box>
        )}
        MenuProps={MenuProps}
        sx={selectStyle}
      >
        {HEAR_ABOUT.map((name) => (
          <MenuItem key={name.id} value={name}>
            {name.title}
          </MenuItem>
        ))}
      </Select>

      {showOther && (
        <TextField
          fullWidth
          variant="outlined"
          onChange={(e) => {
            setOther(e.target.value);
            setSelected(insurance, e.target.value);
          }}
          fieldName="other"
          placeholder="Other (Please Specify)"
          size="small"
          sx={{ marginTop: "10px" }}
        />
      )}
    </FormControl>
  );
}
