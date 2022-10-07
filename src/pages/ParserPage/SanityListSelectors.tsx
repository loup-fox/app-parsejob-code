import { Stack } from "@mui/material";
import { SanityListSelector } from "./SanityListSelector";

export const SanityListSelectors = () => {
  return (
    <Stack spacing={1}>
      <SanityListSelector
        id="distinctItemQuantity"
        name="Distinct item quantity"
      />
      <SanityListSelector id="fees" name="Fees" />
      <SanityListSelector id="fullBlast" name="Full blast" />
      <SanityListSelector id="consistency" name="Consistency" />
      <SanityListSelector id="optionalFields" name="Optional fields" />
      <SanityListSelector id="orderItemQuantity" name="Order item quantity" />
      <SanityListSelector id="outliers" name="Outliers" />
      <SanityListSelector id="pricePerUnit" name="Price per unit" />
    </Stack>
  );
};
