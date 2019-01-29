import React from "react";
import { addScenes } from "@src/ending";
import { addFlag } from "web-text-adventure/src/adventure";

addScenes({
    touch_main: {
        prompt: () => <div>
            <p>Hey looks like you found a path that doesn't exist. Turns out, we didn't have any ideas for this path, and gave up on it. Get a free ending yay!</p>
        </div>,
        ending: {
            id: "free-ending",
            name: "404 Ending Not Found",
            description: "Its literally been empty for like three weeks."
        },
        contributor: "Hunter"
    }
});
