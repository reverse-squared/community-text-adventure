import React from "react";
import { addFlag, setScene } from "web-text-adventure/src/adventure";
import { addScenes } from "@src/ending.jsx";
import { GreenGradient } from "@templates/FontStyles";

addFlag("wallHealth", 40);
addFlag("hasMetalBar", false);
addFlag("jailTurns", 10);
addFlag("jailRunTurns", 20);

const JailCellHeader = () => <div>
    <p className={"loan-header " + (jailTurns < 3 ? "loan-header-low" : "")}>
        You have <strong>{jailTurns}</strong> turns before the <GreenGradient string="Lizard's Venom"/> kicks in.
        Wall Health: {wallHealth}
    </p>
</div>;

const JailRunHeader = () => <div>
    <p className={"loan-header " + (jailRunTurns < 3 ? "loan-header-low" : "")}>
        <span className="police">You have <strong>{jailRunTurns}</strong> turns before the Police catch you.</span>
    </p>
</div>;

function decreaseCellTurn() {
    jailTurns--;
    
    if(jailTurns === 0 && wallHealth <= 0) {
        setScene("jail_die_breaking");
    }else if(jailTurns === 0 && wallHealth > 0) {
        setScene("jail_die");
    }else if(jailTurns > 0 && wallHealth <= 0) {
        setScene("jail_phase2");
    }
}

function decreasePoliceTurn() {
    jailRunTurns--;
}

