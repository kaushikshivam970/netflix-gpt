import { client } from "../../../utils/openAI";
import { ai } from "../../../utils/gemini";
import apiEndPoints from "./apiEndPoints";
import {getReq} from "../../../RootService/index"

const{MOVIESEARCH} = apiEndPoints

export const chatWithGPT = async (message) => {
  try {
    const resposne = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: message }],
    });
    return resposne;
  } catch (error) {
    console.log(error);
  }
};

export const chatWithGemini = async (message) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: message,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const searchMovies = async (names) => {
  try {
    const responses = await Promise.all(
      names.map((name) =>
        getReq(
          MOVIESEARCH +
            encodeURIComponent(name) +
            '&include_adult=false&language=en-US&page=1'
        )
      )
    );
    return responses;
  } catch (error) {
    console.log('Error searching movies:', error);
    return []; // optional: fallback in case of error
  }
};

