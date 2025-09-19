import { Div } from "@jumbo/shared";
import { Button, List, ListItem, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { DndWrapper } from "../../DndWrapper";
import { JumboCard } from "@jumbo/components";

const DzWithoutBg = ({ title, SubTitle, UploadAreaText }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <ListItem key={file.path} sx={{ width: "auto", mr: 1 }}>
      {file.path} - {file.size} bytes
    </ListItem>
  ));

  return (
    <Div sx={{ flex: 1 }}>
      <DndWrapper>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <Typography variant={"body1"}>{UploadAreaText}</Typography>
        </div>
      </DndWrapper>
      <Typography variant={"h4"}>Files</Typography>
      <List disablePadding sx={{ display: "flex" }}>
        {files}
      </List>
    </Div>
  );
};

export { DzWithoutBg };
