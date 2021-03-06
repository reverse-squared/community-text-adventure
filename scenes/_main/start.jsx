import React from "react";
import { addFlag, resetFlags } from "web-text-adventure/src/adventure";
import { addScenes, getGameProgress } from "@src/ending";
import { RainbowText } from "@templates/FontStyles";

addFlag("sleepTime", 0);

addFlag("startedWaffles", false);
addFlag("startedPancakes", false);
addFlag("startedOmelette", false);
addFlag("startedHashbrowns", false);

addFlag("time", "");

function getTime() {
    var date = new Date();
    var afternoon = false;

    var hours = date.getHours();
    var minutes = date.getMinutes();

    if (hours > 12) {
        hours -= 12;
        afternoon = true;
    }

    time = hours + ":" + minutes;
    if (afternoon) {
        time += "pm";
    } else {
        time += "am";
    }
}

const ChunkSplitter = (props) => {
    return <p {...props}>
        {(props.children || "").split("").map((char, index) => {
            return <span style={{ position: "relative" }} key={index.toString()}>
                <span className="chunk" style={{
                    "--chunk": index,
                    position: "absolute"
                }}>{char}</span>
                <span className="chunk" style={{
                    opacity: 0,
                }}>{char}</span>
            </span>;
        })}
    </p>;
};

