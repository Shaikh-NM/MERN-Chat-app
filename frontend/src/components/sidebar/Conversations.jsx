import Conversation from "./Conversation";

const Conversations = () => {
  return (
    // px-4 flex-1 border overflow-auto
    <div className="py-2 flex flex-col overflow-auto">
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </div>
  );
};
export default Conversations;
