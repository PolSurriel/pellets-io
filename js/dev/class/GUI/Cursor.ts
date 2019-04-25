import { UserEvents } from './../Player/UserEvents.js';
import { UMI } from './../Logic/UMI.js';
import { Visible } from './../../interfaces/Visible.js';

export class Cursor {

    private static readonly COLOR ="rgba(84, 216, 181, 0.5)";
    private static readonly LINE_COLOR ="rgb(147, 147, 147)";
    private static readonly RADIO = 17;
    private static readonly BORDER_RADIOUS = 3;
    private static readonly EANGLE = 2*Math.PI;
    
    public static draw(ctx){

        ctx.globalCompositeOperation = 'lighter';    
        ctx.lineWidth = this.BORDER_RADIOUS;
        ctx.strokeStyle = this.LINE_COLOR;
        ctx.beginPath();                
        ctx.stroke();
        ctx.arc(UMI.getPX(UserEvents.getCX()),UMI.getPX(UserEvents.getCY()),UMI.getPX(this.RADIO),0,this.EANGLE);
        ctx.fillStyle = this.COLOR;
        ctx.fill();
        ctx.stroke();
        ctx.globalCompositeOperation = 'source-over';    

    }
}