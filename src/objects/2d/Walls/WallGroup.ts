// import { Container } from "pixi.js";
// import { WALL_THICKNESS } from "../constants";
// import { Wall } from "./Wall";

// export class WallGroup extends Container {
//     private walls:Wall[];

//     constructor() {
//         super();
//         this.walls = this.buildRoom(50,50,750,750);

//         for (let wall of this.walls) {
//             this.addChild(wall)
//         }

//     }

//     public buildRoom(x:number, y:number, w:number, h:number) {
        
//         let topWall = new Wall(x,y,w, WALL_THICKNESS);
//         let leftWall = new Wall(x,y, w , WALL_THICKNESS, true)
//         let bottomWall = new Wall(x - WALL_THICKNESS, y + h, w, WALL_THICKNESS);
//         let rightWall = new Wall(x+ w, y + WALL_THICKNESS, w , WALL_THICKNESS, true)
           
//         return [topWall, leftWall, bottomWall, rightWall]

//     }
// }