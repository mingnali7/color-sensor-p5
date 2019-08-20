let img;
let video;
let distance = []
let allDist = []
let col = []
let savedColor = []
let avgR
let avgG
let avgB
let counter = 0




function setup() {
  // create canvas
  createCanvas(windowWidth, windowHeight)
  // start video capturing
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide()
  pixelDensity(1);

  // save color button
  saveButton = createButton("save color")
  saveButton.mousePressed(saveColor)
  saveButton.position(90, 370)

  // <p> instruction
  instruction = createP('Put the object in the white box to capture color')
  instruction.position(20, 10)
  instruction.style('font-family', 'helvetica')

  // <p> current color sensed
  currentCol = createP('Current color sensed:')
  currentCol.style('font-family', 'helvetica')
  currentCol.style('font-size', '14px')
  currentCol.position(20, 300)

  // <p> saved color
  savedCol = createP('Saved color:')
  savedCol.style('font-family', 'helvetica')
  savedCol.style('font-size', '14px')
  savedCol.position(20, 400)
}
// add saved color to the savedColor array
function saveColor() {
  savedColor.push(avgR, avgG, avgB)
}

function draw() {
  //display video
  image(video, 20, 60)

  // go into pixel mode
  loadPixels()

  ////// extract RGB value of 80*80 pixels

  // for every vertical pixels
  for (let y = 0; y < 60; y++) {
    // for every horizontal pixels
    for (let x = 0; x < 60; x++) {
      //get the RGB value of each pixel
      let eachColor = video.get((video.width / 2 - 30) + x,
        (video.height / 2 - 30) + y)
      // add the RGB value into the col array
      col[(x + y * 60)] = eachColor
    }
  }


  // draw a rectangle of the color sensing area
  noFill()
  stroke(255)
  rect(video.width / 2 + 20 - 30, video.height / 2 + 60 - 30, 60, 60)


  //////finding the average of RED for 400 pixels

  // define the sum and average of R value
  let sumR = 0
  // calculate the sum of 400 pixels' R value
  for (i = 0; i < 3600; i++) {
    sumR += col[i][0]
  }
  // calculate average of the RED value
  avgR = sumR / 3600

  //finding the average of GREEN
  // define the sum and average of G value
  let sumG = 0
  // calculate the sum of 400 pixels' G value
  for (i = 0; i < 3600; i++) {
    sumG += col[i][1]
  }
  // calculate average of the GREEN value
  avgG = sumG / 3600

  //finding the average of BLUE
  // define the sum and average of B value
  let sumB = 0

  // calculate the sum of 400 pixels' B value
  for (i = 0; i < 3600; i++) {
    sumB += col[i][2]
  }
  // calculate average of the BLUE value
  avgB = sumB / 3600


  // current color sensed
  noStroke()
  fill(avgR, avgG, avgB)
  rect(20, 350, 50, 50);

  // display saved color
  for (i = 0; i < savedColor.length / 3; i++) {
    let k = 0
    //check if saved color exist, if not fill with white
    if (typeof savedColor[i * 3] == 'undefined') {
      fill(255, 255, 255)
    }
    // if exist, fill with saved color
    else {
      fill(savedColor[i * 3], savedColor[i * 3 + 1], savedColor[i * 3 + 2])
    }
    // display the rectangles
    if (40 + i * 70 > windowWidth) {
      k = k + 1
      rect((i - ((windowWidth - 20) / 70)) * 70 + 20, 450 + k * 70, 50, 50)
    }
    // else if ((i - ((windowWidth - 20) / 70)) < 0 && k >= 1) {
    //   console.log("odd triggered")
    //   k = k + 1
    //   let x = Math.abs(i - ((windowWidth - 20) / 70))
    //   console.log(x)
    //   rect(20 + x * 70, 450 + k * 70, 50, 50)
    // }

    rect(20 + i * 70, 450, 50, 50)
  }
}

