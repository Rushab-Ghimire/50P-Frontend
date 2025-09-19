import { Div } from "@jumbo/shared";
import { Button, List, ListItem, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { DndWrapper } from "../../DndWrapper";
import { JumboCard } from "@jumbo/components";
import React, {
  useCallback,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { uploadFile } from "@app/_utilities/http";
import { BouncingDotsLoader } from "@app/_components/apps";
import LinearProgress from "@mui/material/LinearProgress";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};
import { v4 as uuid } from "uuid";

const thumb = {
  display: "flex",
  flexDirection: "column",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  float: "left",
  width: "100%",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "100%",
  height: "100%",
};

const loader = {
  display: "block",
  float: "left",
  width: "100%",
  margin: "auto",
  marginTop: "3px",
};
var uniqueId = "";
const DzFeedback = forwardRef((props, ref) => {
  const [refresh, setRefresh] = useState(0);
  //const [uniqueId, setUniqueId] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      file.status = "none";
    });
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop,
    maxFiles: 1,
  });

  useImperativeHandle(ref, () => ({
    doUpload(field_name, fxOnComplete) {
      startFileUpload(field_name, fxOnComplete);
    },
  }));

  function notifyFileUploadCompleted(field_name, fxOnComplete) {
    let all_done = true;
    acceptedFiles.forEach((file) => {
      if (file.status !== "done") {
        all_done = false;
      }
    });
    if (all_done) {
      //console.log("all-done", { _name: field_name, _value: uniqueId });
      setRefresh(refresh + 1);
      fxOnComplete({ _name: field_name, _value: uniqueId });
    } else {
      setTimeout(() => {
        notifyFileUploadCompleted(field_name, fxOnComplete);
      }, 1000);
    }
  }

  const startFileUpload = useCallback((field_name, fxOnComplete) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        file.status = "uploading";
        setRefresh((prev) => prev + 1);
        const formData = new FormData();
        var unq = uuid();
        uniqueId = unq;
        formData.append("unique_id", unq);
        formData.append("file_path", file);
        if (props.app !== undefined) {
          await uploadFile({
            inData: formData,
            path: "/ad/upload-media",
          });
        } else {
          await uploadFile({
            inData: formData,
            path: "/salon/upload-media",
          });
        }

        file.status = "done";
        setRefresh((prev) => prev + 1);
      };
      reader.readAsArrayBuffer(file);
    });
    notifyFileUploadCompleted(field_name, fxOnComplete);
  });

  const files = acceptedFiles.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={URL.createObjectURL(file)}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
      {file.status == "done" && (
        <CheckCircleOutlineOutlinedIcon
          color="success"
          sx={{ margin: "3px auto 0 auto" }}
        />
      )}
      {file.status == "uploading" && (
        <div style={loader}>
          <LinearProgress />
        </div>
      )}
    </div>
  ));

  return (
    <Div sx={{ flex: 1 }}>
      <DndWrapper
        sx={{ padding: "16px", minHeight: "50px", cursor: "pointer" }}
      >
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <Typography variant={"body1"}>{props.UploadAreaText}</Typography>
        </div>
      </DndWrapper>
      <List disablePadding sx={{ display: "flex", flexDirection: "column" }}>
        {files}
      </List>
    </Div>
  );
});

export { DzFeedback };
