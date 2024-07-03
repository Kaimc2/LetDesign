import Pusher from "pusher-js";
import Echo from "laravel-echo";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const pusher = Pusher;

// const storedUser = localStorage.getItem("user");
// const user = storedUser ? JSON.parse(storedUser) : null;
// const accessToken = user ? user.accessToken : null;

const echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_APP_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_APP_PUSHER_APP_CLUSTER,
  forceTLS: true,
  encrypted: true,
  // authEndpoint: "http://127.0.0.1:8000/broadcasting/auth",
  // auth: {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // },
});

export default echo;