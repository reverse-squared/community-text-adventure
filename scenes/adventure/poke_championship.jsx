import React from "react";
import { addFlag } from "web-text-adventure";
import { addScenes } from "@src/ending";

addFlag("PC_Party", []);
addFlag("__rerender", []);

const CharData = {
    bulbasaur: {
        name: "Bulbasaur",
        level: 5,
    },
    charizard: {
        name: "Charizard",
        level: 5,
    },
    magikarp: {
        name: "Magikarp",
        level: 5,
    },
    voltorb: {
        name: "Voltorb",
        level: 5,
    },
    litten: {
        name: "Litten",
        level: 5,
    },
    alakazam: {
        name: "Alakazam",
        level: 5,
    }
};

const ItemData = {
    
};

const handleAddToParty = (id) => () => {
    if(PC_Party.length >= 3) return;
    
    PC_Party.push({ id });
    
    __rerender = undefined;
};
const handleRemoveFromParty = (id) => () => {
    PC_Party = PC_Party.filter(x => x.id !== id);
    
    __rerender = undefined;
};
const handleMovePartyMember = (id) => () => {
    const NewParty = [];

    PC_Party.forEach((obj, i) => {
        if(obj.id === id) return;
        if (PC_Party[i + 1] && PC_Party[i + 1].id === id) {
            NewParty.push({ id });
        }
        NewParty.push(obj);
    });

    PC_Party = NewParty;
};

addScenes({
    champ_start: {
        prompt: () => <div>
            <p> 
                You go to the championships, and you are able to create a three pokémon team. Who do you choose.
            </p>
            <h3>Your Party</h3>
            {
                PC_Party.length === 0
                    ? <p>(empty)</p>
                    : <div>
                        {
                            PC_Party.map((char, i) => {
                                const { name, level } = CharData[char.id];
                                return <div key={char.id} style={{position:"relative"}}>
                                    <a href="#" onClick={handleRemoveFromParty(char.id)} style={{ fontSize: "1.25em" }}>{name} (Lvl {level})</a>
                                    {
                                        i !== 0 &&
                                        <a href="#" onClick={handleMovePartyMember(char.id)} style={{ position: "absolute", right: "0", fontSize: "1.25em", opacity: "0.5" }}>Move Up</a>
                                    }
                                </div>;
                            })
                        }
                    </div>
            }
            <h3>Available Pokémon</h3>
            {
                Object.keys(CharData).filter(id => !PC_Party.find(x => x.id === id)).map(id => {
                    const { name, level } = CharData[id];
                    return <div key={id}>
                        {
                            PC_Party.length >= 3
                                ? <a className="option-disabled" style={{ fontSize: "1.25em" }}>{name} (Lvl {level})</a>
                                : <a href="#" onClick={handleAddToParty(id)} style={{ fontSize: "1.25em" }}>{name} (Lvl {level})</a>
                        }
                    </div>;
                })
            }
            <h3>Start Championship</h3>
            {
                PC_Party.length === 0
                    ? <div style={{textAlign: "center"}}>
                        You need at least one pokémon to start
                    </div>
                    : <div style={{ textAlign: "center" }}>
                        {
                            PC_Party.length !== 3
                            && <div >
                                You dont have a full party (3 pokémon), so it may be harder to win the battles.
                                <br/>
                                <br/>
                            </div>
                        }
                        <a href="#">START CHAMPIONSHIP</a>
                    </div>
            }
        </div>,
        options: [],
        excludeEmptyOptionsCheck: true,
        contributor: "A lot of people"
    }
});