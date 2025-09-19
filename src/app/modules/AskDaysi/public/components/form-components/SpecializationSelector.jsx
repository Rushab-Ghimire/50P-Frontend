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
import { useQuery } from "react-query";
import { gqlQuery } from "@app/_utilities/http";
import { gql } from "graphql-request";
import { ListSubheader } from "@mui/material";
import { Colors } from "@app/modules/AskDaysi/theme/colors";

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
    title: "Allergist",
  },
  {
    id: 2,
    title: "Cardiologist",
  },
];

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.map((i) => i.id).includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const listTitleStyle = { color: Colors.black };

const labelStyle = {
  top: "-7px",
  "&.Mui-focused": {
    top: "0",
  },
};

export default function SpecializationSelector({
  field_name,
  setSelectedSpecialization,
  is_multiple,
  labelTitle,
  selected,
}) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState(selected);
  const [fetched, setFetched] = React.useState(false);
  const [dropDataState, setDropDataState] = React.useState([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "all_specializations",
      {
        gql: gql`
          query Q {
            allSpecializationsForDropdown {
              rows
              totalCount
            }
          }
        `,
      },
    ],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
  });

  if (data && !fetched) {
    let datax = JSON.parse(data.rows);
    console.log("allSpecializationsForDropdown", datax);
    setDropDataState((prev) => datax);
    setFetched(true);
  }

  const handleChange = (event) => {
    var {
      target: { valueX },
    } = event;
    let value = personName.concat(valueX);

    if (!is_multiple) {
      value = [value[value.length - 1]];
    }

    var found = false;
    var last = value[value.length - 1];
    var tmp = value.slice(0, -1);

    tmp.map((i) => {
      if (i.id == Number(last.id)) {
        found = true;
      }
    });
    if (found) {
      value = value.filter((i) => Number(i.id) !== Number(last.id));
    }

    setPersonName((p) =>
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setSelectedSpecialization(value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel sx={labelStyle}>{labelTitle}</InputLabel>
      <Select
        lable={labelTitle}
        multiple
        size="small"
        value={personName}
        //onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label={labelTitle} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((vx) => (
              <Chip key={vx.id} label={vx.title} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {dropDataState.map((cat) => (
          <div key={cat.name}>
            <ListSubheader sx={listTitleStyle}>{cat.category}</ListSubheader>
            {cat.specializations.map((name) => (
              <MenuItem
                key={name.id}
                onClick={(e) => {
                  e.target.valueX = name;
                  handleChange(e);
                }}
                style={getStyles(name.id, personName, theme)}
              >
                {name.title}
              </MenuItem>
            ))}
          </div>
        ))}
      </Select>
    </FormControl>
  );
}
