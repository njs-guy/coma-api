const borderColor = "#323641";

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{svelte,js,ts}"],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				dark: {
					...["[data-theme=dark]"],
					"base-100": "#1f2329",
					"base-200": "#282c34",
					"base-300": "#30363f",
					"base-content": "#a0a8b7",
					"primary": "#4fa6ed",
					"error": "#e55561",
					"--btn-text-case": "none",
					".bg-deep": {
						"background-color": "#181b20",
					},
					".bg-border": {
						"background-color": borderColor,
					},
					".border-color": {
						"border-color": borderColor,
					},
					".type-select": {
						"background-color": "#000000",
					},
					".info-title": {
						color: "#535965",
					},
					".info-res": {
						"color": "#4fa6ed",
						"font-weight": "bold",
					},
					"::placeholder": {
						color: "#535965",
					},
				},
			},
		],
		darkTheme: "dark",
	},
};
