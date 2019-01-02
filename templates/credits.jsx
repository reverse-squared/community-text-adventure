import React from "react";
import { hot } from "react-hot-loader";

// in order of contributing
const contributors = [
    ["Hunter Parcells",         "https://hparcells.netlify.com/"],
    ["Dave",                    "https://davecode.me/"],
    ["Filip96",                 "https://filipkin.com/"],
    ["Colyderp"],
    // People below this still need to say exactly how they want credit.
    ["Adr's Alt",               ""],
    ["Alchemyking",             ""],
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
        {
            contributors.sort().map((contributor, i) => {
                if(contributor.length === 1) {
                    return <li key={i}>{contributor[0]}</li>;
                } else {
                    return <li key={i}><a rel="noopener" target="_blank" href={contributor[1]}>{contributor[0]}</a></li>;
                }
            })
        }
    </ul>
    <h3>Made With</h3>
    <ul>
        <li><a href="https://davecode.me/text-adventure">Text Adventure Engine</a></li>
        <li><a href="https://reactjs.org/">React</a></li>
        <li><a href="http://netlify.com">Netlify</a></li>
    </ul>
</div>);