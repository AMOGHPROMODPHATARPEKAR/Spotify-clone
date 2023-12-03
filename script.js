console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('music/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Barishein - Anuv Jain", filePath: "music/1.mp3",dur:"3:27" ,coverPath: "covers/1.jpg"},
    {songName: "Desi Kalakar - Yo Yo Honey Singh", filePath: "music/2.mp3",dur:"4:13" , coverPath: "covers/2.jpg"},
    {songName: "Elevated - Subh ", filePath: "music/3.mp3",dur:"3:21" , coverPath: "covers/3.jpg"},
    {songName: "Khalasi - Aditya Gadhvi", filePath: "music/4.mp3", dur:"4:18" ,coverPath: "covers/4.jpg"},
    {songName: "Main Rahoon Ya NA Rahoon", filePath: "music/5.mp3",dur:"5:09" , coverPath: "covers/5.jpg"},
    {songName: "NO LOVE - Shubh", filePath: "music/6.mp3",dur:"2:50" , coverPath: "covers/6.jpg"},
    {songName: "Obsessed - Abhijay Sharma and Riar Saab", filePath: "music/7.mp3",dur:"3:10" , coverPath: "covers/7.jpg"},
    {songName: "Ram Siya Ram ", filePath: "music/8.mp3",dur:"4:55" , coverPath: "covers/8.jpg"},
    {songName: "Sanson Ki Mala Rahat Fateh Ali Khan ", filePath: "music/9.mp3",dur:"4:45" , coverPath: "covers/9.jpg"},
    {songName: "Tum-Prem-Ho-Tum-Preet-Ho", filePath: "music/10.mp3",dur:"10:05" , coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("timestamp")[0].innerText = songs[i].dur;

})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `music/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `music/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 9
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `music/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
//song time
setInterval(()=>{
    let y=parseInt(audioElement.currentTime)
    let x =0
    if(y>=60)
    {
        x=parseInt(y/60)
        y=parseInt(y%60)
    }
    document.getElementById('time').innerText = x+":"+y;
   
    const hue = 1.2; // Adjust the multiplier for different color ranges
    document.getElementById('myProgressBar').style.backgroundColor =" black";
    

},1000)