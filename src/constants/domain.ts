export const domain =
  process.env.APP_ENV === "develop"
    ? "http://localhost:3000"
    : "https://hanghae-hangman.vercel.app/";
