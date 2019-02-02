import React from "react";
import { addFlag, setScene } from "web-text-adventure/src/adventure";
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
    // #region Chocolate Pancakes
    make_chocolate_pancakes: {
        prompt: () => <div>
            <p>
                You have some different types of chocolate you can use:
            </p>
        </div>,
        options: [
            { text: "Dark chocolate", to: "edgy_pancakes" },
            { text: "Milk Chocolate", to: "pancakes_milk_chocolate" },
            { text: "White Chocolate", to: "pancakes_white_chocolate" },
            { text: "Baker’s chocolate", to: "pancakes_baker_chocolate" },
        ],
        contributor: "Alchemyking"
    },

    // #region Milk Chocolate
    pancakes_milk_chocolate: {
        prompt: () => <div>
            <p>You go for the not edgy not disgusting not vegetable-like chocolate. However, they are chocolate chips, and they didn't melt.</p>
        </div>,
        options: [
            { text: "Make a chocolate chip pancake", to: "pancakes_milk_chocolate_make" },
            { text: "Question your intelligence", to: "" },
            { text: "Go to the store and buy milk chocolate that is not in chip form", to: "" }
        ],
        contributor: "Durvenson"
    },
    pancakes_milk_chocolate_make: {
        prompt: () => <div>
            <p>You have multiple flavors to choose from.</p>
        </div>,
        options: [
            { text: "Chocolate Chip Pancake", to: "pancakes_milk_chocolate_make_cc_pancakes" },
            { text: "Chocolate Chip Cookie", to: "pancakes_milk_chocolate_make_cookie" },
            { text: "Chocolate Chips straight out of the bag", to: "pancakes_milk_chocolate_make_eat" },
            { text: "Chocolate Chip Cookie Dough", to: "pancakes_milk_chocolate_make_raw" }
        ],
        contributor: "Durvenson"
    },
    pancakes_milk_chocolate_make_cc_pancakes: {
        prompt: () => <div>
            <p>
                i t ' s n o i c e. Will you top it with extra chocolate?
            </p>
        </div>,
        options: [
            { text: "Yes", to: "pancakes_milk_chocolate_make_cc_pancakes_yes" },
            { text: "No", to: "pancakes_milk_chocolate_make_cc_pancakes_no" }
        ],
        contributor: "Durvenson"
    },
    pancakes_milk_chocolate_make_cc_pancakes_yes: {
        prompt: () => <div>
            <p>
                You used homemade chocolate. You put so much chocolate that you become the chocolate.
            </p>
        </div>,
        ending: {
            id: "become-the-choc",
            name: "Becoming a Chocolate",
            description: "Eat so much chocolate that you become a chocolate.",
        },
        contributor: "Durvenson"
    },
    pancakes_milk_chocolate_make_cc_pancakes_no: {
        prompt: () => <div>
            <p>
                You eat some chocolate chip pancakes. It's really good, and you want more, but you don't have any more chocolate chips. What do you do instead?
            </p>
        </div>,
        options: [
            { text: "Chocolate + Chips", to: "pancakes_milk_chocolate_make_cc_pancakes_no_cc" },
            { text: "D a r k  chocolate", to: "edgy_pancakes" },
            { text: "Cocoa", to: "pancakes_milk_chocolate_make_cc_pancakes_no_cocoa" },
            { text: "Coconut", to: "pancakes_milk_chocolate_make_cc_pancakes_no_coconut" },
        ],
        contributor: "Durvenson"
    },
    pancakes_milk_chocolate_make_cc_pancakes_no_cc: {
        prompt: () => <div>
            <p>
                You created salted chocolate... how do you even?
            </p>
        </div>,
        ending: {
            id: "salt-sweet",
            name: "Salty and Sweet Don’t Mix",
            description: "Created salted chocolate. That’s one thing that they won’t put in the recipe books.",
        },
        contributor: "Alchemyking"
    },
    pancakes_milk_chocolate_make_cc_pancakes_no_cocoa: {
        prompt: () => <div>
            <p>
                It seems to work... but you then find out that the coco is ground feces.
            </p>
        </div>,
        options: [
            { text: "Puke", to: "pancakes_white_chocolate_butter_more_blood_puke" },
        ],
        contributor: "Durvenson"
    },
    pancakes_milk_chocolate_make_cc_pancakes_no_coconut: {
        prompt: () => <div>
            <p>
                You break the coconut to make some coconut pancakes, but your fist is bleeding, and you collapse from spending all night breaking the coconuts.
            </p>
        </div>,
        ending: {
            id: "waste-of-time",
            name: "Waste of Time",
            description: "Try to break a coconut.",
        },
        contributor: "Durvenson"
    },
    pancakes_milk_chocolate_make_cookie: {
        prompt: () => <div>
            <p>Your grandmom is so annoyed that you won Best Cookie. It's an amazing achievement!</p>
        </div>,
        ending: {
            id: "mad-grandma",
            name: "Grandma is TRIGGERED",
            description: "Win the Best Cookie Award."
        },
        contributor: "Durvenson"
    },
    pancakes_milk_chocolate_make_eat: {
        prompt: () => <div>
            <p>
                You eat them right out of the bag... They taste so good, you keep eating them. And eating them. And eating them... WOW! Thaey are completely gone. You fall into a deep deep deep depression.
            </p>
        </div>,
        ending: {
            id: "deep-deep-depress",
            name: "Chocolate Induced Depression",
            description: "I NEED IT...",
        },
        contributor: "Hunter"
    },
    pancakes_milk_chocolate_make_raw: {
        prompt: () => <div>
            <p>It has lots of raw eggs, and you ate it, so you died and became imfamous for being that stupid.</p>
        </div>,
        ending: {
            id: "raw-dough",
            name: "Bad Ending",
            description: "Become infamous for dying because you ate chocolate chip cookie dough."
        },
        contributor: "Durvenson"
    },
    // #endregion

    // #region Baker's Chocolate
    pancakes_baker_chocolate: {
        prompt: () => <div>
            <p>
                You use the Baker’s Chocolate only to find it doesn’t melt and tastes like old Easter eggs. What do you do?
            </p>
        </div>,
        options: [
            { text: "Sue the Baking Chocolate company", to: "baker_chocolate_sue" },
            { text: "Throw away the pancakes", to: "" },
            { text: "Top the pancakes with actual chocolate to hide it’s disgustingness", to: "make_chocolate_top_them" },
            { text: "Yell", to: "" },
            { text: "Cry because your breakfast was ruined", to: "" },
        ],
        contributor: null,
    },
    baker_chocolate_sue: {
        prompt: () => <div>
            <p>Your lawsuit didn't do anything, because you were stupid and didn't realize that it was expired. Also, you didn't heat the pancakes correctly.The case was dismissed. How will you handle this?</p>
        </div>,
        options: [
            { text: "Protest against the court", to: "" },
            { text: "Question your intelligence", to: "question_existance" },
            { text: "Try again", to: "" },
            { text: "Just move on", to: "" },
            { text: "Lasagna", to: "" }
        ],
        contributor: "Durvenson and Neema"
    },
    question_existance: {
        prompt: () => <div>
            <p>
                You Question your intelligence, what better way to do it with an IQ Test.
            </p>
        </div>,
        options: [
            { text: "Take a online IQ test", to: "iq_test" }
        ],
        contributor: "Durvenson"
    },
    iq_test: {
        prompt: () => <div>
            <p>
                Wow you got a 500,000 IQ on the IQ Test.
            </p>
        </div>,
        options: [
            { text: "Try to get into MIT", to: "mit" },
        ],
        contributor: "Durvenson"
    },
    mit: {
        prompt: () => <div>
            <p>
                MIT Rejected you since they said that 500KIQ is impossible.
            </p>
        </div>,
        options: [
            { text: "Destroy the MIT", to: "mit_destroy" },
        ],
        contributor: "Durvenson"
    },
    mit_destroy: {
        prompt: () => <div>
            <p>
                You destroy the MIT, how sad.
            </p>
        </div>,
        ending: {
            id: "destroying-property",
            name: "Destroying Property",
            description: "Not just any property, you destroyed the MIT.",
        },
        contributor: "Durvenson"
    },
    make_chocolate_top_them: {
        prompt: () => <div>
            <p>
                You top the Baker's chocolate with...
            </p>
        </div>,
        options: [
            { text: "Dark chocolate", to: "edgy_pancakes" },
            { text: "Milk Chocolate", to: "pancakes_milk_chocolate" },
            { text: "White Chocolate", to: "pancakes_white_chocolate" },
        ],
        contributor: "Dave"
    },
    // #endregion

    // #region White Chocolate
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
    
    // #region Edgy
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
            description: "You added so much dark chocolate that you were mistaken as a racist.",
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
            description: "Somehow got negative edginess from adding too much Dark Chocolate.",
        },
        contributor: "Helvetica",
    },
    // #endregion

    pancakes_white_chocolate_cocaine: {
        prompt: () => <div>
            <p>Sure, because apparently cocaine is like white cocoa powder. You mix the melted chocolate with the "cocoa" and it turns a lighter shade of brown, but not white.</p>
        </div>,
        options: [
            { text: "More cocaine", to: "pancakes_white_chocolate_cocaine2" },
            { text: "Use the cocaine chocolate", to: "pancakes_white_chocolate_cocaine_make" },
            { text: "Snort the cocaine chocolate", to: "pancakes_white_chocolate_cocaine_snort" }
        ],
        contributor: "Neema"
    },
    pancakes_white_chocolate_cocaine2: {
        prompt: () => <div>
            <p>
                You add more cocaine...
            </p>
        </div>,
        options: [
            { text: "More cocaine", to: "pancakes_white_chocolate_cocaine3" },
            { text: "Use the cocaine chocolate", to: "pancakes_white_chocolate_cocaine_make" },
            { text: "Snort the cocaine chocolate", to: "pancakes_white_chocolate_cocaine_snort" }
        ],
        contributor: "Neema"
    },
    pancakes_white_chocolate_cocaine3: {
        prompt: () => <div>
            <p>
                You add more cocaine...
            </p>
        </div>,
        options: [
            { text: "More cocaine", to: "pancakes_white_chocolate_cocaine4" },
            { text: "Use the cocaine chocolate", to: "pancakes_white_chocolate_cocaine_make" },
            { text: "Snort the cocaine chocolate", to: "pancakes_white_chocolate_cocaine_snort" }
        ],
        contributor: "Neema"
    },
    pancakes_white_chocolate_cocaine4: {
        prompt: () => <div>
            <p>
                You add so much cocaine to the chocolate that you're not even sure if its chocolate-flavored cocaine or cocaine-flavored chocolate anymore.
            </p>
        </div>,
        ending: {
            id: "too-much-cocaine",
            name: "Are You Sure That's White Chocolate?",
            description: "You're not even sure if its chocolate-flavored cocaine or cocaine-flavored chocolate anymore."
        },
        contributor: "Neema"
    },
    pancakes_white_chocolate_butter: {
        prompt: <div>
            <p>Chocolate has cocoa in it, right? You shred the chocolate into a bowl with melted butter. Halfway through mixing it, you realise that the chocolate is only turning a golden brown color. 
                Also you've cut yourself on the grater.
            </p>
        </div>,
        options: [
            { text: "Add more butter", to: "" },
            { text: "Add more blood", to: "pancakes_white_chocolate_butter_more_blood" },
            { text: "Add pancake batter", to: "" },
            { text: "Keep mixing", to: "" }
        ],
        contributor: "Neema"
    },
    pancakes_white_chocolate_butter_more_blood: {
        prompt: () => <div>
            <p>You realize how disgusting it is to have blood in a pancake mix. What do you do?</p>
        </div>,
        options: [
            { text: "Add more butter so you don't notice as much", to: "" },
            { text: "Add more blood", to: "" },
            { text: "Add pancake batter", to: "" },
            { text: "Throw it away", to: "" },
            { text: "Puke", to: "pancakes_white_chocolate_butter_more_blood_puke" },
            { text: "Keep mixing", to: "" }
        ],
        contributor: "Durvenson"
    },
    pancakes_white_chocolate_butter_more_blood_puke: {
        prompt: () => <div>
            <p>You’ve vomited up your entire stomach contents. In fact, you’ve vomited up your stomach, period. You die.</p>
        </div>,
        ending: {
            id: "puke-chocolate",
            name: "Puke",
            description: "How did you even manage to puke your OWN stomach?"
        },
        contributor: "Alchemyking and Hunter"
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

    // #region Wait for Cook
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
            { text: "Wait more", to: "pancakes_white_chocolate_milk_no_wait_2"},
            { text: "Eat", to: "pancakes_white_chocolate_milk_raw"}
        ],
        contributor: "Hunter"
    },
    pancakes_white_chocolate_milk_no_wait_2: {
        prompt: () => <div>
            <p>You wait for the pancakes to finish.</p>
        </div>,
        options: [
            { text: "Wait more", to: "pancakes_white_chocolate_milk_no_wait_3"},
            { text: "Eat", to: "pancakes_white_chocolate_milk_raw"}
        ],
        contributor: "Hunter"
    },
    pancakes_white_chocolate_milk_no_wait_3: {
        prompt: () => <div>
            <p>You wait for the pancakes to finish.</p>
        </div>,
        options: [
            { text: "Wait more", to: "pancakes_white_chocolate_milk_no_wait_4"},
            { text: "Eat", to: "pancakes_white_chocolate_milk_yes_wait_done"}
        ],
        contributor: "Hunter"
    },
    pancakes_white_chocolate_milk_no_wait_4: {
        prompt: () => <div>
            <p>You wait for the pancakes to finish.</p>
        </div>,
        options: [
            { text: "Wait more", to: "pancakes_white_chocolate_milk_no_wait_5"},
            { text: "Eat", to: "pancakes_white_chocolate_milk_yes_wait_fail"}
        ],
        contributor: "Hunter"
    },
    pancakes_white_chocolate_milk_no_wait_5: {
        prompt: () => <div>
            <p>You wait for the pancakes to finish.</p>
        </div>,
        options: [
            { text: "Wait more", to: "pancakes_white_chocolate_milk_no_wait_6"},
            { text: "Eat", to: "pancakes_white_chocolate_milk_yes_wait_fail"}
        ],
        contributor: "Hunter"
    },
    pancakes_white_chocolate_milk_no_wait_6: {
        prompt: () => <div>
            <p>You wait for the pancakes to finish.</p>
        </div>,
        options: [
            { text: "Wait more", to: "pancakes_white_chocolate_milk_no_wait_7"},
            { text: "Eat", to: "pancakes_white_chocolate_milk_yes_wait_fail"}
        ],
        contributor: "Hunter"
    },
    pancakes_white_chocolate_milk_no_wait_7: {
        prompt: () => <div>
            <p>You wait for the pancakes to finish.</p>
        </div>,
        options: [
            { text: "Wait more", to: "pancakes_white_chocolate_milk_no_wait_8"},
            { text: "Eat", to: "pancakes_white_chocolate_milk_yes_wait_fail"}
        ],
        contributor: "Hunter"
    },
    // #endregion

    pancakes_white_chocolate_milk_no_wait_8: {
        prompt: () => <div>
            <p>The pancakes caught on fire.</p>
        </div>,
        options: [
            { text: "Eat", to: "pancakes_white_chocolate_milk_yes_wait_fail"}
        ],
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
    },
    pancakes_white_chocolate_milk_raw: {
        prompt: () => <div>
            <p>You ate the pancakes that have cooked for a total of one minute. The pancake is very soggy, and it doesn't even look like a pancake. You still slurp of the liquid. It was <strong>very </strong>
                tasety.
            </p>
        </div>,
        ending: {
            id: "raw-pancakes",
            name: "The Good Liquid",
            description: "It's very tasety ( ͡° ͜ʖ ͡°)."
        },
        contributor: "Hunter"
    },
    pancakes_white_chocolate_cocaine_snort: {
        prompt: () => <div>
            <p>You snort the pancakes, what the heck!?</p>
        </div>,
        ending: {
            id: "snort-pancakes",
            name: "Pancakes are Drugs, I Guess?",
            description: "What the heck man!?"
        },
        contributor: "Dave"
    },
    // #endregion

    // #endregion
});
