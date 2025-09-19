import React from 'react'
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import BusinessOne from './BusinessOne/BusinessOne'
import BusinessTwo from './BusinessTwo/BusinessTwo'
import BusinessThree from './BusinessThree/BusinessThree'
import { Container, Grid } from '@mui/material';

function BusinessOption() {
  return (
    <>
      <Container
          maxWidth={true}
          sx={{
            maxWidth: CONTAINER_MAX_WIDTH,
            display: "flex",
            minWidth: 0,
            flex: 1,
            flexDirection: "column",
          }}
          disableGutters
        >
          <Grid container spacing={3.75}>
            <BusinessOne/>
            <BusinessTwo/>
            <BusinessThree/>
          </Grid>
      </Container>
    </>
  )
}

export default BusinessOption
