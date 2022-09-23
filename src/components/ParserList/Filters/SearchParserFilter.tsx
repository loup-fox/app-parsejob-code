import { TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useSetAtom } from "jotai";
import _ from "lodash";
import { filtersAtom } from "../state";

export const SearchParserFilter = () => {
  const setFilters = useSetAtom(filtersAtom);
  const handleChange = _.debounce(function (
    ev: React.ChangeEvent<HTMLInputElement>
  ) {
    setFilters((prev) => {
      return {
        ...prev,
        name: (x) => {
          return x.name.includes(ev.target.value);
        },
      };
    });
  });

  return (
    <TextField
      label="Search parser..."
      variant="outlined"
      onChange={handleChange}
      type="email"
      InputProps={{
        endAdornment: <Search />,
      }}
      fullWidth
      sx={{ mb: 2 }}
    />
  );
};
