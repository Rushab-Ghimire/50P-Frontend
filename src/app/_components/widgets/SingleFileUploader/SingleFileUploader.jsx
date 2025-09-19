import { FeaturedCard2 } from "@app/_components/cards/FeaturedCard2/FeaturedCard2";
import { DzFeedback } from "@app/_components/extensions/dropzone/components/DzFeedback";
import { JumboInput } from "@jumbo/vendors/react-hook-form";
import { Avatar, Box } from "@mui/material";
import { getMedia } from "@app/modules/salon/customers/Documents";
import { useQuery, useMutation } from "react-query";
import { queryClient, gqlQuery, gqlMutate } from "@app/_utilities/http.js";

import React, {
  useState,
  useEffect,
  forwardRef,
  useRef,
  useImperativeHandle,
  useCallback,
} from "react";
import { v4 as uuid } from "uuid";
import { ConstructionOutlined } from "@mui/icons-material";
import { CWAvatar } from "@app/_styles/CustomerWidgets";
import { gql } from "graphql-request";

export const getADMedia = (key, owner_id, owner_type, unique_id = -1) => {
  if (owner_type == "organization") {
    return gql`
      query Query {
        adMediaByUniqueId(uniqueId: "${unique_id}")
      }
    `;
  }

  return gql`
    query Query {
      adMedia(key: "${key}", ownerId: ${owner_id}, ownerType: "${owner_type}")
    }
  `;
};

const SingleFileUploader = forwardRef((props, ref) => {
  const [uniqueId, setUniqueId] = useState(
    props.unique_id == "" || props.unique_id == undefined
      ? uuid()
      : props.unique_id
  );
  const childRef = useRef();
  const [refresh, setRefresh] = React.useState(1);

  useImperativeHandle(ref, () => ({
    doUpload(fxOnComplete) {
      var field_name =
        props.field_name !== undefined ? props.field_name : "unique_id";
      console.log("field_name", field_name);
      childRef.current.doUpload(field_name, fxOnComplete);
    },
    reload() {
      //console.log("reloading...");
      setRefresh(refresh + 1);
    },
  }));

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "media_settings",
      {
        gql:
          props.app !== undefined
            ? getADMedia(
                props.file_key,
                props.owner_id,
                props.owner_type,
                props.unique_id
              )
            : getMedia(
                props.file_key,
                props.owner_id,
                props.owner_type,
                props.unique_id
              ),
      },
    ],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({
        signal,
        path: "/graphql",
        inData: props.owner_type !== undefined ? queryKey[1] : -1,
      }),
  });

  if (data) {
    //console.log("media", data);
  }

  return (
    <>
      <JumboInput
        className={"hideInput"}
        fieldName={
          props.field_name !== undefined ? props.field_name : "unique_id"
        }
        defaultValue={uniqueId}
        value={uniqueId}
      ></JumboInput>
      <Box sx={{ width: "100%" }}>
        <Box>
          {data && Object.keys(data).length > 0 && (
            <CWAvatar
              src={data}
              alt={props.file_key}
              sx={{ width: "auto !important" }}
            />
          )}
        </Box>
        <Box>
          <DzFeedback
            app={props.app}
            ref={childRef}
            uniqueId={uniqueId}
            UploadAreaText="Select Image"
          />
        </Box>
      </Box>
    </>
  );
});

export default SingleFileUploader;
