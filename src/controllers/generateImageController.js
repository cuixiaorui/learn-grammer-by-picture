
import {generateImage} from '../generateImage.js'

export class GenerateImageController{
	async generateImage(ctx){
  const { prompt } = ctx.request.body;
  const imageUrl = await generateImage(prompt);

  ctx.body = {
    state: "ok",
    data: imageUrl,
  };

	}

	
}
