
import { Point } from "pixi.js";

export function getCorrespondingY(x: number, a: Point, b: Point) {
    return ((x - a.x) * (b.y - a.y)) / (b.x - a.x) + a.y;
    // let res= ((x - a.x) * (b.y - a.y)) / (b.x - a.x)
    // if (isNaN(res)) {
    //     return a.y;
    // }

    // return res + a.y;
}