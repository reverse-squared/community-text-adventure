import { setScene } from "web-text-adventure";
import { addScenes, getGameProgress, getAllEndings } from "../src/ending.jsx";
import Credits from "../templates/credits.jsx";
import SceneLink from "../templates/SceneLink.jsx";
import EndingCard from "../templates/EndingCard.jsx";
import { resetGame } from "../src/ending.jsx";

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
        ]
    },
    credits: {
        prompt: <div>
            <SceneLink to="start">Back</SceneLink>
            <Credits />
        </div>,
        options: []
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
        options: []
    },
    reset: {
        prompt: <div>
            Are you sure you want to reset all game progress?
        </div>,
        options: [
            { text: "Yes, Reset.", action: () => resetGame(), to: "BLANKSCENE"},
            "seperator",
            { text: "No, do not.", to: "start"}
        ]
    },

    BLANKSCENE: {
        prompt: "<blank>",
        options:[],
        isBlank:true
    }
});