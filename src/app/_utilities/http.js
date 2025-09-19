//import { QueryClient } from "@tanstack/react-query";
import { QueryClient } from "react-query";
import {
  getAPIUrl,
  getGQLAPIUrl,
  getPubSubAPIUrl,
  getBOTUrl,
} from "@app/_utilities/helpers";
import { request } from "graphql-request";
import { json } from "react-router-dom";
import { getCookie } from "@jumbo/utilities/cookies";

export const queryClient = new QueryClient();

export const bearer = `Token 6995a0d4db4b96bc75b5da4b1a874e2be60861db`;
export const gqlBearer = `Bearer ${getCookie("auth-token")}`;

export const log = (type) => console.log.bind(console, type);

export async function gqlQuery({ signal, path, inData, onSuccess, onError }) {
  if (inData === -1) return {};
  try {
    const response = await request({
      url: getGQLAPIUrl(path),
      document: inData["gql"],
      requestHeaders: getCookie("auth-token")
        ? {
            Authorization: gqlBearer,
          }
        : "",
    });
    const data = Object.values(response)[0];
    if (inData["json_key"]) {
      inData["json_key"].forEach((key) => {
        data[key] = JSON.parse(data[key]);
      });
    }
    if (onSuccess) {
      onSuccess(data);
    }
    return data;
  } catch (e) {
    const error = {
      error: e.response.errors[0].message,
      error_code: e.response.status,
    };
    if (onError) {
      onError(error);
    }
    return error;
  }
}

export async function gqlMutate({ path, inData, onSuccess, onError }) {
  if (inData === -1) return {};
  try {
    const response = await request({
      url: getGQLAPIUrl(path),
      document: inData["gql"],
      requestHeaders: getCookie("auth-token")
        ? {
            Authorization: gqlBearer,
          }
        : "",
    });
    const data = response;
    if (onSuccess) {
      onSuccess(data);
    }
    return data;
  } catch (e) {
    const error = {
      error: e.response.errors[0].message,
      error_code: e.response.status,
    };
    if (onError) {
      onError(error);
    }
  }
}

export const sweetAlerts = (variant, message, Swal, theme, text=null) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  Toast.fire({
    icon: variant,
    title: message,
    text: text,
    background: theme.palette.background.paper,
  });
};

var subscribers = [];
export const subscribeToEvent = (EVENT, callback) => {
  subscribers.push({ event: EVENT, fx: callback });
};

export const unsubscribeEvent = (EVENT) => {
  subscribers = subscribers.filter((m) => {
    if (EVENT.trim() !== m.event.trim()) {
      return m;
    }
  });
};

window.bell = (dummy_payload) => {
  // dummy_payload = {
  //   event_name: "NEW_NOTIFICATION",
  //   payload: {
  //     event_type: "PROCESS",
  //     action: "TAX-FILING",
  //     message: "Tax filing season is here! Automate your filings now.",
  //   },
  // };
  subscribers.forEach((m) => {
    if (dummy_payload.event_name.trim() == m.event.trim()) {
      m.fx(dummy_payload.payload);
    }
  });
};

function connect() {
  var ws = new WebSocket(getPubSubAPIUrl());
  ws.onopen = function () {
    console.log("connected...");
  };

  ws.onmessage = function (e) {
    let json = JSON.parse(e.data);
    json = json.message;
    //console.log("json", json);
    subscribers.forEach((m) => {
      if (json.event_name.trim() == m.event.trim()) {
        m.fx(json.payload);
      }
    });
  };

  ws.onclose = function (e) {
    console.log(
      "Socket is closed. Reconnect will be attempted in 5 seconds.",
      e.reason
    );
    setTimeout(function () {
      connect();
    }, 5000);
  };

  ws.onerror = function (err) {
    console.log(err);
    console.error("Socket encountered error: ", err.message, "Closing socket");
    ws.close();
  };
}

connect();

export async function getCall({ path, inData = {} }) {
  if (inData === -1) return {};

  let qs = Object.entries(inData)
    .map(([k, v]) => {
      if (v !== undefined)
        return `${encodeURIComponent(k)}=${encodeURIComponent(v)}`;
      return "";
    })
    .join("&");
  qs = qs.trim() !== "" ? "?" + qs : "";

  const response = await fetch(getAPIUrl(path) + qs, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: gqlBearer,
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred during getCall");
    error.code = response.status;
    try {
      error.info = await response.json();
    } catch (e) {
      console.log(error);
    }
    throw error;
  }

  const data = await response.json();

  return data;
}

export async function postCall({ inData, path }) {
  const response = await fetch(getAPIUrl(path), {
    method: "POST",
    body: JSON.stringify(inData),
    headers: {
      "Content-Type": "application/json",
      Authorization: gqlBearer,
    },
  });
  if (!response.ok) {
    var result = await response.json();
    const error = new Error("Something went Wrong");
    error.code = response.status;
    error.errors = result.error;
    throw error;
  }
  return await response.json();
}

export async function uploadFile({ inData, path }) {
  const response = await fetch(getAPIUrl(path), {
    method: "POST",
    body: inData,
    headers: {
      Authorization: gqlBearer,
    },
  });
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.code = response.status;
    try {
      error.info = await response.json();
    } catch (e) {
      console.log(error);
    }

    throw error;
  }
  return await response.json();
}


export async function postToBot({ inData, path, isGet = false }) {
  var response;
  if(isGet)
  {
    response = await fetch(getBOTUrl(path), {
      method: "GET",
      headers: {
        //Authorization: gqlBearer,
      },
    });
  }
  else
  {
    response = await fetch(getBOTUrl(path), {
      method: "POST",
      body: inData,
      headers: {
        //Authorization: gqlBearer,
      },
    });
  }

  if (!response.ok) {
    const error = new Error(response.statusText);
    error.code = response.status;
    try {
      error.info = await response.json();
    } catch (e) {
      console.log(error);
    }

    throw error;
  }
  return await response.json();
}

 export async function putCall({ inData, path }) {
  const response = await fetch(getAPIUrl(path), {
    method: "PUT",
    body: JSON.stringify(inData),
    headers: {
      "Content-Type": "application/json",
      Authorization: gqlBearer,
    },
  });
  if (!response.ok) {
    const error = new Error("Update Error");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  // const { data } = await response.json();
  return await response.json();
}
/*
export async function deleteCall({ path }) {
  const response = await fetch(getAPIUrl(path), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred during deleteCall");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
} */
