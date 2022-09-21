import Editor from "@monaco-editor/react";
import {
  Box,
  Chip,
  colors,
  Divider,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";
import { api } from "../api";
import * as Spaces from "react-spaces";
import { Stack } from "@mui/system";
import { Virtuoso } from "react-virtuoso";
import { ParserSummary } from "../api/types/ParserSummary";
import { atom, useAtom } from "jotai";
import { ListAlt as ParsersIcon } from "@mui/icons-material";
import { FactCheck as SamplesIcon } from "@mui/icons-material";

export const selectedParserNameAtom = atom<string | null>(null);
export const selectedParserAtom = atom<ParserSummary | null>(null);

export const ParserListPanel = () => {
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
          return <ParserSummaryView parser={parserList[index]} />;
        }}
      />
    </Box>
  );
};

export const ParserSummaryView = ({ parser }: { parser: ParserSummary }) => {
  const [selectedParserName, setSelectedParserName] = useAtom(
    selectedParserNameAtom
  );
  return (
    <Box
      sx={{
        p: 1,
        borderBottom: ({ palette }) => `1px solid ${palette.divider}`,
        cursor: "pointer",
        ":hover": { backgroundColor: colors.blueGrey[50] },
        backgroundColor:
          selectedParserName === parser.name ? colors.blueGrey[100] : undefined,
      }}
      onClick={() => setSelectedParserName(parser.name)}
    >
      <Stack direction={"row"}>
        <Box sx={{ flex: 1 }}>{parser.name}</Box>
        <Box>
          <Chip size="small" label={parser.status} />
        </Box>
      </Stack>
    </Box>
  );
};

export type CodingMode = "code" | "anonymization" | "postScript";

export const CodingPage = () => {
  const [parserName] = useAtom(selectedParserNameAtom);
  const [currentPanel, setCurrentPanel] = useState<"parsers" | "samples">(
    "parsers"
  );
  const [currentMode, setCurrentMode] = useState<CodingMode>("code");
  const { data: parser } = api.useGetParser(parserName);

  const [code, setCode] = useState<string>(parser?.sourceCode ?? "");
  const getCode = () => {
    switch (currentMode) {
      case "code":
        return parser?.sourceCode ?? "";
      case "anonymization":
        return parser?.sourceCodeAnonymization ?? "";
      case "postScript":
        return parser?.sourceCodePostParser ?? "";
    }
  };
  useEffect(() => {
    setCode(getCode());
  }, [currentMode, parser]);

  return (
    <Spaces.ViewPort style={{ display: "flex" }}>
      <Spaces.LeftResizable
        minimumSize={400}
        style={{ display: "flex" }}
        size={"33%"}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRight: ({ palette }) => `1px solid ${palette.divider}`,
          }}
        >
          <Box sx={{ p: 1 }}>
            <IconButton size="large">
              <ParsersIcon fontSize="large" />
            </IconButton>
          </Box>
          <Divider />
          <Box onClick={() => {}} sx={{ p: 1 }}>
            <IconButton size="large">
              <SamplesIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
        {currentPanel === "parsers" && <ParserListPanel />}
      </Spaces.LeftResizable>
      <Spaces.Fill style={{ display: "flex" }}>
        <Spaces.Top size={60}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">{parser?.name}</Typography>
            <Box sx={{ flex: 1 }} />
            <Select
              sx={{ m: 1 }}
              onChange={(ev) => setCurrentMode(ev.target.value as CodingMode)}
              size="small"
              value={currentMode}
            >
              <MenuItem value="code">Code</MenuItem>
              <MenuItem value="postScript">Post Script</MenuItem>
              <MenuItem value="anonymization">Anonymization</MenuItem>
            </Select>
          </Box>
        </Spaces.Top>
        <Spaces.Fill>
          <Editor
            theme="vs-dark"
            language="javascript"
            value={code}
            onChange={(value) => {
              setCode(value ?? "");
            }}
          />
        </Spaces.Fill>
      </Spaces.Fill>
    </Spaces.ViewPort>
  );
};
