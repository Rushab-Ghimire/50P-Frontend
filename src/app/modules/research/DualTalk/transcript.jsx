import { useArrayState } from "@app/_utilities/helpers";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import { getBackgroundColorStyle } from "@jumbo/utilities/helpers";
import { Box, Container } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const TranscriptViewer = forwardRef((props, ref) => {
  const [transcripts, setTranscripts] = useArrayState([]);
  const [refresh, setRefresh] = useState(0);
  useImperativeHandle(ref, () => {
    return {
      addTranscript(itm) {
        //console.log("itm", itm);
        setTranscripts((it) => it.push(itm));
        setRefresh(refresh + 1);
      },
      getCount() {
        return transcripts.length;
      },
      clearTranscripts() {
        setTranscripts((it) => []);
        jQuery("#all-transcripts").html("");
      },
    };
  }, []);

  const translatedStyle = {
    backgroundColor: Colors.gray_5,
    color: Colors.black,
    marginBottom: "16px",
    marginLeft: "20%",
    padding: "10px",
    borderRadius: "20px",
    fontSize: "16px",
  };

  const notTranslatedStyle = {
    color: Colors.black,
    marginBottom: "16px",
    padding: "10px",
    borderRadius: "20px",
    fontSize: "16px",
  };

  return (
    <>
      <Container>
        <Box id="all-transcripts" sx={{ height: "80vh", overflowY: "auto" }}>
          {transcripts.map((m) => {
            if (!m.isTranslated) {
              return (
                <Box key={m.uuid} sx={notTranslatedStyle}>
                  {m.content}
                </Box>
              );
            } else {
              return (
                <Box key={m.uuid} sx={translatedStyle}>
                  {m.content}
                </Box>
              );
            }
          })}
        </Box>
      </Container>
    </>
  );
});

export default TranscriptViewer;
