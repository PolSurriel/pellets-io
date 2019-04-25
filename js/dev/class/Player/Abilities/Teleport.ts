import { UMI } from "../../Logic/UMI.js";
import { PHY } from "../../Logic/PHY.js";
import { Sound } from "../../Element/Sound.js";
import { sharePositions } from "../../EventListeners/Socket.js";


export class Teleport {

    private teleporting:boolean = false;
    private teleportStatus = 0;
    private teleportSpeed = UMI.getSpeed(1);
    private radioOrigin = 25;
    private minusRadioSpeed = UMI.getSpeed(2);
    private teleportDestination;
    private teleported = false;
    public static readonly teleportDistance = 730;

    private last_radio_updated = false;

    private sound = new Sound("../js/sounds/teleport.wav", 1);


    constructor(){}

    public do(){
        this.sound.stop();  
        this.sound.play();
        this.teleporting = true;
        this.last_radio_updated = false;
        this.teleportDestination;
        return true;
    }

    public doing(){
        return this.teleporting;
    }

    public draw(ctx){}


    public updateStatus(obj){
        if(!this.last_radio_updated){
            this.radioOrigin = obj.getRadio();
            this.last_radio_updated = true;
        } 

        var fx = obj.getFX();

        this.teleportStatus += this.teleportSpeed;
        if(this.teleportStatus < 10){
            obj.setRadio(obj.getRadio()-this.minusRadioSpeed);
            if(obj.viewField !== null) obj.viewField.setCurrentAngle(obj.viewField.getCurrentAngle()-(this.minusRadioSpeed/50));
            
        }else if (this.teleportStatus < 20){
            if(!this.teleported){
                
                var distance;
                if(fx.MainPlayer) distance = PHY.getDistanceBetween(UMI.screenXUMI(obj.getX()), UMI.screenYUMI(obj.getY()), fx.cx, fx.cy)-45;
                else distance = fx.distance;

                if(distance > Teleport.teleportDistance) distance = Teleport.teleportDistance;

                var point = PHY.createRectWithAngle([obj.getX(),obj.getY()], distance, -fx.ca);

                
                
                
                if(fx.MainPlayer){
                    obj.setX(point[0]);
                    obj.setY(point[1]);
                    sharePositions(point[0], point[1]);
                } 
                
                
                

                this.teleported = true;
                
            }

            if(obj.getRadio() >= this.radioOrigin) obj.setRadio(this.radioOrigin);
            else obj.setRadio(obj.getRadio()+this.minusRadioSpeed);
            if(obj.viewField !== null)obj.viewField.setCurrentAngle(obj.viewField.getCurrentAngle());
        }else{
            this.teleported = false;
            this.teleporting = false;
            this.teleportStatus = 0;
        }
        
    }


}