addScenes({
    // #region Wake Up
    wakeup: {
        prompt: () => <div>
            <p>You wake up in a room. <strong>What do you do?</strong></p>
        </div>,

        options: () => [
            { text: "Go outside", to: "wakeup_outside" },
            { text: "Make some breakfast", to: "wakeup_breakfast" },
            { text: "Check the time", to: "wakeup_check_time" },

            ...((getGameProgress().percentage >= 1) ? [
                {is: "seperator"},
                { text: () => <RainbowText underline string={"Brag about how you got all " + getGameProgress().totalEndings + " endings"}/>, to: "true_ending" }
            ] : [])
        ],

        action: () => {
            resetFlags();
        },

        contributor: "Dave"
    },

    wakeup_no_reset: {
        prompt: () => <div>
            <p>You wake up in a room, <strong>What do you do?</strong></p>
        </div>,

        options: [
            { text: "Go outstide", to: "wakeup_outside" },
            { text: "Make some breakfast", to: "wakeup_breakfast" },
            { text: "Check the time", to: "wakeup_check_time" }
        ],

        action: () => {
            resetFlags();
            collect200 = true;
        },

        contributor: "Dave"
    },
    // #endregion

    // #region Outside
    wakeup_outside: {
        prompt: () => <div>
            <p>You walk outside from sleeping. You spot multiple different animals such as lizards, spiders, and humans. <strong>What do you do?</strong></p>
        </div>,
        options: [
            { text: "Touch the lizard", to: "touch_lizard" },
            { text: "Touch the spider", to: "touch_spider" },
            { text: "Touch the human", to: "touch_human" },
            { text: "Get in your car", to: "touch_car" }
        ],
        contributor: "Hunter"
    },
    touch_lizard: {
        prompt: () => <div>
            <p>
                You reach for the lizard but it bites you right in the arm. You need to...
            </p>
        </div>,
        options: [
            { text: "Get it treated", to: "touch_lizard_treat" },
            { text: "Punch that lizard", to: "jail_start" },
            { text: "Not care, and don't do anything", to: "touch_lizard_nothing" },
        ],
        contributor: "Alchemyking"
    },
    touch_lizard_nothing: {
        prompt: () => <div>
            <p>
                You died from the lizard’s venom. Seriously, you could have at least had the decency to flop around on the floor as you died.
            </p>
        </div>,
        ending: {
            id: "venom-die-sure",
            name: "Do Nothing",
            description: "Duuuuuh..... You died because you were duuuumb.",
        },
        contributor: "Alchemyking"
    },
    touch_spider: {
        prompt: () => <div>
            You touch the spider, it's surprisingly soft, <strong>what do you do?</strong>
        </div>,
        options: [
            { text: "Pocket it", to: "pocket_spider" },
            { text: "Stroke it's back", to: "touch_spider_stroke" },
            { text: "Smash it", to: "smash_spider" }
        ],
        contributor: "Adr"
    },
    touch_spider_stroke: {
        prompt: () => <div>
            <em>S t r o k e</em>
        </div>,
        options: [
            { text: "Pocket it", to: "pocket_spider" },
            { text: "Stroke it's back", disabledText: "Stroke it's back", if: () => false, to: "touch_spider_stroke" },
            { text: "Smash it", to: "smash_spider" }
        ],
        contributor: "Hunter"
    },
    pocket_spider: {
        prompt: () => <div>
            <p>You pocketed the spider, it seems to like being in the pocket.</p>
            <p className="inventory-update">
                + Added Spider to Inventory.
            </p>
        </div>,
        options: [
            { text: "Go touch more things", to: "touch_main" }
        ],
        contributor: "Adr"
    },
    smash_spider: {
        prompt: () => <div>
            <p>
                You smashed the Spider, you monster.
            </p>
            <p className="inventory-update">
                + Added Spider Corpse to Inventory.
            </p>
            <br />
        </div>,
        options: [
            { text: "Go back and touch more things", to: "genocide_main" }
        ],
        contributor: "Adr"
    },
    touch_human: {
        prompt: () => <div>
            <p>
                You touch the human. You ask them...
            </p>
        </div>,
        options: [
            { text: "What's the time", to: "touch_human_time" },
            { text: "Why is there a critical production bug", to: "work_pre" },
            { text: "▖┗▛▄▖▜▚┣", to: "missingno" },
        ],
        contributor: "Hunter"
    },
    touch_human_time: {
        prompt: () => <div>
            <p>
                The time is {time}.
            </p>
        </div>,
        options: [
            { text: "What's the time", disabledText: "What's the time", if: () => false, to: "touch_human_time" },
            { text: "Why is there a critical production bug", to: "work_pre" },
            { text: "▖┗▛▄▖▜▚┣", to: "missingno" },
        ],
        action: () => getTime(),
        contributor: "Hunter"
    },
    touch_car: {
        prompt: () => <div>
            <p>You get in your car and realize you robbed a bank yesterday and the police are here. What do you do now?</p>
        </div>,
        options: [
            { text: "Drive away", to: "touch_car_drive" },
            { text: "Surrender", to: "surrender_to_noone" },
            { text: "Suicide", to: "touch_car_sui" }
        ],
        action: () => carFromRobbery = true,
        contributor: "torinpotato"
    },
    touch_car_drive: {
        prompt: () => <div>
            <p>You get in your car and realize you robbed a bank yesterday and the police are here. What do you do now?</p>
        </div>,
        options: [
            { text: "Drive away", to: null, if: () => false, disabledText: true },
            { text: "Surrender", to: "surrender_to_noone" },
            { text: "Suicide", to: "touch_car_sui" }
        ],
        action: () => carFromRobbery = true,
        contributor: "torinpotato"
    },
    touch_car_drive_away: {
        prompt: () => <div>
            <p>
                The police stop you and want to arrest you.
            </p>
        </div>,
        options: [
            { text: "Pull out your gun", to: "touch_car_drive_away_gun" },
            { text: "Let them arrest you", to: "jail_caught_driving" },
            { text: "Run away", to: "run_from_hospital" },
        ],
        contributor: "CykaBlyat26"
    },
    touch_car_drive_away_gun: {
        prompt: () => <div>
            <p>
                You pull out your gun, and as a result, you get shot.
            </p>
        </div>,
        ending: {
            id: "gun-pull",
            name: "Pull a Gun on the Coppers",
            description: "Why would anyone do that?",
        },
        contributor: "Hunter"
    },
    jail_caught_driving: {
        prompt: () => <div>
            <p>You decided to turn yourself in. You got arrested in jail and sentanced to 37 more years for robbery.</p>
        </div>,
        ending: {
            id: "jail-37-years-2",
            name: "Bank Robber",
            description: "Why'd you turn yourself in?"
        },
        contributor: "Hunter"
    },
    surrender_to_noone: {
        prompt: () => <div>
            <p>
                You surrender, but they dont care and send you to jail.
            </p>
        </div>,
        options: [
            {
                text: "Go to Jail",
                to: "jail_start_card",
                action: () => jailForCard = true,
            },
        ],
        contributor: "Dave",
    },
    touch_car_sui: {
        prompt: () => <div>
            <p>Good job! You have now suicided yourself.</p>
        </div>,
        ending: {
            id: "touch_car_sui",
            name: "Sucidal",
            description: "You have suicided. And now you are in hell."
        },
        contributor: "torinpotato and Hunter"
    },
    //#endregion

    // #region Breakfast
    wakeup_breakfast: {
        prompt: () => <div>
            <p>You walk downstairs to make some breakfast.What do you make?</p>
        </div>,
        options: () => {
            if (startedWaffles || startedOmelette || startedHashbrowns || startedPancakes) {
                return [
                    { text: "Pancakes", disabledText: true, if: () => !startedPancakes, to: "make_pancakes" },
                    { text: "Waffles", disabledText: true, if: () => !startedWaffles, to: "make_waffles" },
                    { text: "Hashbrowns", disabledText: true, if: () => !startedHashbrowns, to: "make_hashbrowns" },
                    { text: "Omelette", disabledText: true, if: () => !startedOmelette, to: "make_omelette_fail" },
                    // "seperator",
                    {
                        text: "Give up and Starve...",
                        to: "breakfast_fail_ending",
                        if: () => startedWaffles && startedOmelette && startedHashbrowns && startedPancakes,
                    },
                ];
            } else {
                return [
                    { text: "Pancakes", to: "make_pancakes" },
                    { text: "Waffles", to: "make_waffles" },
                    { text: "Hashbrowns", to: "make_hashbrowns" },
                    { text: "Omelette", to: "make_omelette" },
                ];
            }
        },
        contributor: "Colyderp"
    },
    leave_the_level: {
        prompt: () => <div>
            <p>
                You warp out of the level. Turns out to traveled back to before you made breakfast... What do you do?
            </p>
        </div>,
        options: () => {
            if (startedWaffles || startedOmelette || startedHashbrowns || startedPancakes) {
                return [
                    { text: "Pancakes", disabledText: true, if: () => !startedPancakes, to: "make_pancakes" },
                    { text: "Waffles", disabledText: true, if: () => !startedWaffles, to: "make_waffles" },
                    { text: "Hashbrowns", disabledText: true, if: () => !startedHashbrowns, to: "make_hashbrowns" },
                    { text: "Omelette", disabledText: true, if: () => !startedOmelette, to: "make_omelette_fail" },
                    // "seperator",
                    {
                        text: "Give up and Starve...",
                        to: "breakfast_fail_ending",
                        if: () => startedWaffles && startedOmelette && startedHashbrowns && startedPancakes,
                    },
                ];
            } else {
                return [
                    { text: "Pancakes", to: "make_pancakes" },
                    { text: "Waffles", to: "make_waffles" },
                    { text: "Hashbrowns", to: "make_hashbrowns" },
                    { text: "Omelette", to: "make_omelette" },
                ];
            }
        },
        contributor: "Dave"
    },
    breakfast_fail_ending: {
        prompt: () => <div>
            <p>
                Out of all your options for breakfast, how did you fail to find one that worked. You ended up starving.
            </p>
        </div>,
        ending: {
            id: "breakfast-failure",
            name: "Fail to Make Breakfast",
            description: "With so many options how did you fail a simple task."
        },
        contributor: "Dave",
    },
    make_pancakes: {
        prompt: () => <div>
            <p>You want to make pancakes, but you have a few types to choose from.</p>
        </div>,
        options: [
            { text: "Regular", to: "make_regular_pancakes" },
            { text: "McDonalds™ brand", to: "make_mcd_pancakes" },
            { text: "Chocolate", to: "make_chocolate_pancakes" },
            { text: "Peanut butter", to: "make_pb_pancakes" }
        ],
        action: () => {
            startedPancakes = true;
        },
        contributor: "Dave"
    },
    //#endregion

    //#region Check Time
    wakeup_check_time: {
        prompt: () => <div>
            <p>You look at your clock to check the time and realize...</p>
        </div>,
        options: [
            { text: "...you are still sleepy and need more rest", to: "sleep" },
            { text: "...you're hungry and want to eat something", to: "wakeup_breakfast" },
            { text: "...you have plans to go outside and go on an adventure", to: "adventure_start" }
        ],
        contributor: "Toshiyuki"
    },
    sleep: {
        prompt: () => <div>
            <p>You go to bed and get more rest.</p>
        </div>,
        options: [
            { text: "Sleep more", to: "sleepmore" },
            { text: "Wake up", to: "wakeup" }
        ],
        contributor: "Dave"
    },
    sleep_eat: {
        prompt: () => <div>
            <p>You go to bed.</p>
        </div>,
        options: [
            { text: "Sleep more", to: "sleepmore" },
            { text: "Wake up", to: "wakeup" }
        ],
        contributor: "Hunter"
    },
    sleepmore: {
        prompt: () => <div>
            <p>You continue to sleep.</p>
        </div>,
        options: [
            { text: "Sleep more", to: "sleepmore", if: () => sleepTime < 26 },
            { text: "Wake up", to: "sleep_ending", if: () => sleepTime >= 26 },
            { text: "Wake up", to: "wakeup", if: () => sleepTime <= 20, }
        ],
        action: () => sleepTime++,
        contributor: "Dave"
    },
    sleep_ending: {
        prompt: () => <div>
            You slept for so long that you were killed by a tornado. Not even the loud tornado sirens, or the tornado itself could wake you up before it killed you.
        </div>,
        ending: {
            id: "sleep-ending",
            name: "Death by Tornado",
            description: "Sleep until a tornado kills you.",
        },
        contributor: "Hunter"
    },
    // #endregion

    true_ending: {
        prompt: () => <div>
            <style>{`
            body {
                background: black;
                animation: bodyanimation 1s linear 2s;
                animation-fill-mode: both;
                overflow: hidden;
                user-select: none;
            }
            @keyframes bodyanimation {
                0% {
                    background: black;
                }
                100% {
                    background: white;
                }
            }
            [data-euid] .chunk {
                opacity: 0;
                color: black;
                transition: all 0.9s ease-out calc(var(--chunk) * 60ms);
                transform: translateY(-10px);
            }
            [data-euid].show .chunk {
                transform: translateY(0);
                opacity: 1;
            }
            `}
            </style>
            <br/><br/><br/>
            <ChunkSplitter data-euid="0">
                {"So you got all the endings? What a monster you are! You killed so many people, you killed yourself so many times. So much pain for everyone."}
            </ChunkSplitter>
            <ChunkSplitter data-euid="1">
                {"You jumped out an airplane and died."}
            </ChunkSplitter>
            <ChunkSplitter data-euid="2">
                {"You accepted a lawsuit and lost all your money."}
            </ChunkSplitter>
            <ChunkSplitter data-euid="3">
                {"You set the entire world on fire"}
            </ChunkSplitter>
            <ChunkSplitter data-euid="4">
                {"You even went $500,000 into debt."}
            </ChunkSplitter>
            <ChunkSplitter data-euid="5">
                {"All for what? Some game's true ending."}
            </ChunkSplitter>
            <ChunkSplitter data-euid="6">
                {"WELL THEN, this is it. The end of community text adventure, was that worth it?"}
            </ChunkSplitter>
            <br/><br/>
            <ChunkSplitter data-euid="7">
                {"Thank you for playing."}
            </ChunkSplitter>
        </div>,
        action: async() => {
            localStorage.setItem("finished", "yes");
            const qs = (i) => document.querySelector("[data-euid=\"" + i + "\"");
            const fi = (i) => {
                qs(i).classList.add("show");
            };
            const d = (ms) => new Promise((d) => setTimeout(d, ms));
            
            await d(3500);
            fi(0);
            await d(10000);
            fi(1);
            await d(3000);
            fi(2);
            await d(3000);
            fi(3);
            await d(3000);
            fi(5);
            await d(3000);
            fi(6);
            await d(7000);
            fi(7);

            document.body.style.transition = "opacity 2s linear";
            document.body.style.opacity = "0.55";
        },
        options: [],
        excludeEmptyOptionsCheck: true,
        noContributor: true,
        isFinale: true,
    }
});
