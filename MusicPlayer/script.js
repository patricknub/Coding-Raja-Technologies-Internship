const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('playPause');
const shuffleButton = document.getElementById('shuffle');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const songTitleElement = document.getElementById('songTitle');
const addPlaylistButton = document.getElementById('addPlaylist');
const savePlaylistButton = document.getElementById('savePlaylist');
const clearPlaylistButton = document.getElementById('clearPlaylist');
const playlistElement = document.getElementById('playlist');
const musicLibraryElement = document.getElementById('musicLibrary');

let songs = ['music1.mp3', 'music2.mp3', 'music3.mp3', 'music4.mp3','music5.mp3'];
let playlist = [];
let currentSongIndex = 0;

function updatePlaylistUI() {
  playlistElement.innerHTML = '';
  playlist.forEach((song, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = getSongTitleFromFileName(song);
    listItem.addEventListener('click', () => {
      loadSong(index, playlist);
      audio.play();
    });
    playlistElement.appendChild(listItem);
  });
}

function updateMusicLibraryUI() {
  musicLibraryElement.innerHTML = '';
  songs.forEach((song, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = getSongTitleFromFileName(song);
    listItem.classList.add('music-library-item');
    listItem.addEventListener('click', () => {
      loadSong(index);
      audio.play();
    });
    musicLibraryElement.appendChild(listItem);
  });
}

addPlaylistButton.addEventListener('click', () => {
  playlist.push(songs[currentSongIndex]);
  updatePlaylistUI();
});

savePlaylistButton.addEventListener('click', () => {
  localStorage.setItem('playlist', JSON.stringify(playlist));
});

clearPlaylistButton.addEventListener('click', () => {
  playlist = [];
  updatePlaylistUI();
});

playPauseButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseButton.textContent = 'Pause';
  } else {
    audio.pause();
    playPauseButton.textContent = 'Play';
  }
});

shuffleButton.addEventListener('click', () => {
  shuffleSongs();
  loadSong(currentSongIndex);
  audio.play();
});

previousButton.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
});

nextButton.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
});

audio.addEventListener('ended', () => {
  playPauseButton.textContent = 'Play';
});

audio.addEventListener('play', () => {
  playPauseButton.textContent = 'Pause';
});

audio.addEventListener('pause', () => {
  playPauseButton.textContent = 'Play';
});

function loadSong(index, source = songs) {
  audio.src = source[index];
  songTitleElement.textContent = getSongTitleFromFileName(source[index]);
}

function getSongTitleFromFileName(fileName) {
  const titleWithoutExtension = fileName.slice(0, -4);
  const titleWithSpaces = titleWithoutExtension.replace(/-/g, ' ');
  return titleWithSpaces;
}

function shuffleSongs() {
  for (let i = songs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [songs[i], songs[j]] = [songs[j], songs[i]];
  }
}

updateMusicLibraryUI();
loadSong(currentSongIndex);
