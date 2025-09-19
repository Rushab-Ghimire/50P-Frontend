import List from "@mui/material/List";
import MessageItem from "./MessageItem";
import { messagesData } from "./data";
import React, { forwardRef, useImperativeHandle } from "react";

const MessagesList = ({ data }) => {
  return (
    <List disablePadding>
      {data?.map((item, index) => {
        return <MessageItem item={item} key={index} />;
      })}
    </List>
  );
};

export { MessagesList };
