'use strict'
const playLists = document.querySelectorAll(".playlist-item");
const getVideoNode = document.querySelector(".video video")
const PlayPause = document.querySelectorAll(".play-pause");
const progress = document.querySelector(".progressBar")
const previousBtn = document.querySelector(".previous");
const nextBtn =document.querySelector(".next");
const volume = document.querySelector(".volume-progress");

getVideoNode.src = playLists[playLists.length-1].children[0].src
getVideoNode.dataset.current = playLists.length-1;

volume.children[0].style.width = (getVideoNode.volume *100) + "%";

for (const pL in playLists) {
    if (Object.hasOwnProperty.call(playLists, pL)) {
        const track = playLists[pL];
        track.addEventListener("click",(e)=>{
            e.preventDefault();
            getVideoNode.src = track.children[0].src
            getVideoNode.play();
            getVideoNode.dataset.current =pL;
            for (const Pp in PlayPause) {
                if (Object.hasOwnProperty.call(PlayPause, Pp)) {
                    PlayPause[Pp]
                    .classList.replace("icon-play","icon-pause")
                }
            }
        })
        
    }
}
for (const Pp in PlayPause) {
    if (Object.hasOwnProperty.call(PlayPause, Pp)) {
        PlayPause[Pp].addEventListener("click",(e)=>{
            if(PlayPause[Pp].classList.contains("icon-pause")){
                return doPause(PlayPause,getVideoNode);
            }
            if(PlayPause[Pp].classList.contains("icon-play")){
                return doPlay(PlayPause,getVideoNode);
            }
        })
    }
}

getVideoNode.addEventListener("ended",(e)=>{
    Next();
})

/**
 * 
 */
getVideoNode.addEventListener("timeupdate",()=>{
    progress.children[0].style.width = (getVideoNode.currentTime / getVideoNode.duration) *100 + "%"
})

/**
 * 
 * @param {*} e 
 */

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * getVideoNode.duration;
    getVideoNode.currentTime = scrubTime
    progress.children[0].style.width = (scrubTime * 100) + "%"
}

/**
 * 
 * @param {node} playPauseNode 
 * @param {node} videoNode 
 */

function doPause(playPauseNode,videoNode){
    videoNode.pause();
    for (const Pp in playPauseNode) {
        if (Object.hasOwnProperty.call(playPauseNode, Pp)) {
            playPauseNode[Pp]
            .classList.replace("icon-pause","icon-play");
        }
    }
}
/**
 * 
 * @param {node} playPauseNode 
 * @param {node} videoNode 
 */
function doPlay(playPauseNode,videoNode){
    videoNode.play();
    for (const Pp in playPauseNode) {
        if (Object.hasOwnProperty.call(playPauseNode, Pp)) {
            playPauseNode[Pp]
            .classList.replace("icon-play","icon-pause")
        }
    }
}
/**
 * Next btn
 */

function Next(){
    const next = parseInt(getVideoNode.dataset.current)===(playLists.length-1)?0:parseInt(getVideoNode.dataset.current)+1;
    getVideoNode.src = playLists[next].children[0].src;
    getVideoNode.play()
    getVideoNode.dataset.current = next;
    for (const Pp in PlayPause) {
        if (Object.hasOwnProperty.call(PlayPause, Pp)) {
            PlayPause[Pp]
            .classList.replace("icon-play","icon-pause")
        }
    }
}
/**
 * Scrub volume volue
 * @param {*} e 
 */
const volumeScrub =(e) =>{
    const vol = (e.offsetX /volume.offsetWidth);
    getVideoNode.volume =vol;
    volume.children[0].style.width = (vol*100)+"%"
}
/**
 *  Previous btn
 */
function Previous(){
    const prev = parseInt(getVideoNode.dataset.current)===0?playLists.length-1:parseInt(getVideoNode.dataset.current)-1;
    getVideoNode.src = playLists[prev].children[0].src
    getVideoNode.dataset.current = prev;
    getVideoNode.play()
    for (const Pp in PlayPause) {
        if (Object.hasOwnProperty.call(PlayPause, Pp)) {
            PlayPause[Pp]
            .classList.replace("icon-play","icon-pause")
        }
    }
}
progress.addEventListener(("click"), (e)=>{scrub(e)});
nextBtn.addEventListener("click",Next)
previousBtn.addEventListener("click",Previous)
volume.addEventListener("click",volumeScrub)