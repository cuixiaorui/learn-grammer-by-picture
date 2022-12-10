import { Configuration, OpenAIApi } from "openai";


export async function generateImage(prompt) {
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(config);

  const response = await openai.createImage({
    prompt,
    size: "256x256",
    n: 1,
  });

  const imageUrl = response.data.data[0].url;

  return imageUrl;
}
