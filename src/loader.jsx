// This file handles hot-reloading and starting up 
// startup file, loads all other files

import "../templates/custom-html.jsx";
import { setScene } from "web-text-adventure";

// Scene Files
const sceneCtx = require.context("../scenes/", true, /\.jsx$/);
sceneCtx.keys().forEach(file => {
    sceneCtx(file);
});

// Hot Reloading
if (module.hot) {
    module.hot.accept("../templates/custom-html.jsx", () => {});
    module.hot.accept(sceneCtx.id, () => {
        const sceneCtx = require.context("../scenes/", true, /\.jsx$/);
        sceneCtx.keys().forEach(file => {
            sceneCtx(file);
        });
    });
}

if(location.href.endsWith("#credits")) {
    setScene("credits");
}