import React from "react";
import { addScenes } from "@src/ending";
import { addFlag } from "web-text-adventure";

addScenes({
    touch_main: {
        prompt: () => <div>
            <p>TODO: yes we know this is empty, (dave: im not sure what goes here or what the plan is)</p>
        </div>,
        options: [
            { text: "", to: "" },
            { text: "", to: "" },
            { text: "", to: "" }
        ],
        contributor: "Dave"
    }
});
