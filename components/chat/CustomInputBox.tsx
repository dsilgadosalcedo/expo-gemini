import { Button, Input, Layout } from "@ui-kitten/components";
import { KeyboardAvoidingView, Platform } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
interface Props {
  attachments?: any[];
  onSendMessage: (message: string, attachments?: any[]) => void;
}

const CustomInputBox = ({ attachments = [], onSendMessage }: Props) => {
  const isAndroid = Platform.OS === "android";
  const iconColor = useThemeColor({}, "icon");

  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    onSendMessage(message);
    setMessage("");
  };

  return (
    <KeyboardAvoidingView
      behavior={isAndroid ? "height" : "padding"}
      keyboardVerticalOffset={isAndroid ? 0 : 85}
    >
      {/* Imágenes */}
      <Layout
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        {/* <Image
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={{ width: 50, height: 50, marginTop: 5 }}
        /> */}
      </Layout>

      {/* Espacio para escribir y enviar mensaje */}
      <Layout
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: isAndroid ? 10 : 20,
        }}
      >
        <Button
          appearance="ghost"
          accessoryRight={
            <Ionicons name="attach-outline" size={22} color={iconColor} />
          }
        />
        <Input
          placeholder="Escribe tu mensaje"
          multiline
          numberOfLines={4}
          style={{ flex: 1 }}
          value={message}
          onChangeText={setMessage}
        />
        <Button
          appearance="ghost"
          accessoryRight={
            <Ionicons name="paper-plane-outline" size={22} color={iconColor} />
          }
          onPress={handleSendMessage}
        />
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default CustomInputBox;
