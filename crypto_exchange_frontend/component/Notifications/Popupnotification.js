import { store } from "react-notifications-component";
const Popupnotification = (type, title, message) =>
  store.addNotification({
    title,
    message,
    type, //success, danger, info, default, warning
    insert: "top",
    container: "bottom-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      // onScreen: true,
    },
  });
export default Popupnotification;
