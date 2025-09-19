import { QueryClient } from "react-query";
import {
  getAPIUrl,
  getGQLAPIUrl,
  getPubSubAPIUrl,
} from "@app/_utilities/helpers";
import { request } from "graphql-request";
import { json } from "react-router-dom";

var keyFetched = false;
export function modeActivated() {
  return keyFetched;
}

const fns = {
  manageOptions: ({ message }) => {
    //console.log("manageOptions", message);
    try {
      window.sendVoiceCommand(message);
    } catch (e) {}
    return { success: true, message };
  },
};

// Create a WebRTC Agent
const peerConnection = new RTCPeerConnection();

// On inbound audio add to page
peerConnection.ontrack = (event) => {
  const el = document.createElement("audio");
  el.srcObject = event.streams[0];
  el.autoplay = el.controls = true;
  document.body.appendChild(el);
};

const dataChannel = peerConnection.createDataChannel("response");

function sendClientIntroMessage() {
  console.log("sendClientIntroMessage");
  const responseCreate = {
    type: "response.create",
    response: {
      modalities: ["text", "audio"],
      instructions: "Hello. Listen to my feedback for this service.",
    },
  };
  dataChannel.send(JSON.stringify(responseCreate));
}

function configureData() {
  //console.log("Configuring data channel");
  const event = {
    type: "session.update",
    session: {
      modalities: ["text", "audio"],
      instructions:
        "You are a support agent for salon business. Your only job is to collect feedback for the service given to the client.",
      // Provide the tools. Note they match the keys in the `fns` object above
      input_audio_transcription: {
        model: "whisper-1",
      },
      tools: [
        {
          type: "function",
          name: "manageOptions",
          description: "suggest, manage, option, how",
          parameters: {
            type: "object",
            properties: {
              message: {
                type: "string",
                description: "suggest, manage, option, how",
              },
            },
          },
        },
      ],
    },
  };
  dataChannel.send(JSON.stringify(event));
  setTimeout(() => {
    sendClientIntroMessage();
  }, 100);
}

dataChannel.addEventListener("open", (ev) => {
  //console.log("Opening data channel", ev);
  configureData();
});

// {
//     "type": "response.function_call_arguments.done",
//     "event_id": "event_Ad2gt864G595umbCs2aF9",
//     "response_id": "resp_Ad2griUWUjsyeLyAVtTtt",
//     "item_id": "item_Ad2gsxA84w9GgEvFwW1Ex",
//     "output_index": 1,
//     "call_id": "call_PG12S5ER7l7HrvZz",
//     "name": "get_weather",
//     "arguments": "{\"location\":\"Portland, Oregon\"}"
// }

dataChannel.addEventListener("message", async (ev) => {
  const msg = JSON.parse(ev.data);
  //console.log("from openai", msg);
  // Handle function calls
  if (msg.type === "conversation.item.input_audio_transcription.completed") {
    try {
      window.captureTranscript(msg.transcript);
    } catch (e) {}
  } else if (msg.type === "response.function_call_arguments.done") {
    const fn = fns[msg.name];
    if (fn !== undefined) {
      console.log(`Calling local function ${msg.name} with ${msg.arguments}`);
      const args = JSON.parse(msg.arguments);
      const result = await fn(args);
      console.log("result", result);
      // Let OpenAI know that the function has been called and share it's output
      const event = {
        type: "conversation.item.create",
        item: {
          type: "function_call_output",
          call_id: msg.call_id, // call_id from the function_call message
          output: JSON.stringify(result), // result of the function
        },
      };
      dataChannel.send(JSON.stringify(event));
    }
  }
});

export function initiateVoiceMode() {
  keyFetched = false;
  // Capture microphone
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    // Add microphone to PeerConnection
    stream
      .getTracks()
      .forEach((track) =>
        peerConnection.addTransceiver(track, { direction: "sendrecv" })
      );

    peerConnection.createOffer().then((offer) => {
      peerConnection.setLocalDescription(offer);

      // Send WebRTC Offer to Workers Realtime WebRTC API Relay

      request(
        getGQLAPIUrl("/graphql"),
        `query MyQuery {
    rtcConnect {
      session
    }
  }`
      )
        .then((r) => {
          var session = JSON.parse(r["rtcConnect"]["session"]);
          return session.client_secret.value;
        })
        .then((EPHEMERAL_KEY) => {
          console.log("EPHEMERAL_KEY", EPHEMERAL_KEY);
          const baseUrl = "https://api.openai.com/v1/realtime";
          const model = "gpt-4o-realtime-preview";
          const sdpResponse = fetch(`${baseUrl}?voice=verse&model=${model}`, {
            method: "POST",
            body: offer.sdp,
            headers: {
              Authorization: `Bearer ${EPHEMERAL_KEY}`,
              "Content-Type": "application/sdp",
            },
          })
            .then((sdpResponse) => sdpResponse.text())
            .then((answer) => {
              keyFetched = true;
              peerConnection.setRemoteDescription({
                sdp: answer,
                type: "answer",
              });
            });
        });
    });
  });
}
