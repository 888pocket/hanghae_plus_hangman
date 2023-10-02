export const domain =
  process.env.APP_ENV == "production"
    ? "https://hanghae-hangman.vercel.app/"
    : "http://localhost:3000";
