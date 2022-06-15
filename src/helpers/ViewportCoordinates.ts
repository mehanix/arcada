import { main } from "../editor/EditorRoot"

import { useStore } from "../stores/EditorStore";
export function viewportX(x:number, customSnap?) {
    let newX = x/main.scale.x  + main.corner.x;
    let snap = customSnap ?? useStore.getState().snap;
    if (snap) {
        newX -= newX % 10
    }
    return Math.trunc(newX);
}

export function viewportY(y:number, customSnap?) {
    let newY = y/main.scale.y  + main.corner.y;
    let snap = customSnap ?? useStore.getState().snap;
    if (snap) {
        newY -= newY % 10    
    }
    return Math.trunc(newY);
 
}