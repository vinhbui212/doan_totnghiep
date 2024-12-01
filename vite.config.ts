import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@views": path.resolve(__dirname, "./src/views"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@store": path.resolve(__dirname, "./src/store"),
			"@type": path.resolve(__dirname, "./src/type"),
			"@enum": path.resolve(__dirname, "./src/enum"),
			"@context": path.resolve(__dirname, "./src/context"),
			"@locales": path.resolve(__dirname, "./src/locales"),
			"@hooks": path.resolve(__dirname, "./src/hooks"),
		},
	},
});
