import React from 'react';
import { Prompt, Options, setCustomHTML } from 'web-text-adventure';
import './style.css';

setCustomHTML((scene) => <div>
    <h1>Community Text Adventure</h1>
    
    <br></br>
    
    <Prompt />
    <Options />
    
    <br/>

    {
        scene.contributor !== null
        ? (
            scene.contributor
            ? <p className="credit">Scene contributed by {scene.contributor}</p>
            : <p className="credit">Scene contributed anonymously</p>
        )
        : null
    }
</div>);
