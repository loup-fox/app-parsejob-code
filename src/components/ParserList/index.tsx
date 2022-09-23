import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { useState } from "react";
import { api } from "../../api";
import { Virtuoso } from "react-virtuoso";
import { ListItem } from "./ListItem";
import { useAtomValue } from "jotai";
import { filtersAtom } from "./state";
import { LastRejectedByFilter } from "./Filters/LastRejectedByFilter";
import { SearchParserFilter } from "./Filters/SearchParserFilter";
import { StatusFilter } from "./Filters/StatusFilter";
import { Stack } from "@mui/system";
import ExpandIcon from "@mui/icons-material/ExpandMore";
import { LastCodedByFilter } from "./Filters/LastCodedByFilter";

export const ParserList = ({
  currentParser,
  onSelect,
}: {
  currentParser?: string;
  onSelect: (parserName: string) => void;
}) => {
  const { data: parsers } = api.useGetAllParsersQuery();
  const filters = useAtomValue(filtersAtom);
  let parserList = _(parsers).values().sortBy("name").value();
  for (const key of Object.keys(filters)) {
    parserList = parserList.filter(filters[key]);
  }
  const lastCodedByOptions = _(parserList)
    .groupBy("lastCodedBy")
    .keys()
    .value();
  const lastRejectedByOptions = _(parserList)
    .groupBy("lastRejectedBy.email")
    .keys()
    .value();

  return (
    <Box sx={{ flex: 1 }} display="flex" flexDirection="column">
      <Stack sx={{ m: 1 }}>
        <SearchParserFilter />
        <Accordion
          disableGutters
          elevation={0}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary expandIcon={<ExpandIcon />}>
            <Typography>Filters</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={1}>
              <StatusFilter />
              <LastCodedByFilter options={lastCodedByOptions} />
              <LastRejectedByFilter options={lastRejectedByOptions} />
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Stack>
      <Virtuoso
        style={{ flex: 1, display: "flex" }}
        totalCount={parserList.length}
        itemContent={(index) => {
          return (
            <ListItem
              isSelected={parserList[index].name === currentParser}
              onSelect={onSelect}
              parser={parserList[index]}
            />
          );
        }}
      />
    </Box>
  );
};
