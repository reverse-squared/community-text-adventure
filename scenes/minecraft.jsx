import React from "react";
import { addScenes } from "../src/js/ending.jsx";
import { addFlag, setScene } from "web-text-adventure";

addFlag("sticks", 0);
addFlag("planks", 0);
addFlag("treesPunched", 0);

addScenes({
    minecraft_tree: {
        prompt: () => <div>
            <p>You punch some trees and get some wood (somehow), the next logical thing to do is to make some wood planks.</p>
            <p className="inventory-update">
                + 20 Wood Planks to inventory
            </p>
        </div>,
        options: [
            { text: "Create crafting table.", to: "minecraft_crafting_table" },
            { text: "Create sticks.", to: "minecraft_tree", disabledText: "Not enough sticks!", if: () => planks > 2, action: () =>  { sticks += 4; planks -= 2; } },
            { text: "Punch another tree.", to: "minecraft_tree", action: () => treesPunched++ },
        ],
        contributor: "Adr and Hunter"
    }
});