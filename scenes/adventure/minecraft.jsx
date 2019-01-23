import React, {Fragment} from "react";
import { addScenes } from "@src/ending";
import { addFlag, setScene } from "web-text-adventure";

const inventoryData = {};
const recipeData = [];

const itemToName = {
    log: "Oak Log",
    stick: "Stick",
    plank: "Oak Wood Planks",
};

const InventoryDisplay = () => <div>
    <h3>Inventory</h3>
    <p>
        {
            Object.keys(inventoryData).filter(key => inventoryData[key] !== 0).map(key => <Fragment key={key}>
                {itemToName[key] || "item." + key}: {inventoryData[key]}
            </Fragment>)
        }
    </p>
</div>;

/** Inventory */
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

function displayName(type) {
    return itemToName[type];
}

function itemCount(id, count) {
    return {id, count};
}
function displayItemCount(ic) {
    return displayName(ic.id);
}

/** Recipies */
function addRecipe(items, output) {
    recipeData.push({
        items,
        output,
        discovered: false
    });
}
function getCraftingOptions() {
    return [];
    
    // Discover new ones
    recipeData.forEach(recipe => {
        if (recipe.discovered) return;
        if (hasItem(recipe.a.id, recipe.a.count) && hasItem(recipe.b.id, recipe.b.count)) {
            recipe.discovered = true;
        }
    });

    // return magic
    return recipeData.map(rec => {
        return {
            text: `Craft: ${rec.items.map(displayItemCount).join(" + ")} -> ${displayItemCount(rec.output)}`,
            to: null,
        };
    });
}

addRecipe(
    [
        itemCount("log", 1)
    ],
    itemCount("plank", 4)
);

// Stats
addFlag("treesPunched", 0);

addScenes({
    minecraft_tree: {
        prompt: () => <div>
            <p>You punch some trees and get some wood (somehow), the next logical thing to do is to make some wood planks.</p>
            
            <InventoryDisplay />
        </div>,
        options: () => [
            { text: "Punch another tree.", to: "minecraft_tree", action: () => {
                treesPunched++;
                addItem("log", 1);
            }},
            "seperator",
            ...getCraftingOptions()
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