import { Button, Stack, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import * as Spaces from "react-spaces";
import { api, getFetchingStatus } from "../../api";
import { useToken } from "../../auth/tokenAtom";
import { TopBar } from "../../components/TopBar";

export const ParserFetchingPage = () => {
  const token = useToken();
  const { mutate: fetchMails, data: fetchingId } = api.useFetchMailsMutation();
  const { data: fetchingStatus } = useQuery(
    ["fetch", { fetchingId }],
    () => getFetchingStatus(token, fetchingId?.id!),
    {
      enabled: !!fetchingId,
      refetchInterval(data) {
        if (!data || data.loading) {
          return 1000;
        }
        return false;
      },
    }
  );
  return (
    <Spaces.ViewPort style={{ display: "flex" }}>
      <Spaces.Top size={64}>
        <TopBar />
      </Spaces.Top>
      <Spaces.Fill style={{ display: "flex" }}>
        <Spaces.Left size={300} style={{ display: "flex" }}>
          <Formik
            initialValues={{
              from: "",
            }}
            onSubmit={(values) => {
              fetchMails({
                from: values.from,
                context: "fetch mails",
                date: {},
              });
            }}
          >
            {({ getFieldProps }) => (
              <Form>
                <TextField label="From" {...getFieldProps("from")} />
                <Button variant="contained" type="submit">
                  Fetch
                </Button>
              </Form>
            )}
          </Formik>
        </Spaces.Left>
        <Spaces.Fill style={{ display: "flex" }}>
          {fetchingStatus?.loading && <div>Loading...</div>}
        </Spaces.Fill>
      </Spaces.Fill>
    </Spaces.ViewPort>
  );
};
