import { colors, SxProps } from "@mui/material";
import { ParserStatus } from "../api/types/ParserStatus";

export const priorityColors = {
  critical: colors.red[400],
  major: colors.orange[400],
  minor: colors.blue[400],
  trivial: colors.green[400],
};

export const statusSx: { [key in ParserStatus]: SxProps } = {
  coding: {
    backgroundColor: "#ffe7c5",
    color: "#ff8100",
    borderWidth: 0,
  },
  rejected: {
    backgroundColor: "#ffd5dc",
    color: "#ef334a",
    borderWidth: 0,
  },
  to_anonymize: {
    backgroundColor: "transparent",
    color: "#d05cff",
    border: "1px solid #d05cff",
  },
  to_code: {
    backgroundColor: "transparent",
    color: "#ff8100",
    border: "1px solid #ff8100",
  },
  to_create: {
    backgroundColor: "transparent",
    color: "#9c9c9c",
    border: "1px solid #9c9c9c",
  },
  to_search: {
    backgroundColor: "transparent",
    color: "#9c9c9c",
    border: "1px solid #9c9c9c",
  },
  to_validate: {
    backgroundColor: "transparent",
    color: "#11b50e",
    border: "1px solid #11b50e",
  },
  validated: {
    backgroundColor: "#cdf35d",
    color: "#11b50e",
    borderWidth: 0,
  },
};
