require("module-alias/register");
require("@babel/register");

const fs = require("fs-extra");
const path = require("path");
const React = require("react");

// get information about the scenes, endings, and other things.
const WTA = require("web-text-adventure");
const files = [];

function requireDirRecursive(folder) {
    fs.readdirSync(folder).forEach(x => {
        if (fs.statSync(path.join(folder, x)).isDirectory()) {
            requireDirRecursive(path.join(folder, x));
        } else {
            const file = path.join(folder, x).substring(path.join(__dirname, "../scenes/").length).replace(/\\/g, "/");
            if(file === "template.jsx") return;
            files.push(file);
            require(path.join(folder, x));
            const scenes = WTA.getAllScenes();
            Object.keys(scenes).forEach(scene => {
                if(scene === null) return;
                if(scene === "null") return;
                scenes[scene].ORIGIN_FILE = scenes[scene].ORIGIN_FILE || file;
            });
        }
    });
}
requireDirRecursive(path.join(__dirname, "../scenes"));

const scenes = WTA.getAllScenes();

global.$hideDebug = true;
global.$version = "TEST_BUILD";
global.$buildtime = Date.now();

function tryScene(scene) {
    if (!scenes[scene].prompt) {
        throw new Error("Scene is missing a prompt");
    }

    if (!React.isValidElement(scenes[scene].prompt) && typeof scenes[scene].prompt !== "string" && typeof scenes[scene].prompt !== "function") {
        throw new Error("Scene has an invalid prompt type");
    }

    if (!scenes[scene].options) {
        throw new Error("Scene is missing an options array");
    }

    var options = scenes[scene].options;
    if (typeof options === "function") options = options();

    if (!Array.isArray(options)) {
        throw new Error("Scene has an options value but it is not an array or function that returns an array.");
    }

    for (var i = 0; i < options.length; i++) {
        var element = options[i];
        if (element.is === "seperator") continue;

        if (typeof element.text !== "string" && typeof element.text !== "function") {
            throw new Error(`Option #${i} does not contain a prompt (${element.text}), expecting function or string).`);
        }

        if (typeof element.to !== "string" && element.to !== null) {
            throw new Error(`Option #${i} does not contain a valid "to" property`);
        }

        if (typeof element.text === "string" && element.text.endsWith(".") && !element.text.endsWith("...")) {
            throw new Error(`Option #${i} ends with a period! Standard is to not do this!`);
        }
    }

    if(scenes[scene].ending) {
        if (!scenes[scene].ending.description.endsWith(".") && !scenes[scene].ending.description.endsWith("...") && !scenes[scene].ending.description.endsWith("!") && !scenes[scene].ending.description.endsWith("?")) {
            throw new Error("Ending does not end with a period or punctionation mark.");
        }
        if (scenes[scene].ending.name.endsWith(".") && !scenes[scene].ending.name.endsWith("...")) {
            throw new Error("Ending name ends with a period, standard is not to do this.");
        }
    }
}

describe("Scenes Render Properly", function() {
    files.forEach(file => {
        describe(file, function() {
            Object.keys(scenes).filter(name => scenes[name].ORIGIN_FILE === file).forEach(scene => {
                if(scene === "null") return;
                if(scene === "BLANKSCENE") return;
        
                it(scene, function() {
                    try {
                        tryScene(scene);
                    } catch (error) {
                        throw new Error(error.message + "\n\nIn: " + path.join(__dirname,"../scenes/",file) + "\n");
                    }
                });
            });
        });
    });
    
});
