import { ChatGPTAPI } from "chatgpt";

export async function conversation(question, onProgress) {
  console.log(process.env.CHATGPT_API_TOKEN)
  const api = new ChatGPTAPI({
    sessionToken: process.env.CHATGPT_API_TOKEN,
  });

  await api.ensureAuth();
  const response = await api.sendMessage(question, {
    onProgress,
  });

  return response;
}
