// This module handles endings, see implementations at ./src/ending.jsx
import { Scene, Text } from 'web-text-adventure';

/** Info passed to addEnding() */
interface EndingInfo {
    id: string;
    name: Text;
    description: Text;
}
/** Ending object, contains extra `achieved` boolean. */
interface Ending extends EndingInfo {
    achieved: boolean;
}
/** Returned from getGameProgress */
interface GameProgress {
    /** Total Ending Count */
    totalEndings: number;
    /** Count of Endings you have achieved */
    achievedEndings: number;
    /** Percentage of completion. (0-1) */
    percentage: number;
}
interface SceneWithEnding extends Scene {
    /** Marks this scene as an ending, and when this scene is activated you earn the ending. */
    ending?: EndingInfo;
}

/** Registers an ending, or replaces it if it already exists */
export function addEnding(endingInfo: EndingInfo): undefined;

/** Returns the ending list */
export function getAllEndings(): {[id: string]: Ending};

/** Returns Game Progress */
export function getGameProgress(): GameProgress;

/** Marks an ending as complete */
export function achieveEnding(id: string): undefined;

/** Add scenes but with ending support */
export function addScenes(scenes: { [id: string]: SceneWithEnding }): undefined;
