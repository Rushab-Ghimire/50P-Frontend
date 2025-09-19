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
import { getUniqueObjectsArray } from "@app/_utilities/helpers";
import { TireRepair } from "@mui/icons-material";
import { useQuery } from "react-query";
import { gql } from "graphql-request";
import { gqlQuery } from "@app/_utilities/http";

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
    id: 0,
    name: "All",
  },
  {
    id: 1,
    name: "Medicare",
  },
  {
    id: 2,
    name: "Cigna",
  },
  {
    id: 3,
    name: "United Health",
  },
  {
    id: 4,
    name: "Blue Cross",
  },
  {
    id: 5,
    name: "Humana",
  },
  {
    id: 6,
    name: "Aetna",
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

export default function InsuranceSelector({
  field_name,
  setSelectedInsurances,
  is_multiple,
  labelTitle,
  selected,
  bgColor,
}) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState(selected);

  const [initialized, setInitialized] = React.useState(false);
  React.useEffect(() => {
    if (!initialized && selected.length == names.length - 1) {
      selected = names.filter((i) => {
        if (i.id === 0) {
          return true;
        }
      });
      setPersonName((p) => selected);
      setInitialized(true);
    }
  });

  const [fetched, setFetched] = React.useState(false);
  const [dropDataState, setDropDataState] = React.useState([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "all_specializations",
      {
        gql: gql`
          query Q {
            insuranceProvider(search: "", first: 100, skip: 0) {
              totalCount
              rows {
                id
                name
              }
            }
          }
        `,
      },
    ],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
  });

  if (data && !fetched) {
    //console.log("data", data);
    let datax = data.rows.map((item) => {
      return {
        id: item["id"],
        name: item["name"],
      };
    });
    setDropDataState((prev) => datax);
    setFetched(true);
  }

  const handleChange = (event) => {
    var {
      target: { value },
    } = event;
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
    //console.log("last", found, last, tmp, value);

    if (value[value.length - 1].id == 0) {
      value = value.filter((i) => {
        if (i.id == 0) return i;
      });
      value = [value[0]];
    } else {
      value = value.filter((i) => {
        if (i.id !== 0) return i;
      });
    }

    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    //setSelectedInsurances(value);

    setSelectedInsurances(
      value,
      names
        .filter((i) => {
          if (i.id !== 0) {
            return true;
          }
        })
        .map((i) => i.id)
    );
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
        renderValue={(selected) => {
          selected = getUniqueObjectsArray(selected, "id");
          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((vx) => (
                <Chip key={vx.id} label={vx.name} />
              ))}
            </Box>
          );
        }}
        MenuProps={MenuProps}
        sx={selectStyle}
        style={{ backgroundColor: bgColor }}
      >
        {dropDataState.map((name) => (
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
