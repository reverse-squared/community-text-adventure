// Controls ending save progress
import { addScenes as addScenesReal } from "web-text-adventure";
import EndingCard from "../templates/endingCard.jsx";

const endings = {};

export function addEnding(endingInfo) {
    endingInfo.achieved = false;
    // TODO: LocalStorage if ending taken.
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
    // TODO: LocalStorage
}

export function addScenes(scenes) {
    Object.keys(scenes).forEach(id => {
        if (scenes[id].ending) {
            addEnding(scenes[id].ending);
            
            const scenePrompt = scenes[id].prompt;
            scenes[id].prompt = () => <div>
                {
                    (typeof scenePrompt === "function")
                        ? scenePrompt()
                        : scenePrompt
                }
                {
                    !scenes[id].ending.achieved
                        ? <div>
                            <br/>
                            <p style={{ color: "aquamarine", textAlign: "center"}}>You discovered a new ending!</p>
                            <EndingCard ending={scenes[id].ending} hideAchievedState/>
                        </div>
                        : null
                }
            </div>;

            if(!scenes[id].options) {
                scenes[id].options = [
                    {
                        text: "End",
                        to: "start"
                    }
                ]
            }

            const sceneAction = scenes[id].action;
            scenes[id].action = () => {
                achieveEnding(scenes[id].ending.id);
                if (sceneAction) sceneAction();
            };
        }
    });

    addScenesReal(scenes);
}