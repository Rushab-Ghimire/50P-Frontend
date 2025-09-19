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
};

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.map((i) => i.id).includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function GenderSelector({
  name,
  setSelectedGenders,
  labelTitle,
  selected,
  isMultiple = true,
}) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState(selected);

  //   const { data, isLoading, isError, error } = useQuery({
  //       queryKey: [
  //         "entity_type",
  //         {
  //           gql: gql`
  //             query Q {
  //               salonCategoryByEntityType(entityTypeId : ${entity_type_id}) {
  //                 id
  //                 title
  //               }
  //             }
  //           `,
  //         },
  //       ],
  //       queryFn: ({ signal, queryKey }) =>
  //         gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
  //     });

  //     if (data && !fetched) {
  //       let datax = data.map((item) => {
  //         return {
  //           value: item["id"],
  //           label: item["title"],
  //         };
  //       });
  //       setDropData((prev) => datax);
  //       setVal((prev) => selected);
  //       setFetched(true);
  //     }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    if (isMultiple) {
      setPersonName(typeof value === "string" ? value.split(",") : value);
      setSelectedGenders(value);
    } else {
      setPersonName([value[value.length - 1]]);
      setSelectedGenders([value[value.length - 1]]);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel sx={labelStyle}> {labelTitle} </InputLabel>
      <Select
        multiple
        size="small"
        value={personName}
        onChange={handleChange}
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
        {names.map((name) => (
          <MenuItem
            key={name.id}
            value={name}
            style={getStyles(name.id, personName, theme)}
          >
            {name.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
