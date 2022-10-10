import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { api, getFetchingStatus } from "../../api";
import { useToken } from "../../auth/tokenAtom";
import { useCurrentParser } from "./hooks/useCurrentParser";
import { useCurrentSample } from "./hooks/useCurrentSample";
import { ParserPanelHeader } from "./ParserPanelHeader";
import { ParserSampleCard } from "./ParserSampleCard";

const MailsFetchingWindow = () => {};

// navigate(`/parser/${parser.name}/samples/${idx}`);
export const ParserSamplesPanel = () => {
  const parser = useCurrentParser();
  const sample = useCurrentSample();
  const navigate = useNavigate();

  if (!parser) return null;

  return (
    <Stack flex={1}>
      <ParserPanelHeader parser={parser} panel={"samples"} />
      <Stack
        sx={{ backgroundColor: (theme) => theme.palette.grey[200] }}
        p={2}
        flex={1}
        spacing={2}
        direction="row"
        overflow={"auto"}
      >
        <Stack flex={1} spacing={2}>
          <Stack pr={2} spacing={2} overflow={"auto"}>
            {parser.samples.map((s, idx) => (
              <ParserSampleCard
                key={idx}
                index={idx}
                onClick={() => {
                  navigate(`/parser/${parser.name}/samples/${idx}`);
                }}
                sample={s}
              />
            ))}
          </Stack>
        </Stack>
        <Stack flex={2} overflow="auto">
          {sample && <iframe style={{ height: "100%" }} srcDoc={sample.html} />}
        </Stack>
      </Stack>
    </Stack>
  );
};
