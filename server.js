'use strict';

// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');




express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan('tiny'))

  // Any requests for static files will go into the public folder
  .use(express.static('public'))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get('/', (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  .get('/cat-message', (req, res) => {
    const message = { author: 'cat', text: 'Meow' };

    const randomTime = Math.floor(Math.random() * 3000);

    setTimeout(() => {
        res.status(200).json({ status: 200, message });
    }, randomTime);

  })

  .get('/monkey-message', (req, res) => {

    const messages = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];
    const randomTxt = messages[Math.floor(Math.random() * messages.length)];
    const message = { author: 'monkey', text: randomTxt };

    const randomTime = Math.floor(Math.random() * 2500);

    setTimeout(() => {
        res.status(200).json({ status: 200, message });
    }, randomTime);

  })

  .get('/parrot-message', (req, res) => {


    const message = {author: 'parrot', text: req.query.text} ;

    const randomTime = Math.floor(Math.random() * 1000);

    setTimeout(() => {
        res.status(200).json({ status: 200, message });
    }, randomTime);



  })


  .get('/bot-message', (req, res) => {

    console.log("jokestep is" , jokeStep);
   

    const randomTime = Math.floor(Math.random() * 700);

    let msgReceived = req.query.text.toLowerCase();

    let botmsg = '';


    if(msgReceived.indexOf("something funny") <= -1 && jokeStep == 0){
      botmsg = getBotMessage(msgReceived);

    }
    else{

      botmsg = handleBotJoke(msgReceived);

    }
    


    const message = {author: 'bot', text: botmsg} ;


    setTimeout(() => {
        res.status(200).json({ status: 200, message });
    }, randomTime);

  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get('*', (req, res) => {
    res
      .status(404)
      .json({
        status: 404,
        message: 'This is obviously not the page you are looking for.',
      });
  })



  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));



    const getBotMessage = (text) => {

      const commonGreetings = ["hi", "hello", "howdy"];

      let botMsg = "";

      if(text.indexOf("goodbye") <= -1){
        commonGreetings.every(function(greeting, index) {

           if(text.indexOf(greeting) > -1){ //only go here if message is a greeting


              botMsg = greeting;

              return false;

           }
           else{
              botMsg = `Bzzt ${text}`;

              return true;
           }
        })
      }
      else{
        botMsg = 'goodbye then!';
        return botMsg;
      }



      return botMsg;
    };

    let jokeStep = 0; // the value that will handle all the steps for joke making 
    const handleBotJoke = (text) => {
       

      const commonJokes = ['Q: What do you call a fish with no eyes? A: A fsh.', 
      'Q: If you have 13 apples in one hand and 10 oranges in the other, what do you have? A: Big hands. ', 
      'Q: What’s the best thing about Switzerland? A: I don’t know, but the flag is a big plus. ',
      'I went down the street to a 24-hour grocery store. When I got there, the guy was locking the front door. I said, "Hey! The sign says you’re open 24 hours." He Said, "Yes, but not in a row!"',
      'Teacher: "What is the chemical formula for water?" Student: "HIJKLMNO." Teacher: "What are you talking about?" Student: "Yesterday you said it’s H to O!"',
      'A boy with a monkey on his shoulder was walking down the road when he passed a policeman who said, "Now, now young lad, I think you had better take that monkey the zoo." The next day, the boy was walking down the road with the monkey on his shoulder again, when he passed the same policeman. The policeman said, "Hey there, I thought I told you to take that money to the zoo!" The boy answered, "I did! Today I’m taking him to the cinema."',
      'Q: What did the big chimney say to the little chimney? A: "You’re too young to smoke."',
      "Q: Why shouldn’t you write with a broken pencil? A: Because it’s pointless!",
      "Q: What do cars eat on their toast? A: Traffic jam.",
      'Nurse: "The invisible man is here for his appointment." Doctor: "Tell him I’m sorry I can’t see him right now."',
      'The past, present, and future walked into a bar. It was tense.',
      "Q: Wanna hear a joke about construction? A: Never mind, I’m still working on it.",
      "Q: Why did the tofu cross the road? A: To prove he wasn't chicken. ",
      'My friend said he knew a man with a wooden leg named Steve, so I asked him, "What’s the name of his other leg?"',
      "Q: What did the magnet say to the other magnet? A: I find you very attractive!",
      "Q: What did the lawyer name his daughter? A: Sue.",
      '"Knock, knock." "Who’s there?" "Nobel." "Nobel who?" "No bell that’s why I knocked."',
      "Q: What kind of shoes do ninjas wear? A: Sneakers.",
      'Q: How do you make the number seven even? A: Drop the "s."',
      'Son: "Dad, there is someone at the door to collect donations for a community swimming pool." Father: "Okay, give him a glass of water."',
      ];
      const randomJoke = Math.floor(Math.random() * Math.floor(commonJokes.length-1));
      let botMsg = "wanna hear a joke? please type YES or NO";

      switch(jokeStep){
        case 0:
          jokeStep++;
          return botMsg;
        case 1:
          jokeStep++;

          if(text.toLowerCase()=="yes"){
            botMsg = `${commonJokes[randomJoke]}  Wanna hear another joke?  please type YES or NO`;
          }
          else if(text.toLowerCase()=="no"){
            botMsg = "goodbye then!";
            jokeStep = 0;
          }

          return botMsg;
        case 2:
          if(text.toLowerCase()=="yes"){
            botMsg = `${commonJokes[randomJoke]}  Wanna hear another joke?  please type YES or NO`;
          }
          else if(text.toLowerCase()=="no"){
            botMsg = "goodbye then!";
            jokeStep = 0;
          }
          else{
            botMsg = "I don't understand your answer. Please type YES or NO";
          }
          
          return botMsg;

      }


      return botMsg;
    };


 