import { getAssetPath, getCustomDateTime } from "@app/_utilities/helpers";
import { ASSET_AVATARS } from "@app/_utilities/constants/paths";

export const messagesData = [
  {
    user: {
      id: 1,
      name: "Nimesh Shrestha",
      profile_pic: getAssetPath(`${ASSET_AVATARS}/domnic-harris.jpg`, "40x40"),
    },
    message: "I think its a good idea, lets do it then.",
    date: getCustomDateTime(-5, "minutes", "MMMM DD, YYYY, h:mm:ss a"),
  },
  {
    user: {
      id: 2,
      name: "Kamal Kafle",
      profile_pic: getAssetPath(`${ASSET_AVATARS}/garry-sobars.jpg`, "40x40"),
    },
    message: "Hey, lets have a meeting this tuesday, what you say?",
    date: getCustomDateTime(-15, "minutes", "MMMM DD, YYYY, h:mm:ss a"),
  },
  {
    user: {
      id: 3,
      name: "Rabindra ",
      profile_pic: getAssetPath(`${ASSET_AVATARS}/kadir-m.jpg`, "40x40"),
    },
    message: "Let connect for a quick discussion this thursday.",
    date: getCustomDateTime(-45, "minutes", "MMMM DD, YYYY, h:mm:ss a"),
  },
  {
    user: {
      id: 4,
      name: "Neelam",
      profile_pic: getAssetPath(`${ASSET_AVATARS}/avatar5.jpg`, "40x40"),
    },
    message:
      "Hi, I have shared some documents with you, please go through them.",
    date: getCustomDateTime(-55, "minutes", "MMMM DD, YYYY, h:mm:ss a"),
  },
];
