import axios from "axios";
// import { createReadStream } from "fs";

// 使用 Axios 发送一个 GET 请求
axios
  .get("http://localhost:8080/conversation", {
    responseType: "stream",
  })
  .then((response) => {
    console.log("???????")
    // console.log(response)
    /* const stream = response.data; */

    /* stream.on("data", (data) => { */
    /*   console.log(String(data)); */
    /* }); */

    /* stream.on("end", () => { */
    /*   console.log("stream done"); */
    /* }); */
  }).catch((e) => { 
    console.log("!!!!",e)


   });
// var es = require('event-stream')
// , reader = es.readArray([1, 2, 3])
// , writer = es.writeArray(function (err, array){
//   //array deepEqual [1, 2, 3]
// })

// reader.pipe(writer)