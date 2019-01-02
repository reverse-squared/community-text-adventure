// Controls ending save progress
import { addScenes as addScenesReal, setScene } from "web-text-adventure";
import EndingCard from "../templates/EndingCard.jsx";

const endings = {};
const sceneStorage = {};

if (!localStorage.endings) localStorage.endings = "";
let endingStorage = localStorage.endings.split(";");

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
    const totalEndings = Object.keys(endings).length;
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
    localStorage.endings = endingStorage.join(";");
}

export function resetGame() {
    localStorage.clear();
    location.reload();
}

var endingFlag = null;

addScenesReal({
    check_new_ending: {
        prompt: () => {
            if(endingFlag === null) return null;

            return <div>
                <p style={{ textAlign: "center" }} className="ending-header">You discovered a new ending!</p>
                <EndingCard ending={sceneStorage[endingFlag].ending} hideAchievedState />
            </div>;
        },
        options: [
            { text: "Continue", to: "start" }
        ],
        action: () => {
            if(endingFlag === null) {
                setScene("start");
                endingFlag = null;
            }
        },
        contributor: null
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
                if (!scenes[id].ending.achieved) endingFlag = id;
                
                scenes[id].ending.achieved = true;
                achieveEnding(scenes[id].ending.id);
                if (sceneAction) sceneAction();
            };
        }
    });

    addScenesReal(scenes);
}