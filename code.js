
//Gets the first number that appears next to the button

//#region Initialization functions
function initializeGame() {
    //sets up the top number which is only randomised once
    number1 = Math.floor(Math.random() * 5);
    document.getElementById("startingNumber").innerHTML = number1;

    //sets the second random number to avoid a softlock
    number2 = Math.floor(Math.random() * 5);
    document.getElementById("randomNumber").innerHTML = number2;

    //keeps track of whether or not the button has been pressed
    buttonPressed = 0;

    //makes the second number change constantly
//if it looks like its changing at a random speed it is just because it is rolling the same number multiple times in a row
//moved this into InitializeGame
    setInterval(randomizeNumber, 500)
}

function initializeStrings() {
    //the current input from the user, current word or sentence.
    currString = "";
    //filtered for palindrome check
    currStringFiltered = ""
    //total output, current sentence or paragraph.
    fullString = "";
    //filtered for palindrome check
    fullStringFiltered = "";
    //tracks whether the user finished typing with a period or underscore after that value is removed from their text.
    //I don't think escape character is the right term for this but I'm using it anyways because it feels cool
    escapeType = "";
    
    //I interpreted the lesson prompt to be asking me to make an output log where the user will be prompted to keep going after each output.
    //this variable accomplishes this, it is a concatination of all past outputs that is put into a paragraph.
    fullOutput = "";

    //counter for the while loops, could be for loops but I don't want it to increment every time and subtracting from a for loop variable feels yucky to me.
    counter = 0;

    //the reversed strings for Palindrome check
    reverseString = "";
    reverseFullString = "";

    //I used numbers instead of Bools because I checked the documentation and found out that JS doesn't have chars so I just assumed it wouldn't have bools too for some reason
    isPalendrome = 0;
    isFullPalendrome = 0;

    // whether the user is inputting their string or Y/N
    confirmation = false;

    //Ensures that the user can't input until the orb has finished calculating
    onCooldown = false;

    //whether or not the form is active
    form = false;
}

function initializeIndex() {
    //left to right position
    x = 0;
    //top to bottom position
    y = 0;

    //the size of the square area it will slide around in.
    bounds = 200;

    //might need this
    direction = 0;
    
    //the music
    Trigger = document.getElementById("Trigger With a Brutish Impulse");

    document.getElementById("returnButton").style.marginTop = 220 + "px";
}
//#endregion

//#region Game Code
//this number changes randomly, the player must press the button at the right time
function randomizeNumber() {
    if(buttonPressed == 0) {
        number2 = Math.floor(Math.random() * 5);
        document.getElementById("randomNumber").innerHTML = number2;
    }
}

//checks if the number was correct and declares that the player has won
function gameButton() {
    //makes the number stop randomizing once the button is pressed
    buttonPressed = 1;

    //the button disappears once it has been pressed
    //document.getElementById("buttonP").innerHTML = number1;
    
    //numbers are stored in variables to do this easier
    if(number1 == number2) {
        //text and gif for winning
        document.getElementById("result").innerHTML = "You Win!!!";
        document.getElementById("winImage").src = "KAngel Pose.gif";
        document.getElementById("resultText").style = "font-family: Zpix; font-weight: 900";
        document.getElementById("resultText").innerHTML = "Incredible! You did it!!!";
        document.getElementById("returnButton").innerHTML = "<button>Return</button>"
    } else {
        //text and image for losing
        document.getElementById("result").innerHTML = "You LOSE!!!";
        document.getElementById("loseImage").src = "Giovanna Thumbnail 8.png";
        document.getElementById("resultText").innerHTML = "The shame of this will haunt you forever...";
        document.getElementById("returnButton").innerHTML = "<button>Return</button>"
    }
    return "Press this button when the number below equals";
}
//#endregion


