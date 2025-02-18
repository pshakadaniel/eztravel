import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import vitePluginSitemap from "vite-plugin-sitemap";

// Example function to fetch real trip IDs from an API or database
async function getTripIDs() {
  try {
    // Simulate fetching from an API (Replace with actual API call)
    return ["1738751010640", "1738854488524", "1739605085777"]; // Replace with real trip IDs
  } catch (error) {
    console.error("Error fetching trip IDs:", error);
    return []; // Return an empty array if fetching fails
  }
}

export default defineConfig(async () => {
  const tripIDs = await getTripIDs(); // Fetch dynamic routes

  return {
    plugins: [
      react(),
      tailwindcss(),
      vitePluginSitemap({
        hostname: "https://eztraveldp.vercel.app", // Your actual domain
        dynamicRoutes: [
          "/sign-in",
          "/create-trip",
          "/my-trips",
          ...tripIDs.map((id) => `/view-trip/${id}`), // Generate real trip URLs
        ],
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
