import React from 'react';
import { Prompt, Options } from 'web-text-adventure';
import './style.css';

export default () => <div>
    <h1>Community Text Adventure</h1>
    <p>All paths and options are made by different people.</p>
    <br></br>
    <Prompt />
    <Options />
</div>
