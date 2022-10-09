import { Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useCurrentParser } from "./hooks/useCurrentParser";
import { useCurrentSample } from "./hooks/useCurrentSample";

export const ParserSamplesPanel = () => {
  const parser = useCurrentParser();
  const sample = useCurrentSample();
  const navigate = useNavigate();
  if (!parser) return null;

  return (
    <Stack
      sx={{ backgroundColor: (theme) => theme.palette.grey[200] }}
      p={2}
      flex={1}
      spacing={2}
      direction="row"
    >
      <Stack flex={1} pr={2} spacing={2} overflow="auto">
        {parser.samples.map((s, idx) => (
          <Paper
            key={idx}
            onClick={() => {
              navigate(`/parser/${parser.name}/samples/${idx}`);
            }}
            sx={{
              p: 2,
              cursor: "pointer",
              ":hover": {
                boxShadow: (theme) => theme.shadows[10],
                pt: 2,
                pb: 2,
              },
            }}
          >
            <Stack spacing={1} alignItems={"baseline"}>
              <Stack direction="row" spacing={2}>
                <Typography fontWeight={"bold"} fontSize="1.2rem">
                  #{idx}
                </Typography>
                <Typography>{s.headers.subject}</Typography>
              </Stack>
              <Typography fontSize="0.85rem">{s.headers.from}</Typography>
              <Typography fontSize="0.85rem">{s.headers.accountId}</Typography>
            </Stack>
          </Paper>
        ))}
      </Stack>
      <Stack flex={2}>
        {sample && <iframe style={{ height: "100%" }} srcDoc={sample.html} />}
      </Stack>
    </Stack>
  );
};
