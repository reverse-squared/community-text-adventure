import React from "react";
import { } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending";

addScenes({
    // Pokemon
    adventure_pokemon_start: {
        prompt: () => <div>
            <p>You carefully step into the tall grass. Then suddenly a Pokemon appears! You can't run from trainer battles, so you send out your Charmander to fight the 
                Squirtle.
            </p>
        </div>,
        options: [
            { text: "Continue", to: "adventure_pokemon_main" },
        ],
        contributor: "Hunter"
    },

    adventure_pokemon_main: {
        prompt: () => <div>
            <p>What does Charmander do?</p>
        </div>,
        options: [
            { text: "Fight", to: "adventure_pokemon_fight" },
            { text: "Bag", to: "adventure_pokemon_bag" },
            { text: "Pokemon", to: "adventure_pokemon_pokemon" },
            { text: "Run", to: "adventure_pokemon_run" },
        ],
        contributor: "Hunter"
    },

    adventure_pokemon_fight: {
        prompt: () => <div>
            <p>What does Charmander do?</p>
        </div>,
        options: [
            { text: "Yeet", to: "adventure_pokemon_yeet" },
            { text: "Die", to: "adventure_pokemon_die" },
            { text: "Ember", to: "adventure_pokemon_ember" },
            "seperator",
            { text: "Go back", to: "adventure_pokemon_main" }
        ],
        contributor: "Alchemyking and Hunter"
    },

    adventure_pokemon_bag: {
        prompt: () => <div>
            <p>You have no items in your bag.</p>
        </div>,
        options: [
            { text: "Go back", to: "adventure_pokemon_main" }
        ],
        contributor: "Hunter"
    },

    adventure_pokemon_pokemon: {
        prompt: () => <div>
            <p>You only own one pokemon!</p>
        </div>,
        options: [
            { text: "Go back", to: "adventure_pokemon_main" }
        ],
        contributor: "Hunter"
    },

    adventure_pokemon_run: {
        prompt: () => <div>
            <p>You can't run from trainer battles!</p>
        </div>,
        options: [
            { text: "Go back", to: "adventure_pokemon_main" }
        ],
        contributor: "Hunter"
    },

    adventure_pokemon_ember: {
        prompt: () => <div>
            <p>Opponent: You though this was a REAL battle? Get lost.</p>
            <p>Your oponent then throws a magical portal above your head and you get deaded by a bug twomp  .</p>
        </div>,
        ending: {
            id: "thwomped",
            name: "Thwomped",
            description: "Get crushed by a big stone guy dude... thing... idek.",
        },
        contributor: "Hunter"
    },
    adventure_pokemon_die: {
        prompt: () => <div>
            <p>You told your Charmander to use Die.</p>
            <p>Your pokemon's level or stress reacted 100% and it started to kill itself.</p>
            <p>It finally died, and nobody was there to stop it.</p>
            <h1>F</h1>
        </div>,
        ending: {
            id: "pokemon-suicide",
            name: "Pokemon Suicide",
            description: "It's not animal abuse if you're not abusing it.",
        },
        contributor: "Hunter"
    },
    adventure_pokemon_yeet: {
        prompt: () => <div>
            <p>Your Charmander evolved into a Charizard, and YEETED, the oponent across the hills.</p>
            <p>I'm pretty sure it died.</p>
            <p>Now that the battle is over, what do you do?</p>
        </div>,
        options: [
            { text: "Use Fly", to: "skydive_no_parachute_pokemon" },   
            { text: "Feed the Pokemon", to: "pokemon_feed" },
        ],
        contributor: "Hunter"
    },
    pokemon_feed: {
        prompt: () => <div>
            <p>You scramble through your pocket to find anything that could be used as food. After three minutes of digging, you find a raw piece of meat.
                Do you feed Charizard it?
            </p>
        </div>,
        options: [
            { text: "Yes", to: "pokemon_yes_feed" },
            { text: "No", to: "pokemon_no_feed" }
        ],
        contributor: "Hunter"
    },
    pokemon_no_feed: {
        prompt: () => <div>
            <p>You neglected to feed and take care of your pokemon and it eventually died. Professor Oak found out though all those sneaky nanoCams he 
                has watching your every move. Your punishment: Banished to an island. Do you come back?
            </p>
        </div>,
        options: [
            { text: "Yes", to: "pokemon_yes_come_back" },
            { text: "No", to: "pokemon_no_come_back" }
        ],
        contributor: "Hunter"
    },
    pokemon_no_come_back: {
        prompt: () => <div>
            <p>You decide to not come back. You now live on this island for ever.</p>
        </div>,
        ending: {
            id: "island-banished",
            name: "Banished to an Island",
            description: "You got banished to an island and stayed there for the rest of you're life.",
        },
        contributor: "Hunter"
    },
    pokemon_yes_come_back: {
        prompt: () => <div>
            <p>Remember what I said about nanoCams? Yeah, Professor Oak found out you came back and banished you to a large island.</p>
        </div>,
        ending: {
            id: "big-island-banished",
            name: "Banished to a BIG Island",
            description: "You got banished to an big island and made it your own.",
        },
        contributor: "Hunter"
    },
    pokemon_yes_feed: {
        prompt: () => <div>
            <p>You feed the Charizard the raw meat. SUPRISE, pokemon can't eat raw meat, and your Charizard is dead.</p>
            <p><a href="https://youtu.be/AGMGe3jQNjY" target="_blank">"It's probably just playing possum."</a></p>
        </div>,
        ending: {
            id: "raw-meat-pokemon",
            name: "IT'S RAW!",
            description: "It's the kind of stuff you'd expect Tiger Woods to tee of it.",
        },
        contributor: "Hunter"
    }
});
