import { defineConfig } from "orval";

export default defineConfig({
  evo: {
    output: {
      mode: "tags",
      schemas: "models/api",
      target: "src/api/evo.ts",
      mock: false, // enable/disable test mock generation
      // I recommend enabling this option if you generate an api client
      prettier: true, 
      clean: true, // recreate the whole folder (avoid outdated files)
      override: {
        mutator: { name: "axiosInstance", path: "./lib/axios.ts" },
      },  

    },
    input: {
      target: "http://localhost:8080/v3/api-docs",
    },
  },
});