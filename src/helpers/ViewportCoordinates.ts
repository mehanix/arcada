import { main } from "../editor/EditorRoot"

import { useStore } from "../stores/EditorStore";
export function viewportX(x:number, customSnap?) {
    let newX = x/main.scale.x  + main.corner.x;
    let shouldSnap = customSnap ?? useStore.getState().snap;
    if (shouldSnap) {
        newX = snap(newX)
    }
    return Math.trunc(newX);
}

export function viewportY(y:number, customSnap?) {
    let newY = y/main.scale.y  + main.corner.y;
    let shouldSnap = customSnap ?? useStore.getState().snap;
    if (shouldSnap) {
        newY = snap(newY)    
    }
    return Math.trunc(newY);
 
}

export function snap(val) {
    let rest = val%10;
    let cat = val - rest;
    if (rest < 5) {
        return cat;
    }
    return cat + 10;
}