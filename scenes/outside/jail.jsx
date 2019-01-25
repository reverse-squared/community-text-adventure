import React from "react";
import { addFlag, setScene } from "web-text-adventure";
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
        You have <strong>{jailRunTurns}</strong> turns before the <span className="police">Police</span> catch you.
    </p>
</div>;

function decreaseTurn() {
    jailTurns--;
    
    if(jailTurns === 0 && wallHealth <= 0) {
        setScene("jail_die_breaking");
    }else if(jailTurns === 0 && wallHealth > 0) {
        setScene("jail_die");
    }else if(jailTurns > 0 && wallHealth <= 0) {
        setScene("jail_phase2");
    }
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
        action: () => decreaseTurn(),
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
            decreaseTurn();
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
            decreaseTurn();
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
            { text: "Search the Pockets", to: "jail_phase2_pockets" }
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
            { text: "Teleporter", to: "" },
            { text: "Invisability Cloak", to: "" }
        ],
        contributor: "Hunter"
    }
});
