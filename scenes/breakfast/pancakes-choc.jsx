import React from "react";
import { addFlag, setScene } from "web-text-adventure";
import { addScenes } from "@src/ending";
import SceneLink from "@templates/SceneLink";

// Stolen from peanut butter pancakes.
let progressTimer = null;
let progress = null;
let inputElem = null;

function QuickTimeDom() {
    return <div style={{ height: "6px", width: "100%", background: "#2f4570" }}>
        <div style={{ height: "100%", width: "100%", background: "cornflowerblue" }} id="inner-progress" />
    </div>;
}

function QuickTimeHandlers(extra = {}) {
    const decreasePerStep = (1000 / 45) / (10 * (extra.time / 1000));
    return {
        onDeactivate: () => {
            if (progressTimer) clearInterval(progressTimer);
            progressTimer = null;
            if (extra.onDeactivate) extra.onDeactivate();
        },
        action: () => {
            progressTimer = setInterval(() => {
                progress -= decreasePerStep;
                if (progress <= 0) {
                    setScene("pancakes_white_chocolate_milk_yes_wait_fail");
                } else {
                    document.getElementById("inner-progress").style.width = progress + "%";
                }
            }, 1000/45);
            progress = 100;
            if (extra.action) extra.action();
        },
    };
}

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
            { text: "White Chocolate", to: "pancakes_white_chocolate" },
            { text: "Baker’s chocolate", to: "" },
        ],
        contributor: "Alchemyking"
    },
    pancakes_white_chocolate: {
        prompt: () => <div>
            <p>
                Crap. You don't have any white chocolate. You go onto le Google and research how to make it yourself. 'Cocoa Butter' is what it's made of. How will you make your chocolate?
            </p>
        </div>,
        options: [
            { text: "Chocolate + Butter", to: "" },
            { text: "Cocoa + Butter", to: "pancakes_white_chocolate_butter" },
            { text: "Chocolate + Milk", to: "pancakes_white_chocolate_milk" },
            { text: "Chocolate + Cocaine", to: "pancakes_white_chocolate_cocaine" },
            { text: "Fuck it, just use DARK chocolate", to: "edgy_pancakes" },
        ],
        contributor: "Neema"
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
    pancakes_white_chocolate_cocaine: {
        prompt: () => <div>
            <p>Sure, because apparently cocaine is like white cocoa powder. You mix the melted chocolate with the "cocoa" and it turns a lighter shade of brown, but not white.</p>
        </div>,
        options: [
            { text: "More cocaine.", to: "" },
            { text: "Use the cocaine chocolate.", to: "" },
            { text: "Snort the cocaine chocolate.", to: "" }
        ],
        contributor: "Neema"
    },
    pancakes_white_chocolate_butter: {
        prompt: <div>
            <p>Chocolate has cocoa in it, right? You shred the chocolate into a bowl with melted butter. Halfway through mixing it, you realise that the chocolate is only turning a golden brown color. 
                Also you've cut yourself on the grater.
            </p>
        </div>,
        options: [
            { text: "Add more butter.", to: "" },
            { text: "Add more blood.", to: "" },
            { text: "Add pancake batter.", to: "" },
            { text: "Keep mixing.", to: "" }
        ],
        contributor: "Neema"
    },
    pancakes_white_chocolate_milk: {
        prompt: () => <div>
            <p>You decide that you want to add milk to the chocolate to make it whiter. Turns out, it <strong>DIDN'T</strong> make it whiter, and instead made it taste better. Do you taste it?</p>
        </div>,
        options: [
            { text: "Yes", to: "pancakes_white_chocolate_milk_yes" },
            { text: "No", to: "pancakes_white_chocolate_milk_no" }
        ],
        contributor: "Hunter"
    },
    pancakes_white_chocolate_milk_yes: {
        prompt: () => <div>
            <p>You decide to taste the chocolate, and you become an addict. You will now eat chocolate for the rest of your life, breakfast, lunch, and dinner. <em>Totally healthy...</em></p>
        </div>,
        ending: {
            id: "chocolate-addict",
            name: "Chocolate Addict",
            description: "Chocolate... Chocolate... CHOCCCCCOLATEEEEEEEEEE!!!"
        },
        contributor: "Hunter"
    },
    pancakes_white_chocolate_milk_no: {
        prompt: () => <div>
            <p>You don't taste the chocolate. Instead of tasting the chocolate, put the new chocolate inside of the pancakes that you were baking, and wait for them to cook.</p>
        </div>,
        options: [
            { text: "Wait", to: "pancakes_white_chocolate_milk_no_wait_1" }
        ],
        contributor: "Hunter"
    },
    pancakes_white_chocolate_milk_no_wait_1: {
        prompt: () => <div>
            <p>You wait for the pancakes to finish.</p>
        </div>,
        options: [
            { text: "Wait more.", to: "pancakes_white_chocolate_milk_no_wait_2"}
        ],
        contributor: "Hunter"
    },
    pancakes_white_chocolate_milk_no_wait_2: {
        prompt: () => <div>
            <p>You wait for the pancakes to finish.</p>
        </div>,
        options: [
            { text: "Wait more.", to: "pancakes_white_chocolate_milk_no_wait_3"}
        ],
        contributor: "Hunter"
    },
    pancakes_white_chocolate_milk_no_wait_3: {
        prompt: () => <div>
            <p>You wait for the pancakes to finish.</p>
            <ul>
                <SceneLink style={{
                    display:"block",
                    transform: "rotate(180deg)",
                    paddingLeft: "300px"
                }} to="pancakes_white_chocolate_milk_yes_wait_4">Wait more.</SceneLink>
            </ul>
        </div>,
        options: [],
        contributor: "Hunter"
    },
    pancakes_white_chocolate_milk_yes_wait_4: {
        prompt: () => <div>
            <p>You wait for the pancakes to finish.</p>
            <ul>
                <SceneLink style={{
                    display:"block",
                    position: "absolute",
                    transform: "translateX(60px) rotate(232deg)",
                }} to="pancakes_white_chocolate_milk_yes_wait_5">Wait more.</SceneLink>
            </ul>
        </div>,
        options: [],
        contributor: "Hunter"
    },
    pancakes_white_chocolate_milk_yes_wait_5: {
        prompt: () => <div>
            <p>You wait for the pancakes to finish.</p>
            <ul>
                <SceneLink style={{
                    display:"block",
                    position: "absolute",
                    transform: "translateY(650px) rotate(112d   eg) scale(20)",
                }} to="pancakes_white_chocolate_milk_yes_wait_6">Wait more.</SceneLink>
            </ul>
        </div>,
        options: [],
        contributor: "Hunter"
    },
    pancakes_white_chocolate_milk_yes_wait_6: {
        prompt: () => <div>
            <p>You wait for the pancakes to finish.</p>
            <small><small>Scroll down!</small></small>
            <ul>
                <SceneLink style={{
                    display:"block",
                    position: "absolute",
                    transform: "translateY(15022px) rotate(90deg) scale(10)",
                    textDecoration: "underline"
                }} to="pancakes_white_chocolate_milk_yes_wait_7">Wait more.</SceneLink>
            </ul>
        </div>,
        options: [],
        contributor: "Hunter"
    },
    pancakes_white_chocolate_milk_yes_wait_7: {
        prompt: () => <div>
            <p>You wait for the pancakes to finish.</p>
            <ul>
                <SceneLink style={{
                    display:"block",
                    position: "absolute",
                    transform: "scale(0.3)",
                    textDecoration: "underline"
                }} to="pancakes_white_chocolate_milk_yes_wait_8">Wait more.</SceneLink>
            </ul>
        </div>,
        options: [],
        contributor: "Hunter"
    },
    pancakes_white_chocolate_milk_yes_wait_8: {
        prompt: () => <div>
            <p>You wait for the pancakes to finish.</p>
            <QuickTimeDom />
            <ul>
                <SceneLink to="pancakes_white_chocolate_milk_yes_wait_9">Done.</SceneLink>
            </ul>
            
        </div>,
        ...QuickTimeHandlers({
            time: 750,
        }),
        options: [],
        contributor: "Hunter"
    },
    pancakes_white_chocolate_milk_yes_wait_9: {
        prompt: () => <div>
            <p>Press the "\" key.</p>
            <QuickTimeDom />
            
        </div>,
        ...QuickTimeHandlers({
            time: 750,
            action: () => {
                inputElem = document.createElement("input");
                document.body.appendChild(inputElem);
                inputElem.focus();
                inputElem.onkeydown = (item) => {
                    if (item.keyCode == 220) {
                        setScene("pancakes_white_chocolate_milk_yes_wait_done");
                    }
                    item.preventDefault();
                };
                inputElem.style = "background:transparent;border:none;outline:none;position:absolute;top:290px;";
            },
            onDeactivate: () => {
                if (inputElem) {
                    inputElem.remove();
                    inputElem = null;
                }
            }
        }),
        options: [],
        contributor: "Hunter"
    },
    pancakes_white_chocolate_milk_yes_wait_done: {
        prompt: () => <div>
            <p>The pancakes are done.</p>
        </div>,
        ending: {
            id: "chocolate-pancakes",
            name: "Good Pancakes",
            description: "Fully cook some good chocolate panckes."
        },
        contributor: "Hunter"
    },
    pancakes_white_chocolate_milk_yes_wait_fail: {
        prompt: () => <div>
            <p>You <strong>friccin</strong> burned the pancakes.</p>
        </div>,
        ending: {
            id: "bad-chocolate-pancakes",
            name: "Burnt Chocolate Pancakes",
            description: "Worst chef in the world."
        },
        contributor: "Hunter"
    }
});
