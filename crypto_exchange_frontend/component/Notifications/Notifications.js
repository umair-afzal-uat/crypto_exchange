import { store } from "react-notifications-component";
const notifications = (type, title, message) =>
  store.addNotification({
    title,
    message,
    type, //success, danger, info, default, warning
    insert: "top",
    container: "bottom-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 4000,
      // onScreen: true,
    },
  });
export default notifications;
