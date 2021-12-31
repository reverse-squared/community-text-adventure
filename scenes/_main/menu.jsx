import React from "react";
import { setScene, setConfig, getConfig, addFlag } from "web-text-adventure/src/adventure";
import { addScenes, getGameProgress, getAllEndings } from "@src/ending";
import Credits from "@templates/Credits";
import SceneLink from "@templates/SceneLink";
import EndingCard from "@templates/EndingCard";

const isDesktopVersion = eval("typeof require === \"function\"") === true;

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

addFlag("hideAchieved", false);
addFlag("hideUnAchieved", false);
function toggleHideAchieved() {
    hideAchieved = !hideAchieved;
    addFlag("hideAchieved", hideAchieved);
}
function toggleHideUnAchieved() {
    hideUnAchieved = !hideUnAchieved;
    addFlag("hideUnAchieved", hideAchieved);
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
                        ? <div>
                            <p className="ending-status">
                                You have gotten {progress.achievedEndings} of {progress.totalEndings} endings ({(progress.percentage * 100).toFixed(0)}% Completion)
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
            // { text: () => <span style={{color: "#64ed98" }}><strong>[NEW]</strong> Play CTA: Season 2</span>, to: "start", action: () => {
            //     window.location = "https://cta2.davecode.me";
            // }},
            { text: "Chat on Discord", to: "start", action: () => {
                const win = window.open("https://discord.gg/4AbvSXV", "_blank");
                win.opener = null;
            }},
            { text: "More by Dave Caruso", to: "start", action: () => {
                const win = window.open("https://davecode.net", "_blank");
                win.opener = null;
            }},
            "seperator",
            { text: "Debug Options", if: () => getGameProgress().achievedEndings > 0, to: "debug" },
            // i dont think this is important since the linting currently passes
            //{ text: "Debug Tests", if: () => getGameProgress().achievedEndings > 0, to: "lint_game_content" },
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
    "\"tutorial\"": {
        prompt: () => <div>
            <p>
                Community Text Adventure is a game about different endings,
                there are many different ways you can have the story play out.
                Now that you got your first ending, it's time to get
                all {getGameProgress().totalEndings} endings.
            </p>
        </div>,
        options: [
            { text: "Go to Main Menu", to: "start" }
        ],
        noContributor: true
    },
    endings: {
        prompt: () => {
            const progress = getGameProgress();
            const endings = getAllEndings();
            return <div style={{zoom:"0.8"}}>
                <div className="stick-ending-status">
                    <SceneLink to="start">Back</SceneLink>
                    <p className="ending-status">
                        You have gotten {progress.achievedEndings} of {progress.totalEndings} endings ({(progress.percentage * 100).toFixed(0)}% Completion)
                    </p>
                </div>
                <h2>Achieved Endings <a href="#" style={{fontSize: "0.6em"}} onClick={toggleHideAchieved}>{hideAchieved ? "Unhide" : "Hide"}</a></h2>
                {
                    !hideAchieved &&
                    Object.keys(endings).filter(id => endings[id].achieved).map(id => {
                        const ending = endings[id];

                        return <EndingCard key={id} ending={ending} />;
                    })
                }
                <h2>Locked Endings <a href="#" style={{fontSize: "0.6em"}} onClick={toggleHideUnAchieved}>{hideUnAchieved ? "Unhide" : "Hide"}</a></h2>
                {
                    !hideUnAchieved &&
                    Object.keys(endings).filter(id => !endings[id].achieved).map(id => {
                        const ending = endings[id];

                        return <EndingCard key={id} ending={ending} />;
                    })
                }
            </div>;
        },
        options: [],
        excludeEmptyOptionsCheck: true,
        noContributor: true,
    },
});
