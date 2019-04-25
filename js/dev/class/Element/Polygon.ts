import { GameElement } from './GameElement.js';
import { UMI } from '../Logic/UMI.js';

export class Polygon  extends GameElement{

    private polygons:Array<Array<number>>;
    private polygonsOnMap:Array<Array<number>>;
    private color;
    private width = 0;
    private height = 0;
    private minX = 999999999;
    private minY = 999999999;
    private maxX = 0;
    private maxY = 0;

    constructor(x:number, y:number, polygons:Array<Array<number>>, color:string, img?){
        super(x, y);
        this.color = color;
        this.polygons = polygons;
        this.updatePolygonsOnMap();
        for (var i = 0; i < this.polygons.length; i++) {
            if(this.polygons[i][0] > this.width) this.width = this.polygons[i][0];
            if(this.polygons[i][1] > this.height) this.height = this.polygons[i][1];
            if(this.polygons[i][0] < this.minX) this.minX = this.polygons[i][1];
            if(this.polygons[i][1] < this.minY) this.minY = this.polygons[i][1];
        }
        this.maxX = this.width + this.getX();
        this.maxY = this.height + this.getY();
        this.minX += this.getX();
        this.minY += this.getY();
    }

    
    public getMinX(){
        return this.minX;
    }
    public getMinY(){
        return this.minY;
    }
    public getMaxX(){
        return this.maxX;
    }
    public getMaxY(){
        return this.maxY;
    }    

    public getWidth(){
        return this.width;
    }

    public getHeight(){

    }

    public updatePolygonsOnMap(){
        this.polygonsOnMap = [];
        for (var i = 0; i < this.polygons.length; i++) {
            this.polygonsOnMap.push([ this.polygons[i][0]+this.getX(), this.polygons[i][1]+this.getY() ]);
            
        }
    }

    public draw(ctx: any): void {
        
        ctx.fillStyle = this.color;
        ctx.strokeStyke = this.color;
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.moveTo(UMI.screenX(this.getX()+this.polygons[0][0]),UMI.screenY(this.getY()+this.polygons[0][1]));
        for (var i = 1; i < this.polygons.length; i++) {
            ctx.lineTo(UMI.screenX(this.getX()+this.polygons[i][0]),UMI.screenY(this.getY()+this.polygons[i][1]));
        }
        ctx.closePath();
        ctx.fill();
        //ctx.stroke();

    }
    
    public getPoints():Array<Array<number>> {
        return this.polygonsOnMap;
    }

    
}