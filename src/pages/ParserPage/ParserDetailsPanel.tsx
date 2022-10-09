import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { api } from "../../api";
import { normalizeSanityChecks } from "../../api/helpers/normalizeSanityChecks";
import { useCurrentParser } from "./hooks/useCurrentParser";
import { ParserPanelHeader } from "./ParserPanelHeader";
import { SanityListSelectors } from "./SanityListSelectors";

export const ParserDetailsPanel = () => {
  const parser = useCurrentParser();
  const { mutate: updateParser } = api.useUpdateParserMutation();

  if (!parser) return null;
  return (
    <Stack flex={1}>
      <ParserPanelHeader parser={parser} panel="details" />
      <Stack spacing={2} m={2}>
        <Formik
          initialValues={{
            from: parser.from,
            subjectFilter: parser.subjectFilter,
            useBqFilter: parser.useBqFilter,
            bqFilter: parser.bqFilter,
            htmlFilter: parser.htmlFilter ?? "",
            parseOnlyHtml: parser.parseOnlyHtml,
            sanityList: normalizeSanityChecks(parser.sanityList ?? []),
            pdf: parser.pdf,
            note: parser.note,
          }}
          onSubmit={(values) => {
            updateParser({
              name: parser.name,
              fields: values,
            });
          }}
        >
          {({
            values,
            getFieldProps,
            setFieldValue,
            submitForm,
            resetForm,
          }) => (
            <Form>
              <Accordion>
                <AccordionSummary>
                  <Stack
                    direction="row"
                    width={"100%"}
                    justifyContent={"space-between"}
                  >
                    <Stack>
                      <Typography fontSize="1.3rem" fontWeight="bold">
                        Parser's settings
                      </Typography>
                      <Stack spacing={1} direction="row">
                        <Typography fontWeight="bold">From:</Typography>{" "}
                        <Typography>{parser.from}</Typography>
                      </Stack>

                      <Stack spacing={1} direction="row">
                        <Typography fontWeight="bold">Subject:</Typography>{" "}
                        <Typography>{parser.subjectFilter}</Typography>
                      </Stack>
                    </Stack>
                    <Box>
                      <ButtonGroup>
                        <Button
                          onClick={(ev) => {
                            ev.stopPropagation();
                            submitForm();
                          }}
                          variant="contained"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={(ev) => {
                            ev.stopPropagation();
                            resetForm();
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
                      control={
                        <Switch
                          checked={values.useBqFilter}
                          onChange={(_, value) =>
                            setFieldValue("useBqFilter", value)
                          }
                        />
                      }
                    />
                    {values.useBqFilter && (
                      <TextField
                        label="BQ Filter"
                        {...getFieldProps("bqFilter")}
                      />
                    )}
                    <TextField
                      label="HTML Filter"
                      multiline
                      {...getFieldProps("htmlFilter")}
                    />
                    <FormControlLabel
                      label="Parse text email"
                      control={
                        <Switch
                          checked={values.parseOnlyHtml ?? false}
                          onChange={(_, checked) =>
                            setFieldValue("parseOnlyHtml", checked)
                          }
                        />
                      }
                    />
                    <FormControlLabel
                      label="PDF to HTML"
                      control={
                        <Switch
                          checked={values.pdf}
                          onChange={(_, checked) =>
                            setFieldValue("pdf", checked)
                          }
                        />
                      }
                    />
                    <TextField
                      label="Notes"
                      multiline
                      {...getFieldProps("note")}
                    />
                    <Divider />
                    <Stack spacing={2}>
                      <Typography>Sanity Checks</Typography>
                      <SanityListSelectors />
                    </Stack>
                    <Divider />
                    <TextField
                      disabled
                      label="Company"
                      value={parser.companyExpeditor}
                    />
                    {parser.type !== "crawler" && (
                      <TextField
                        disabled
                        label="Transaction Type"
                        value={parser.typeTransaction}
                      />
                    )}
                    <TextField
                      disabled
                      label="Industry"
                      value={parser.industry}
                    />
                    <TextField
                      disabled
                      label="Labels"
                      value={parser.category?.join(", ")}
                    />
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Form>
          )}
        </Formik>
        <Formik
          initialValues={{
            Order: [],
            OrderItems: [],
            UserItems: [],
          }}
          onSubmit={(values) => {}}
        >
          {({
            values,
            getFieldProps,
            setFieldValue,
            submitForm,
            resetForm,
          }) => (
            <Form>
              <Accordion>
                <AccordionSummary>
                  <Typography fontSize="1.3rem" fontWeight="bold">
                    Data to parse
                  </Typography>
                </AccordionSummary>
                <AccordionDetails></AccordionDetails>
              </Accordion>
            </Form>
          )}
        </Formik>
      </Stack>
    </Stack>
  );
};
