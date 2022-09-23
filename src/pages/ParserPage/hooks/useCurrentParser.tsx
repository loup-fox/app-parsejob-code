import { useParams } from "react-router";
import { api } from "../../../api";

export const useCurrentParser = () => {
  const { parserName = null } = useParams();
  const { data: parser } = api.useGetParser(parserName);
  return parser;
};
