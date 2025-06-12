import * as GeminiActions from "@/actions/gemini";
import { Message, Sender } from "@/interfaces/chat.interfaces";
import { create } from "zustand";

interface BasicPromptState {
  isGeminiWriting: boolean;
  messages: Message[];
  setIsGeminiWriting: (isGeminiWriting: boolean) => void;
  addMessage: (text: string) => void;
}

const createMessage = (text: string, sender: Sender): Message => ({
  id: crypto.randomUUID(),
  createdAt: new Date(),
  sender,
  type: "text",
  text,
});

export const useBasicPromptStreamStore = create<BasicPromptState>()((set) => ({
  isGeminiWriting: false,
  messages: [],
  setIsGeminiWriting: (isGeminiWriting) => set({ isGeminiWriting }),
  addMessage: async (message) => {
    const userMessage = createMessage(message, "user");
    const geminiMessage = createMessage("Thinking...", "gemini");

    set((state) => ({
      messages: [geminiMessage, userMessage, ...state.messages],
    }));

    try {
      GeminiActions.getBasicPromptStream(message, (chunk) => {
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === geminiMessage.id ? { ...msg, text: chunk } : msg
          ),
        }));
      });
    } catch (error) {
      set((state) => ({
        messages: state.messages.map((message) =>
          message.id === geminiMessage.id
            ? createMessage(
                "Sorry, I couldn't process your request. Please try again later.",
                "gemini"
              )
            : message
        ),
      }));
    }
  },
}));
