import { useParams } from "react-router";
import { api } from "../../../api";

export const useCurrentSample = () => {
  const { parserName = null } = useParams();
  const { sampleNumber = null } = useParams();
  const { data: sample } = api.useGetSampleQuery(
    parserName,
    sampleNumber ? parseInt(sampleNumber) : null
  );
  return sample;
};
