

var wishes = [
	{
	    indexes:["hello","hey","hi"],
	    action:function(){
			let wishData = ["Hey. Glad to see you here", "Hella ! Nice to meet you", "Hello. How's it going ?. Tap to reply me","Hey buddy ! How are you today?"];
			let item = wishData[Math.floor(Math.random()*wishData.length)];
	        artyom.say(item);
			output.innerHTML = item;
		}
	}
];
var calculations = [
    {
    	description: " make a calculation",
    	smart: true,
    	indexes: ["calculate *","how much is *","evaluate *"],
    	action: function(i,wildcard){
    		
    		wildcard = wildcard.replace(/x/g, "*");
    		wildcard = wildcard.replace(/divided by/g, "/");
    		wildcard = wildcard.replace(/by/g, "/");
    		try{
    			var result = eval(wildcard);
    			output.innerHTML = "The answer is "+result;
            	artyom.say("The answer is "+result);
            }
            catch(error){
            	artyom.say("Okay. Searching for that");
            	
            	googleSearch(wildcard);
  				
            }
    	}
    }
];
var timeServices = [

    {
        indexes:["What time is it","Am I late","what is the time","Am I late today","what's the time now"],
        action:function(i){ // var i returns the index of the recognized command in the previous array
            if(i == 2){
                output.innerHTML = "Never is too late to do something my friend !";
                artyom.say("Never is too late to do something my friend !");
            }else{
                speakTime(new Date());
            }
        }
    }
];

var newsServices = [
	{
		description : "decision",
		indexes : ["yes","no"],
		action: function(i){
			if(i==0) decision = 1;
			else decision = 2;
		}
	},
	{
		indexes: ["good morning"],
		action: function(){
                output.innerHTML = "Good morning, want to get the news today ?";
                artyom.say("very good morning buddy. want to get the news today ?");
                startOneCommandArtyom();
                if(decision == 1){
                	
                }
                else if(decision == 2){

                	
                }
            }
	},
];
var locationServices = {
	description: "current location",
	indexes: ["where am I","what's my location","where I am right now","whats' my position"],
	action: function(i,wildcard){
		getLoc({need: 'location'});		
	}
};
var weatherServices = [
	{
		description: "current weather",
		indexes: ["What's the weather now","what is the weather now","is it rain today","how is outside"],
		action: function(i,wildcard){
			getLoc({need: 'weather',area: 'location'});
		}
	},
	{
		description: "weather at remote locations",
		indexes:["what is the weather at *","what's the weather at *"],
		smart: true,
		action: function(i,wildcard){
			getLoc({need: 'weather',area: wildcard});
		}
	}
];
var distanceServices = [
	{
		description : "To find the driving distance from one location to another location",
		indexes: ["what is the distance from my location to *","how far is * to me","how long is * to me"],
		smart: true,
		action: function(i,wildcard){
			getLoc({need: 'distance', area: wildcard});			
		}
	}
];
var searchServices = [
	{
		description: "search google",
		smart : true,
		indexes: ["search for *","search *"],
		action: function(i,wildcard){
			performSearchService(wildcard);
		}
	}
];

var invokeWebappServices = [
	{
		description : "To directly open a website or webapp",
		smart: true,
		indexes : ["go to *","take me to *"],
		action: function(i,wildcard){
			openWebsite(wildcard);
		}

	}
];
var invokeMobileApps = [
	{
		description : "this is a trigger to directly open the mobile apps",
		smart : true,
		indexes : ["open *"],
		action : function(i,wildcard){
			openApp(wildcard);
		}
	}
];
var translateServices  = [
	{
		description : "Translate from english language to any language ",
		smart : true,
		indexes : ["translate *"],
		action : function (i,wildcard){
			makeTranslation(wildcard);
		}
	}
];

var speechServices = [
	{
		description: "pronunciate the recognized text",
		smart: true,
		indexes: ["speak *","pronunciate *","pronounciate *"],
		action: function(i,wildcard){
			artyom.say(wildcard);
			output.innerHTML = wildcard;
		}
	}
];
var rememeberServices = [
	{
		description : "This service is used to rememeber the data into the local storage",
		smart: true,
		indexes : ["rememeber that my *","remember that my *","remember that the *"],
		action: function(i,wildcard){
			rememeberItem(wildcard);
		}
	},
	{
		description: " This service is used to fetch the data from the local storage",
		smart: true,
		indexes: ["what is my *","who is the *"],
		action : function(i,wildcard){
			getRememberedItem(wildcard);
		}
	}
]

var navigationServices = [
	{
		description: "this is a service to start navigation from current location to a specific location",
		smart : true,
		indexes : ["navigate me to *","let's drive to *","guide me to *","Let's go to *","let us drive to *"],
		action : function(i,wildcard){
			getLoc({need : 'navigation', area: wildcard});
		}
	}
]

var dictionaryServices = [
	{
		description : "This service is used to find the meanings, synonyms of a word",
		smart: true,
		indexes : ["what is the meaning of *","define *","what's the meaning of *","show me the another meaning of *","what does * mean"],
		action : function(i, wildcard ){
			
			if(i != 3)
				lemmaInfo({word : wildcard, need: "meaning"});
			else
				lemmaInfo({word : wildcard, need: "secondMeaning"});
			

		}
	}
]
artyom.addCommands(dictionaryServices);
artyom.addCommands(wishes);
artyom.addCommands(translateServices);
artyom.addCommands(navigationServices);
artyom.addCommands(rememeberServices);
artyom.addCommands(speechServices);
artyom.addCommands(invokeMobileApps);
artyom.addCommands(searchServices);
artyom.addCommands(invokeWebappServices);
artyom.addCommands(distanceServices);
artyom.addCommands(calculations);
artyom.addCommands(timeServices);
artyom.addCommands(weatherServices);
artyom.addCommands(newsServices);
artyom.addCommands(locationServices);
// artyom.addCommands(defaultService);

// artyom.addCommands(myGroup); 

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}