import { fetch } from "expo/fetch";

const API_URL = process.env.EXPO_PUBLIC_GEMINI_API_URL;

export const getBasicPromptStream = async (
  prompt: string,
  callback: (chunk: string) => void
) => {
  const response = await fetch(`${API_URL}/basic-prompt-stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "plain/text",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.body) {
    throw new Error("Failed to get basic prompt stream");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let result = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    result += chunk;
    callback(result);
  }

  return result;
};
