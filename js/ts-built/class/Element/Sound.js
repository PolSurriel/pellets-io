var Sound = (function () {
    function Sound(src, volume, speed) {
        this.doing = false;
        this.sound = document.createElement("audio");
        this.sound.style.display = "none";
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.volume = (volume != undefined) ? volume : 1;
        this.sound.playbackRate = (speed != undefined) ? speed : 1;
        document.body.appendChild(this.sound);
    }
    Sound.prototype.loop = function (on, to) {
        if (this.sound.currentTime >= on)
            this.sound.currentTime = to;
    };
    Sound.prototype.play = function () {
        this.sound.muted = false;
        this.sound.play();
        this.doing = true;
    };
    Sound.prototype.stop = function () {
        this.sound.muted = true;
        this.sound.pause();
        this.sound.currentTime = 0;
        this.doing = false;
    };
    Sound.prototype.setCurrentTime = function (newTime) {
        this.sound.currentTime = newTime;
    };
    Sound.prototype.setVolume = function (v) {
        this.sound.volume = v;
    };
    Sound.prototype.playing = function () {
        return this.doing;
    };
    return Sound;
}());
export { Sound };
