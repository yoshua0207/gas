/* @flow */
"use strict";

const path = require("path");
const fs = require("fs");

let nodeModules = {};
fs.readdirSync("node_modules")
  .filter((x) => [".bin"].indexOf(x) === -1)
  .forEach((mod) => nodeModules[mod] = "commonjs " + mod);

module.exports = [
    {
        name: "Client Build",
        entry : {
            app: path.resolve(__dirname, "src/app-client.jsx"),
        },
        output: {
            path    : path.join(__dirname, "build", "public"),
            filename: "js/[name].bundle.js"
        },
        target: "web",
        module: {
            loaders: [
                {
                    test          : /\.jsx?$/,
                    exclude       : /(node_modules)/,
                    loader        : "babel-loader",
                    cacheDirectory: true,
                    query         : {
                        presets: [
                            "es2015",
                            "react"
                        ],
                        plugins: [
                            "transform-flow-strip-types"
                        ]
                    }
                },
                {   // copy static (public) resources to build folder
                    test   : /\.(html|css)$/,
                    exclude: /(node_modules)/,
                    loader :
                        `file-loader?name=[path][name].[ext]&context=${
                            path.resolve(__dirname, "public/")}`
                }
            ]
        },
        resolve: {
            extensions: ["", ".js", ".jsx"]
        },
        devServer: {
            historyApiFallback: true,
            inline            : true,
            colors            : true,
            progress          : true,
            open              : true,
            contentBase       : path.resolve(__dirname, "public/"),
            port              : 7777
        },
        devtool: "source-map"
    }
];
