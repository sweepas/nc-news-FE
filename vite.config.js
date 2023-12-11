import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

{
  /* <Route
            path="/articles/:topic/:article_id/"
            element={<SingleArticle />}
          ></Route> */
}
