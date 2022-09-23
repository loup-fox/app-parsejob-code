import {
  Box,
  Select,
  MenuItem,
  Chip,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useSetAtom } from "jotai";
import _ from "lodash";
import { useEffect, useState } from "react";
import { PARSER_STATUSES } from "../../../api/types/ParserStatus";
import { filtersAtom } from "../state";

export const StatusFilter = () => {
  const setFilters = useSetAtom(filtersAtom);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  useEffect(() => {
    setFilters((prev) => {
      return {
        ...prev,
        status: (parser) => {
          if (selectedStatus.length === 0) {
            return true;
          }
          return selectedStatus.includes(parser.status);
        },
      };
    });
  }, [selectedStatus]);
  return (
    <FormControl size="small">
      <InputLabel>Status</InputLabel>
      <Select
        multiple
        label="Status"
        size="small"
        fullWidth
        value={selectedStatus}
        onChange={(ev) => {
          setSelectedStatus(ev.target.value as string[]);
        }}
        renderValue={(selected) => {
          const list = _.chain(selected)
            .sort()
            .map((value) => <Chip size="small" key={value} label={value} />)
            .value();
          return <Box className="flex flex-wrap gap-2">{list}</Box>;
        }}
      >
        {PARSER_STATUSES.map((status) => {
          return (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
