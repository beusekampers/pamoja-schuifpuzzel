// class Bed extends Furniture {
//     private sizePass : number;
//     private orientationPass : string;

//     constructor(size, orientation, x, y, g:Game){
//         super(size, orientation, x, y, g);
//         this.orientationPass = orientation;
//         this.sizePass = size;

//         if(this.sizePass == 1){
//             if(this.orientationPass == "vert"){ 
//                 this.div.style.backgroundImage = "url(images/bed-vert.png)";
//             } else {
//                 this.div.style.backgroundImage = "url(images/bed.png)";
//             }
//         } else {
//             if(this.orientationPass == "vert"){
//                 this.div.style.backgroundImage = "url(images/bed-big-vert.png)";
//             } else {
//                 this.div.style.backgroundImage = "url(images/bed-big.png)";
//             }
//         }
//     }
// }