import React from "react";
import { addFlag, setScene } from "web-text-adventure";
import { addScenes } from "@src/ending";

addFlag("edgy_chocolate_index", 0);
addFlag("edgy_chocolate", 1);

const edgy_chocolate_table = [
    1,2,3,4,5,6,7,8,9,10,
    11,12,12,13,14,15,16,17,18,19,20,
    25,30,35,52,69,89,102,306,420,912,
    1672,3289,6012,9001,15000,
    -30,-523,-5312,-532108532,-632109302949023,-83135515308158910253738297953
];

const DARK_CHOCOLATE = <span style={{ paddingLeft:"5px",paddingRight:"5px", background: "white", fontWeight: "bold", fontFamily: "monospace", color: "black" }}>DARK CHOCOLATE</span>;

function EvaluateEdgyness() {
    if(edgy_chocolate < 0) {
        setScene("edgy_ending_negative");
    } else if (edgy_chocolate <= 10) {
        setScene("edgy_ending_semi");
    } else if (edgy_chocolate === 11) {
        setScene("edgy_ending_11");
    } else if (edgy_chocolate < 100) {
        setScene("edgy_ending_semi");
    } else if (edgy_chocolate < 9001) {
        setScene("edgy_ending_overdose");
    } else if (edgy_chocolate === 9001) {
        setScene("edgy_ending_9001");
    } else {
        setScene("edgy_ending_overdose");
    }
}

addScenes({
    make_chocolate_pancakes: {
        prompt: () => <div>
            <p>
                You have some different types of chocolate you can use:
            </p>
        </div>,
        options: [
            { text: "Dark chocolate", to: "edgy_pancakes" },
            { text: "Milk Chocolate", to: "" },
            { text: "White Chocolate", to: "" },
            { text: "Baker’s chocolate", to: "" },
        ],
        contributor: "Alchemyking"
    },
    edgy_pancakes: {
        prompt: () => <div>
            <p>
                You feel edgy putting the {DARK_CHOCOLATE} into it, do you add more.
            </p>
            <p>
                Amount of Edge: <span>{edgy_chocolate}</span>
            </p>
        </div>,
        options: [
            {
                text: "Add More",
                to: "edgy_pancakes",
                disabledText:"Add More (You are out of chocolate)",
                if: () => (edgy_chocolate > -83135515308158910253738297953),
                action: () => {
                    edgy_chocolate_index++;
                    edgy_chocolate = edgy_chocolate_table[edgy_chocolate_index];
                },
            },
            { text: "Done", to: null, action: EvaluateEdgyness }
        ],
        contributor: "Colyderp",
    },
    edgy_ending_11: {
        prompt: () => <div>
            <p>
                You turned the edginess right up to eleven, as <a href="https://youtu.be/F7IZZXQ89Oc">These go up to eleven</a>.
            </p>
        </div>,
        ending: {
            id: "11",
            name: "Turn it up to 11",
            description: "The edginess goes up to eleven, it's one edgier.",
        },
        contributor: "Dave",
    },
    edgy_ending_semi: {
        prompt: () => <div>
            <p>
                You ate the edgy pancake with some edge which made one somewhat more edgy. You did survive.
            </p>
        </div>,
        ending: {
            id: "semi-edgy",
            name: "Semi Edgy",
            description: "Don't add too much Dark Chocolate, just the right amount.",
        },
        contributor: "Colyderp",
    },
    edgy_ending_overdose: {
        prompt: () => <div>
            <p>
                You are making the edgy pancakes, where suddenly, a man points at you and says “GASP! Racist!”. He comes into your house and kicks you in the balls so hard you die.
            </p>
        </div>,
        ending: {
            id: "edgy-death-mistake",
            name: "Mistaken as a Racist",
            description: "You added so much dark choclate that you were mistaken as a racist.",
        },
        contributor: "Alchemyking",
    },
    edgy_ending_9001: {
        prompt: () => <div>
            <p>
                You added so much {DARK_CHOCOLATE} that it got over 9000...
            </p>
        </div>,
        ending: {
            id: "edgy-9001",
            name: "Over 9000",
            description: "You added over 9000 chocolate to the pancake.",
        },
        contributor: "Colyderp",
    },
    edgy_ending_negative: {
        prompt: () => <div>
            <p>
                You added so much chocolate you got negative edginess... ok.
            </p>
        </div>,
        ending: {
            id: "edgy-negative",
            name: "Negative Edginess",
            description: "Somehow got negative edginess from adding too much Dark Chocolate",
        },
        contributor: "Helvetica",
    },
});
