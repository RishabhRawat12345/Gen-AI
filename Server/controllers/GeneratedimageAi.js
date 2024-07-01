import * as dotenv from 'dotenv';
import Replicate from 'replicate';
import { createError } from '../error.js';

dotenv.config();

// Setup Replicate API key
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Function to generate an image
export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return next(createError(400, "Prompt is required"));
    }

    const input = {
      prompt,
      num_images: 1,
      image_size: "1024x1024",
      scheduler: "K_EULER",
    };

    const output = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      { input }
    );

    const generatedImage = output[0];
    return res.status(200).json({ photo: generatedImage });
  } catch (error) {
    next(
      createError(
        error.status || 500,
        error?.response?.data?.error?.message || error?.message
      )
    );
  }
};
