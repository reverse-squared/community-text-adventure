import React from "react";
import { Prompt, Options, DebugPanel, setCustomHTML, getScene } from "web-text-adventure/src/adventure";

setCustomHTML((scene) => {
    if (scene.isBlank) return null;
    
    if(scene.isFinale) {
        return <Prompt />;
    }
    if (scene.isWhite) {
        return <style>{"body{background:white;overflow:none;}"}</style>;
    }

    return <div>
        <h1>Community Text Adventure</h1>
        {
            getScene() === "start" && <p style={{ marginTop:"-20px", color: "#aAA"}}>
                Version {$version}
            </p>
        }

        <br></br>

        <Prompt />
        <Options />

        <br />

        {
            scene.contributor !== null
                ? (
                    scene.contributor
                        ? <p className="credit">Scene contributed by {scene.contributor}</p>
                        : null
                )
                : <p className="credit">Scene contributed anonymously</p>
        }

        <br/>
        <br/>
        <br/>
        <br/>
        
        <DebugPanel />
    </div>;
});
