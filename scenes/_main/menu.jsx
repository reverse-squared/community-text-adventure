import React from "react";
import { setScene, setConfig, getConfig } from "web-text-adventure";
import { addScenes, getGameProgress, getAllEndings } from "../../src/js/ending.jsx";
import Credits from "../../templates/credits.jsx";
import SceneLink from "../../templates/SceneLink.jsx";
import EndingCard from "../../templates/EndingCard.jsx";

function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = (date.getDate()).toString().padStart(2, "0");

    var hour = date.getHours();
    var minute = date.getMinutes();
    var ampm = hour >= 12 ? "pm" : "am";
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    minute = minute < 10 ? "0" + minute : minute;

    return `${year}-${month}-${day} at ${hour}:${minute}${ampm}`;
}

let debugOptions = {};
if(typeof localStorage !== "undefined" && localStorage.debug) {
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
        text: () => <span>{display}: <span style={{ color: getConfig(name) ? "greenyellow" : "red" }}>{ getConfig(name) ? "Enabled" : "Disabled" }</span></span>,
        to: "debug",
        action: () => {
            setConfig(name, !getConfig(name));
            debugOptions[name] = getConfig(name);
            localStorage.debug = JSON.stringify(debugOptions);
        }
    };
}

addScenes({
    // Introduction Paragraph
    start: {
        prompt: () => {
            const progress = getGameProgress();

            return <div>
                <p>
                    Welcome to the Community Text Adventure. All paths and options are
                    made by different people, collaborating to create a full game.
                </p>
                {
                    (!$hideDebug)
                        ? <div style={{color: "#AAA"}}>
                            <p>
                                This is the development version of CTA, so it will be updated more frequently,
                                but also may contain bugs.
                            </p>
                            <p>
                                Version {$version}, last built on {formatDate(new Date($buildtime))}.
                            </p>
                        </div>
                        : null
                }
                {
                    progress.percentage > 0
                        ?<div>
                            <p className="ending-status">
                                You have gotten {progress.achievedEndings} of {progress.totalEndings} endings ({(progress.percentage*100).toFixed(0)}% Completion)
                            </p>
                            <a href="#" className="resetgame" onClick={() => setScene("reset")}>Reset</a>
                        </div>
                        : null
                }
            </div>;
        },
        options: [
            { text: "Begin", to: "wakeup" },
            "seperator",
            { text: "Ending List", to: "endings", if: () => getGameProgress().achievedEndings > 0 },
            { text: "Credits", to: "credits", if: ()=> getGameProgress().achievedEndings > 0 },
            "seperator",
            { text: "Help Contribute", to: "start", action: () => {
                const win = window.open("https://discord.gg/qzH9wsY", "_blank");
                win.opener = null;
            }, if: ()=> getGameProgress().achievedEndings > 0 },
            "seperator",
            { text: "Debug Options", if: () => !$hideDebug, to: "debug" },
            { text: "Test Game Content", if: () => !$hideDebug, to: "lint_game_content" },
        ],
        noContributor: true,
    },
    credits: {
        prompt: () => <div>
            <SceneLink to="start">Back</SceneLink>
            <Credits />
        </div>,
        options: [],
        excludeEmptyOptionsCheck: true,
        noContributor: true,
    },
    endings: {
        prompt: () => {
            const progress = getGameProgress();
            const endings = getAllEndings();
            return <div>
                <SceneLink to="start">Back</SceneLink>
                <p className="ending-status">
                    You have gotten {progress.achievedEndings} of {progress.totalEndings} endings ({(progress.percentage * 100).toFixed(0)}% Completion)
                </p>
                {
                    Object.keys(endings).map(id => {
                        const ending = endings[id];

                        return <EndingCard ending={ending} />;
                    })
                }
            </div>;
        },
        options: [],
        excludeEmptyOptionsCheck: true,
        noContributor: true,
    },
});
