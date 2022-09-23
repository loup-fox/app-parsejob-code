import { SxProps } from "@mui/material";
import ExpandIcon from "@mui/icons-material/ExpandMore";
import _ from "lodash";
import { statusSx } from "../common/colors";
import { CustomChip } from "./CustomChip";
import { ParserStatus } from "../api/types/ParserStatus";

export const StatusChip = (props: {
  status: ParserStatus;
  onClick?: () => void;
}) => {
  const chipStyle = statusSx[props.status];
  return (
    <CustomChip
      sx={{ ...chipStyle }}
      label={props.status}
      onClick={props.onClick}
      endAdornment={props.onClick ? <ExpandIcon fontSize="small" /> : undefined}
    />
  );
};

export type CustomChipProps = {
  label: string;
  endAdornment?: React.ReactNode;
  onClick?: () => void;
  sx?: SxProps;
};
