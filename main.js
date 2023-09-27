class Drumkit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playButton = document.querySelector(".play");
    this.currentKick = "./assets/kick-classic.wav";
    this.currentSnare = "./assets/snare-acoustic01.wav";
    this.currentHihat = "./assets/hihat-acoustic01.wav";
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.percAudio = document.querySelector(".perc-sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlay = null;
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 6;
    const activeBars = document.querySelectorAll(`.b${step}`);

    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
        if (bar.classList.contains("perc-pad")) {
          this.percAudio.currentTime = 0;
          this.percAudio.play();
        }
      }
    });

    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlay) {
      this.isPlay = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlay);
      this.isPlay = null;
    }
  }
  updateBtn() {
    if (!this.isPlay) {
      this.playButton.children[0].classList.remove("fa-play");
      this.playButton.children[0].classList.add("fa-stop");
      this.playButton.classList.add("active");
    } else {
      this.playButton.children[0].classList.remove("fa-stop");
      this.playButton.children[0].classList.add("fa-play");
      this.playButton.classList.remove("active");
    }
  }
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    if (selectionName == "kick-select") {
      this.kickAudio.src = selectionValue;
    }
    if (selectionName == "snare-select") {
      this.snareAudio.src = selectionValue;
    }
    if (selectionName == "hihat-select") {
      this.hihatAudio.src = selectionValue;
    }
    if (selectionName == "perc-select") {
      this.percAudio.src = selectionValue;
    }
  }
  muteSound(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
        case "3":
          this.percAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
        case "3":
          this.percAudio.volume = 1;
          break;
      }
    }
  }

  changeTempo(e) {
    const tempoValue = e.target.value;
    const tempoText = document.querySelector(".tempo-value");
    tempoText.innerText = tempoValue;
    this.bpm = tempoValue;
  }
  updateTempo(e) {
    clearInterval(this.isPlay);
    this.isPlay = null;
    const playButton = document.querySelector(".play");
    if (playButton.classList.contains("active")) {
      this.start();
    }
  }
}

const drumKit = new Drumkit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playButton.addEventListener("click", function () {
  drumKit.updateBtn();
  drumKit.start();
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});

drumKit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumKit.muteSound(e);
  });
});

drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener("change", function (e) {
  drumKit.updateTempo(e);
});
