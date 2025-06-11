import * as GeminiActions from "@/actions/gemini/basic-prompt.action";
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

export const useBasicPromptStore = create<BasicPromptState>()((set) => ({
  isGeminiWriting: false,
  messages: [],
  setIsGeminiWriting: (isGeminiWriting) => set({ isGeminiWriting }),
  addMessage: async (message) => {
    const userMessage = createMessage(message, "user");

    set((state) => ({
      isGeminiWriting: true,
      messages: [userMessage, ...state.messages],
    }));

    try {
      const response = await GeminiActions.getBasicPrompt(message);
      const geminiMessage = createMessage(response, "gemini");
      set((state) => ({
        isGeminiWriting: false,
        messages: [geminiMessage, ...state.messages],
      }));
    } catch (error) {
      const errorMessage = createMessage(
        "Sorry, I couldn't process your request. Please try again later.",
        "gemini"
      );
      set((state) => ({
        isGeminiWriting: false,
        messages: [errorMessage, ...state.messages],
      }));
    }
  },
}));
