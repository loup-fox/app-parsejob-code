import { Box, colors, Stack, SxProps } from "@mui/material";
import { formatName } from "../common/formatName";

export type CustomChipProps = {
  label: string;
  endAdornment?: React.ReactNode;
  onClick?: () => void;
  sx?: SxProps;
};

export const CustomChip = (props: CustomChipProps) => {
  return (
    <Box
      sx={{
        border: `1px solid ${colors.grey[500]}`,
        color: colors.grey[500],
        fontSize: "0.8rem",
        pt: 0.5,
        pb: 0.5,
        pl: 1,
        pr: props.endAdornment ? 0.5 : 1,
        cursor: props.onClick ? "pointer" : "default",
        borderRadius: "100px",
        ...props.sx,
      }}
    >
      <Stack
        direction="row"
        gap={0.25}
        alignItems="center"
        onClick={props.onClick}
        justifyContent="center"
      >
        {formatName(props.label, {
          capitalize: false,
        }).toUpperCase()}
        {props.endAdornment}
      </Stack>
    </Box>
  );
};
