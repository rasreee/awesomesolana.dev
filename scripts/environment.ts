import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const environment = {
  supabase: {
    url: "https://ccjmpdfwphyobpoxzfel.supabase.co",
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjam1wZGZ3cGh5b2Jwb3h6ZmVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUwMzgzODEsImV4cCI6MTk2MDYxNDM4MX0.0EYr9kBj17GkbfeXzgFnzsFEulcytOcTFD_zOfuPkd4",
  },
  github: { accessToken: "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" },
};

export default environment;
