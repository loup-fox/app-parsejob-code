import { Autocomplete, TextField } from "@mui/material";
import { useSetAtom } from "jotai";
import _ from "lodash";
import { filtersAtom } from "../state";

export const LastCodedByFilter = ({ options }: { options: string[] }) => {
  const setFilters = useSetAtom(filtersAtom);
  const handleChange = _.debounce(function (value: string) {
    setFilters((prev) => {
      return {
        ...prev,
        lastCodedBy: (parser) => {
          return parser.lastCodedBy?.includes(value) ?? false;
        },
      };
    });
  });
  return (
    <Autocomplete
      freeSolo
      options={options}
      onInputChange={(_, value) => handleChange(value)}
      renderInput={(params) => <TextField {...params} label="Last Coded By" />}
      fullWidth
      size="small"
    ></Autocomplete>
  );
};