//#region Strings Code
//#region 3.1 code
function checkInput() {
if(!onCooldown) {
    //reset palendrome variables for this iteration


    //put output into a string because I might delete it later idk this has gone through a lot of iterations in my head ok
    currString = document.getElementById("GGOrbInterface").value;
    //document.getElementById("DELETEIMMEDIATELY").innerHTML = currString;
if(!confirmation) {
    isPalendrome = 0;
    isFullPalendrome = 0;
    //check for a period or underscore, this is how the user will finish typing.
    if(currString.charAt(currString.length - 1) == "." || currString.charAt(currString.length - 1) == "_") {
        
    //pre filter
        //Ensures that the user cant construct their input out of nothing but escape characters and spaces
        for( let i = 0; i < currString.length + 1; i++) {
            //looks at every character in the string and stops if it sees something that isnt a   or a .
            if(i == currString.length) {
                //kills the function with a return statement
                document.getElementById("Bocchi2ndMessage").innerHTML = "Um... Please dont try to give the orb an empty string. it doesn't like that very much.";
                document.getElementById("GGOrbInterface").value = "";
                return;
            }
            if(currString.charAt(i) != "." && currString.charAt(i) != "_" && currString.charAt(i) != " ") {
                document.getElementById("Bocchi2ndMessage").innerHTML = "";
                //leaves the for loop with a break
                break;
            }
        }
        //just a little easter egg because my priorities are fucked
        if(currString.includes("<") || currString.includes(">")) {
            document.getElementById("BocchiBonusMessage").innerHTML = "also please dont try and pass code into the orb it might get angry...";
        } else {
            document.getElementById("BocchiBonusMessage").innerHTML = "";
        }
        //removes the _ from output so that the output is ready for .innerHTMLing
        if(currString.charAt(currString.length - 1) == "_") {
            //I feel like slice would be more elegant but it broke for some reason when I tried it.
            //its because I wasnt using it properly I know how slice works now :)
            currString =  currString.substr(0,currString.length - 1) + " ";
            //I know there is technically a space at the end of full output but its literally invisible so no one will notice
        }
        //empties the text entry box
        document.getElementById("GGOrbInterface").value = "";
        
    //filters the current string
        //starts by converting to upper
        currStringFiltered = currString.toUpperCase();

        //then it removes the escape character
        currStringFiltered = currStringFiltered.substr(0,currStringFiltered.length - 1);
        counter = 0;
        //finally it filters out all of the spaces;
        //the prompt said something about entering a loop so here you go
        while(counter < currStringFiltered.length) {
            if(currStringFiltered.charAt(counter) == " ") {
                currStringFiltered = currStringFiltered.slice(0, counter) + currStringFiltered.slice(counter + 1, currStringFiltered.length);
            } else {
                counter += 1;
            }
        }

        //document.getElementById("filteredDELETEIMMEDIATELY").innerHTML = currStringFiltered;
    //adds to the filtered and non filtered fullstrings
        fullString = fullString + currString;
        //document.getElementById("fullDELETEIMMEDIATELY").innerHTML = fullString;
        
        fullStringFiltered = fullStringFiltered + currStringFiltered;
        //ocument.getElementById("filteredFullDELETEIMMEDIATELY").innerHTML = fullStringFiltered;

    //palindrome check
        //I would like to just check the characters in the strings themselves instead of printing an extra string but I'm too sleepy for that right now
        reverseString = "";
        for(let i = currStringFiltered.length - 1; i >  -1; i--) {
            reverseString = reverseString + currStringFiltered.charAt(i);
            //document.getElementById("reverseDELETEIMMEDIATELY").innerHTML = reverseString;
        }
        if (currStringFiltered == reverseString) {
            isPalendrome = 1;
        } 
        

        
        //for(let i = currStringFiltered.length - 1; i >  -1; i--) {
            reverseFullString = reverseString + reverseFullString;
        //}
        if (fullStringFiltered == reverseFullString) {
            isFullPalendrome = 1;
        } 
        //document.getElementById("reverseFullDELETEIMMEDIATELY").innerHTML = reverseFullString;

        onCooldown = true;
        document.body.style = "background-image: url('Bocchi the Glitter Calculating.gif');";
        setTimeout(runOutput, 4500)
        //runOutput();
    }
} else {
    document.getElementById("GGOrbInterface").value = "";
    currString = currString.toUpperCase();
    if(currString == "Y") {
        document.getElementById("Bocchi2ndMessage").innerHTML = " Well then, um just make sure you type in your next message the same way you typed this one. I hope I'm not being a bother..."
        confirmation = false;
    }
    if(currString == "N") {
        //onCooldown = true;
        document.getElementById("Bocchi2ndMessage").innerHTML = "Alright Im gonna go back to pondering my orb then.";
        document.getElementById("BocchiGreeting").innerHTML = "";
        //It looks kinda weird but its better than half the output being over the NAV and half being below.
        document.getElementById("fulloutput").style = "margin-top: 300px;";
    }
}
} else {
    document.getElementById("GGOrbInterface").value = "";
}
}

