import React, { useCallback, useRef } from "react";
import KBChatBot from "./components/ChatBot";
import { Container, Grid } from "@mui/material";
import KbList from "./components/KbList";

const KnowledgeBase = () => {
  const ref = useRef(null);
  const refChatBot = useRef(null);
  const [refresh, setRefresh] = React.useState(0);
  const [file, setFile] = React.useState();

  const refreshFiles = useCallback(() => {
    ref.current.reload();
  });

  const setFileOnUI = useCallback((file) => {
    //console.log("fffff", file);
    setFile((f) => file);
    setRefresh(refresh + 1);
    refChatBot.current.openWorkPalette();
  });

  return (
    <>
      <Container maxWidth="xxl" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg="9">
            <KBChatBot
              ref={refChatBot}
              file={file}
              refreshFiles={refreshFiles}
            />
          </Grid>
          <Grid item xs={12} md={6} lg="3">
            <KbList setFileOnUI={setFileOnUI} ref={ref} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default KnowledgeBase;
