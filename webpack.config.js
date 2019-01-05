const path = require("path");
const webpack = require("webpack");
const packageJson = require("./package.json");

module.exports = (env = {production: false}, argv) => ({
    entry: "./src/loader.jsx",
    output: {
        path: path.resolve(__dirname),
        filename: "adventure.js"
    },
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, "src")
    },
    plugins: [
        ...(env.production ? [] : [new webpack.HotModuleReplacementPlugin()]),
        new webpack.DefinePlugin({
            $hideDebug: JSON.stringify(env.production && !(process.env.SHOW_DEBUG_TOOLS !== "false" && process.env.SHOW_DEBUG_TOOLS !== undefined)),
            $version: JSON.stringify(packageJson.version),
            $buildtime: JSON.stringify(Date.now()),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    externals: {
        "react-dom": "ReactDOM",
        "react": "React",
    },
    mode: env.production ? "production" : "development",
});