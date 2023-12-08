document.addEventListener("DOMContentLoaded", function () {
    const playlist = [
        { title: "1.Last christmas", artist: "pop mange", file: "music/santababy.mp3" },
        { title: "2.All i want for christmas", artist: "Crazy Frog", file: "music/c2.mp3" },
        { title: "3.We Wish You A Merry Christmas", artist: "Crazy Frog", file: "music/c3.mp3" },
        { title: "4.Last Christmas but you are in a bathroom at a party", artist: "none", file: "music/c4.mp3" } // Điều chỉnh đường dẫn đến file nhạc
        // Add more songs as needed
    ];

    const audioPlayer = document.getElementById("audioPlayer");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const playlistElement = document.getElementById("playlist");

    let currentSongIndex = 0;

    function loadSong(index) {
        const song = playlist[index];
        audioPlayer.src = song.file;
        audioPlayer.load();
    }

    function updatePlaylist() {
        playlistElement.innerHTML = "";
        playlist.forEach((song, index) => {
            const li = document.createElement("li");
            li.textContent = `${song.title} - ${song.artist}`;
            li.addEventListener("click", () => {
                currentSongIndex = index;
                loadSong(currentSongIndex);
                playPauseBtn.textContent = "❚❚";
                audioPlayer.play();
                updatePlaylist(); // Highlight the currently playing song
            });
            if (index === currentSongIndex) {
                li.classList.add("playing"); // Add a class to highlight the currently playing song
            }
            playlistElement.appendChild(li);
        });
    }

    function playPause() {
        if (audioPlayer.paused) {
            playPauseBtn.textContent = "❚❚";
            audioPlayer.play();
        } else {
            playPauseBtn.textContent = "&#9654;";
            audioPlayer.pause();
        }
    }

    function playNext() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        playPauseBtn.textContent = "❚❚";
        audioPlayer.play();
        updatePlaylist(); // Highlight the currently playing song
    }

    function playPrev() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
        playPauseBtn.textContent = "❚❚";
        audioPlayer.play();
        updatePlaylist(); // Highlight the currently playing song
    }

    audioPlayer.addEventListener("ended", playNext); // Play the next song when the current song ends
    playPauseBtn.addEventListener("click", playPause);
    nextBtn.addEventListener("click", playNext);
    prevBtn.addEventListener("click", playPrev);

    loadSong(currentSongIndex); // Load the first song
    updatePlaylist(); // Update the playlist once
});
