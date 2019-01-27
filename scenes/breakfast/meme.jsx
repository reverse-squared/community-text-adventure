import React from "react";
import { addFlag, setScene } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";
import { GreenGradient } from "@templates/FontStyles";
import SceneLink from "@templates/SceneLink";
import checkCard from "@src/card";

addFlag("collect200", false);

function checkCreditCard() {
    if(checkCard(document.getElementById("cardid").value)) {
        setScene("meme_real_card");
    } else {
        setScene("meme_invalid_card");
    }
}

addScenes({
    hash_stop_novape: {
        prompt: () => <div>
            <p><b>HIT OR MISS, I NEVER HIT THAT VAPE! HUH?</b> You have become a <GreenGradient string="Level 100 Master"/>. Now this is epic. That's how <s>the mafia</s> school works.</p>
        </div>,
        options: [
            { text: "Attention, all Fortnite gamers...", to: "meme_attention_all_gamers" },
            { text: "I wanna be tracer...", to: "meme_overwatch" },
            { text: "1 2 7 3...", to: "" },
            { text: "I'm going to say the N-Word...", to: "meme_word" },
            { text: "This is so sad... Alexa play...", to: "" },
            { text: "Wait. That's illegal...", to: "" },
            { text: "What even is this?", to: "" },
            { text: "Kris, is that a weed...", to: "" },
            { text: "I smell pennies...", to: "" },
            { text: "Mary, is that a police...", to: "" },
            { text: "It's time for a crusade...", to: "" },
            { text: "Yeetus yeetus...", to: "" },
            { text: "You're gonna have a bad time...", to: "" },
            { text: "NANI?!?!", to: "" },
            { text: "That's what she said...", to: "" },
            { text: "I play Pokemon Go...", to: "" },
            { text: "TURN IT UP TO 11...", to: "meme_turn11" },
            { text: "Wake me up inside...", to: "" }
        ],
        contributor: "Hunter, Helvetica, and Dave"
    },
    meme_turn11: {
        prompt: () => <div>
            <p>Nice try... but that ending is in a diffrent castle. Now go back to the start <strong>Do Not Collect $200</strong>... and also, you don't get an ending this time.</p>
            <img src="https://media1.tenor.com/images/9bb8f1a9272c2d29f77f442b90a5b111/tenor.gif" />
        </div>,
        options: [
            { text: "Return to Start", to: "wakeup_no_reset", action: () => collect200 = true }
        ],
        contributor: "Hunter"
    },
    meme_attention_all_gamers: {
        prompt: () => <div>
            <p>
                <span style={{ color: "red" }}>Attention all Community Text Adventure gamers!</span> Hunter is in great danger, and he needs your help.
                He is too caught up in having an actual life that he has not worked on the game for several minutes! If he doesn't get back to the game
                the fans will throw hate!
                All he needs is your credit card number, the three digits on the back, and the expiration month and year.
                But you got to be quick, so that Hunter can get the pull request, compile the game, and upload the <em><b>EPIC UPDATE TO CTA</b></em>.
            </p>
            <br/><br/>
            <p style={{textAlign:"center"}}>
                Enter in your credit card number:
            </p>
            <div style={{ textAlign: "center" }}>
                <input style={{ background: "black", color: "white", padding: "1em", border: "1px solid white" }} type="text" id="cardid" placeholder="A totally legitimate input box. " />
                {" "}
                <button style={{ background: "black", color: "white", padding: "1em", border: "1px solid white" }} onClick={checkCreditCard}>Send</button>
                <br/>
                <SceneLink to="meme_attention_all_gamers2" style={{ fontSize: "0.5em", textAlign: "center" }}>more info</SceneLink>
            </div>
        </div>,
        options: [],
        excludeEmptyOptionsCheck: true,
        contributor: "Daniel (Phrotonz) and Dave"
    },
    meme_attention_all_gamers2: {
        prompt: () => <div>
            <p>It doesn't actually do anything with what you type in LMAO.</p>
            <small>If you really don't believe us, check the source code at <a href="https://github.com/WeAreDevs/community-text-adventure" target="_blank">https://github.com/WeAreDevs/community-text-adventure</a></small>
        </div>,
        options: [
            { text: "Back", to: "meme_attention_all_gamers" }
        ]
    },

    meme_nword: {
        prompt: () => <div>
            <code>The Devs: Actually let's not.</code><br/>
        </div>,
        ending: {
            id: "banned-by-devs",
            name: "Blocked by The Devs",
            description: "We can't say the N-Word in this game, says the devs."
        }
    },

    meme_real_card: {
        prompt: () => <div>
            <p>
                The card gets accepted, and you have successfully helped Hunter work on CTA.
            </p>
        </div>,
        ending: {
            id: "real-card",
            name: "Honest Person",
            description: "Enter a real credit card into the box."
        },
        contributor: "Dave"
    },
    meme_invalid_card: {
        prompt: () => <div>
            <p>
                They find out that your didn't enter a credit card into it, and they send you to jail. (Who would even try entering a real card into it anyways?)
            </p>
        </div>,
        options: [
            {
                text: "Go to Jail, do not pass go",
                to: "jail_start_card",
                action: () => jailForCard = true,
            },
            {
                text: "Go to Jail, and pass go and collect $200",
                to: null,
                disabledText: true,
                if: () => false,
            },
        ],
        contributor: "Hunter"
    }
});
