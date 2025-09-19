import React, { useCallback, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import * as Yup from "yup";
import {
  JumboCheckbox,
  JumboForm,
  JumboInput,
  JumboOutlinedInput,
} from "@jumbo/vendors/react-hook-form";
import {
  queryClient,
  log,
  sweetAlerts,
  gqlQuery,
  gqlMutate,
} from "@app/_utilities/http.js";
import ErrorBlock from "@app/_shared/ErrorBlock.jsx";
import { Box, Button, Stack, Typography } from "@mui/material";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getDocument, createDocument, updateDocument } from "./Documents";
import { JumboCard } from "@jumbo/components";
import { BFormTitle } from "@app/_styles/business";
import { Div } from "@jumbo/shared";
import EntityTypeDropDown from "@app/_components/dropdowns/EntityTypeDropDown";
import AddressDropDown from "@app/modules/AskDaysi/public/components/form-components/AddressDropDown";
import SingleFileUploader from "@app/_components/widgets/SingleFileUploader/SingleFileUploader";
import InsuranceSelector from "@app/modules/AskDaysi/public/components/form-components/InsuranceSelector";
import { useArrayState } from "@app/_utilities/helpers";
import SpecializationCategorySelector from "@app/modules/AskDaysi/public/components/form-components/SpecializationCategorySelector";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  categoryId: Yup.string().required("Specialization Category is required"),
});
var formDataUser = {};
function SpecializationsForm() {
  const [isPendingFetch, setIsPendingFetch] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formError, setFormError] = React.useState({
    isError: false,
    message: "",
  });

  const params = useParams();

  const Swal = useSwalWrapper();
  const theme = useTheme();

  const {
    data,
    isLoading: isLoadingFetch,
    isError: isErrorFetch,
    error: errorFetch,
  } = useQuery({
    queryKey: ["single_specialization", { id: params.id }],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: params.id === undefined ? -1 : { gql: getDocument(params.id) },
      }),
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: gqlMutate,
    onSuccess: (e) => {
      queryClient.invalidateQueries({ queryKey: ["specializations"] });
      sweetAlerts(
        "success",
        params.id === undefined ? "Added..." : "Updated...",
        Swal,
        theme
      );
      navigate("/askdaysi/specializations");
    },
  });

  function submitFormData(files_data) {
    formDataUser.description =
      formDataUser.description === undefined ? "" : formDataUser.description;
    formDataUser.title =
      formDataUser.title === undefined ? "" : formDataUser.title;
    //console.log("formDataUser", formDataUser);

    if (params.id === undefined)
      mutate({
        inData: { gql: createDocument(formDataUser) },
        path: "/graphql",
      });
    else {
      formDataUser = { ...formDataUser, id: params.id };
      mutate({
        inData: { gql: updateDocument(formDataUser) },
        path: `/graphql`,
      });
    }
  }

  function handleSubmit(d) {
    formDataUser = d;
    submitFormData();
  }

  const handleOnChange = () => {
    setFormError({ isError: false, message: "" });
  };

  const imageRef = useRef();

  const [selSpCat, setSelSpCat] = useArrayState([]);
  const setSelectedSpecializationCategories = useCallback((ins, all = []) => {
    //console.log("sel ins", ins, all);
    setSelSpCat((p) => p.splice(0, p.length));

    var hasAll = false;

    ins.map((i) => {
      if (i.id === 0) {
        hasAll = true;
      }
    });

    if (hasAll) {
      all.map((v) => {
        setSelSpCat((p) => {
          p.push(v);
        });
      });
    } else {
      ins.map((v) => {
        setSelSpCat((p) => {
          p.push(v.id);
        });
      });
    }
  });

  return (
    <>
      {/* <Typography variant={"h2"}>
        {params.id === undefined && t("Add New Business")}
        {params.id !== undefined && t("Edit Business")}
      </Typography> */}
      {isLoadingFetch && "Fetching..."}
      {isErrorFetch && (
        <ErrorBlock
          title="Failed to fetch"
          message={
            errorFetch.info?.message ||
            "Failed to fetch. Please try again later."
          }
        />
      )}
      {formError.isError && <Alert severity="error">{formError.message}</Alert>}

      <JumboCard contentWrapper>
        <BFormTitle variant={"h3"}>
          {params.id === undefined && t("Add New Specialization")}
          {params.id !== undefined && t("Edit Specialization")}
        </BFormTitle>
        <JumboForm
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          onChange={handleOnChange}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            sx={{ marginTop: "-25px" }}
          >
            <JumboInput
              fullWidth
              defaultValue={data?.title}
              fieldName={"title"}
              label={"Title"}
              sx={{ marginTop: "25px" }}
              size="small"
            />
            <JumboInput
              fullWidth
              defaultValue={data?.description}
              fieldName={"description"}
              label={"Description"}
              sx={{ marginTop: "25px", marginBottom: "25px" }}
              size="small"
            />
            {data?.specializationCategory !== undefined && (
              <SpecializationCategorySelector
                is_multiple={false}
                selected={
                  data?.specializationCategory === undefined
                    ? []
                    : [data?.specializationCategory]
                }
                setSelectedItems={setSelectedSpecializationCategories}
                name={"specialization_categories"}
                labelTitle="Specialization Category"
                sx={{ marginBottom: "25px" }}
              />
            )}
            <JumboInput
              className={"hideInput"}
              fieldName={"categoryId"}
              defaultValue={selSpCat.length <= 0 ? "" : selSpCat[0]}
              value={selSpCat.length <= 0 ? "" : selSpCat[0]}
            ></JumboInput>
          </Box>

          <Box sx={{ display: "flex", gap: "15px", marginTop: "25px" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => {
                navigate("/askdaysi/specializations");
              }}
              type="button"
            >
              Cancel
            </Button>
          </Box>
        </JumboForm>
      </JumboCard>
    </>
  );
}
export default SpecializationsForm;
