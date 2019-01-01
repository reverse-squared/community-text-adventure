import React from "react";

export const RainbowText = (props) => {
    return <span>
        {(props.string || "").split("").map((char, index) => {
            return <span className="rainbow" style={{ animationDelay: "-" + (10 * index) + "ms" }} key={index.toString()}>{char}</span>;
        })}
    </span>;
};
export const RainbowCircleText = (props) => {
    return <span className="circley-container">
        {(props.string || "").split("").map((char, index) => {
            return <span className="rainbow circly" style={{ animationDelay: "-" + (10 * index) + "ms" }} key={index.toString()}>{char}</span>;
        })}
    </span>;
};

export const CircleText = (props) => {
    return <span className="circley-container">
        {(props.string || "").split("").map((char, index) => {
            return <span className="circly" style={{ animationDelay: "-" + (10 * index) + "ms" }} key={index.toString()}>{char}</span>;
        })}
    </span>;
};