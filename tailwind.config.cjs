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
					...require("daisyui/src/colors/themes")[
						"[data-theme=dark]"
					],
					"base-100": "#1f2329",
					"base-200": "#282c34",
					"base-300": "#30363f",
					"base-content": "#a0a8b7",
					"primary": "#7e3992",
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
					".request-type-select": {
						"background-color": "#0e1013",
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
