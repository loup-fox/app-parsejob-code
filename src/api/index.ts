import {
  QueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { tokenAtom, useToken } from "../auth/tokenAtom";
import { LoginResponse } from "./types/LoginResponse";
import { Parser } from "./types/Parser";
import { Sample } from "./types/Parser/Sample";
import { ParserSummaryMap } from "./types/ParserSummaryMap";
import {
  FetchMailsStatus,
  PostFetchMails,
  PostFetchMailsInput,
} from "./types/PostFetchMails";

const API_URL = import.meta.env.API_URL || "http://localhost:3000/api";

export const login = async (params: { email: string; password: string }) => {
  const response = await fetch(`${API_URL}/users/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const data = await response.json();
  return LoginResponse.parse(data);
};

export const getAllParsers = async (token: string | null) => {
  const result = await fetch(`${API_URL}/parser`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return ParserSummaryMap.parse(await result.json());
};

export const getSample = async (
  token: string | null,
  name: string,
  sample: number
) => {
  const result = await fetch(`${API_URL}/parser/${name}/sample/${sample}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await result.json();
  return Sample.parse(data);
};
export const getParser = async (token: string | null, name: string) => {
  const result = await fetch(`${API_URL}/parser/${name}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await result.json();
  console.dir(data);
  return Parser.parse(data);
};

export const updateParser = async (
  token: string | null,
  parserName: string,
  fields: Partial<Parser>
) => {
  await fetch(`${API_URL}/parser/${parserName}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(fields),
  });
};

export const getFetchingStatus = async (token: string | null, id: string) => {
  const result = await fetch(`${API_URL}/parser/fetch/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await result.json();
  return FetchMailsStatus.parse(data);
};

export const fetchMails =
  (token: string | null) => async (props: PostFetchMailsInput) => {
    const body = PostFetchMails.parse(props);
    const result = await fetch(`${API_URL}/parser/fetch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await result.json();
    return data as { id: string };
  };

export const api = {
  useLoginMutation: () => {
    const setToken = useSetAtom(tokenAtom);
    const queryClient = useQueryClient();
    return useMutation(login, {
      onSuccess: (data) => {
        setToken(data.token);
        queryClient.invalidateQueries();
      },
    });
  },
  useGetAllParsersQuery: () => {
    const token = useToken();
    return useQuery(["parsers"], () => getAllParsers(token));
  },
  useGetParserQuery: (name: string | null) => {
    const token = useToken();
    return useQuery(["parsers", { name }], () => getParser(token, name!), {
      enabled: !!name,
    });
  },
  useGetSampleQuery: (name: string | null, sample: number | null) => {
    const token = useToken();
    return useQuery(
      ["parsers", { name, sample }],
      () => getSample(token, name!, sample!),
      { enabled: !!name && sample !== null }
    );
  },

  useFetchMailsMutation: () => {
    const token = useToken();
    return useMutation(fetchMails(token));
  },
  useUpdateParserMutation: () => {
    const token = useToken();
    const queryClient = useQueryClient();
    return useMutation(
      (props: { name: string; fields: Partial<Parser> }) =>
        updateParser(token, props.name, props.fields),
      {
        onSuccess: (_, args) => {
          queryClient.invalidateQueries(["parsers", args.name]);
        },
      }
    );
  },
};
