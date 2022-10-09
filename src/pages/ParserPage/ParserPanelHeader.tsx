import { Box, Divider, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Parser } from "../../api/types/Parser";
import { StatusChip } from "../../components/StatusChip";

export const ParserPanelHeader = ({
  parser,
  panel,
}: {
  parser: Parser;
  panel: string;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Stack m={2} mb={0} spacing={1} direction="row" alignItems={"baseline"}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {parser.name}
        </Typography>
        <Typography>v({parser.version})</Typography>
        <Box sx={{ alignSelf: "center" }}>
          <StatusChip status={parser.status} />
        </Box>
      </Stack>
      <Stack>
        <Tabs
          value={panel}
          onChange={(ev, v) => {
            navigate(`/parser/${parser.name}/${v}`);
          }}
        >
          <Tab label="Details" value={"details"}></Tab>
          <Tab label="Samples" value={"samples"}></Tab>
        </Tabs>
        <Divider />
      </Stack>
    </>
  );
};
