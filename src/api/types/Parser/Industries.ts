import { z } from "zod";

const Industries = z.union([
  z.literal("banking"),
  z.literal("cab"),
  z.literal("ecommerce"),
  z.literal("food delivery"),
  z.literal("travel car rental"),
  z.literal("travel hosting"),
  z.literal("travel transport"),
  z.literal("others"),
]);
type Industry = z.infer<typeof Industries>;
const INDUSTRIES = Industries._def.options.map((o) => o.value);
