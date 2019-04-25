export class Sound{
    private sound;
    private doing = false;

    constructor(src:string, volume?, speed?){
        this.sound = document.createElement("audio");
        this.sound.style.display = "none";
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.volume = (volume != undefined) ? volume : 1;
        this.sound.playbackRate = (speed != undefined) ? speed : 1;

        document.body.appendChild(this.sound);
    }


    public loop(on, to){
        if(this.sound.currentTime >= on) this.sound.currentTime = to;
    }

    public play(){
        this.sound.muted = false;
        this.sound.play();
        this.doing = true;
    }

    public stop(){
        this.sound.muted = true;
        this.sound.pause();
        this.sound.currentTime = 0;
        this.doing = false;
    }

    public setCurrentTime(newTime:number){
        this.sound.currentTime = newTime;
    }

    public setVolume(v){
        this.sound.volume = v;
    }

    public playing():boolean{
        return this.doing;
    }
}
