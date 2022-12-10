import Router from "koa-router";
import { conversation } from "../conversation.js";
import { generateImage } from "../generateImage.js";
import {Transform} from 'stream'

export const router = new Router();

router.post("/generateImage", async (ctx) => {
  const { prompt } = ctx.request.body;
  console.log("-----------", prompt)
  const imageUrl = await generateImage(prompt);

  ctx.body = {
    state: "ok",
    data: imageUrl,
  };
});

router.post("/conversation", async (ctx) => {
  const { question } = ctx.request.body;
  console.log(question)
  
  ctx.set("Cache-Control", "no-cache")
  ctx.set("Content-Type", "text/event-stream")
  ctx.set("Connection", "keep-alive")
  ctx.res.flushHeaders()

  const makeUpQuestions =
    " 句子里面的单词拼写对不对？这句子的语法对不对？帮我翻译成中文，并且告诉我这句话相关的语法知识,在给我举出几个类似的英语句子";
    
  const body = {data:""} 
  const answer = await conversation(question + makeUpQuestions, (s) => {
    console.log(s)
    body.data = s
      ctx.res.write(`data: ${JSON.stringify(body)}\n\n`);
  });
  ctx.res.end()
});
