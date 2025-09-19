import React, { useState } from "react";
import {
  Select,
  MenuItem,
  ListSubheader,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Colors } from "@app/modules/AskDaysi/theme/colors";

const labelStyle = {
  top: "-7px",
  "&.Mui-focused": {
    top: "0",
  },
  "&.MuiFormLabel-filled": {
    top: "0",
  },
};

const listTitleStyle = { color: Colors.black };

function SelectGroup({ setSelectedSpeciality }) {
  const [selectedValue, setSelectedValue] = useState([]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setSelectedSpeciality(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel sx={labelStyle}>Speciality</InputLabel>
      <Select
        multiple
        value={selectedValue}
        onChange={handleChange}
        label="Speciality"
        size="small"
      >
        {/* Group 1 */}
        <ListSubheader sx={listTitleStyle}>General</ListSubheader>
        <MenuItem value="1">Allergist</MenuItem>
        <MenuItem value="2">Cardiologist</MenuItem>
        <MenuItem value="-1">Counseling</MenuItem>

        {/* Group 2 */}
        <ListSubheader sx={listTitleStyle}>Surgical</ListSubheader>
        <MenuItem value="-2">General Surgery</MenuItem>
        <MenuItem value="-3">Orthopedics</MenuItem>
        <MenuItem value="-4">Cardiothoracic</MenuItem>

        {/* Group 3 */}
        <ListSubheader sx={listTitleStyle}>Primary Care</ListSubheader>
        <MenuItem value="-5">Testing and Monitoring</MenuItem>
        <MenuItem value="-6">Compression Therapy</MenuItem>
        <MenuItem value="-7">Compression Therapy</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectGroup;
