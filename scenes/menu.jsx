import { setScene } from "web-text-adventure";
import { addScenes, getGameProgress } from "../src/ending.jsx";
import Credits from "../templates/credits.jsx";

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
                        ? <p className="ending-status">
                            You have gotten {progress.achievedEndings} of {progress.totalEndings} endings ({(progress.percentage*100).toFixed(0)}% Completion)
                        </p>
                        : null
                }
            </div>;
        },
        options: [
            { text: "Begin", to: "wakeup" },
            "seperator",
            { text: "Credits", to: "credits", if: ()=> getGameProgress().achievedEndings > 0 },
            { text: "Ending List", to: "endings", if: () => getGameProgress().achievedEndings > 0 },
        ],
        contributor: null
    },
    credits: {
        prompt: <div>
            <a href="#" onClick={() => setScene("start")}>Back</a>
            <Credits />
        </div>,
        options: [],
        contributor: null
    }
});