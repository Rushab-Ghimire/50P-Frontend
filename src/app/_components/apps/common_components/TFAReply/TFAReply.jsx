import { Stack, Chip } from "@mui/material";
import { ChatMsgUserText } from "@app/_styles/ChatWindow";
import { queryClient, gqlQuery } from "@app/_utilities/http.js";
import { useQuery } from "react-query";
import { gql } from "graphql-request";
import { GLOBAL } from "@app/_utilities/globals";
import { BouncingDotsLoader } from "@app/_components/apps/common_components";
import { Div } from "@jumbo/shared";

const getTFAReply = (messageIn = "") => gql`
  query Query {
    tfaReply(messageIn: "${messageIn}") {
      context
      messageOut
    }
  }
`;

const TFAReply = ({ messageIn, setTyping }) => {
  const {
    data,
    isLoading,
    isError: isErrorCard,
    error: errorCard,
  } = useQuery({
    queryKey: [
      "tfareply",
      {
        gql: !GLOBAL["openai"]
          ? GLOBAL["HBeat"]
          : getTFAReply(messageIn + " " + GLOBAL["lang_tag"] + " in 50 words"),
      },
    ],
    queryFn: ({ signal, queryKey }) =>
      gqlQuery({ signal, path: "/graphql", inData: queryKey[1] }),
  });

  if (data) {
    //console.log("TFAReply", data);
    setTyping(false);
  }

  return (
    <Div sx={{ paddingLeft: "5px", float: "left" }}>
      {!data && <BouncingDotsLoader />}
      {data && data["messageOut"]}
    </Div>
  );
};

export { TFAReply };
