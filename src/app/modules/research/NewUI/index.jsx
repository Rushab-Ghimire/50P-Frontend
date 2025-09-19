import React, { useCallback, useRef } from "react";
import { Container, Grid } from "@mui/material";
import KBChatBot from "./ChatBot";

const NewUI = () => {
  const ref = useRef(null);
  const refreshFiles = useCallback(() => {
    ref.current.reload();
  });

  return (
    <>
      <Container maxWidth="xxl" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <KBChatBot refreshFiles={refreshFiles} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default NewUI;
