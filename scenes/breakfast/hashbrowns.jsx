import React from "react";
import { } from "web-text-adventure";
import { addScenes } from "@src/ending";
import { CircleText } from "@templates/FontStyles";

addScenes({
    make_hashbrowns: {
        prompt: () => <div>
            <p>Hashbrowns are pretty neat. Lets make some! Pick your flavor.</p>
        </div>,
        options: [
            { text: "Hashbrowns", to: "hashbrown_death" },
            { text: "Hashbrownies", to: "hashbrownies" }
        ],
        contributor: "Adr"
    },
    hashbrown_death: {
        prompt: () => <div>
            <p>When the hashbrowns are done making, you choke on them. Nobody is there to save you nor can you save yourself.You eventually pass out and die.</p>
        </div>,
        ending: {
            id: "hashbrowns",
            name: "Potato Death",
            description: "How did you even choke on something that easy to eat?"
        },
        contributor: "Colyderp"
    },
    hashbrownies: {
        prompt: () => <div>
            <p>
                You make <b>hash</b>brownies, but the hashbrownies have all sorts of assortments of letters all over it. Do you try and understand what it 
                means?
            </p>
        </div>,
        options: [
            { text: "Yes", to: "hash_failtounderstand" },
            { text: "Sure", to: "hash_sure" },
            { text: "Absolutely", to: "" },
            { text: "By All Means", to: "hash_byallmeans" },
            { text: "Okey Dokey", to: "hash_okaydokey" },
            { text: "Alright", to: "hash_allright" },
            { text: "Of Course", to: "hash_ofcourse" },
            { text: "Definitely", to: "hash_definetly" },
            { text: "No thank!", to: "hash_no" }
        ],
        contributor: "Toshiyuki and Hunter"
    },
    hash_failtounderstand: {
        prompt: () => <div>
            <p>
                You try to understand what it means, but it's too hard to understand... You end up deciding that you should not eat this as it may be dangerous to your health.
            </p>
        </div>,
        options: [
            { text: "Find something else to eat", to: "wakeup_breakfast", action: () => startedHashbrowns = true }
        ]
    },
    hash_okaydokey: {
        prompt: () => <div>
            <p>
                You say "Okey Dokey", like you dont know how to read words, but you can read letters. You need to go back to <span style={{color: "cornflowerblue"}}><CircleText string="Reading School" /></span>.
            </p>
        </div>,
        contributor: "Dave",
        ending: {
            id: "reading-school",
            name: "Forget How to Read Properly",
            description: "You half-forgot how to read so you went to reading school."
        }
    },
    hash_ofcourse: {
        prompt: () => <div>
            <p>
                Of course you can read what's on them. They say nothing! It's just a Mario Kart track layout. 🤔
            </p>
        </div>,
        options: [
            { text: "Make a really fucking big version", to: "hash_fuckingbig_version" },
            { text: "Make a tiny potato kart", to: "hash_potatokart" },
            { text: "Eat it", to: "hash_eat" },
            { text: "Smoke it", to: "hash_smokeit" },
        ],
        contributor: "Neema"
    },
    hash_smokeit: {
        prompt: () => <div>
            <p>
                You shred the hashbrownies and shove them into your vaporiser. Time to vape some potato brownies!
            </p>
        </div>,
        options: [
            { text: "Inhale", to: "hash_smokeit2" },
            { text: "Stop Vaping", to: "hash_stop_novape" },
        ],
        contributor: "Neema"
    },
    hash_smokeit2: {
        prompt: () => <div>
            <p>
                You inhale it...
            </p>
        </div>,
        options: [
            { text: "Inhale MORE", to: "hash_smokeit3" },
            { text: "Stop Vaping", to: "hash_smoke_end" },
        ],
        contributor: "Dave"
    },
    hash_smokeit3: {
        prompt: () => <div>
            <p>
                You inhale it...
            </p>
        </div>,
        options: [
            { text: () => <span>Inhale <span style={{ fontWeight: "900", fontStyle: "italic" }}>M O R E</span></span>, to: "hash_smokeit4" },
            { text: "Stop Vaping", to: "hash_smoke_end" },
        ],
        contributor: "Dave"
    },
    hash_smokeit4: {
        prompt: () => <div>
            <p>
                You inhale it...
            </p>
        </div>,
        options: [
            { text: () => <span style={{ fontFamily: "monospace", fontSize: "", color: "red", fontWeight: "900", fontStyle: "italic", textShadow: "0 0 5px red" }}>I N H A L E &nbsp; M O R E</span>, to: "hash_smoke_end" },
        ],
        contributor: "Dave"
    },
    hash_smoke_end: {
        prompt: () => <div>
            <p>You vaped so much potato brownies, you started to get severe vomiting, seizures, and difficulty breathing.</p>
            <p>You also passed out, and died of dehydration soon after.</p>
        </div>,
        ending: {
            id: "over-vape",
            name: "xX_420VapeLord_Xx",
            description: "You are now in the club of the dankest of dank vape lords. Welcome to the gang!"
        },
        contributor: "Hunter"
    },

    hash_definetly: {
        prompt: () => <div>
            <p>
                You definetly can read what's on them. They say nothing! It's just a Mario Kart track layout. 🤔
            </p>
        </div>,
        options: [
            { text: "Make a really fucking big version", to: "hash_fuckingbig_version" },
            { text: "Make a tiny potato kart", to: "hash_potatokart" },
            { text: "Eat it", to: "hash_eat" },
            { text: "Smoke it", to: "hash_smokeit" },
        ],
        contributor: "Neema"
    },
    hash_byallmeans: {
        prompt: () => <div>
            <p>
                By all means you read what's on them. They say nothing! It's just a Mario Kart track layout. 🤔
            </p>
        </div>,
        options: [
            { text: "Make a really fucking big version", to: "hash_fuckingbig_version" },
            { text: "Make a tiny potato kart", to: "hash_potatokart" },
            { text: "Eat it", to: "hash_eat" },
            { text: "Smoke it", to: "hash_smokeit" },
        ],
        contributor: "Neema"
    },
    hash_no: {
        prompt: () => <div>
            <p>You ate the brownie instead.</p>
        </div>,
        ending: {
            id: "ate-brownie",
            name: "Eated Unhealthy",
            description: "You ate a brownie."
        },
        contributor: "Hunter"
    },
    hash_allright: {
        prompt: () => <div>
            <p>You got your left arm and leg cut off trying to say alright. I guess you were <strong>ALL RIGHT</strong>. <em>ba dum tss...</em></p>
        </div>,
        ending: {
            id: "all-right",
            name: "All right",
            description: "Looks like you are right handed... Let me take care of the left..."
        },
        contributor: "Hunter"
    },
    hash_sure: {
        prompt: () => <div>
            <p>You say sure, but the person neat you heard you say "sue". He decideds to sue you for "threatening" to sue him. What do you do?</p>
        </div>,
        options: [
            { text: "Sue back", to: "hash_sue" },
            { text: "Get sued", to: "hash_get_sued" },
            { text: "Murder him", to: "hash_murder" },
            { text: "Escape", to: "" },
            { text: "throw a no u", to: "sue_nou" },
        ],
        contributor: "Hunter"
    },
    sue_nou: {
        prompt: <div>
            <p>he says quietly:</p>
            <h1>no u</h1>
        </div>,
        ending: {
            id: "nou",
            name: "No u",
            description: "Get \"No U-ed\" after \"No U-ing\" someone.",
        }
    },
    hash_sue: {
        prompt: () => <div>
            <p>You tell him that you are going to sue him. He says, "bet no proof." What now?</p>
        </div>,
        options: [
            { text: "Sue", to: "hash_sue2" },
            { text: "Sue", to: "hash_sue2" },
            { text: "Sue", to: "hash_sue2" },
            { text: "Sue", to: "hash_sue2" },
            { text: "Sue", to: "hash_sue2" }
        ],
        contributor: "Hunter"
    },
    hash_sue2: {
        prompt: () => <div>
            <p>You sue the guy and win.</p>
        </div>,
        ending: {
            id: "hash-sue",
            name: "Accidental Sueing",
            description: "Sue an innocent person."
        },
        contributor: "Hunter"
    },
    hash_get_sued: {
        prompt: () => <div>
            <p>You were even told that you were going to get sued. Still, you did nothing about it. Not even get a lawyer.</p>
        </div>,
        ending: {
            id: "hash-sued",
            name: "Agree to get Sued",
            description: "I guess you just wanted to see what it would be like. Who does that?"
        },
        contributor: "Hunter"
    },
    hash_murder: {
        prompt: () => <div>
            <p>You killed him because he was going to sue you. Now his familiy is probably gonna sue you. You should of just ran away.</p>
        </div>,
        ending: {
            id: "sue-murder",
            name: "Violence IS the Answer",
            description: "Hahahahahahahahahahahahahah."
        }
    }
});
