import { JumboInput } from "@jumbo/vendors/react-hook-form";
import { Box, Button, IconButton, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Div } from "@jumbo/shared";
import { useTranslation } from "react-i18next";
import { Colors } from "../AskDaysi/theme/colors";

//var fileName = "";

export const FileUploader = ({
  onFileSelect,
  fieldName,
  icon = false,
  label_text = "Select File",
  icon_type = "",
  children,
  inputType,
}) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [refresh, setRefresh] = useState(0);

  const handleFileInput = (e) => {
    // handle validations
    //console.log("onChange");
    setFile((p) => e.target.files[0]);
    //console.log("fileXXX", e.target.files[0], file);
    setFileName(e.target.files[0].name);
    //fileName = e.target.files[0].name;
    onFileSelect(fieldName, e.target.files[0], inputType);
    setRefresh(refresh + 1);

    //console.log("file", file, fileName);
  };
  //console.log("file", file, fileName);
  const theme = useTheme();
  const { t } = useTranslation();

  const uploadBtnStyle = {
    color: Colors.primary,
    borderColor: Colors.primary,
    borderRadius: "30px",
    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
  };

  const uploadIconStyle = {
    color: Colors.primary,
    borderColor: Colors.primary,
    borderRadius: "30px",
    margin: "10px 0",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  };

  return (
    <>
      {children !== undefined && (
        <Div
          sx={{ cursor: "pointer" }}
          onClick={() => {
            document.getElementById(fieldName).click();
          }}
        >
          {children}
          <input id={fieldName} type="file" hidden onChange={handleFileInput} />
          {fileName != "" && (
            <div
              style={{
                position: "absolute",
                right: "20px",
                paddingBottom: "20px",
                marginTop: "5px",
              }}
            >
              {fileName}
            </div>
          )}
        </Div>
      )}
      {children === undefined && icon_type == "base" && (
        <>
          <Button
            variant="outlined"
            startIcon={<AttachFileIcon />}
            sx={uploadBtnStyle}
            onClick={() => {
              document.getElementById(fieldName).click();
            }}
          >
            <input
              id={fieldName}
              type="file"
              hidden
              onChange={handleFileInput}
            />
            {t("home.explainResult")}
          </Button>
          {/* // for small screens */}
          <Button
            size="small"
            variant="outlined"
            startIcon={<AttachFileIcon />}
            sx={uploadIconStyle}
            onClick={() => {
              document.getElementById(fieldName).click();
            }}
          >
            <input
              id={fieldName}
              type="file"
              hidden
              onChange={handleFileInput}
            />
            {t("home.test")}
          </Button>
          {/* <IconButton component="label" sx={uploadIconStyle}>
            <AttachFileIcon sx={{ color: Colors.primary }} />
            <input
              id={fieldName}
              type="file"
              hidden
              onChange={handleFileInput}
            />
          </IconButton> */}
        </>
      )}
      {children === undefined && icon_type != "base" && (
        <Box>
          <div className="file-uploader">
            <input
              id={fieldName}
              style={{ display: "none" }}
              type="file"
              onChange={handleFileInput}
            />
            {icon && (
              <IconButton
                color="primary"
                onClick={(e) => {
                  document.getElementById(fieldName).click();
                }}
                sx={{
                  height: "40px",
                  width: "40px",
                  backgroundColor: "#268ccc",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#58cced",
                  },
                }}
              >
                <FileUploadOutlinedIcon />
              </IconButton>
            )}
            {!icon && (
              <Button
                onClick={(e) => {
                  document.getElementById(fieldName).click();
                }}
                variant="contained"
                size="small"
              >
                {label_text}
              </Button>
            )}
          </div>
        </Box>
      )}
    </>
  );
};
