const _ = require("underscore");
const ask = require("./ask");

// Prompt user to start the game
const init = async () => {
  //Welcome user to the number guessing game
  console.log(
    "Welcome to our guessing game. In this experience, " +
      "you'll have to read my mind.\n" +
      "I (computer) will choose a number, and you (human) will " +
      "try to guess it. \nMy number is between 0 and 100."
  );

  // overlord chooses number
  let secret = _.random(0, 100);

  await ask("I am ready. Are you? [Enter] to start");
  start(secret);
};

/**
 * Name: start()
 * =============
 * Recursive game loop
 * @param {String} secret
 */
async function start(secret) {
  //Asks user for first guess
  let input = (await ask("Your guess, please >_")).trim();
  let guess = Number(input);
  //Check the guess is a valid input
  // -- is it an integer
  // -- is in the range
  if (!input || !Number.isInteger(guess) || guess < 0 || guess > 100) {
    //If not valid input, remind them of the acceptable syntax
    console.log("We're looking for a number b/t 0 and 100. Try again");
    // skip rest of logic and go back to prompting user
  }
  // valid input, now compare guess to chosen number
  else {
    //If same, say congratulations!
    if (guess === secret) {
      console.log("Congratulations!");
      console.log("bye");
      process.exit(0);
    }
    //If guess is higher than chosen number, tell user to guess lower
    else if (guess > secret) {
      console.log("My number is lower. Guess again...if you dare");
    }
    //Otherwise, tell user to guess higher
    else {
      console.log("Try higher...");
    }
  }
  // continue game until it resolves
  start(secret);
}

//setup & kick off the game
init();