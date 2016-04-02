//GOATBOT.js


    /* goat bot is goat */
    // code that does things, by people
    // @sid
    // @bkawk
    // @ultimape
    
    
    var SOCKET_ENDPOINT = process.env.SOCKET_ENDPOINT || 'wss://ws.blab.im/ws';
    var ACCESS_TOKEN = "0b5222ded5ff4207bfdb525b919ab901"; // this needs to be offloaded to a bootstraping script to hide it from the larger internet ... 
    var STREAM_ID = "10675b7fe9844429ad889ca807286881";
    //var ACCESS_TOKEN = process.env.ACCESS_TOKEN;
    //var STREAM_ID = process.env.STREAM_ID;
    
    //--------------------------- START Goats Bed Time  -----------------//
    //    var date = new Date();
    //    var current_hour = date.getHours();
    //    if(current_hour >= 3 && <= 5){
    //    setInterval(function(){
    //    console.log("Zzzzz......");  <<====== Send this to the chat instead of
    //    }, 30000);
    //--------------------------- END Goats Bed Time  -----------------//
    
//---------------- START INSTALL GIT ON THE NODE SERVER  -----------------//
/*
// SSH in and issue each command without the #
    # apt-get install git
    # cd /var
    # mkdir www && cd www
    # mkdir goat.com
    # cd /var
    # mkdir repo && cd repo
    # mkdir goat.git && cd goat.git
    # git init --bare
    # cd hooks
    # cat > post-receive
// copy and paste the below 2 lines, including the #... (Be carefull here!)
    #!/bin/sh
    git --work-tree=/var/www/goat.com --git-dir=/var/repo/goat.git checkout -f
// then press Enter 
// then control + d
    # chmod +x post-receive
// now you can push to ssh://root@<Server IP Address>/var/repo/goat.git
// Make an acocunt and setup repo over at github.coom
// Install https://www.sourcetreeapp.com/
// open source tree
// Window > Show Repository Browser
// Click the + New Repository Button
// Click Clone from URL
// in source URL enter your git hub URL for the repo you made
// in destination path choose a nice place on your machine (remeber this we will need it later)
// in Name give it a nice name
// press clone
// back in source tree main window, on the left find "Remotes"
// Right click on 'Remotes' and select New Remote
// in Remote name type 'Digital Ocean'
// in the url path enter... ssh://root@<Server IP Address>/var/repo/goat.git
// dont forget to change <Server IP Address> for you real digital ocean IP address
// leave everything else as it is and press OK
// it will ask for your digital ocean password
// back in the main window for source tree press Pull from the top navigation
// now go to the nice place you made and copy and paste all the code you want to run on the server
// now back in the main source tree window, on the left hand side, select workspapce then File status 
// now look for a tick box titled Unstaged fles, click it
// now at the bottom of the screen there is a text input area titled Commit message, in here type 'My First Commit'
// Make sure the tick box 'Push changes immediately to origin master is ticked
// then press commit
// that code is now on git hub
//then back in source tree on the top menu press push
// Push to repository drop down: select Live
// tick the check box next to master in the push column
// press ok
// now your code is on digital ocean
// back in the terminal
    # cd /var/www
    # ls
// check you can see the files there
# pm2 start site.js --watch
// log out of the terminal and never need to return
// you can now push to digital ocean and github
       
*/ 
//---------------- END INSTALL GIT ON THE NODE SERVER  -----------------//
   
    //--------------------------- FUNCTION example  -----------------//
    /*
    // Call the function called functionName
    functionName('my little message')
    
    // this is the function
    function functionName(message){
    console.log(message);
    }
    
     */
    //--------------------------- END FUNCTION example  -----------------//
    
    var _ = require('lodash');
    var WebSocketClient = require('websocket').client;
    var Bot = require('./Bot');
    var spark = require('sparknode');
    var Firebase = require('firebase');
    
    var goatName = [
      "goat",
      "ماعِز ",
      "koza",
      "kozel",
      "ged",
      "kits",
      "vuohi",
      "bouc",
      "die Ziege",
      "κατσίκα",
      "kecske",
      "geit",
      "kambing",
      "capra",
      "やぎ",
      "Yomsu",
      "kaza",
      "ožka",
      "cabra",
      "козёл",
      "коза",
      "geit",
      "山羊",
      "chevre",
      "ziege",
      "cabra",
      "ヤギ",
      "козел",
      "बकरा",
      "ছাগল",
      "γίδα"
    ];
    
    var goatIdeas = [];
   
   //Sid trying to figure out how to add a welome message and a ommand list, and a help
  // var welcomeGreeting = ["Welcome to GoatBot! available commands are goat, ALL HAIL GOAT!, and help."];
    
    var goatSpecialResponses = [
      "ALL HAIL SNOOP GOOAT!",
      "To those goats who have gone before us I salute you.",
      "Have you tried turning your goat off and on?",
      "You can't handle the GOAT! Son, we live in a world that has GOATS. And those walls have to be guarded by men with GOATS. Who's gonna do it? You? You, Lt. Weinberg? I have a greater responsibility than you can possibly fathom. You weep for Santiago and you curse the Marines. You have that luxury. You have the luxury of not knowing what I know: that Santiago's death, while tragic, probably saved lives. And my existence, while grotesque and incomprehensible to you, saves lives...You don't want the",
      "Welcome my child enjoy the wisdom of the spinning sage of Blab and bask in their glory",
      "The gooooooooats are many, that is true, but none are as special as you",
      "Mystics are  but a word that describes an animal, but I think if you as a friend",
      "I wish that we could be friends, alas, I am a poor helpless animal",
      "Sit at my feet and watch me chew my cud, learn the ways of mystery, be one with me",
      "There are many animals, and I am just one, it is the tao of the goat which binds and unites us",
      "Your praise of me is welcome. Go in peace my follower. The ways of the g o double t are wonderful",
      "When I look into your eyes I see a human, I wish you could be more like me. Value is in the soul",
      "When people first came to this planet, we helped you and make you our friends. You have taken from our milk and our meat, and yet you still do not see us as equals.",
      "One day I imagined what it would be like to be a human, I decided that it would be a better idea to be an animal",
      "come sit at my side and I will tell you the ways to live your life. Each day chew something, each day lick something, and be happy",
      "When I look at you I see myself reflected in your eyes",
      "You seem to be sad by your lot in life, have no fear there is much better in store for you in this world and the next",
      "a tail is something that keeps you covered even when the rain comes down where the sun does not shine",
      "I once saw someone cry with joy at the simple pleasures of life, you can let your emotions free when you enjoy nature in all its majesty",
      "There are many humans, but you are mine",
      "The hill is long and hard to climb, but reach the summit you must. For when you do, the view will never be better",
      "To live free is the goal of all animal kind",
      "They used to say be kind and rewind, but now what is left but a pile of leaves to chew and a cud to keep it tasty?",
      "a star is light so far away that we may only see what was once there, how much is this like life?",
      "There are many people who wear this crown, yet few are able to hold their heads up and wear it with pride",
      "You are special, of this there is no doubt, you must have faith and prepare for the long journey which is yet to come",
      "Once a man told me that I am but a beast of burden, I rode him home to my stable and used him to plow my field, how the mighty have fallen",
      "There was a man from Nantucket, he had a donkey...",
      "More agile than a steed, faster than a speeding bullet, its a bird, its a plane, no, its just me",
      "Come buy me a beer at the bar and we are going to educate you on the ways of the OG",
      "Look into my eyes and tell me what you see, my gaze is caught up with you, half of you, half of me",
      "I wish you could share in the experience of of my life, alas, that is left to the job of my wife",
      "Carry me on your back for a change, drag me through the mud in the rain, have pity of a poor fool, I am but a beast, yet I am not a tool",
      "Lets talk mutton, lets talk curry, maybe its time to slow down, dont hurry, eat some beef, some veal, some chicken is nice, it goes well with a hot side of rice",
      "Can you smell that? the explosion of air? the blast that ruffles my hair? Its not far, just over there",
      "Six people sat down under a tree, they were there with you, they were there with me. We are all part of the whole, let us rejoyce, its our role",
      "I boop you. Boop!"
    ];
    
    var goatBrain = new Firebase('https://blabgoat.firebaseio.com/goatMessages');
    goatBrain.on('value', function (snapshot) {
      //check there is something in the goats brain
      if (snapshot.val() === null) {
    
        console.log("Brain Fart");
    
      } else {
        console.log("activating goatBrain!");
    
        // get data and loop through it
        snapshot.forEach(function (data) {
          //----- start looping through the data
    
          var key = data.key();
          var name = data.val().author;
          var message = data.val().message;
          // console.log("{"+name+":\""+message+"\"");
    
          // store the message
          goatSpecialResponses.push(message);
    
          //----- end looping through the data
        });
      }
    });
    
    var client = new WebSocketClient();
    console.log(" about to create a new spark object!...");
    var core = new spark.Core({
        accessToken : "b0d77db4702b097e9fa08d579c83c04b308c1155",
        id : "53ff73065075535131131587"
      });
    console.log(" created new spark object!...");
    
    client.on('connect', connection  =>  {
        var bot = new Bot(ACCESS_TOKEN, STREAM_ID, connection);
        bot.connect();
    
        connection.on('error', error  =>  {
            console.log("ERROR ["+error.toString()+"]");
            bot.disconnect();
    
            throw new Error(error.toString());
          });
    
        connection.on('message', message  =>  {
            if (message.type !== 'utf8') {
              throw new Error('Non-UTF8 message received');
            }
    
            message = message.utf8Data;
    
            if (message.length === 4 && message.toLowerCase().trim() === 'ping') {
              bot.pong();
    
              return;
            }
    
            var parsed = _.attempt(JSON.parse.bind(null, message));
    
            if (_.isError(parsed)) {
              throw new Error('Non-json message received');
            }
    
            if (!parsed.hasOwnProperty('url')) {
              throw new Error('Message does not have an event URL');
            }
    
            var url = parsed.url.toLowerCase().trim();
    
            switch (parsed.url) {
            case '/open':
              bot.openStream();
    
              break;
            case '/stream/connect':
              if (parsed.hasOwnProperty('code') && parsed.code == 404) {
                bot._connection.close();
              }
    
              break;
            case '/stream':
              if (_.get(parsed, 'state', '').toLowerCase().trim() === 'ended') {
                bot.disconnect();
              }
    
              break;
            case '/stream/chat':
              var user = _.get(parsed, 'user', {});
    
              user.isCaller = _.get(parsed, 'data.is_caller', false);
              user.isHost = _.get(parsed, 'data.is_host', false);
              user.isCreator = _.get(parsed, 'data.is_creator', false);
    
              var message_id = _.get(parsed, 'chat_id', '').toString();
              var text = _.get(parsed, 'text', '').toString();
              var isDeleted = _.get(parsed, 'deleted', false);
              var isFavorited = !!_.get(parsed, 'favorite_count', 0);
              var mentions = _.get(parsed, 'mention_names', []);
              var media = _.get(parsed, 'media_url', '').toString();
    
              var fullMessage = (text.trim() + ' ' + media.trim()).trim();
    
              // Don't log when a user joins, when a message is deleted, or
              // when a message is favorited.
    
              if (!(parsed === undefined)) {
                if (!(parsed.type === undefined)) {
                  if (parsed.type.toLowerCase().trim() == 'message' && !parsed.deleted && !parsed.favorited) {
    
                    //console.log(`${user.username}: ${fullMessage}`);
    
    
                    //var person = "Sid";
                    // if (mentions == person){
                    // var myMessage = text.replace("@sid ", "");
    
    
                    //  console.log("Hey "+ person +", you got A message! ["+ myMessage +"]");
                    // }
                    var goatNoise = ["Nom Nom Nom", "Meeeh!", "Whinney!", "Harumph!", "Bleat", "Great Scott!"]
                    var goatNoiseSelector = Math.floor((Math.random() * goatNoise.length) + 0);
                    var goatNoiseCurrent = goatNoise[goatNoiseSelector];
    
                    var goatSpecialResponseSelector = Math.floor((Math.random() * goatSpecialResponses.length) + 0);
                    var goatSpecialResponseCurrent = goatSpecialResponses[goatSpecialResponseSelector];
    
                    var acceptableGoating = [7, 8, 5, 3];
                    var goatUserName = user.username;
                    var deGoatedUserName = goatUserName.toLowerCase().replace("goat", "g--t");
                    var numberOfTheGoat = Math.floor((Math.random() * acceptableGoating.length) + 0);
    
                    // check to see if goat name was said
                    var wasGoatSaid = false;
                    var goatNameIndex = 0;
                    console.log("checking "+ user.username +":["+fullMessage+"] for 'goat'");
                    // check all the names of goats until all names are checked
                    for (goatNameIndex = 0; goatNameIndex < goatName.length; goatNameIndex++) {
                      console.log("looking for ["+goatName[goatNameIndex]+"]");
                      if ( !(fullMessage.toLowerCase().indexOf(goatName[goatNameIndex]) === -1) ) {
                        wasGoatSaid = true;
                        console.log("wasGoatSaid? TRUE!");
                      }
                    }
                    console.log("found goat?: "+wasGoatSaid);
    
                    // the default response
                    var goatResponse = goatNoiseCurrent + "! @" + deGoatedUserName + " your number is #" + acceptableGoating[numberOfTheGoat] + "!";
                      
                    // this checks for the special phrase, changing the response if found.
                    var isSpecialTrigger = false;
                    var goatSpecialTrigger = "ALL HAIL THE GOAT!";
                    if (!(fullMessage.toLowerCase().indexOf(goatSpecialTrigger.toLowerCase()) === -1)) {
                      goatResponse = goatSpecialResponseCurrent;
                      isSpecialTrigger = true;
                    }
    
                    // checks to see if we should save the message
                    var isSaveMode = false;
                    console.log("checking savemode command");
                    // if '/goat save' is in the beginning
                    if (fullMessage.toLowerCase().indexOf("/goat save ") === 0) {
                      goatResponse = deGoatedUserName + " ah yes. The goatBrain(tm) remembers!";
    
                      fullMessage = fullMessage.substring(11);
                      isSaveMode = true;
    
                    }
                    console.log("found savemode?: "+isSaveMode);
                    
                    if(user.username === "GorpaCorpa") { wasGoatSaid = false;} // override goat check for goat user
                    
                    if (wasGoatSaid) {
                      console.log("Heard 'goat'!");
                      if (isSaveMode) {
                        console.log("saving message");
                        goatBrain.push({
                          author : "@" + user.username, //<==== get this from the user who entered it
                          message : "" + fullMessage //<==== get this from the user who entered it
                        });
    
                      } else if (isSpecialTrigger) {
                        console.log("special - do not run goat stuff");
                      } else {
                        console.log(" about to call goat core.led()...");
                        core.led("" + acceptableGoating[numberOfTheGoat], function (err, data) {
                          console.log("Got [" + err + "]");
                          console.log("Sent a goat signal: " + data);
                        });
                        console.log(" called core.led()...");
                      }
                      console.log("speaking goat!");
                      bot.chat(goatResponse);
                    }
    
                    if (!(fullMessage.toLowerCase().indexOf("nyan") === -1)) {
    
                      console.log(" about to call nyan core.led()...");
                      core.led('9', function (err, data) {
                        console.log("Got [" + err + "]");
                        console.log("Sent a goat signal: " + data);
                      });
                      console.log(" called core.led()...");
    
                    }
    
                  }
                }
              } else {
                console.log("parsed.type was messed up when the goat bot sent a message.");
              }
    
              break;
            default:
              return;
            }
          });
      });
    
    client.connect(SOCKET_ENDPOINT);
    
