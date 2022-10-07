import {
  Grid,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Form, Formik } from "formik";
import { Navigate } from "react-router";
import { api } from "../api";
import { useToken } from "../auth/tokenAtom";

export const LoginPage = () => {
  const { mutate: login } = api.useLoginMutation();
  const token = useToken();
  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <Formik
      initialValues={{
        email: "loup@foxintelligence.fr",
        password: "mismatch",
      }}
      onSubmit={(values) => {
        login(values);
      }}
    >
      {({ getFieldProps }) => (
        <Form>
          <Grid container>
            <Grid item>
              <Paper sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Typography variant="h5">ParseJob Code</Typography>
                  <TextField label="Email" {...getFieldProps("email")} />
                  <TextField
                    type="password"
                    label="Password"
                    {...getFieldProps("password")}
                  />
                  <Stack>
                    <Button type="submit" variant="contained">
                      Login
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
