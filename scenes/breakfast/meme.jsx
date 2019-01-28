import React from "react";
import { addFlag, setScene } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";
import { GreenGradient } from "@templates/FontStyles";
import SceneLink from "@templates/SceneLink";
import checkCard from "@src/card";

addFlag("collect200", false);
addFlag("scriptsRead", 0);
addFlag("failedCrusades", 0);

const CrusadeHeader= () => <div>
    <p>Your Crusade's Have Failed {failedCrusades} time{(failedCrusades != 1) ? "s" : ""}!</p>
</div>;

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
            <p><b><span style={{fontSize: "50px"}}><i>HIT</i> OR <i>MISS</i></span>, I NEVER HIT THAT VAPE! HUH?</b> You have become a <GreenGradient string="Level 100 Master"/>. Now this is epic. That's how <s>the mafia</s> school works.</p>
        </div>,
        options: [
            { text: "Attention, all Fortnite gamers...", to: "meme_attention_all_gamers" },
            { text: "I wanna be tracer...", to: "meme_overwatch" },
            { text: "1 2 7 3...", to: "meme_1273" },
            { text: "I'm going to say the N-Word...", to: "meme_nword" },
            { text: "This is so sad... Alexa play...", to: "meme_alexa" },
            { text: "Wait. That's illegal...", to: "" },
            { text: "What even is this?", to: "meme_whateven" },
            { text: "Kris, is that a weed...", to: "meme_weed" },
            { text: "I smell pennies...", to: "" },
            { text: "Mary, is that a police...", to: "meme_police" },
            { text: "It's time for a crusade...", to: "meme_crusade" },
            { text: "Yeetus yeetus...", to: "" },
            { text: "You're gonna have a bad time...", to: "" },
            { text: "NANI?!?!", to: "" },
            { text: "That's what she said...", to: "" },
            { text: "I play Pokemon Go...", to: "meme_pokemon_go" },
            { text: "TURN IT UP TO 11...", to: "meme_turn11" },
            { text: "Wake me up inside...", to: "" }
        ],
        contributor: "Hunter, Helvetica, and Dave"
    },
    meme_pokemon_go: {
        prompt: () => <div>
            <p>
                Get out this is too old, like what? 2015?
            </p>
        </div>,
        ending: {
            id: "2015",
            name: "Get Kicked out",
            description: "What is this? 2015?"
        },
        contributor: "Koz"
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
    },
    meme_weed: {
        prompt: () => <div>
            <p>I don't know about you, but it looks <i style={{fontWeight: "bold"}}>A LOT</i> like <span style={{color: "green"}}>weed</span> to me.</p>
        </div>,
        options: [
            { text: "Call the Police", to: "" },
            { text: "Do Literally Nothing", to: "" },
            { text: "\"Officer, He's Over Here\"", to: "" } 
        ],
        contributor: "Hunter"
    },
    meme_whateven: {
        prompt: () => <div>
            <p>To be honest, we don't even know either.</p>
        </div>,
        ending: {
            id: "meme-agree",
            name: "Finally We Agree on Something",
            description: "This is total nonsense!"
        },
        contributor: "Hunter"
    },
    meme_alexa: {
        prompt: () => <div>
            <p>You tell Alexa to play a song for you. Which song is it?</p>
        </div>,
        options: [
            { text: "The Entire Bee Movie Script", to: "meme_bee" },
            { text: "Despacito 2", to: "meme_alexa_not_found" },
            { text: "The Entire Ice Age Pentology but Every Syllable Is Replaced With the Entire Toy Story Trilogy but Every Second That the Color Green Is in the Frame It Is Replaced Withevery Video Ever Uploaded on Youtube but Every 10 Seconds Every Episode of the Simpsons Plays but Every Word With a Vowel Is Replaced With the Bee Movie but Every Time a Bee Is Shown It Is Replaced With Every Episode of SpongeBob Played Backwards", to: "meme_the_entire_ice" },
        ],
        contributor: "Hunter"
    },
    meme_alexa_not_found: {
        prompt: () => <div>
            <p><b>Alexa</b>: No results for: <i>Despacito 2</i>... Please try another query!</p>
        </div>,
        options: [
            { text: "The Entire Bee Movie Script", to: "meme_bee" },
            { text: "Despacito 2", disabledText: "No Results", if: () => false, to: "meme_alexa_not_found" },
            { text: "The Entire Ice Age Pentology but Every Syllable Is Replaced With the Entire Toy Story Trilogy but Every Second That the Color Green Is in the Frame It Is Replaced Withevery Video Ever Uploaded on Youtube but Every 10 Seconds Every Episode of the Simpsons Plays but Every Word With a Vowel Is Replaced With the Bee Movie but Every Time a Bee Is Shown It Is Replaced With Every Episode of SpongeBob Played Backwards", to: "meme_the_entire_ice" },
        ],
        contributor: "Hunter"
    },
    meme_the_entire_ice: {
        prompt: () => <div>
            <p>You told the Alexa to play <b>The Entire Ice Age Pentology but Every Syllable Is Replaced With the Entire Toy Story Trilogy but Every Second That the Color Green Is in the Frame It Is Replaced Withevery Video Ever Uploaded on Youtube but Every 10 Seconds Every Episode of the Simpsons Plays but Every Word With a Vowel Is Replaced With the Bee Movie but Every Time a Bee Is Shown It Is Replaced With Every Episode of SpongeBob Played Backwards</b>, 
                You eventually die of old age. Actually, you did more than die... You died 829,721,681,607 times! That's after all the stars in the universe would have died!
            </p>
        </div>,
        ending: {
            id: "die-800-quint",
            name: "Dying 800 Quintillion times?",
            description: "Doctor: \"You only have one more YouTube video to watch before you die...\""
        },
        contributor: "Colyderp"
    },
    bee_lover: {
        prompt: () => <div>
            <p>You heard <span style={{color:"yellow"}}>The Bee Movie</span> so many times, you decided you spend the rest of your life protecting the life of bees.</p>
        </div>,
        ending: {
            id: "bee-lover",
            name: "Bee Lover",
            description: "You like jazz?"
        },
        contributor: "Hunter"
    },
    meme_bee_dont: {
        prompt: () => <div>
            <p>As a smart person, you did not waste your time hearing the <span style={{color:"yellow"}}>The Bee Movie</span> script even more. What now do you ask Alexa?</p>
        </div>,
        options: [
            { text: "What is One Quintillion to the Power of One Quintillion?", to: "meme_alexa2_000" },
            { text: "What does the fox say?", to: "meme_alexa2_fox" },
            { text: "Show me a recipe for a grilled cheese sandwich", to: "meme_alexa2_grilled_cheese" }
        ],
        contributor: "Hunter"
    },
    meme_alexa2_grilled_cheese: {
        prompt: () => <div>
            <p><b>Alexa</b>: Pathetic. You're 32 years of age, and you don't know how to make a grilled cheese sandwich. <b>IT'S NAME IS THE RECIPE YOU #$@&%*!</b></p>
        </div>,
        ending: {
            id: "grilled-cheese",
            name: "Bad at Cooking",
            description: "Pathetic..."
        },
        contributor: "Hunter"
    },
    meme_alexa2_fox: {
        prompt: () => <div>
            <p><b>Alexa</b>: The fox goes <em>YIP</em>.</p>
            <p>I don't know what you were expecting.</p>
        </div>,
        ending: {
            id: "fox",
            name: "The Fox Goes Yip",
            description: "Pow wow wow..."
        },
        contributor: "Hunter"
    },
    meme_1273: {
        prompt: () => <div>
            <p>That’s not how counting works! You get sent to Baldi’s Basics, where you have to endure the toughest question of all...</p>
            <p><b>WHAT’S 1 + 1?,</b></p>
        </div>,
        options: [
            { text: "2", to: "meme_1273_2" },
            { text: "83838383838", to: "meme_1273_8" },
        ],
        contributor: "Alchemyking"
    },
    meme_1273_2: {
        prompt: () => <div>
            <p>Suddenly, a bunch of catgirls break into the classroom and maul you to death, all while some sort of Estonian pop song plays in the background.</p>
        </div>,
        ending: {
            id: "nni",
            name: "NICO NICO NIIII",
            description: "Still a better answer than 9 + 10 = 21."
        },
        contributor: "Alchemyking"
    },
    meme_1273_8: {
        prompt: () => <div>
            <p>You got it right! as a reward, the teacher lets you go down Rockefeller Street. You now know what Rockefeller groove is.</p>
        </div>,
        ending: {
            id: "rockefeller-street",
            name: "YOU’RE WINNER!",
            description: "CONGRATATION!"
        },
        contributor: "Alchemyking"
    },
    meme_police: {
        prompt: () => <div>
            <p>You see that Mary has a police officer next to her, so you decide to call the <span style={{color: "green"}}><i>420 Gang</i></span> to warn them of their presence. Thanks loyal gang member.</p>
        </div>,
        ending: {
            id: "gang-member",
            name: "Loyal Gang Member",
            description: "Give a good warning of the \"Bad Guys\"..."
        },
        contributor: "Hunter"
    },
    meme_crusade: {
        prompt: () => <div>
            <CrusadeHeader />
            <p>You decicde to do a crusade... <span style={{color: "red"}}><b>It failed...</b></span></p>
        </div>,
        options: [
            { text: "Crusade Again...", to: "meme_crusade" },
            { text: "Stop the Crusades", to: "meme_crusade_stop", if: () => failedCrusades > 0 }
        ],
        action: () => {
            failedCrusades++;

            if(failedCrusades >= 1000000) {
                setScene("crusades_one_mil");
            }
        },
        contributor: "Hunter"
    },
    meme_crusade_stop: {
        prompt: () => <div>
            <p>You stopped the crusades after {failedCrusades} attempt{(failedCrusades != 1) ? "s" : ""}. Nobody listened to you and you eventually fell into a deep depression...</p>
        </div>,
        ending: {
            id: "crusade-stop",
            name: "Stopping the Crusades",
            description: "At least you know when to stop..."
        },
        contributor: "Hunter"
    },
    crusades_one_mil: {
        prompt: <div>
            <p><b>WOW!</b> We did not expect you to click that button one million times. In fact, you probably didn't you either used an autoclicker or you viewed
                the source code and set the variable in the developer tools console. You little cheater...
            </p>
        </div>,
        ending: {
            id: "crusade-cheater",
            name: "Probably Cheater",
            description: "We will never know."
        },
        contributor: "Hunter"
    },
    meme_overwatch: {
        prompt: () => <div>
            <p>Well sucks to suck because <b>I'M ALREADY TRACER</b>!</p>
        </div>,
        ending: {
            id: "tracer",
            name: "Looks Like I'm Not Tracer",
            description: "Tracer has been picked already..."
        },
        contributor: "Hunter"
    }
});
