import React from "react";
import { addScenes } from "@src/ending";
import { addFlag, setScene } from "web-text-adventure/src/adventure";

addScenes({
    // #region Uber
    uber_start: {
        prompt: () => <div>
            <p>It turns out that this is a christian race. You get kicked into a painting, and you are in Bomb Omb Battlefield.</p>
        </div>,
        options: [
            { text: "Say FRICK again", to: "hash_potatokart_fricc2" },
            { text: "Speak to the bomb dudes", to: "speak_to_bomb_dudes" },
            { text: "Go forward", to: "hash_potatokart_fricc_foward" },
            { text: "Try to do a BLJ", to: "hash_potatokart_blj" },
            { text: "Leave the level", to: "leave_the_level" },
            { text: "Stand there", to: "stand" }
        ],
        contributor: "Durvenson"
    }
    // #endregion
});
