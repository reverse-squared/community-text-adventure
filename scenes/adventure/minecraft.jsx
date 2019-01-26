import React, {Fragment} from "react";
import { addScenes } from "@src/ending";
import { addFlag, setScene } from "web-text-adventure";
import SceneLink from "@templates/SceneLink";

addFlag("__rerender", undefined);
addFlag("inventoryData", {});
addFlag("recipeData", []);
addFlag("fromScene", "none");

const itemToName = {
    log: "Oak Log",
    stick: "Stick",
    planks: "Oak Wood Planks",
    wood_pickaxe: "Wooden Pickaxe",
};

const InventoryDisplay = () => <div>
    <h3>Inventory</h3>
    <p>
        {
            Object.keys(inventoryData).filter(key => inventoryData[key] !== 0).map(key => <Fragment key={key}>
                {itemToName[key] || "item." + key}: {inventoryData[key]} <br/>
            </Fragment>)
        }
    </p>
</div>;

//#region item/recipe/game logic
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
    if(ic.count !== 1) {
        return displayName(ic.id) + "*" + ic.count;
    } else {
        return displayName(ic.id);
    }
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
    // Discover new ones
    recipeData.forEach(rec => {
        if (rec.items.find(x => !hasItem(x.id, x.count)) == undefined) {
            rec.discovered = true;
        }
    });

    // return magic
    return recipeData.filter(x => x.discovered).map(rec => {
        return {
            text: `Craft: ${rec.items.map(displayItemCount).join(" + ")} -> ${displayItemCount(rec.output)}`,
            to: null,
            disabledText: true,
            if: () => rec.items.find(x => !hasItem(x.id, x.count)) == undefined,
            action: () => {
                rec.items.forEach(item => removeItem(item.id, item.count));
                addItem(rec.output.id, rec.output.count);

                __rerender = undefined;
            }
        };
    });
}
function craftingOptionsWithLink(scene) {
    return [
        { is: "seperator" },
        ...(hasItem("wood_pickaxe", 1) ? [
            {
                text: "Crafting Menu",
                to: "minecraft_craft",
                action: () => fromScene = scene
            }
        ] : getCraftingOptions())
    ];
}

//#endregion

// Recipe Contents
function addRecipes() {
    recipeData = [];
    addRecipe([itemCount("log", 1)], itemCount("planks", 4));
    addRecipe([itemCount("planks", 2)], itemCount("stick", 4));
    addRecipe([itemCount("planks", 3), itemCount("stick", 2)], itemCount("wood_pickaxe", 1));
}

// Stats
addFlag("treesPunched", 0);

addScenes({
    minecraft_start: {
        prompt: <div></div>,
        options: [],
        excludeEmptyOptionsCheck: true,
        noContributor: true,
        action: () => {
            addRecipes();
            addItem("log", 1);
            setScene("minecraft_tree");
        }
    },
    minecraft_tree: {
        prompt: () => <div>
            <p>You punch some trees and get some wood (somehow), the next logical thing to do is to make some wood planks.</p>
            
            <InventoryDisplay />
        </div>,
        options: () => [
            { text: "Punch another tree", to: "minecraft_tree", action: () => {
                treesPunched++;
                addItem("log", 1);
            }},
            {
                text: "Go Mining",
                if: () => hasItem("wood_pickaxe", 1),
                to: "minecraft_mine"
            },
            
            ...craftingOptionsWithLink("minecraft_tree")
        ],
        action: () => {
            if(treesPunched > 15) {
                setScene("minecraft_all_trees");
            }
        },
        contributor: "Adr and Hunter"
    },
    minecraft_mine: {
        prompt: () => <div>
            <p>
                TODO: GO MINING
            </p>
            <InventoryDisplay />
        </div>,
        options: () => [
            ...craftingOptionsWithLink("minecraft_mine")
        ]
    },
    minecraft_craft: {
        prompt: () => <div>
            <h2>Crafting Table</h2>
            <SceneLink to={fromScene}>Exit</SceneLink>
        </div>,
        options: () => [
            ...getCraftingOptions()
        ],
        excludeEmptyOptionsCheck: true,
        noContributor: true,
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