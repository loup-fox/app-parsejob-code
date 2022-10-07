import { Box, colors, Stack, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import * as Spaces from "react-spaces";
import { ParserList } from "../../components/ParserList";
import { TopBar } from "../../components/TopBar";
import { ParserDetailsPanel } from "./ParserDetailsPanel";
import { useCurrentParser } from "./hooks/useCurrentParser";

export const ParserPage = () => {
  const parser = useCurrentParser();
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Spaces.ViewPort style={{ display: "flex" }}>
      <Spaces.Top size={64}>
        <TopBar />
      </Spaces.Top>
      <Spaces.Fill style={{ display: "flex" }}>
        <Spaces.LeftResizable
          style={{
            display: "flex",
            flexDirection: "column",
            borderRight: `4px solid ${theme.palette.divider}`,
          }}
          size={400}
        >
          <ParserList
            currentParser={parser?.name}
            onSelect={(name) => {
              navigate(`/parser/${name}`);
            }}
          />
        </Spaces.LeftResizable>
        <Spaces.Fill style={{ display: "flex", overflow: "auto" }}>
          <ParserDetailsPanel />
        </Spaces.Fill>
      </Spaces.Fill>
      <Spaces.Bottom size={34} style={{ display: "flex" }}>
        <Stack
          sx={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            flex: 1,
            backgroundColor: colors.grey[200],
          }}
          pl={2}
          pr={2}
          spacing={2}
        >
          {parser?.name}
        </Stack>
      </Spaces.Bottom>
    </Spaces.ViewPort>
  );
};
