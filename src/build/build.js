// builds the game

require("module-alias/register");
require("@babel/register");

const fs = require("fs-extra");
const path = require("path");
const webpack = require("webpack");
const minifier = require("html-minifier");
const p_output_directory = JSON.parse(fs.readFileSync(path.join(__dirname, "../../package.json")).toString()).output_directory;

// get information about the scenes, endings, and other things.
const WTA = require("web-text-adventure");
const sceneFiles = [];

function requireDirRecursive(folder) {
    fs.readdirSync(folder).forEach(x => {
        if (fs.statSync(path.join(folder, x)).isDirectory()) {
            requireDirRecursive(path.join(folder, x));
        } else {
            if(!x.endsWith(".jsx")) return;
            require(path.join(folder, x));
            sceneFiles.push(path.join(folder, x).substr(path.join(__dirname, "../../scenes").length + 1).replace(/\\/g,"/"));
        }
    });
}
requireDirRecursive(path.join(__dirname, "../../scenes"));

const scenes = WTA.getAllScenes();
const endingScenes = Object.keys(scenes).filter(x => scenes[x].ending).map(x => scenes[x].ending.id).filter(function (elem, index, self) {
    return index === self.indexOf(elem);
}).length;

// make `dist` folder
const dist_folder = path.join(__dirname, "../../", p_output_directory);
fs.ensureDirSync(dist_folder);

// run `webpack --mode production`
const config = require("../../webpack.config.js")({
    production: true,
    extraDefines: {
        $endingCount: JSON.stringify(endingScenes),
        $dynamicFiles: JSON.stringify(sceneFiles.filter(x => x !== "_main/menu.jsx")),
    }
});
config.output.path = dist_folder;

webpack(config, (err, stats) => {
    // errors
    if (err) {
        // eslint-disable-next-line no-console
        console.error(err.stack || err);
        if (err.details) {
            // eslint-disable-next-line no-console
            console.error(err.details);
        }
        return;
    }

    const info = stats.toJson();

    // errors
    if (stats.hasErrors()) {
        // eslint-disable-next-line no-console
        console.error(info.errors.join("\n\n"));
    }

    // warnings
    if (stats.hasWarnings()) {
        // eslint-disable-next-line no-console
        console.warn(info.warnings.join("\n"));
    }

    // eslint-disable-next-line no-console
    console.log("build completed!");
});