import React, {Fragment} from "react";
import { addScenes } from "@src/ending";
import { addFlag, setScene } from "web-text-adventure";

const inventoryData = {};

const itemToName = {
    log: "Oak Log",
    stick: "Stick",
    plank: "Oak Wood Planks",
};

const Inventory = () => <div>
    <h3>Inventory</h3>
    <p>
        {
            Object.keys(inventoryData).filter(key => inventoryData[key] !== 0).map(key => <Fragment key={key}>
                {itemToName[key] || "item." + key}: {inventoryData[key]}
            </Fragment>)
        }
    </p>
</div>;

function addItem(type, num) {
    inventoryData[type] = getItem(type) + num;
}

function getItem(type) {
    return inventoryData[type] || 0;
}

function hasItem(type, num) {
    return getItem(type) >= num;
}

function removeItem(type, num) {
    inventoryData[type] = getItem(type) - num;
}

// Stats
addFlag("treesPunched", 0);

addScenes({
    minecraft_tree: {
        prompt: () => <div>
            <p>You punch some trees and get some wood (somehow), the next logical thing to do is to make some wood planks.</p>
            
            <Inventory />
        </div>,
        options: [
            { text: "Punch another tree.", to: "minecraft_tree", action: () => {
                treesPunched++;
                addItem("log", 1);
            }},
            "seperator"
            // { text: "Create planks.", to: "minecraft_tree", disabledText: "Create planks (Not enough logs!)", if: () => logs > 1, action: () =>  { logs--; planks += 4; } },
            // { text: "Create sticks.", to: "minecraft_tree", disabledText: "Create sticks (Not enough sticks!)", if: () => planks > 2, action: () =>  { sticks += 4; planks -= 2; } },
            // { text: "Create crafting table.", disabledText: "Create crafting table. (Not enough planks!)", if: () => planks >= 4, to: "minecraft_crafting_table" },
        ],
        action: () => {
            if(treesPunched > 10) {
                setScene("minecraft_all_trees");
            }
        },
        contributor: "Adr and Hunter"
    },
    minecraft_all_trees: {
        prompt: () => <div>
            <p>You ended up cutting down all the trees in the world, leaving nothing to produce oxygen. Get died.</p>
        </div>,
        ending: {
            id: "all-trees",
            name: "Tree Killer",
            description: "You cut down a lot a trees and now the world hate you.",
        },
        contributor: "Hunter"
    }
});