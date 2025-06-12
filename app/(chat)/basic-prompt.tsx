import { ChatMessages } from "@/components/chat/ChatMessages";
import CustomInputBox from "@/components/chat/CustomInputBox";
import { useBasicPromptStreamStore } from "@/store/basic-prompt/basicPromptStream.store";
import { useShallow } from "zustand/react/shallow";
import { Layout } from "@ui-kitten/components";

const BasicPromptScreen = () => {
  const { messages, addMessage } = useBasicPromptStreamStore(
    useShallow((state) => state)
  );

  return (
    <Layout style={{ flex: 1 }}>
      <ChatMessages messages={messages} />

      <CustomInputBox onSendMessage={addMessage} />
    </Layout>
  );
};

export default BasicPromptScreen;
