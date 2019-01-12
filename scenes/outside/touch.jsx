import React from "react";
import { addScenes } from "@src/ending";
import { addFlag } from "web-text-adventure";

addScenes({
    touch_main: {
        prompt: () => <div>
            <p></p>
        </div>,
        options: [
            { text: "", to: "" },
            { text: "", to: "" },
            { text: "", to: "" }
        ],
        contributor: "Dave"
    }
});