function runOutput() {
    onCooldown = false;
    //Im like 96% sure you cant see the word calculating reappear at the end of the gif and I dont really feel like figuring out the length of my gifs in frames and converting that into seconds to convert that into ms just for this.
    //also the only resetImage is a seperate timer is so that the user should be able to type Y/N without waiting for the calc anim to completely finish.
    setTimeout(resetImage, 1750);
    //the first output will just say input instead of last input and total input    
    if(fullString != currString) {
    fullOutput = fullOutput + "<br><b>Last Input:</b><br>" + currString;
    //fullOutput = fullOutput + "<br><b>THIS INPUT WAS "; -- looks kinda silly
    if(isPalendrome == 1) {
        fullOutput = fullOutput + "<br> <b>A PALENDROME</b><br>";
        } else {
            fullOutput = fullOutput + "<br> <b>NOT A PALENDROME</b><br>"
        }
        
        fullOutput = fullOutput + "<b>Total Input:</b><br>" + fullString;
        if(isFullPalendrome == 1) {
            fullOutput = fullOutput + "<br> <b>A PALENDROME</b><br>";
        } else {
            fullOutput = fullOutput + "<br> <b>NOT A PALENDROME</b><br>"
        }
    } else {
        fullOutput = fullOutput + "<b>Input:</b><br>" + currString;
        if(isPalendrome == 1) {
            fullOutput = fullOutput + "<br> <b>A PALENDROME</b><br>";
            } else {
                fullOutput = fullOutput + "<br> <b>NOT A PALENDROME</b><br>"
            }
    }


    document.getElementById("fulloutput").innerHTML = fullOutput;
    confirmation = true;
    document.getElementById("Bocchi2ndMessage").innerHTML = "Alright well thats all you asked for but dont worry you can go again if you want. Just type Y for yes, and if you are totally done type N so I can let the orb know.";
        
}

function resetImage() {
    if(form == false) {
    document.body.style = "background-image: url('Bocchi the Glitter Pondering her orb.gif');";
    }
}
//#endregion

//#region 3.2 code


//Changes to the Strings page upon starting the account submission
function accountSetup() {
    if(onCooldown == false) {
    accountSetupStrings();
    } else {
        document.getElementById("Bocchi2ndMessage").innerHTML = "Please don't try to set up an account while the orb is calculating. its really quite rude."
    }
}
function accountSetupStrings() {
    form = true;
    //disables input for top text entry and register button
    document.getElementById("GGOrbInterface").inert = true;
    document.getElementById("Account Button one").inert = true;
    document.getElementById("BocchiBonusMessage").innerHTML = "Sorry, You can't use this right now";
    //Changes Bocchi messages
    document.getElementById("BocchiGreeting").innerHTML = "Uhh, you want to &#34Register an account with the orb?&#34 What does that even mean... ";
    document.getElementById("Bocchi2ndMessage").innerHTML = "ok well the orb says to type your First Name into that first box below and then your Last name into that second one and your zip code into that third one! Oh wait thats the submission form right there! ok Im gonna head down there now"
    document.getElementById("fulloutput").innerHTML = "";
    //activates the account creation form
    document.getElementById("AccountCreationForm").src = "accountForm.html" ;
    document.getElementById("AccountCreationForm").width = "600px;";
    document.getElementById("AccountCreationForm").height = "550px;";
    document.getElementById("AccountCreationForm").style = "border: 1px solid black;";
    //Makes the Bocchi gif appear inside the form.
    document.getElementById("AccountCreationForm").style = "background-image: url('Bocchi the Glitter orb idle hover.gif'); background-position: right top; background-repeat: no-repeat; margin-right: 397px;";



    //swaps out the bocchi image
    document.body.style = "background-image: url('');";

}



function processSubmission() {
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    zipCode = document.getElementById("zipCode").value;

    let fullName = firstName + lastName;

    //the assignment wants to to combine the varibles wiht a space with them into a varibal so I'm just gonna do that here and then just nnot use it
    let fullNameFormatted = firstName + " " + lastName;

        //resets check variables
        invalidName = false;
        invalidZip = false;
        //checks name length
    if (fullName.length > 20) {
        invalidName = true;
    }
    //I saw this in the code for Palendrome on your website and I just have to see if this is real because its kinda crazy
    ///[^a-z0-9]/g
    //ok I couldn't get it to work so I'm just gonna move on
    
    //checks if zipCode is the right length
    if(zipCode.length == 5) {
        //then checks that zipCode is all numbers
        //nevermind I can just change the box type from text to number
          } else {
            invalidZip = true;
        }
    
    let allText = firstName + lastName + zipCode;
    let alertText = "";

    //this will only run on the first click of the submit button
    if(document.getElementById("isFirstSubmission").hidden == true) {
        onCooldown = false;
    }
    document.getElementById("isFirstSubmission").hidden = false;

    //I feel like I should test for whether or not any of the inputs are empty but whatever I guess

    
    //Preparing and executing output
        //I decided that it would look better if both the error messages where in the same popup
        //so tha tthe user doesnt have to click through multiple popups.
        invalidInput = false;

        //output will not be prepared or executed if the button is on cooldown
        if(onCooldown == false) {
            
                if(invalidName) {
                    alertText = alertText + "Please make sure your name is shorter than 20 characters!\n\n";
                    invalidInput = true;
                }
                if(invalidZip) {
                    alertText = alertText + " Zip codes are 5 digit long numbers!";
                    invalidInput = true;
                }
                //only shows the alert if any alerts are available to show

                if(invalidInput) {
                    onCooldown = true;

                    alert(alertText);
                    setTimeout(endAnimation,3600);
                    
                    document.body.style = "background-image: url('Bocchi the Glitter orb failure.gif'); background-position: right top; background-repeat: no-repeat; margin-right: 397px;";
                    document.getElementById("BocchiFormMessage").innerHTML = "Ok lemme tell the orb... OH GOD I THINK YOU DID SOMETHING WRONG THE ORB IS GETTING VERY ANGRY LOOK OUT!!!"
                    
                } else {
                    document.body.style = "background-image: url('Bocchi the Glitter where orb.gif'); background-position: right top; background-repeat: no-repeat; margin-right: 397px;";
                    document.getElementById("BocchiFormMessage").innerHTML = "I whispered it to the orb and it just... left? Well your account creation should be complete, but I guess since the orb isn't here you'll have to reload the page in order to do the palendrome thing."
                }
            }
        //alert("Please make sure your name is shorter than 20 characters!");

    }

    function endAnimation() {
        document.body.style = "background-image: url('Bocchi the Glitter orb hover idle.gif'); background-position: right top; background-repeat: no-repeat; margin-right: 397px;";
        document.getElementById("BocchiFormMessage").innerHTML = "Please be more careful around the orb! anyways I think it calmed down now..."
        onCooldown = false;
    }
