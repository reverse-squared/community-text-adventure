import React from "react";
import GraphemeSplitter from "grapheme-splitter";
const splitter = new GraphemeSplitter();

export const RainbowText = (props) => {
    return <span>
        {splitter.splitGraphemes(props.string || "").map((char, index) => {
            return <span className="rainbow" style={{ animationDelay: "-" + (10 * index) + "ms" }} key={index.toString()}>{char}</span>;
        })}
    </span>;
};
export const RainbowCircleText = (props) => {
    return <span className="circley-container">
        {splitter.splitGraphemes(props.string || "").map((char, index) => {
            return <span className="rainbow circly" style={{ animationDelay: "-" + (10 * index) + "ms" }} key={index.toString()}>{char}</span>;
        })}
    </span>;
};

export const CircleText = (props) => {
    return <span className="circley-container">
        {splitter.splitGraphemes(props.string || "").map((char, index) => {
            return <span className="circly" style={{ animationDelay: "-" + (10 * index) + "ms" }} key={index.toString()}>{char}</span>;
        })}
    </span>;
};

export const FlashText = (props) => {
    return <span style={{fontWeight:"bold", color: "#FF0"}}>
        {splitter.splitGraphemes(props.string || "").map((char, index) => {
            return <span className="flashyyy" style={{ animationDelay: "-" + (10 * index) + "ms" }} key={index.toString()}>{char}</span>;
        })}
    </span>;
};

export const GreenGradient = (props) => {
    return <span>
        {splitter.splitGraphemes(props.string || "").map((char, index) => {
            return <span className="gradient-green" style={{ animationDelay: (- 1000 + 50 * index) + "ms" }} key={index.toString()}>{char}</span>;
        })}
    </span>;
};

export const Color = (props) => {
    return <span style={{ color: props.col || props.color, ...props.style}} {...props}>{props.children}</span>;
};
