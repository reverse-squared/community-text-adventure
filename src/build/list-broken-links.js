require("@babel/register");
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

// get information about the scenes, endings, and other things.
const WTA = require("web-text-adventure");
const sceneFiles = fs.readdirSync(path.join(__dirname, "../../scenes"));
sceneFiles.forEach(file => require(path.join(__dirname, "../../scenes", file)));

const scenes = WTA.getAllScenes();

Object.keys(scenes).forEach(scene => {
    let options = scenes[scene].options;
    if(typeof options === "function") options = options();
    if (options && options.forEach) {
        options.forEach((option, index) => {
            if(option.is === "seperator") return;
            if(!(option.to in scenes)) {
                // eslint-disable-next-line no-console
                console.error(`${chalk.red(`[Scene "${scene}":${index + 1}]`)} Cannot find scene "${option.to}"`);
            }
        });
    }
});