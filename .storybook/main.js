const path = require('path')

const fs = require("fs");
const { merge } = require("webpack-merge");

const toPath = (_path) => path.join(process.cwd(), _path);


module.exports = {
	stories: ["../src/**/**/*.stories.tsx"],
	addons: [
		"@storybook/addon-actions",
		"@storybook/addon-links",
		"@storybook/addon-docs",
		"@storybook/addon-essentials",
	],
	
	webpackFinal: async (config) => {
		config.resolve.alias = {
      ...config.resolve.alias,
			          /**
           * Map Emotion 10 libraries to Emotion 11 libraries.
           *
           * Otherwise Storybook fails to compile with "Module not found: Error: Can't resolve '@emotion/styled/base'", etc.
           * It wasn't necessary to do this until we imported React component using "@emotion/styled".
           * This issue is probably caused because Storybook uses Emotion 10 while we have Emotion 11 used by the Next.js app.
           *
           * @see https://github.com/storybookjs/storybook/issues/13277#issuecomment-751747964
           */
					'@emotion/core': toPath('node_modules/@emotion/react'),
					 '@emotion/styled': toPath('node_modules/@emotion/styled'),
					 'emotion-theming': toPath('node_modules/@emotion/react'),
					     /**
           * Map our module path aliases, so that Storybook can understand modules loaded using "@/common" and load the proper file.
           * Required, or Storybook will fail to import dependencies from Stories.
           *
           * XXX The below list must match `tsconfig.json:compilerOptions.paths`, so the Next.js app and Storybook resolve all aliases the same way.
           *  The paths mapping must also match the `jsconfig.json:compilerOptions.paths` file, which is necessary for WebStorm to understand them for .js files.
           *
           * @see https://nextjs.org/docs/advanced-features/module-path-aliases
           * @see https://intellij-support.jetbrains.com/hc/en-us/community/posts/360003361399/comments/360002636080
           */
								"@/theme": path.resolve(__dirname, "../src/theme"),
								"@/ui": path.resolve(__dirname, "../src/ui"),
								"@/modules": path.resolve(__dirname, "../src/modules"),
								"@/common": path.resolve(__dirname, "../src/common"),
								"@/models": path.resolve(__dirname, "../src/models"),
    }

		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			use: [
				require.resolve("babel-loader"),
				{
					loader: require.resolve("babel-loader"),
					options: {
						presets: [["react-app", { flow: false, typescript: true }]],
					},
				},
			],
		});

    config.module.rules.push({
      test: /\.stories\.tsx?$/,
      loaders: [require.resolve("@storybook/source-loader")],
      enforce: "pre",
    });

		config.resolve.extensions.push(".ts", ".tsx");
		return config;
	},
};
