import { Autocomplete, TextField } from "@mui/material";
import { useSetAtom } from "jotai";
import _ from "lodash";
import { filtersAtom } from "../state";

export const LastRejectedByFilter = ({ options }: { options: string[] }) => {
  const setFilters = useSetAtom(filtersAtom);
  const handleChange = _.debounce(function (value) {
    setFilters((prev) => {
      return {
        ...prev,
        lastRejectedBy: (parser) => {
          return parser.lastRejectedBy?.email.includes(value) ?? false;
        },
      };
    });
  });

  return (
    <Autocomplete
      options={options}
      freeSolo
      onInputChange={(ev, value) => handleChange(value ?? "")}
      fullWidth
      size="small"
      renderInput={(params) => (
        <TextField {...params} label={"Last Rejected By"} />
      )}
    ></Autocomplete>
  );
};
