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
    id: 2,
    title: "English",
  },
  {
    id: 3,
    title: "Italian",
  },
  {
    id: 4,
    title: "Chinese",
  },
  {
    id: 5,
    title: "French",
  },
  {
    id: 6,
    title: "Hindi",
  },
  {
    id: 7,
    title: "Spanish",
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

export default function AdvFilterLanguageSelector({
  labelTitle,
  setSelectedLanguage,
  selected,
  is_multiple,
}) {
  const theme = useTheme();
  const [lang, setLang] = React.useState(selected);
  const [refresh, setRefresh] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setRefresh(refresh + 1);
    }, 100);
  }, []);

  const handleChange = (event) => {
    var {
      target: { value },
    } = event;

    if (!is_multiple) {
      value = [value];
      setLang(value);
    } else {
      setLang(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    }

    //console.log("value", value);
    setSelectedLanguage(value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel sx={labelStyle}> {labelTitle} </InputLabel>
      <Select
        label={labelTitle}
        multiple={is_multiple}
        size="small"
        onChange={handleChange}
        value={lang}
        input={
          <OutlinedInput
            id="select-language-multiple-chip"
            label={labelTitle}
          />
        }
        renderValue={(lang) => {
          var selectedI = lang;
          //console.log("lang selected ==== ", typeof lang, lang);
          if (typeof lang == "number") {
            selectedI = names.filter((o) => o.id == lang);
          } else if (typeof lang == "object") {
            selectedI = lang;
          }
          //console.log("selectedI ==== ", typeof selectedI, selectedI);
          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selectedI.map((vx) => {
                if (vx === undefined) return;
                return <Chip key={"language-" + vx.id} label={vx.title} />;
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