addScenes({
    jail_start: {
        prompt: () => <div>
            <JailCellHeader />
            <p>You punch the lizard, but it’s ok. Oh, look, animal rights people have sent you to jail! How will you escape?</p>
        </div>,
        options: [
            { text: "Punch the Wall", to: "jail_wall_punch" },
            { text: "Chip Away at the Wall", to: "jail_wall_chip", if: () => hasMetalBar },
            { text: "Search Around the Cell", to: "jail_metal_bar", action: () => hasMetalBar = true, if: () => !hasMetalBar }
        ],
        contributor: "Daniel (Phrotonz)"
    },
    jail_metal_bar: {
        prompt: () => <div>
            <JailCellHeader />
            <p>While searching through the cell, you found a <span style={{color:"grey"}}>Metal Bar</span>. Neat!</p>
        </div>,
        options: [
            { text: "Punch the Wall", to: "jail_wall_punch" },
            { text: "Chip Away at the Wall", to: "jail_wall_chip", if: () => hasMetalBar },
        ],
        action: () => decreaseCellTurn(),
        contributor: "Hunter"
    },
    jail_wall_punch: {
        prompt: () => <div>
            <JailCellHeader />
            <em>punch</em>
        </div>,
        options: [
            { text: "Punch the Wall", to: "jail_wall_punch" },
            { text: "Chip Away at the Wall", to: "jail_wall_chip", if: () => hasMetalBar },
            { text: "Search Around the Cell", to: "jail_metal_bar", action: () => hasMetalBar = true, if: () => !hasMetalBar }
        ],
        action: () => {
            wallHealth--;
            decreaseCellTurn();
        },
        contributor: "Hunter"
    },
    jail_wall_chip: {
        prompt: () => <div>
            <JailCellHeader />
            <p>You slam the <span style={{color:"grey"}}>Metal Bar</span> at the wall. It chips off some cement.</p>
        </div>,
        options: [
            { text: "Punch the Wall", to: "jail_wall_punch" },
            { text: "Chip Away at the Wall", to: "jail_wall_chip" },
        ],
        action: () => {
            wallHealth -= 5;
            decreaseCellTurn();
        },
        contributor: "Hunter"
    },
    jail_die: {
        prompt: () => <div>
            <p>You didn't break enough of the wall for it to break. You eventually died from the Lizard Venom.</p>
        </div>,
        ending: {
            id: "jail-lizard-venom",
            name: "Watch Out It's Venomous!",
            description: "Watch out it's venomous! He has Airpods in, he can't hear us! Fricc."
        },
        contributor: "Hunter"
    },
    jail_die_breaking: {
        prompt: () => <div>
            <p>You died while breaking the wall. That's gonna be Exibit A for evidence of you trying to escape.</p>
        </div>,
        ending: {
            id: "jail-lizard-venom",
            name: "So Close",
            description: "Only if you did more damage earlier."
        },
        contributor: "Hunter"
    },

    jail_phase2: {
        prompt: () => <div>
            <p>You escaped from your cell, but you must find a way to cure yourself from the venom. Where do you do?</p>
        </div>,
        options: [
            { text: "Search the Infirmary", to: "jail_phase2_infirm" },
            { text: "Search the Cell Next to Yours", to: "jail_phase2_neighbor" },
            { text: "Search your Pockets", to: "jail_phase2_pockets" }
        ],
        contributor: "Hunter"
    },
    jail_phase2_infirm: {
        prompt: () => <div>
            <p>You walk into the infirmary looking for cure to the venom. Turns out they gave the last vaccine two minutes ago. Then you just died right then and there.</p>
        </div>,
        ending: {
            id: "jail-venom-die",
            name: "Death in Jail",
            description: "You euthanized yourself more quickly than any criminal on record. Congratulations."
        },
        contributor: "Hunter"
    },
    jail_phase2_neighbor: {
        prompt: () => <div>
            <p>You casually walk into your neighbor's cell. But there is nothing there!</p>
        </div>,
        ending: {
            id: "jail-venom-die",
            name: "Death in Jail",
            description: "You euthanized yourself more quickly than any criminal on record. Congratulations."
        },
        contributor: "Hunter"
    },
    jail_phase2_pockets: {
        prompt: <div>
            <p>OwO look at that. There's a vaccine in your pocket for lizard venom. You inject it in yourself. For some reason this seems really familiar to what you do at home all the time. You feel a lot better, 
                but now the popo are looking for you. Gotta run!
            </p>
        </div>,
        options: [
            { text: "Run Away", to: "jail_run_start" },
            { text: "Get Caught", to: "jail_caught" }
        ],
        contributor: "Hunter"
    },
    jail_caught: {
        prompt: () => <div>
            <p>You decided to turn yourself in. You got arrested in jail and sentanced to 37 more years for attempted escape.</p>
        </div>,
        ending: {
            id: "jail-37-years",
            name: "37 Years",
            description: "How do you even???"
        },
        contributor: "Hunter"
    },
    jail_run_start: {
        prompt: () => <div>
            <JailRunHeader />
            <p>You start running. Which one of your tools do you use?</p>
        </div>,
        options: [
            { text: "Tool Gun", to: "" },
            { text: "Teleporter", to: "jail_run_teleport" },
            { text: "Invisability Cloak", to: "jail_run_invis" }
        ],
        contributor: "Hunter"
    },
    jail_run_invis: {
        prompt: () => <div>
            <p>You throw on the cloak you got from your pocket, but turns out, it made everything invisable. Even your eyes. Now you can't see. You run off a ledge of the building and die of fall
                damage.
            </p>
        </div>,
        ending: {
            id: "jail-invis",
            name: "Invisability Master",
            description: "Go invisable and immediately die from falling."
        },
        contributor: "Hunter"
    },
    jail_run_teleport: {
        prompt: () => <div>
            <JailRunHeader />
            <p>You pull out your teleporter, and decide to hide. Where do you teleport to?</p>
        </div>,
        options: [
            { text: "Outside the Prison", to: "jail_run_out" },
            { text: "In the Nearby Room", to: "jail_nearby" },
            { text: "Then Floor Below", to: "jail_below" },
            { text: "The Floor Above", to: "jail_above" }
        ],
        action: () => decreasePoliceTurn(),
        contributor: "Hunter"
    },
    jail_run_out: {
        prompt: () => <div>
            <JailRunHeader />
            <p>You select your destination, and click teleport. All of a sudden, you are outside the prison at 25,000 feet in the air. I guess you didn't realize that the teleporter map was 3D.</p>
        </div>,
        ending: {
            id: "jail-25000",
            name: "Is Fall Damage Enabled?",
            description: "Fail to teleport to the right altitude."
        },
        contributor: "Hunter"
    },
    jail_below: {
        prompt: () => <div>
            <JailRunHeader />
            <p>You select your destination, and click teleport. All of a sudden, you in the ground. Turns out this prison is only one floor tall. You suffocate and die.</p>
        </div>,
        ending: {
            id: "jail-below",
            name: "The Basement",
            description: "But this prison didn't have a basement :("
        },
        contributor: "Hunter"
    },
    jail_nearby: {
        prompt: () => <div>
            <JailRunHeader />
            <p>You select your destination, and click teleport. All of a sudden, you in the jail cell off to your right. There is no way out. You are the arrested and executed.</p>
        </div>,
        ending: {
            id: "jail-nearby",
            name: "Bad UI",
            description: "The teleporter had a bad UI and it just said \"Room\" not \"Cell\"."
        },
        contributor: "Hunter"
    },
    jail_above: {
        prompt: () => <div>
            <JailRunHeader />
            <p>You select your destination, and click teleport. All of a sudden, you are on the roof. Turns out the prison is only one story tall. What now?</p>
        </div>,
        options: [
            { text: "Jump off the Roof", to: "jail_out_jump" },
            { text: "Search the Roof", to: "jail_out_search" },
            { text: "Enter the Vent", to: "jail_out_vent" }
        ],
        action: () => decreasePoliceTurn(),
        contributor: "Hunter"
    },
    jail_out_jump: {
        prompt: () => <div>
            <p>You jumped off the roof and accidentally landed head first. You died instantly. The police found you short after. Thats a RIP in the chat.</p>
        </div>,
        ending: {
            id: "jail-jump-suicide",
            name: "It's not a Diving Board",
            description: "You looked like an olympic diver. Maybe you should become one..."
        },
        contributor: "Hunter"
    },
    jail_out_search: {
        prompt: () => <div>
            <JailRunHeader />
            <p>You start to search the roof. You find an <b>Old Piece of Rope</b> and a <b>Basketball</b>... which do you take.</p>
        </div>,
        options: [
            { text: "The Rope", to: "jail_heli_shoot" },
            { text: "The Basketball", to: "jail_heli_shoot" }
        ],
        action: () => decreasePoliceTurn(),
        contributor: "Hunter"
    },
    jail_heli_shoot: {
        prompt: () => <div>
            <p>Just as you were picking it up, a <b>Boeing AH-64 Apache</b> flys above you, and shoots all of its missiles and guns at you. You dead son.</p>
        </div>,
        ending: {
            id: "attack-helicopter",
            name: "I Identify as an Attack Helicopter",
            description: "I sexually Identify as an Attack Helicopter. Ever since I was a boy I dreamed of soaring over the oilfields dropping hot sticky loads..."
        },
        contributor: "Hunter"
    },
    jail_out_vent: {
        prompt: () => <div>
            <JailRunHeader />
            <p>You climb into the vent to avoid the incoming helicopter. Now you are in the trash compactor. What now?</p>
        </div>,
        options: [
            { text: "Try to jam it", to: "" },
            { text: "Do nothing", to: "" },
            { text: "Call Threepio", to: "" }
        ],
        action: () => decreasePoliceTurn(),
        contributor: "Hunter"
    }
});
