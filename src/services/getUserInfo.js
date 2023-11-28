import { DEFAULT_AVATAR } from "../modules/config.js";

const checkAvatar = (user) => {
  const hasDefaultPicture = user.picture.includes("user-default-pictures-uv");

  if (hasDefaultPicture) {
    user.picture = DEFAULT_AVATAR;
  }

  return user;
};

export const getUserInfo = (user) =>
  fetch(`http://localhost:9999/api/userinfo/${user}`)
    .then(res => res.json())
    .then(user => checkAvatar(user));
