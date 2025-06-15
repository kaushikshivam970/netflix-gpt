export const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const TMDB_IMAGE_BASE_URL  = "https://image.tmdb.org/t/p/w500/";
export const SUPPORTED_LANGUAGES = [
    {
        identifier:"en",name:"English",
    },
    {
        identifier:"hindi",name:"Hindi",
    },
    {
        identifier:"spanish",name:"Spanish",
    },
]

export const OPENAI_KEY = import.meta.env.VITE_OPENAI_SECRET_KEY;

export const GEMINI_KEY = import.meta.env.VITE_GEMINI_SECRET_KEY