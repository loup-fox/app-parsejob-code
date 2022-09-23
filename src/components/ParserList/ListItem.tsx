import { Box, Chip, colors } from "@mui/material";
import { Stack } from "@mui/system";
import { ParserSummary } from "../../api/types/ParserSummary";
import { PriorityIcon } from "../PriorityIcon";
import { StatusChip } from "../StatusChip";

export const ListItem = ({
  isSelected,
  parser,
  onSelect: onClick,
}: {
  isSelected: boolean;
  parser: ParserSummary;
  onSelect: (parserName: string) => void;
}) => {
  return (
    <Box
      sx={{
        p: 1,
        borderBottom: ({ palette }) => `1px solid ${palette.divider}`,
        cursor: "pointer",
        ":hover": { backgroundColor: colors.blueGrey[50] },
        backgroundColor: isSelected ? colors.blueGrey[100] : undefined,
      }}
      onClick={() => onClick(parser.name)}
    >
      <Stack direction={"row"}>
        <PriorityIcon priority={parser.priority ?? "trivial"} />
        <Box sx={{ flex: 1, ml: 1 }}>{parser.name}</Box>
        <StatusChip status={parser.status} />
      </Stack>
    </Box>
  );
};
