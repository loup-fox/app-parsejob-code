import _ from "lodash";

export const formatName = (
  opt: string,
  {
    capitalize = true,
  }: {
    capitalize?: boolean;
  } = {}
) =>
  _(opt)
    .snakeCase()
    .split("_")
    .map((x) => (capitalize ? _.capitalize(x) : x))
    .join(" ");
