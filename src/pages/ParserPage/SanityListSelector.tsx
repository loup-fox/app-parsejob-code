import { MenuItem, Select, Stack } from "@mui/material";
import { useField } from "formik";

export const SanityListSelector = ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => {
  const [props, , helpers] = useField("sanityList");
  return (
    <Stack direction="row" justifyContent="center" alignItems="center">
      <Stack flex={1}>{name}</Stack>
      <Select
        sx={{ flex: 2 }}
        size="small"
        value={props.value[id] ?? "warning"}
        onChange={(ev) => {
          const newValue = ev.target.value as string;
          helpers.setValue({
            ...props.value,
            [id]: newValue,
          });
        }}
      >
        <MenuItem value="error">Error</MenuItem>
        <MenuItem value="warning">Warning</MenuItem>
        <MenuItem value="info">Info</MenuItem>
        <MenuItem value="none">None</MenuItem>
      </Select>
    </Stack>
  );
};
