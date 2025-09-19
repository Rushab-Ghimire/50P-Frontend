import { ASSET_AVATARS } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";

export const authUser = {
  email: "manish@tileflexai.com",
  name: "Manish Tandukar",
  profile_pic: getAssetPath(`${ASSET_AVATARS}/avatar4.jpg`, `60x60`),
  handle: "manish@tileflexai.com",
  job_title: "Senior UI/UX",
};
