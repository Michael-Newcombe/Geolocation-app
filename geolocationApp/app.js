
var canvas = null
// variable for the canvas 
var userPos = null
// variable for the user position 
var currentLocationIndex = 0 
// current location index currently set to zero 

var userMessage = '' 
// variable for the main user message

var locations =
    // an array of objects where each object is a location. Inside each of the objects are variables containing information about that location
    [
      {
        level: 'The note of a time traveler',
        //name of the level the user is on
        clue: 'Find the path that leads you to nature',
        //a clue to help the user find the location
        help: 'Where the Venue and New Cross Inn meet.',
        //help text for when the user is struggling to find a location
        latitude: 51.476861,
        longitude: -0.037022,
        //using latitude and longitude to to pinpoint the location 
        fenceRadius: 0.05,
        //the size of the fence radius
        found: 'You have found a note that reads...."If you are reading this, you have travled back to the year 1950, try to avoide interaction with anyone you dont want to change the future!',
        //text for when the user has found the location 
        unlocked: false,
        //variable to determine if the user has unlocked the level
        imageClue: false,
        showImage: false
        //variables that determine what image should be displayed

      },

      {
        level: 'The night walkers den',
        clue: 'The house of the tispy',
        help: 'Its bordered by Goldsmiths libary and Flame house kebab',
        latitude: 51.475616,
        longitude: -0.035930,
        fenceRadius: 0.02,
        found: 'You have found another note that reads "Testing of the prototype went well, we had some minor complications but overall the XR-B07 time travel device seems to be working okay" ',
        unlocked: false,
        imageClue: false,
        showImage: false

      },


      {
        level: 'The meeting',
        clue: 'Where the town comes together',
        help: 'It is next to the Goldsmiths music studio',
        latitude: 51.475416,
        longitude: -0.037892,
        fenceRadius: 0.02,
        found: 'You have found another note that reads "News of our experiment has broken out, we must insure that what we are doing here remains hidden and does not fall into the wrong hands,"',
        unlocked: false,
        imageClue: false,
        showImage: false

      },

      {
        level: 'Entrance to adventure',
        clue: 'Transport your way through time',
        help: 'The new ..... gate on the hill',
        latitude: 51.475027,
        longitude: -0.040355,
        fenceRadius: 0.02,
        found: 'You have found another note that reads "The situation has taken a turn for the worse, I must leave this town immediately for my own saftey, I have hidden the XR-B07 device in a serect location to stop it falling into the wrong hands,"',
        unlocked: false,
        imageClue: false,
        showImage: false
      },

      {
        level: 'The time travelers lab',
        clue: 'Find the stairs to knowledge',
        help: 'Its bordered by Lewisham way and Dixon Rd',
        latitude: 51.474939,
        longitude: -0.035414,
        fenceRadius: 0.05,
        found: 'You have found the device to take you back to the future! Now activate the device quick! Your running out of time! ',
        unlocked: false,
        imageClue: false,
        showImage: false
      },

      {
        level: 'Use the time travles device',
        clue: 'Now, go to the open green space inside Goldsmiths, you cant miss it!',
        help: 'Its bordered by the Richard Hoggart Building, Whitehead Building and Professor Stuart Hall Building',
        latitude: 51.473501, 
        longitude: -0.036149,
        fenceRadius: 0.05,
        found: 'Well done you have made it back to the present day, lets hope your not in any of the history books',
        unlocked: false,
        imageClue: false,
        showImage: false
      },  
    ]


function setup()
{

  canvas = createCanvas(windowWidth, windowHeight)
  textAlign(CENTER);
  textSize(16);
  setUserMessage('Find your way back home');

  if (geoCheck() == true)
    //checking if the users geo location is turned on
  {

    watchPosition(positionChanged)
    // p5js geoLocation watch poistion function with our positionChanged function as it's parameters
    fences()
    //calling our fences function
  
  }
  else
  {
    setUserMessage('Quick turn on your GeoLocation before time runs out!')
    //if the users geo location is not turned on this message will display 
  }

  imageMode(CENTER);
  //using imageMode to center all the images
  
  //preloading the images
  greenClue = loadImage('Images/green-clue.jpg');
  greenFound = loadImage('Images/green-found.jpg');

  libaryClue = loadImage('Images/libary-clue.jpg');
  libaryFound = loadImage('Images/libary-found.jpg');

  pubClue = loadImage('Images/pub-clue.jpeg');
  pubFound = loadImage('Images/pub-found.jpg');

  parkClue = loadImage('Images/park-clue.jpg');
  parkFound = loadImage('Images/park-found.jpg');

  townHallClue = loadImage('Images/town-hall-clue.jpg');
  townHallFound = loadImage('Images/town-hall-found.jpg');

  stationClue = loadImage('Images/station-clue.jpg');
  stationFound = loadImage('Images/station-found.jpg');


}

