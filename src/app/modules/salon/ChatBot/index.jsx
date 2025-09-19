import React, { useCallback, useRef, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Avatar,
  Stack,
  Container,
  Button,
} from "@mui/material";
import {
  CBChatContainer,
  CBHeader,
  CBHeaderLogo,
  CBInputContainer,
  CBMessageBubble,
  CBMessageContent,
  CBMessagesContainer,
} from "@app/_styles/ChatBot";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import headerLogo from "/assets/images/logo-bot-header.png";
import headerLogoMedical from "/assets/images/ask-daisy.png";
import { getCustomDateTime, getFormattedDate } from "@app/_utilities/helpers";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { createDocument } from "./Document";
import { gqlMutate, postToBot } from "@app/_utilities/http";
import { BouncingDotsLoader } from "@app/_components/apps";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { JumboForm, JumboInput } from "@jumbo/vendors/react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import PhoneInput from "react-phone-input-2";
import Slide from "@mui/material/Slide";
import { PickersInputBaseSectionsContainer } from "@mui/x-date-pickers/PickersTextField/PickersInputBase/PickersInputBase";
import * as Yup from "yup";
import { BOT_ROUTER_URL } from "@app/_utilities/constants/paths-env";
import EHRForm from "../../agent-components/eHRForm";
import SearchForm from "@app/modules/agent-components/SearchForm";
import { FileUploader } from "@app/modules/agent-components/FileUploader";
const mb = {
  marginBottom: "25px",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
var greetNow = true;
var ACTIONS = {
  BOOKING_FORM: { key: "BOOKING_FORM", label: "Click here to Book" },
  EHR_FORM: { key: "EHR_FORM", label: "Click for eHR" },
  SEARCH_FORM: { key: "SEARCH_FORM", label: "Click" },
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [mChain, setMChain] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [phone, setPhone] = React.useState("");
  const [queueDateTime, setQueueDateTime] = useState(new Date());
  const refMessages = useRef();
  const params = useParams();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = (m, isUser = true, actions = []) => {
    setMChain((prev) => {
      prev.push({
        id: uuid(),
        text: m,
        isUserX: isUser,
        timestamp: getCustomDateTime(0, "days", "HH:mm A"),
        actions: actions,
      });
      return prev;
    });

    setTimeout(() => {
      setTimeout(() => {
        refMessages.current.scrollTop = refMessages.current?.scrollHeight;
      }, 500);
    }, 100);

    if (isUser) {
      sendToRouter(m);
    }
    clearMessage();
  };

  const formatProper = (m, first_response = false) => {
    if (first_response) {
      m = m.replace(["\n", "\r"], "");
    } else {
      m = m.replace(/\n/g, "<br/>");
    }
    m = m.replace(/<<.*>>/, "");
    return `${m}`;
  };

  const sendToRouter = useCallback((m, first_response = false) => {
    if (false && !m.includes("be all")) {
      //var z = "some menu<<EHR_FORM>>";
      var z = "some menu <<SEARCH_FORM>>";

      var actions = [];
      if (z.includes("<<") && z.includes(">>")) {
        actions = z.split("<<").pop().split(">>");
        //console.log("actions 11", actions);
        actions = actions.filter((item) => item != "");
        //console.log("actions 22", actions);
      }
      actions = actions.map((item) =>
        ACTIONS[item] === undefined ? item : ACTIONS[item]
      );
      z = formatProper(z);
      sendMessage(z, false, actions);
      setTimeout(() => {
        setRefresh(refresh + 1);
      }, 1000);
      return;
    }

    setIsTyping(true);
    fetch(
      `${BOT_ROUTER_URL}/chat_message`,
      //"http://localhost:5050/chat_message",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: m,
          ai_type: params.org_id == 2 ? "MEDICAL" : "SALON",
          first_response: first_response,
        }),
      }
    )
      .then((resp) => resp.json()) // or, resp.text(), etc
      .then((data) => {
        var actions = [];
        //console.log("data", data);
        if (data.message.includes("<<") && data.message.includes(">>")) {
          actions = data.message.split("<<").pop().split(">>");
          //console.log("actions 11", actions);
          actions = actions.filter((item) => item != "");
          //console.log("actions 22", actions);
        }

        actions = actions.map((item) =>
          ACTIONS[item] === undefined ? item : ACTIONS[item]
        );

        //console.log("final actions", actions);

        data.message = data.message.replace(/<<.*>>/, "");
        data.message = formatProper(data.message, first_response);
        sendMessage(data.message, false, actions);
        setTimeout(() => {
          setRefresh(refresh + 1);
          setIsTyping(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("error", error);
      });
  });

  const launchDialog = useCallback((key) => {
    console.log(key);
    if (key === undefined) {
      alert("Popup not configured");
    } else {
      setOpen(true);
    }

    //sendToRouter("I have completed the booking. That will be all.");
    //captureParameters("Nimesh1 Shrestha1", "+111", new Date(), "aa4@w.com");
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: gqlMutate,
  });

  const captureParameters = (name, phone_number, date_time, email) => {
    console.log("captured...");
    var note = "ChatBot Booking";
    date_time = getFormattedDate(date_time, "YYYY-MM-DD HH:mmZZ");
    console.log(name, phone_number, date_time, note);
    var d = {
      action: "BOOKING",
      name: name,
      phone: phone_number,
      email: email,
      dateTime: date_time,
      note: note,
      org_id: params.org_id,
    };
    mutate({
      inData: { gql: createDocument(d) },
      path: "/graphql",
      onSuccess: () => {
        sendToRouter("thank me for completing the booking");
      },
    });
    setOpen(false);
  };

  const clearMessage = () => {
    setMessage("");
  };

  const greet = useCallback(() => {
    if (params.org_id == 2) {
      sendToRouter("Hello");
    } else {
      sendToRouter("hello");
    }
  });

  if (greetNow) {
    greet();
    greetNow = false;
  }

  function handleSubmit(d) {
    d.date_time = queueDateTime;
    d.phone = phone;
    console.log("form-data", d);
    captureParameters(d.name, d.phone, d.date_time, d.email);
  }

  const handleOnChange = () => {};

  //console.log(mChain);

  const [selectedFile, setSelectedFile] = useState({});

  const onFileSelect = (key, file) => {
    sendMessage("Your file is being Analyzed.", false, []);
    setRefresh(refresh + 1);

    setTimeout(async () => {
      var formData = new FormData();
      formData.append(key, file);
      var response = await postToBot({
        inData: formData,
        path: "/analyze",
      });
      console.log("response", response);
      sendToRouter(
        `Consolidate this in html table format  ${JSON.stringify(response)}`,
        true
      );
    }, 500);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <CBChatContainer>
        <CBHeader>
          <CBHeaderLogo
            sx={{ height: params.org_id == 2 ? "50px" : "20px" }}
            src={params.org_id == 2 ? headerLogoMedical : headerLogo}
          />
          {/* <img src={headerLogo} style={{ height: "34px" }} /> */}
        </CBHeader>

        <CBMessagesContainer ref={refMessages}>
          {/* <EHRForm sendToRouter={sendToRouter} /> */}
          {mChain.map((data, index) => (
            <CBMessageBubble key={data.id} isUserX={data.isUserX}>
              <CBMessageContent isUserX={data.isUserX}>
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{ __html: data.text }}
                ></Typography>

                {data?.actions?.map((action) => {
                  if (action.key == "SEARCH_FORM") {
                    return <SearchForm sendToRouter={sendToRouter} />;
                  } else if (action.key == "EHR_FORM") {
                    return <EHRForm sendToRouter={sendToRouter} />;
                  } else {
                    return (
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ marginTop: "10px", marginBottom: "10px" }}
                        onClick={() => {
                          launchDialog(action.key);
                        }}
                      >
                        {action?.label === undefined ? action : action.label}
                      </Button>
                    );
                  }
                })}
                <Typography
                  variant="caption"
                  sx={{ opacity: 0.7, mt: 0.5, display: "block" }}
                >
                  {data.timestamp}
                </Typography>
              </CBMessageContent>
            </CBMessageBubble>
          ))}
          {isTyping && (
            <CBMessageBubble key={refresh} isUserX={false}>
              <CBMessageContent sx={{ width: "auto" }} isUserX={false}>
                <BouncingDotsLoader />
              </CBMessageContent>
            </CBMessageBubble>
          )}
        </CBMessagesContainer>
        <CBInputContainer>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ paddingBottom: "20px" }}
          >
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder="Type a message..."
              variant="outlined"
              size="small"
              sx={{ backgroundColor: "#fff" }}
              aria-label="Message input field"
              value={message}
              onChange={handleInputChange}
              onKeyUp={(e) => {
                if (e.keyCode === 13) {
                  sendMessage(e.target.value);
                  clearMessage();
                  e.target.focus();
                } else null;
              }}
            />
            <IconButton
              color="primary"
              onClick={() => {
                sendMessage(message);
              }}
              aria-label="Send message"
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
              <SendOutlinedIcon />
            </IconButton>
            <FileUploader
              icon={true}
              onFileSelect={onFileSelect}
              fieldName={"input_file"}
            />
          </Stack>
        </CBInputContainer>
      </CBChatContainer>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogContent>
          <JumboForm
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            onChange={handleOnChange}
          >
            <JumboInput
              fullWidth
              fieldName="name"
              label="Name"
              placeholder="John doe"
              size="small"
              sx={mb}
            />
            <JumboInput
              fullWidth
              fieldName="email"
              label="Email"
              placeholder="demo@tileflexai.com"
              size="small"
              sx={mb}
            />
            <PhoneInput
              fullWidth
              size="small"
              international={true}
              withCountryCallingCode={true}
              country={"us"}
              className="mb-20"
              sx={{ marginBottom: "25px" }}
              onChange={(phoneN) => {
                setPhone("+" + phoneN);
              }}
            />
            <JumboInput
              className={"hideInput"}
              fieldName={"phone"}
              defaultValue={phone}
              value={phone}
            ></JumboInput>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  onChange={(date) => {
                    setQueueDateTime((prev) => new Date(date));
                  }}
                  label="Select Date And Time"
                />
              </DemoContainer>
            </LocalizationProvider>
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{ marginTop: "25px" }}
            >
              Book Appointment
            </Button>
            <Button
              type="button"
              onClick={() => {
                setOpen(false);
              }}
              variant="contained"
              size="small"
              sx={{ marginTop: "25px", marginLeft: "10px" }}
            >
              Cancel
            </Button>
          </JumboForm>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ChatBot;
