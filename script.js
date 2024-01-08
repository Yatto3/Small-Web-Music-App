"use strict";




class Player {
    constructor(backWardButton , forWardButton, playButton, audioElem, volumeInputRange, 
        tracks ,minutesSpanElem, secondsSpanElem, trackBarElem ,trackIndex ,currentTrackPosElem,
        lastTrackPosElem){
        
        this.backWardButton = backWardButton;
        this.forWardButton = forWardButton;
        this.playButton = playButton;
        this.audioElem = audioElem;
        this.volumeInputRange = volumeInputRange;
        this.tracks = tracks;
        this.minutesSpanElem = minutesSpanElem;
        this.secondsSpanElem = secondsSpanElem;
        this.trackBar = trackBarElem;
        this.trackIndex = trackIndex;
        this.currentTrackPosElem = currentTrackPosElem;
        this.lastTrackPosElem = lastTrackPosElem;

        this.currentTime = 0 ;
        this.seconds = 0;
        this.minutes = 0;
        this.trackLength = 0 ;
        this.isPlaying = false;

       
    }

    play(){
        this.audioElem.play();
        this.trackLength = this.audioElem.duration;
        this.changeIcon("./public/img/icons8-pause50.png")
        
        this.audioElem.volume = volumeInputRange.value / 100 ;
        this.audioElem.currentTime = this.currentTime ;
        
        
        
        this.trackBar.setAttribute("max",`${this.trackLength}`);

        if (player.seconds === 0 || player.seconds){ 
            timer = setInterval(() => {
            player.seconds++;
            player.upDateTimeBar(timer);

        }, 1000);  

        player.isPlaying = true;
    }
       
        
    }

    pause(timerID){
        clearInterval(timerID)
        this.currentTime = this.audioElem.currentTime;
        this.changeIcon("./public/img/icons8-play50.png");
        this.audioElem.pause();
    }

    playNext(){
        this.trackIndex++;
        this.resetValues();
        this.upDateContent(this.trackIndex);
        this.audioElem.src = this.tracks[this.trackIndex].path;
        this.isPlaying = true;
        this.playButton.click();
        
    }

    playLast(){
        this.trackIndex--;
        this.resetValues();
        this.upDateContent(this.trackIndex);
        this.audioElem.src = this.tracks[this.trackIndex].path;
        this.isPlaying = true;
        this.playButton.click();
    }

    upDateContent(trackIndex){

        let h3 = document.querySelector(".track-name").querySelector("h3");
        let p = document.querySelector(".track-name").querySelector("p");
        let trackImg = document.querySelector(".track-wallpaper");

        h3.innerHTML = this.tracks[trackIndex].name;
        p.innerHTML = this.tracks[trackIndex].artist;
        trackImg.style.background = `url("${this.tracks[trackIndex].image}")`;

        this.currentTrackPosElem.innerHTML = this.trackIndex + 1;
        this.lastTrackPosElem.innerHTML = tracks.length ;
        this.audioElem.src = this.tracks[trackIndex].path;
    }

    upDateTimeBar(timerID){
        const totalMinutesSpanElem = document.querySelector("[data-totalMinutes]");
        const totalSecondsSpanElem = document.querySelector("[data-totalSeconds]");

        this.trackBar.value++; 
       (this.seconds <= 9 ) ? this.secondsSpanElem.innerHTML = "0" + this.seconds : this.secondsSpanElem.innerHTML = this.seconds; 
        this.minutesSpanElem.innerHTML = this.minutes ;
      
       if (this.seconds > 59){
        this.seconds = 0;
        this.minutes ++;
       }

       let minutes = Math.trunc((this.trackLength % 1000)) / 60 ;
       let seconds = (minutes % 1 ) * 60;

       totalMinutesSpanElem.innerHTML = Math.trunc(minutes);
       totalSecondsSpanElem.innerHTML = Math.trunc(seconds.toFixed(2));
    }

    changeIcon(url){
        this.playButton.src = url;
    }

