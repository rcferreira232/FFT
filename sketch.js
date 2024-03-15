let sound

function preload() {
  sound = loadSound('/just-relax-11157.mp3')
}

let fft

function setup() {
  let cnv = createCanvas(500, 500)
  cnv.mouseClicked(togglePlay)
  fft = new p5.FFT(0, 256)
  sound.amp(0.2)
}

function draw() {
  background(0)

  let spectrum = fft.analyze()
  noStroke()
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width)
    let h = -height + map(spectrum[i], 0, 255, height, 0)
    fill(255, 0, 255 - i)
    rect(x, height, width / spectrum.length, h)
  }

  let waveform = fft.waveform()
  noFill()
  beginShape()
  stroke(255)
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width)
    let y = map(waveform[i], -1, 1, 0, height)
    vertex(x, y)
  }
  endShape()
  stroke(255)
  text('tap to play', 200, 200)
}

function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause()
  } else {
    sound.loop()
  }
}
