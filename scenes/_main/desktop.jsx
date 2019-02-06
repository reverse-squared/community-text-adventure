import React from "react";
import { addScenes } from "@src/ending";
import SceneLink from "@templates/SceneLink";

addScenes({
    desktop: {
        prompt: () => <div>
            <SceneLink to="start">Back</SceneLink>
            <h1>Install CTA Desktop</h1>
            <ul>
                <li><a href="http://dave.imfast.io/software/cta/community-text-adventure-win32-x64.zip" target="_blank" rel="noopener noreferrer">Windows (64 Bit)</a></li>
                <li><a href="http://dave.imfast.io/software/cta/community-text-adventure-win32-ia32.zip" target="_blank" rel="noopener noreferrer">Windows (32 Bit)</a></li>
                <br/>
                <li><a href="http://dave.imfast.io/software/cta/community-text-adventure-darwin.zip" target="_blank" rel="noopener noreferrer">MacOS</a></li>
                <br/>
                <li><a href="http://dave.imfast.io/software/cta/community-text-adventure-linux-x64.zip" target="_blank" rel="noopener noreferrer">Linux (64 Bit)</a></li>
                <li><a href="http://dave.imfast.io/software/cta/community-text-adventure-linux-ia32.zip" target="_blank" rel="noopener noreferrer">Linux (32 Bit)</a></li>
            </ul>
            <p>
                These are just zip files with all the game files, no installer. To run on linux you may need to use a terminal to run <span style={{color:"orange"}}>./community-text-adventure</span>
            </p>
        </div>,
        options: [],
        excludeEmptyOptionsCheck: true,
        noContributor: true,
    },
});
