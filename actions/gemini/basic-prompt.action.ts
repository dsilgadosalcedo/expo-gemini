import geminiApi from "@/actions/gemini.api";

export const getBasicPrompt = async (prompt: string) => {
  const response = await geminiApi.post(
    "/basic-prompt",
    { prompt },
    {
      responseType: "text",
    }
  );
  return response.data;
};
