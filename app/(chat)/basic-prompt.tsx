import { ChatMessages } from "@/components/chat/ChatMessages";
import CustomInputBox from "@/components/chat/CustomInputBox";
import { useBasicPromptStore } from "@/store/basic-prompt/basicPrompt.store";
import { useShallow } from "zustand/react/shallow";
import { Layout } from "@ui-kitten/components";

const BasicPromptScreen = () => {
  const { messages, addMessage } = useBasicPromptStore(
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
