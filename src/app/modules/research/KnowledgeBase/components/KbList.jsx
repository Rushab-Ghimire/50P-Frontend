import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { Box, ButtonGroup, Divider, Stack, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import { JumboCard } from "@jumbo/components";
import { postToBot } from "@app/_utilities/http";
import { LoadingIndicator } from "@app/_shared/GeneralUI";
import { useCallback } from "react";
import { BouncingDotsLoader } from "@app/_components/apps";
import { CircularProgressLoader } from "@app/_styles/ModuleModal";
import { getBOTUrl } from "@app/_utilities/helpers";
import AskDaysiShare from "@app/modules/AskDaysi/public/components/share";
import siteIcon from "/favicon.png";

var listItem = [];

const listStyle = {
  borderBottom: `1px solid ${Colors.gray}`,
  pt: 0.5,
  pb: 0.5,

  "&:last-of-type": {
    borderBottom: "none",
  },
};

const linkHandler = (file_id) => {
  const url = getBOTUrl(`/file_view/${file_id}`);
  window.open(url, "_blank");
};

const KbList = React.forwardRef((props, ref) => {
  const [refresh, setRefresh] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useImperativeHandle(ref, () => ({
    reload: () => {
      loadTrainingFiles();
    },
  }));

  const deleteTrainingFileFromList = useCallback(async (file_id) => {
    listItem = listItem.filter((i) => i.id != file_id);
    setRefresh(refresh + 1);
  });

  React.useEffect(() => {
    window.deleteTrainingFileFromList = deleteTrainingFileFromList;
  });

  const loadTrainingFiles = useCallback(async () => {
    setLoading(true);

    // listItem.push({
    //   id: "aaaaa",
    //   title: "aa.docx",
    // });
    // listItem.push({
    //   id: "bbbbb",
    //   title: "bb.docx",
    // });
    // listItem.push({
    //   id: "ccccc",
    //   title: "cc.docx",
    // });

    // setLoading(false);
    // setRefresh(refresh + 1);
    // return;

    var response = await postToBot({
      inData: {},
      path: "/vector_stores/files",
      isGet: true,
    });
    listItem = [];
    response.data.map((i) => {
      if (i.file.url !== null) {
        listItem.push({
          id: i.file.id,
          title: i.file.filename,
          url: i.file.url,
        });
      }
    });

    // listItem.push({
    //   id: "file-L21foNZFhsbf56YgHqGS92",
    //   title: "Weight-Log.json",
    // });

    setLoading(false);
    setRefresh(refresh + 1);
  });

  React.useEffect(() => {
    loadTrainingFiles();
  }, []);

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <AskDaysiShare btnWidth="100%" offset="0" />
      </Box>
      <JumboCard sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{ pl: 2, pr: 2, pt: 2, fontWeight: "500" }}
        >
          Model Training Files
        </Typography>
        <Divider sx={{ borderColor: Colors.gray_2, mb: 0.5 }} />
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "15px",
              padding: "20px 0",
            }}
          >
            <Stack>
              <CircularProgressLoader
                sx={{
                  fontSize: "16px",
                  height: "30px !important",
                  width: "30px !important",
                }}
              />
            </Stack>
            <Stack>
              <Typography variant="h5">Loading Files</Typography>
            </Stack>
          </Box>
        )}
        {!loading && (
          <List sx={{ pt: 0, pb: 1, pl: 2, pr: 2 }}>
            {listItem.map((data, index) => (
              <ListItem
                disableGutters
                key={index}
                secondaryAction={
                  <>
                    <ButtonGroup>
                      {/* <OpenInNewIcon
                      fontSize="small"
                      cursor="pointer"
                      onClick={() => {
                        linkHandler(`${data.id}`);
                      }}
                    /> */}
                      <IconButton
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          props.setFileOnUI(data);
                        }}
                      >
                        <img
                          src={siteIcon}
                          style={{ width: "20px", borderRadius: "50%" }}
                        />
                      </IconButton>
                    </ButtonGroup>
                  </>
                }
                sx={listStyle}
              >
                <ListItemText primary={data.title} />
              </ListItem>
            ))}
          </List>
        )}
      </JumboCard>
    </>
  );
});

export default KbList;
