import { UMI } from "../Logic/UMI.js";

export class Image {

    private x;
    private y;
    private img;

    private width;
    private height;

    constructor(x, y, url, width, height, opcaity?){
        this.img = document.createElement("img");
        this.img.style.display = "none";
        this.img.src = url;
        this.img.setAttribute("preload", "auto");
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;

        document.body.appendChild(this.img);
    }

    public getX(){
        return this.x;
    }

    public getY(){
        return this.y;
    }


    public draw(ctx){
        ctx.drawImage(this.img, UMI.screenX(this.x),UMI.screenY(this.y), this.width, this.height);
    }

}