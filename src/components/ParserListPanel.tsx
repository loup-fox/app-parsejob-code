import { Box, TextField } from "@mui/material";
import _ from "lodash";
import { useState } from "react";
import { api } from "../api";
import { Virtuoso } from "react-virtuoso";
import { ParserListPanelEntry } from "./ParserListPanelEntry";

export const ParserListPanel = ({
  currentParser,
  onSelect,
}: {
  currentParser: string | null;
  onSelect: (parserName: string) => void;
}) => {
  const { data: parsers } = api.useGetAllParsersQuery();
  const [search, setSearchText] = useState("");

  const parserList = _(parsers)
    .values()
    .orderBy("name", "asc")
    .filter(({ name }) => {
      return name.toLowerCase().includes(search.toLowerCase());
    })
    .value();
  return (
    <Box
      sx={{
        flex: 1,
        borderRight: ({ palette }) => `4px solid ${palette.divider}`,
      }}
      display="flex"
      flexDirection="column"
    >
      <TextField
        sx={{ m: 1 }}
        size="small"
        label="Search"
        onChange={(ev) => setSearchText(ev.target.value)}
      />
      <Virtuoso
        style={{ flex: 1, display: "flex" }}
        totalCount={parserList.length}
        itemContent={(index) => {
          return (
            <ParserListPanelEntry
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
