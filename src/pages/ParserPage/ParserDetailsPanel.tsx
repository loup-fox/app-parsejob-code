import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { StatusChip } from "../../components/StatusChip";
import { useCurrentParser } from "./hooks/useCurrentParser";

export const ParserDetailsPanel = () => {
  const parser = useCurrentParser();
  if (!parser) return null;
  return (
    <Stack p={2}>
      <Stack spacing={1} direction="row" alignItems={"baseline"}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {parser.name}
        </Typography>
        <Typography>v({parser.version})</Typography>
        <Box sx={{ alignSelf: "center" }}>
          <StatusChip status={parser.status} />
        </Box>
      </Stack>
      <Formik
        initialValues={{
          from: parser.from,
          subjectFilter: parser.subjectFilter,
          useBqFilter: parser.useBqFilter,
        }}
        onSubmit={(values) => {}}
      >
        {({ values, getFieldProps }) => (
          <Form>
            <Accordion>
              <AccordionSummary>
                <Stack
                  direction="row"
                  width={"100%"}
                  justifyContent={"space-between"}
                >
                  <Stack>
                    <Typography>Parser's settings</Typography>
                    <Typography>from: {parser.from}</Typography>
                    <Typography>subject: {parser.subjectFilter}</Typography>
                  </Stack>
                  <Box>
                    <ButtonGroup>
                      <Button
                        onClick={(ev) => {
                          ev.stopPropagation();
                        }}
                        variant="contained"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={(ev) => {
                          ev.stopPropagation();
                        }}
                        variant="outlined"
                      >
                        Cancel
                      </Button>
                    </ButtonGroup>
                  </Box>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  <TextField {...getFieldProps("from")} label="From" />
                  <TextField
                    {...getFieldProps("subjectFilter")}
                    label="Subject"
                  />
                  <FormControlLabel
                    label="Use BQ Filter"
                    control={<Switch checked={values.useBqFilter} />}
                  />
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
