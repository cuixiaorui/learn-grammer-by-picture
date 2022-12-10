import * as dotenv from 'dotenv'
dotenv.config()
import Koa from "koa";
import serve from "koa-static";
import { koaBody } from "koa-body";
import { router } from "./routers/index.js";
import { fileURLToPath } from "url";

const app = new Koa();

const __dirname = fileURLToPath(new URL('.', import.meta.url));
app.use(serve(__dirname + "/static"));

app.use(
  koaBody({
    multipart: true,
  })
);

app.use(router.routes());


app.listen(8080, () => {
  console.log("open server localhost:8080");
});
