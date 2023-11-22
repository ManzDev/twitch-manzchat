const AVOCADO_AVATAR = "https://manz.dev/assets/avatars/default/d.png";

const checkAvatar = (user) => {
  const hasDefaultPicture = user.picture.includes("user-default-pictures-uv");

  if (hasDefaultPicture) {
    user.picture = AVOCADO_AVATAR;
  }

  return user;
};

export const getUserInfo = (user) =>
  fetch(`http://localhost:9999/api/userinfo/${user}`)
    .then(res => res.json())
    .then(user => checkAvatar(user));
