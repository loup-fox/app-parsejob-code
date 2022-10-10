import { Paper, Stack, Typography } from "@mui/material";
import { Sample } from "../../api/types/Parser/Sample";

export const ParserSampleCard = ({
  sample,
  onClick,
  index,
}: {
  sample: Sample;
  onClick: () => void;
  index: number;
}) => {
  return (
    <Paper
      onClick={onClick}
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
            #{index}
          </Typography>
          <Typography>{sample.headers.subject}</Typography>
        </Stack>
        <Typography fontSize="0.85rem">{sample.headers.from}</Typography>
        <Typography fontSize="0.85rem">{sample.headers.accountId}</Typography>
      </Stack>
    </Paper>
  );
};
