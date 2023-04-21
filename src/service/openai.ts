import { Configuration, OpenAIApi } from 'openai';

const API_KEY: string = import.meta.env.VITE_OPENAI_API_KEY
const COMPLETION_MODEL: string = import.meta.env.VITE_OPENAI_COMPLETION_MODEL
const EDIT_MODEL: string = import.meta.env.VITE_OPENAI_EDIT_MODEL
const TEMPERATURE: number = parseFloat(import.meta.env.VITE_OPENAI_TEMPERATURE)
const N: number = parseInt(import.meta.env.VITE_OPENAI_N)
const IMAGE_N: number = parseInt(import.meta.env.VITE_OPENAI_IMAGE_N)
const MAX_TOKENS: number = parseInt(import.meta.env.VITE_OPENAI_MAX_TOKENS)
const FREQUENCY_PENALTY: number = parseFloat(import.meta.env.VITE_OPENAI_FREQUENCY_PENALTY)
const PRESENCE_PENALTY: number = parseFloat(import.meta.env.VITE_OPENAI_PRESENCE_PENALTY)

//Configuration
const configuration: Configuration = new Configuration({
  apiKey: API_KEY,
  });

const openai : OpenAIApi = new OpenAIApi(configuration);

//generate answear
export const CreateCompletionRequest = async (prompt: string): Promise<string> =>{
    let responseText: string;

    const response = await openai.createCompletion({
      model: COMPLETION_MODEL,
      prompt: prompt,
      temperature: TEMPERATURE,
      n: N,
      max_tokens: MAX_TOKENS,
      frequency_penalty: FREQUENCY_PENALTY,
      presence_penalty: PRESENCE_PENALTY,
    })    

    responseText = response.data.choices.map(text => text.text).toString()

    return responseText
  }
  
// edit the input
export const CreateEditRequest = async (prompt: string, insctruction: string): Promise<string> =>{
    let responseText: string;

    const response = await openai.createEdit({
      model: EDIT_MODEL,
      input: prompt,
      instruction: insctruction,
    });

    responseText = response.data.choices.map(text => text.text).toString()

    return responseText
  }

//generate picture
export const CreateImageRequest = async (prompt: string): Promise<string[]> =>{
    let responseUrls: string[];

    const response = await openai.createImage({
      prompt: prompt,
      n: IMAGE_N,
      size: "1024x1024",
      response_format: "url"
    });

    responseUrls = response.data.data.map(url => {
      if (typeof(url.url) !== 'undefined'){
        return url.url
      }
    }) as string[]

    return responseUrls
  }
