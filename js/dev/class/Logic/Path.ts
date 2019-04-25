import { Focusable } from "../../interfaces/Fofucsable.js";
import { UMI } from "./UMI.js";
import { PHY } from "./PHY.js";

export class Path {
    
    private pathx:number;
    private pathy:number
    private origin;
    private destination;
    private speed;
    private a;

    private destinationIsReference;
    private finished;

    constructor(origin, destination, speed){
        
        this.pathx = origin[0];
        this.pathy = origin[1];
        this.origin = origin;
        this.destination = destination;
        this.speed = UMI.getSpeed(speed);
        this.destinationIsReference = !(destination instanceof Array);
        if(!this.destinationIsReference) this.a = Math.atan2(origin[1] - destination[1], origin[0] - destination[0]);
        
    }

    public move(){
        
        var dest;
        var a;
        if(this.destinationIsReference){
            dest = [this.destination.getX(), this.destination.getY()];
            a = -Math.atan2(this.pathy - dest[1], this.pathx - dest[0]);
            
        }else{
            dest = this.destination;
            a = this.a;
        } 
        
        
        var newDistance = PHY.getDistanceBetween(dest[0],dest[1], this.pathx, this.pathy)-this.speed;
        var newPoint = PHY.createRectWithAngle([dest[0],dest[1]], newDistance, a);
        

        this.pathx = newPoint[0];
        this.pathy = newPoint[1];

        
        
        this.finished = Math.abs(newDistance) < this.speed ;
        
    }

    public getX():number{
        return this.pathx;
    }

    public getY():number{
        return this.pathy;
    }

    public travelFinished(){
        
        return this.finished;
    }
}