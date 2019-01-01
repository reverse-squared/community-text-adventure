// Controls ending save progress
import { addScenes as addScenesReal } from "web-text-adventure";

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

            const sceneAction = scenes[id].action;
            scenes[id].action = () => {
                achieveEnding(scenes[id].ending.id);
                if (sceneAction) sceneAction();
            };
        }
    });

    addScenesReal(scenes);
}