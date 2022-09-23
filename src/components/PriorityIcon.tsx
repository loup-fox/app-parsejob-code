import {
  KeyboardDoubleArrowUp,
  KeyboardArrowUp,
  KeyboardArrowDown,
  KeyboardDoubleArrowDown,
} from "@mui/icons-material";
import { ParserPriority } from "../api/types/ParserPriority";
import { priorityColors } from "../common/colors";

export const PriorityIcon = (props: { priority: ParserPriority }) => {
  switch (props.priority) {
    case "critical":
      return <KeyboardDoubleArrowUp sx={{ color: priorityColors.critical }} />;
    case "major":
      return <KeyboardArrowUp sx={{ color: priorityColors.major }} />;
    case "minor":
      return <KeyboardArrowDown sx={{ color: priorityColors.minor }} />;
    default:
      return <KeyboardDoubleArrowDown sx={{ color: priorityColors.trivial }} />;
  }
};
