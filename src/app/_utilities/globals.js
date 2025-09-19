import { gql } from "graphql-request";
export var GLOBAL = {
  state_city: {
    "4155751": {
        "title": "Florida",
        "cities": [
            {"id": 4155995, "title": "Fort Myers"},
            {"id": 4156404, "title": "Gainesville"},
            {"id": 4160021, "title": "Jacksonville"},
            {"id": 4164138, "title": "Miami"},
            {"id": 4167147, "title": "Orlando"},
            {"id": 4168228, "title": "Pensacola"},
            {"id": 4172131, "title": "Sarasota"},
            {"id": 4174757, "title": "Tampa"},
            {"id": 4177887, "title": "West Palm Beach"}
        ]
    },
    "5101760": {
        "title": "New Jersey",
        "cities": [
            {"id": 4501198, "title": "Cherry Hill"},
            {"id": 5098706, "title": "Hackensack"},
            {"id": 5101427, "title": "Morristown"},
            {"id": 5101798, "title": "Newark"},
            {"id": 7257830, "title": "Edison"}
        ]
    },
    "5128638": {
        "title": "New York",
        "cities": [
            {"id": 5106834, "title": "Albany"},
            {"id": 5110302, "title": "Brooklyn"},
            {"id": 5110629, "title": "Buffalo"},
            {"id": 5117472, "title": "Flushing"},
            {"id": 5134086, "title": "Rochester"},
            {"id": 5139568, "title": "Staten Island"},
            {"id": 5140405, "title": "Syracuse"},
            {"id": 5144336, "title": "White Plains"},
            {"id": 12236571, "title": "New York"},
            {"id": 12236577, "title": "Bronx"}
        ]
    }
  },
  lang: "en",
  userDetail: {},
  viewing_chat_booking_id: -1,
  chat_thread_id: -1,
  chat_thread_title: "--",
  chat_history_context: [],
  lang_tag: "", //"in English",
  current_message: "",
  last_message: "",
  openai: true,
  bookingData: {},
  isSA: false,
  HBeat: gql`
  query Query {

  }
`,
};


export function getLocation(success = () => {}, error = () => {}) {
  if (!navigator.geolocation) {
    console.log('Geolocation API not supported by this browser.');
  } else {
    console.log('Checking location...');
    navigator.geolocation.getCurrentPosition(success, error);
  }
}


var dCity = [];
export function getDropDataCity(state_id) {
  if (state_id === undefined) return [];
  dCity = [];
  for (const [key, value] of Object.entries(GLOBAL.state_city)) {
    if (key == state_id) {
      dCity = value.cities.map((itm) => ({
        label: itm.title,
        value: itm.id,
      }));
    }
  }
  return dCity;
}

var dState = [];
export function getDropDataState() {
  dState = [];
  for (const [key, value] of Object.entries(GLOBAL.state_city)) {
    dState.push({
      label: value.title,
      value: key,
    });
  }
  return dState;
}