function draw()
{

  isOverCircle =false;
  //boolean variable to determine if the mouse is over the ellipse
  distance = dist(mouseX, mouseY, width/2, 15); 
  // using the dist function to get the distance between the mouse and the ellipse

  if(distance < 17.5)
    // if the distance is less than the ellipses radius then isOverCirlce becomes true 
  {
    isOverCircle = true;
  } else {
    isOverCircle = false;
  }

  fill(173,216,230);
  ellipse(width/2, 15, 25, 25);
  textSize(12);
  textStyle(BOLD);
  fill(0);
  text('?',width/2,20)
  //circle button graphics

  var location0 = locations[0];
  var location1 = locations[1];
  var location2 = locations[2];
  var location3 = locations[3];
  var location4 = locations[4];
  var location5 = locations[5];
  //assigning each locations index to its own variable  

  //list of conditionals that determine the image that will be displayed
  if (location0.imageClue == true && location0.showImage == false)
    //checking if imageClue is true and showImage is false
  {

    image(parkClue,width/2,width/1);
    //if the statement above is true this image will display
  }
  else if (location0.showImage == true && location0.imageClue == false)
    //checking if showImage is true and imageClue is false
  {

    image(parkFound,width/2,width/1);
    //if the statment above is true this image will display

  }

  if (location1.imageClue == true && location1.showImage == false)
  {

    image(pubClue,width/2,width/1);
  }
  else if (location1.showImage == true && location1.imageClue == false)
  {

    image(pubFound,width/2,width/1);
  }

  if (location2.imageClue == true && location2.showImage == false)
  {

    image(townHallClue,width/2,width/1);
  }
  else if (location2.showImage == true && location2.imageClue == false)
  {

    image(townHallFound,width/2,width/1);
  }

  if (location3.imageClue == true && location3.showImage == false)
  {

    image(stationClue,width/2,width/1);
  }
  else if (location3.showImage == true && location3.imageClue == false)
  {

    image(stationFound,width/2,width/1);
  }

  if (location4.imageClue == true && location4.showImage == false)
  {

    image(libaryClue,width/2,width/1);
  }
  else if (location4.showImage == true && location4.imageClue == false)
  {

    image(libaryFound,width/2,width/1);
  }

  if (location5.imageClue == true && location5.showImage == false)
  {

    image(greenClue,width/2,width/1);
  }
  else if (location5.showImage == true && location5.imageClue == false)
  {

    image(greenFound,width/2,width/1);
  }


}


function mousePressed()
{
  var location = locations[currentLocationIndex]
  if(isOverCircle == true && location.fence.insideFence == false && location.unlocked == false)
    //conditional for checking if the location is still locked and if isOverCircle is true
  {

    setUserMessage(location.help)
    //seting user message to the location.help message
  }
}


function currentLocation()
//function for checking what location the user is currently on 
{

  var location = locations[currentLocationIndex]
  //setting the current location index to the variable location
  if (location.fence.insideFence == false && location.unlocked == false)
    //conditional for checking if the user has not unlocked the current location by checking if location.fence.insideFence and location.unlocked are both still false
  {


    setUserMessage(location.clue)
    //setting the user message to location.clue
    location.imageClue = true
    //initializing imageClue to true so the image clue can be displayed in draw
    location.showImage = false
    //initializing showImage to false so the found image does not display in draw


  }


  if (location.fence.insideFence == true && location.unlocked == false)
    //conditional for checking if the user has found the current location by checking if location.fence.insideFence is true and location.unlocked is still false
  {


    location.unlocked = true
    //setting location.unlocked to true so the app knows the user has found that location and can move onto the next location
    location.imageClue = false
    //setting imageClue to false so the clue image no longer displays in draw 
    location.showImage = true
    //setting showImage to true so the found image now displays in draw
    setUserMessage(location.found)
    //setting the user message to the location.found message
    setTimeout(nextLocation, 10000)
    //setting a time out to run the next locaiton function after 10 seconds


  }


}


function positionChanged(position)
//function for checking if the users postion has changed
{

  userPos = position
  //initializing the userPos variable to the postion function
  currentLocation()
  //calling the current location function 
}

function nextLocation()
//function for going through each location in the locations array
{
  currentLocationIndex ++
  //incrementing through the locations array using currentLocationIndex  
  if (currentLocationIndex == locations.length)
    //if there are no more locations left in the array display the message below
  {

    setUserMessage('Your journey is complete! but remember, you have many more journeys to embark on')
    //end game message
  }
}

function fences()
//function for creating the fences
{

  locations.forEach(function(location)
  //for each object in the locations array the location function is executed                 
  {
    var fence = new geoFenceCircle(location.latitude, location.longitude, location.fenceRadius, null, null, 'km')
    location.fence = fence
    //creating a geo location fence by creating a new geoFenceCircle using the locations latitude, longitude and fence radius
  })
}


function setUserMessage(string)
//function for setting the user message
{
  userMessage = string
  //initializing userMessage to the setUserMessage function
  updateInterface()
  //calling the update interface function
}



function updateInterface()
// function for updating the user interface
{


  clear()
  // clear the previous interface

  textAlign(CENTER);
  textSize(16);
  textStyle(BOLD);
  text(userMessage,0,25, windowWidth - 10, windowHeight - 10);
  // once the interface has been cleared new text will be display

}


function windowResized() 
//function for resizing the canvas
{

  resizeCanvas(windowWidth, windowHeight)
  //resizing the canvas according to the windwow width and height
}   
