import { UMI } from "../Logic/UMI.js";
var Image = (function () {
    function Image(x, y, url, width, height, opcaity) {
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
    Image.prototype.getX = function () {
        return this.x;
    };
    Image.prototype.getY = function () {
        return this.y;
    };
    Image.prototype.draw = function (ctx) {
        ctx.drawImage(this.img, UMI.screenX(this.x), UMI.screenY(this.y), this.width, this.height);
    };
    return Image;
}());
export { Image };
