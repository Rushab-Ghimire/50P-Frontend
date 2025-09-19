import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Stack, Typography } from "@mui/material";
import Loading from "./loading";

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
    title: "New York",
  },
  {
    id: 2,
    title: "Texas",
  },
  {
    id: 3,
    title: "California",
  },
  {
    id: 4,
    title: "Florida",
  },
  {
    id: 5,
    title: "Colorado",
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

export default function LocationSelector({
  labelTitle,
  setSelectedEthnicity,
  selected,
  is_multiple,
  marginBottom,
}) {
  const theme = useTheme();
  const [ethinicity, setEthinicity] = React.useState(
    selected === undefined ? [] : selected
  );

  const [loading, setLoading] = React.useState(false);

  const handleChange = (event) => {
    //show loading
    setLoading(true);

    //hidding after 2s
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    var {
      target: { value },
    } = event;

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

  //remove false PROD_BUILD_3
  return (
    <Box></Box>
    // <Box sx={{ marginBottom: marginBottom ? marginBottom : "0" }}>
    //   <Typography sx={{ fontSize: "16px", mb: 1, color: "#37373C" }}>
    //     Select Clinic Location
    //   </Typography>
    //   {/* <InputLabel >
    //   </InputLabel> */}
    //   <Box
    //     sx={{
    //       display: "flex",
    //       width: "100%",
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Stack sx={{ flex: 1 }}>
    //       <FormControl fullWidth>
    //         <InputLabel sx={labelStyle}> {labelTitle} </InputLabel>
    //         <Select
    //           label={labelTitle}
    //           multiple={is_multiple}
    //           size="small"
    //           value={ethinicity}
    //           onChange={handleChange}
    //           input={
    //             <OutlinedInput
    //               id="select-ethnicity-multiple-chip"
    //               label={labelTitle}
    //             />
    //           }
    //           renderValue={(ethinicity) => {
    //             var selectedI = ethinicity;
    //             // console.log(
    //             //   "ethinicity selected ==== ",
    //             //   typeof ethinicity,
    //             //   ethinicity
    //             // );
    //             if (typeof ethinicity == "number") {
    //               selectedI = names.filter((o) => o.id == ethinicity);
    //             } else if (typeof ethinicity == "object") {
    //               selectedI = ethinicity;
    //             }
    //             //console.log("selectedI ==== ", typeof selectedI, selectedI);
    //             return (
    //               <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
    //                 {selectedI.map((vx) => {
    //                   if (vx == -1 || vx == null || vx === undefined) return;
    //                   return (
    //                     <Chip key={"ethnicity-" + vx.id} label={vx.title} />
    //                   );
    //                 })}
    //               </Box>
    //             );
    //           }}
    //           MenuProps={MenuProps}
    //           sx={selectStyle}
    //         >
    //           {names.map((name) => (
    //             <MenuItem key={name.id} value={name}>
    //               {name.title}
    //             </MenuItem>
    //           ))}
    //         </Select>
    //       </FormControl>
    //     </Stack>
    //     {loading && (
    //       <Stack sx={{ ml: 2 }}>
    //         <Loading />
    //       </Stack>
    //     )}
    //   </Box>
    // </Box>
  );
}
