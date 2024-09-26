import dynamic from "next/dynamic";
const LiveChat = dynamic(() => import("../Base/LiveChat"), { ssr: false });

const Feedback = () => {
  return (
    <></>
    // <div className="feedback">
    //   <LiveChat />
    // </div>
  );
};

export default Feedback;
