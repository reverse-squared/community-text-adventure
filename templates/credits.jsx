import React from "react";
import { hot } from "react-hot-loader";

// in order of contributing
const contributors = [
    ["Hunter Parcells",         "https://hparcells.netlify.com/"],
    ["Dave",                    "https://davecode.me/"],
    ["Filip96",                 "https://filipkin.com/"],
    ["Colyderp"],
    // People below this still need to say exactly how they want credit.
    ["Adr's Alt", ""],
    ["Alchemyking", ""],
    // ["", ""],
];

export default hot(module)(() => <div>
    <h1>Credits</h1>
    <h3>Head Team</h3>
    <ul>
        <li>Hunter Parcells</li>
        <li>Dave</li>
    </ul>
    <h3>Contributers</h3>
    <ul>
        <li><a href="https://hparcells.netlify.com/"></a></li>
        <li><a href="https://davecode.me/">Dave</a></li>
        <li><a href="https://filipkin.com/">Filip96</a></li>
        <li>Colyderp</li>
        <li><a href="">Alchemyking</a></li>
        <li>... and 43281 anonamous contributors</li>
    </ul>
</div>);