    changeVolume(value){
        this.audioElem.volume = value / 100;
    }

    resetValues(){
        this.minutes = 0 ;
        this.seconds = 0 ;
        this.currentTime = 0 ; 
        this.trackBar.value = 0;
        clearInterval(timer);
    }
}

const backWardButton = document.querySelector("[data-backward]");
const forWardButton = document.querySelector("[data-forward]");
const playButton = document.querySelector("[data-play]");
const audioElem = document.getElementById("player");
const volumeInputRange = document.querySelector("[data-volume]");
const currentTrackPosElem = document.querySelector("[data-currentTrack]");
const lastTrackPosElem = document.querySelector("[data-lastTrack]");
const minutesSpanElem = document.querySelector("[data-minutes]");
const secondsSpanElem = document.querySelector("[data-seconds]");
const trackBarElem = document.querySelector("[data-trackBar]");

const tracks = [
    {
        "name" : "Diamonds",
        "artist": "Rihanna",
        "image" : "./public/img/track_img/Rihanna – Diamonds.jpg",
        "path" : "./public/mp3/Rihanna – Diamonds.mp3"
    },
    {
        "name" : "Джек Рипер",
        "artist": "LIL KRYSTALLL, OBLADAET",
        "image" : "./public/img/track_img/Джек Рипер.jpg",
        "path" : "./public/mp3/LIL KRYSTALLL, OBLADAET – Джек Рипер.mp3"
    },

    {
        "name" : "Отключаю телефон",
        "artist": "INSTASAMKA ",
        "image" : "./public/img/track_img/512x512bb.jpg",
        "path" : "./public/mp3/INSTASAMKA – Отключаю телефон.mp3",
    },

    {
        "name" : "ЗА ДЕНЬГИ ДА",
        "artist": "INSTASAMKA ",
        "image" : "./public/img/track_img/Za-DENGHI-DA.jpg",
        "path" : "./public/mp3/INSTASAMKA – ЗА ДЕНЬГИ ДА.mp3",
    },

    {
        "name" : "POPSTAR",
        "artist": "INSTASAMKA ",
        "image" : "./public/img/track_img/POPSTAR.jpg",
        "path" : "./public/mp3/INSTASAMKA – POPSTAR.mp3",
    }
   
    

]


let trackIndex = 0 ;
let player = new Player(backWardButton , forWardButton, playButton, audioElem,
     volumeInputRange, tracks, minutesSpanElem, secondsSpanElem, trackBarElem ,trackIndex ,currentTrackPosElem, lastTrackPosElem);

let timer ;

player.playButton.addEventListener("click", (e) => {
    
    if (!player.isPlaying){
       
        player.play();
        player.isPlaying = true;
        return;
    }
    player.pause(timer);
    player.isPlaying = false;   
})


player.volumeInputRange.addEventListener("input", (e) => {
    let rangeValue = player.volumeInputRange.value;
    player.changeVolume(rangeValue);
})

player.trackBar.addEventListener("input", (e) => {

   player.audioElem.currentTime = player.trackBar.value ;
   player.currentTime = player.trackBar.value;

   let minutes = Math.trunc((player.trackBar.value % 1000)) / 60 ;
   let seconds = (minutes % 1 ) * 60;

   player.minutes = Math.trunc(minutes);
   player.seconds = Math.trunc(seconds.toFixed(2));

})

player.forWardButton.addEventListener("click", (e) => {
    if ( player.trackIndex === (player.tracks.length - 1)){return};
    player.resetValues();
    player.playNext();
})

player.backWardButton.addEventListener("click" ,(e) => {
    if ( player.trackIndex === 0){return};
    player.resetValues();
    player.playLast();
})

player.audioElem.onended = function() {
   if ( player.trackIndex === (player.tracks.length - 1)){return};
   player.resetValues();
   setTimeout(() => player.playNext(), 1000);
    
}


window.onload = function(){
    audioElem.src = tracks[trackIndex].path ;
    player.upDateContent(trackIndex);
}