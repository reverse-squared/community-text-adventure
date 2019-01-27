// contains debug scenes and some fancy required ones
import React from "react";
import { setConfig, getConfig, getAllScenes } from "web-text-adventure/src/adventure";
import { addScenes, resetGame } from "@src/ending";
import SceneLink from "@templates/SceneLink";

let debugOptions = {};
if (typeof localStorage !== "undefined" && localStorage.debug) {
    try {
        debugOptions = JSON.parse(localStorage.debug);
        Object.keys(debugOptions).forEach(opt => setConfig(opt, debugOptions[opt]));
    } catch (e) {
        debugOptions = {};
    }
}

function debugBooleanOption(name, display) {
    return {
        // text: () => `${display}: ${}`,
        text: () => <span>{display}: <span style={{ color: getConfig(name) ? "greenyellow" : "red" }}>{getConfig(name) ? "Enabled" : "Disabled"}</span></span>,
        to: "debug",
        action: () => {
            setConfig(name, !getConfig(name));
            debugOptions[name] = getConfig(name);
            localStorage.debug = JSON.stringify(debugOptions);
        }
    };
}

addScenes({
    debug: {
        prompt: <div>
            <h2>Debug Options</h2>
        </div>,
        options: [
            { text: "Back", to: "start" },
            "seperator",
            debugBooleanOption("debugPanel", "Debug Panel"),
            debugBooleanOption("showBrokenLinks", "Always Highlight Broken Links"),
        ],
        noContributor: true,
    },
    reset: {
        prompt: () => <div>
            Are you sure you want to reset all game progress?
        </div>,
        options: [
            { text: "Yes, reset all progress", action: () => resetGame(), to: "BLANKSCENE" },
            "seperator",
            { text: "No, do not", to: "start" },
        ],
        noContributor: true,
    },
    lint_game_content: {
        prompt: () => <div>
            <SceneLink to="start">Back</SceneLink>
            <h2>Broken Links</h2>
            <p>
                Here is a list of scenes with broken links, you can warp to any of them from here, but they may not function properly if part of an advanced path. You should make sure to <SceneLink to="debug">enable "always show broken links"</SceneLink>.
            </p>
            <ul>
                {(() => {
                    getAllScenes();
                    const scenes = getAllScenes();
                    return Object.keys(scenes).filter(scene => {
                        let options = scenes[scene].options;
                        if (typeof options === "function") options = options();
                        if (options && options.forEach) {
                            return options.some((option, index) => {
                                if (option.is === "seperator") return;
                                if (!(option.to in scenes)) {
                                    return true;
                                }
                            });
                        }
                        return false;
                    }).map(x => {
                        return <li key={x}><SceneLink to={x}>{x}</SceneLink></li>;
                    });
                })()}
            </ul>
            <h2>Empty Options Array</h2>
            <p>
                Here is another debug list, containing the scenes with empty options, you can exclude a scene from here by setting <code style={{ color: "lime" }}>excludeEmptyOptionsCheck: true</code>.
            </p>
            <ul>
                {(() => {
                    const scenes = getAllScenes();
                    return Object.keys(scenes).filter(scene => {
                        if (scenes[scene].excludeEmptyOptionsCheck) return false;
                        let options = scenes[scene].options;
                        if (typeof options === "function") options = options();
                        if (options) {
                            return options.length === 0;
                        }
                        return false;
                    }).map(x => {
                        return <li key={x}><SceneLink to={x}>{x}</SceneLink></li>;
                    });
                })()}
            </ul>
            <h2>No contributor</h2>
            <p>
                This list shows scenes without a contributor, add <code style={{ color: "lime" }}>noContributor: true</code>.
            </p>
            <ul>
                {(() => {
                    const scenes = getAllScenes();
                    return Object.keys(scenes).filter(scene => {
                        if (scene === "null") return false;
                        if (scenes[scene].noContributor) return false;
                        if (scenes[scene].contributor) return false;
                        return true;
                    }).map(x => {
                        return <li key={x}><SceneLink to={x}>{x}</SceneLink></li>;
                    });
                })()}
            </ul>
        </div>,
        options: [],
        excludeEmptyOptionsCheck: true,
        noContributor: true,
    },

    // used for 
    BLANKSCENE: {
        prompt: "<blank>",
        options: [],
        isBlank: true,
        excludeEmptyOptionsCheck: true,
        noContributor: true,
    }
});

