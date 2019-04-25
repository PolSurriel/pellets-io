import { UserEvents } from "../Player/UserEvents.js";
import { UMI } from "../Logic/UMI.js";
import { requestRespawn } from "../EventListeners/Socket.js";

export class UI {
    
    private static damage = 0;
    private static deathScreen = false;
    private static respawnCountDown = 3;
    private static maxRespawnCountDown = 3;
    private static intervalDeathScreen;

    public static action(bg, ctxBG, staticElements, ctxFG, canvas){
        if(UserEvents.wheelDown){
            UMI.setZoom(5);
            UserEvents.wheelDown = false;
            ctxBG.clearRect(0,0,canvas.width,canvas.height);
            ctxFG.clearRect(0,0,canvas.width,canvas.height);
            bg.draw(ctxBG);
            staticElements.forEach(element => { element.draw(ctxFG); });
        }else if(UserEvents.wheelUp){
            UMI.setZoom(-5);
            UserEvents.wheelUp = false;
            ctxBG.clearRect(0,0,canvas.width,canvas.height);
            ctxFG.clearRect(0,0,canvas.width,canvas.height);
            bg.draw(ctxBG);
            staticElements.forEach(element => { element.draw(ctxFG); });
        }
    }

    public static drawGard(ctx, w, h){

        
        

        if(this.deathScreen){
            var grd=ctx.createRadialGradient(w/2,h/2, 100, w/2,h/2, 500);
            grd.addColorStop(0,"rgba(255,0,130,0.3)");
            grd.addColorStop(1,"rgba(0,0,0,1)");
            ctx.fillStyle = grd;
            ctx.fillRect(0,0,w,h);

            ctx.font = "300px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.fillText(this.respawnCountDown, (w/2),(h/2)+100);
        }else{
            var grd=ctx.createRadialGradient(w/2,h/2, 500, w/2,h/2, 1000);
            if(UI.damage > 0) grd.addColorStop(0,"rgba(255,0,0,"+UI.damage+")");
            else grd.addColorStop(0,"rgba(0,0,0,0)");
            grd.addColorStop(1,"rgba(0,0,0,0.5)");
            
            ctx.fillStyle = grd;
            ctx.fillRect(0,0,w,h);
        }
        
    }

    public static drawBetaInfo(ctx){
        ctx.textAlign="start"; 
        ctx.font = "20px Arial";
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fillText('BETA', 10,30);
        ctx.font = "10px Arial";
        ctx.fillText('1.1                         More info:', 65,30);
        ctx.font = "12px Arial";
        ctx.fillText('www.quantumbitgames.com/news', 10,42);
    }

    public static siwtchDeathScreen(){
        this.deathScreen = !this.deathScreen;
        
        if(this.deathScreen){
            this.intervalDeathScreen = setInterval(() => {
                this.respawnCountDown--;
                if(this.respawnCountDown <= 0){
                    requestRespawn();  
                    this.siwtchDeathScreen();
                } 
                
            }, 1000);
        }else{
            clearInterval(this.intervalDeathScreen);
            this.respawnCountDown = this.maxRespawnCountDown;
        }
        
    }

    public static incDamage(){
        if(this.damage < 0.5 ) this.damage += 0.02;
    }

    public static decDamage(){
        if(this.damage > 0 ) this.damage -= 0.004;
        if(this.damage < 0 ) this.damage = 0;
    }


}