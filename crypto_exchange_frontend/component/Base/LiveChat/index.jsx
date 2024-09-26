//import LiveChat from "react-livechat";
import { useSelector } from "react-redux";
const Livechat = () => {
  const { user } = useSelector((state) => state.users);
  return (
    <></>
    // <LiveChat
    //   license={13069947}
    //   visitor={{
    //     name: user ? `${user?.first_name} ${user?.last_name}` : "",
    //     email: user ? `${user.email}` : "",
    //   }}
    // />
  );
};

export default Livechat;
