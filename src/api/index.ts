import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { tokenAtom, useToken } from "../auth/tokenAtom";
import { LoginResponse } from "./types/LoginResponse";
import { Parser } from "./types/Parser";
import { ParserSummaryMap } from "./types/ParserSummaryMap";

const API_URL = import.meta.env.API_URL || "http://localhost:3000/api";

export const login = async (params: { email: string; password: string }) => {
  const response = await fetch(`${API_URL}/users/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  return LoginResponse.parse(await response.json());
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

export const api = {
  useLogin: () => {
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
  useGetParser: (name: string | null) => {
    const token = useToken();
    return useQuery(["parsers", name], () => getParser(token, name!), {
      enabled: !!name,
    });
  },
};
