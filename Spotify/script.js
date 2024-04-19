let songs = [];

async function getSongs() {
  let data = await fetch("http://127.0.0.1:5500/assets/songs/");
  let response = await data.text();

  let div = document.createElement("div");
  div.innerHTML = response;
  //console.log(div);

  let as = div.getElementsByTagName("a");

  for (let i = 0; i < as.length; i++) {
    let element = as[i];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href);
    }
  }
  return songs;
}

let audio = new Audio();
let playIcon = document.querySelector(".play-logo");

function playMusic(songUrl) {
  audio.src = songUrl;
  audio.play();
  playIcon.innerHTML = '<img src="pause.svg"/>';
}

function pauseMusic(songUrl) {
  audio.src = songUrl;
  audio.pause();
  playIcon.innerHTML = '<img src="assets/audioLogo/play.svg" />';
}

let songName=document.querySelector('.songInfo')
let songTime=document.querySelector('.songTime')

function music(songUrl) {
  if (audio.paused === true) {
    playMusic(songUrl);
  } else {
    pauseMusic(songUrl);
  }
  let name = songUrl.replace("http://127.0.0.1:5500/assets/songs/", "").replaceAll("%20", " ").replace(".mp3", "").replaceAll("-", " ")
  songName.innerHTML=name
  songTime.innerHTML='00/00'
}
let songsList = document.querySelector(".songs-list");
async function displaySong() {
  //console.log(songsList);
  let songs = await getSongs();
  let soungCount = 0;
  for (let song of songs) {
    song = song.replace("http://127.0.0.1:5500/assets/songs/", "");
    song = song.replaceAll("%20", " ");

    song = song.replace(".mp3", "");
    song = song.replaceAll("-", " ");
    let li = document.createElement("li");
    li.innerHTML = `<li id="${soungCount}" class="list"><div class="flex iteam-center gap-7"><img class="invert" src="music.svg" />${song}</div><button class="play-button invert border-none flex gap-5 iteam-center"><span>Play Now</span><img src="assets/audioLogo/play.svg" /></button>
    
    
    </li>`;
    songsList.appendChild(li);
    soungCount++;
  }

  console.log(songs);
  console.log(songsList);
  let list = songsList.querySelectorAll(".list");
  console.log(list);
  let listArr = Array.from(list);
  //console.log(listArr);
  let currentSong = "";
  listArr.forEach((e) => {
    e.addEventListener("click", () => {
      currentSong = songs[e.id];
      music(currentSong);
    });
  });

  playIcon.addEventListener("click", () => {
    music(currentSong);
  });
}

displaySong();
