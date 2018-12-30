import React from 'react';
import { Prompt, Options, setCustomHTML } from 'web-text-adventure';
import './style.css';

setCustomHTML(() => <div>
    <h1>Community Text Adventure</h1>
    <p>All paths and options are made by different people.</p>
    <br></br>
    <Prompt />
    <Options />
</div>);