//#endregion

//#region 5.1 code
function BocchiBye() {
    document.getElementById("byeMessage").innerHTML = "Oh ok, bye bye! I hope you enjoyed looking at the silly stuff I made for this course just a little bit :)";
}
function BocchiNoBye() {
    document.getElementById("byeMessage").innerHTML = "";
}
//#endregion

//#endregion


//#region Index Code


function startSlide() {
    //document.getElementById("startButton").disabled = "true";
    //document.getElementById("stopButton").enabled = "true";

    //I feel like there has to be a better way to do this but I can't get the buttons to start working again once I disable them so I'm just recreating the whole button every time
    document.getElementById("startButton").innerHTML = "<button  onclick = 'startSlide()' disabled> Move Image </button>";
    document.getElementById("stopButton").innerHTML = "<button  onclick = 'stopSlide()'> Stop Image </button>";

    //uses an interval to slide the image
    intervalID = setInterval(imageSlide,2);
    
    //it will play in the background whenever the image is sliding
    //I hope this counts as my 3rd creative element
    Trigger.play();
}


function stopSlide() {
    //document.getElementById("stopButton").disabled = "true";
    //document.getElementById("startButton").disabled = "false";

    //Same thing but swap the buttons
    document.getElementById("startButton").innerHTML = "<button  onclick = 'startSlide()'> Move Image </button>";
    document.getElementById("stopButton").innerHTML = "<button  onclick = 'stopSlide()' disabled> Stop Image </button>";

    //stops the sliding
    clearInterval(intervalID);

    //pauses the music
    Trigger.pause();
} 

function updateBounds() {
    //updates the bounds whenever the user inputs new boundries
    bounds = document.getElementById("userBoundary").value;
    if (document.getElementById("userBoundary").value == ""){
        //technically the text for the default value reappears so I should reset the bounds too.
        bounds = 200;
    }
    //makes the image start going back to 0, 0 to avoid buggy looking behaviour.
    direction = 2;
}

function imageSlide() {
    //I'm not sure if the meme image counts as a creative element so I figured I would make it slide around in 4 directions and allow the user to set a custom boundary.
    //switch for direction -- 0 for left, 1 for down, 2 for right, 3 for up.
    switch (direction) {
        //x and y move towards the boundry
        case 0:
            if(x >= bounds) {
                direction = 1;
            } else {
                x += 1;
            }
            break;
        case 1:
            if(y >= bounds) {
                direction = 2;
            } else {
                y += 1;
            }
            break;
        //then they turn back to 0, 0
        case 2:
            if(x <= 0) {
                direction = 3;
            } else {
                x -= 1;
            }
            break;
        case 3:
            if(y <= 0) {
                direction = 0;
            } else {
                y -= 1;
            }
            break;
    }
    //update position down here so I don't have to write it 4 times
    //
    document.getElementById("stopBeatingAroundDaBush").style.marginLeft = x + "px";
    document.getElementById("stopBeatingAroundDaBush").style.marginTop = y + "px";

    /*ensures that the button doesnt clip into the image */
    if(y <= bounds){
        /* Button hangs in place below the bounds set by the user */
        buttonMargin = bounds - y + 20;
        document.getElementById("returnButton").style.marginTop = buttonMargin + "px";
    }
}
//#endregion
