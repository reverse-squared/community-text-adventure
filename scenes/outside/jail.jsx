import React from "react";
import { addFlag, setScene } from "web-text-adventure";
import { addScenes } from "@src/ending.jsx";
import { GreenGradient } from "@templates/FontStyles";

addFlag("wallHealth", 40);
addFlag("hasMetalBar", false);
addFlag("jailTurns", 10);

const JailHeader = () => <div>
    <p className={"loan-header " + (jailTurns < 3 ? "loan-header-low" : "")}>
        You have <strong>{jailTurns}</strong> turns before the <GreenGradient string="Lizard's Venom"/> kicks in.
        Wall Health: {wallHealth}
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
            <JailHeader />
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
            <JailHeader />
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
            <JailHeader />
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
            <JailHeader />
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
    }
});
