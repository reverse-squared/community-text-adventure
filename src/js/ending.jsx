// Controls ending save progress
import React from "react";
import { addScenes as addScenesReal, setScene } from "web-text-adventure";
import EndingCard from "../../templates/EndingCard.jsx";

const endings = {};
const sceneStorage = {};
let endingStorage = [];

if (typeof localStorage !== "undefined") {
    if (!localStorage.endings) localStorage.endings = "";
    endingStorage = localStorage.endings.split(";");
}

export function addEnding(endingInfo) {
    if(endingInfo.id.includes(";")) throw new Error("Ending ID cannot have a ;");

    endingInfo.achieved = false;
    if(endingStorage.includes(endingInfo.id)) {
        endingInfo.achieved = true;
    }
    
    endings[endingInfo.id] = endingInfo;
}

export function getAllEndings() {
    return endings;
}

export function getGameProgress() {
    const totalEndings = (typeof $endingCount === "undefined") ? Object.keys(endings).length : $endingCount;
    const achievedEndings = Object.keys(endings).filter(id => endings[id].achieved).length;

    return {
        totalEndings,
        achievedEndings,
        percentage: achievedEndings / totalEndings
    };
}

export function achieveEnding(id) {
    if (!(id in endings)) return;

    endings[id].achieved = true;
    endingStorage.push(id);
    if(typeof localStorage !== "undefined") localStorage.endings = endingStorage.join(";");
}

export function resetGame() {
    localStorage.clear();
    location.reload();
}

var endingFlag = null;
var endingFlagAchieved = false;

addScenesReal({
    check_new_ending: {
        prompt: () => {
            if(endingFlag === null) return null;

            return <div>
                {
                    !endingFlagAchieved
                        ? <p style={{ textAlign: "center" }} className="ending-header flash">You discovered a new ending!</p>
                        : <p style={{ textAlign: "center" }} className="ending-header">You have already discovered this ending.</p>
                }
                
                <EndingCard ending={{ ...sceneStorage[endingFlag].ending, achieved: true }} />
            </div>;
        },
        options: [
            { text: "Continue", to: "start", action: () => endingFlag = null }
        ],
        action: () => {
            if(endingFlag === null) {
                setScene("start");
                endingFlag = null;
            }
        },
        noContributor: true,
    }
});

export function addScenes(scenes) {
    Object.keys(scenes).forEach(id => {
        if (scenes[id].ending) {
            sceneStorage[id] = scenes[id];
            addEnding(scenes[id].ending);
            
            const scenePrompt = scenes[id].prompt;
            scenes[id].prompt = () => <div>
                {
                    (typeof scenePrompt === "function")
                        ? scenePrompt()
                        : scenePrompt
                }
            </div>;

            if(!scenes[id].options) {
                scenes[id].options = [
                    {
                        text: "End.",
                        to: "check_new_ending"
                    }
                ];
            }

            const sceneAction = scenes[id].action;
            scenes[id].action = () => {
                endingFlag = id;
                
                endingFlagAchieved = scenes[id].ending.achieved;
                scenes[id].ending.achieved = true;
                achieveEnding(scenes[id].ending.id);
                if (sceneAction) sceneAction();
            };
        }
    });

    addScenesReal(scenes);
}