import axios from "axios";
import { fetchEventSource } from "@microsoft/fetch-event-source";

export function apiGenerateImage(prompt: string) {
  return axios.post("/api/generateImage", {
    prompt,
  });
}

export function apiConversation(
  question: string,
  onMessage: (data: string) => void
) {
  fetchEventSource("/api/conversation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
    onmessage(ev) {
      const data = JSON.parse(ev.data);
      onMessage(data.data);
    },
  });
}
