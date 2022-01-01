const artyom = new Artyom();
var output = document.getElementById('output');
var removeLastTwoWords = (word) => {word = word.substring(0, word.lastIndexOf(" "));word = word.substring(0, word.lastIndexOf(" "));return word};
// var searchInstruction = "pronounciate pschycology";
function openUrl(url){
	window.open(url,"_blank");	
}
window.console.warn = function () { } // to avoid printing all the warnings into the console

function startOneCommandArtyom(){
    artyom.fatality();// use this to stop any of

    setTimeout(function(){// if you use artyom.fatality , wait 250 ms to initialize again.
         artyom.initialize({
            lang:"en-GB",// A lot of languages are supported. Read the docs !
            continuous:false,// recognize 1 command and stop listening !
            listen:true, // Start recognizing
            debug:true, // Show everything in the console
            speed:1 // talk normally
        }).then(function(){
            
        });
    },250);
}

artyom.redirectRecognizedTextOutput(function(text,isFinal){
	var input= document.getElementById('input');
	if(isFinal){
		input.innerHTML = "\" "+text+" \"";
		artyom.fatality();
		outerCircle.style.paddingTop = 0;
		outerCircle.style.marginTop = '120px';
		outerCircle.style.marginBottom= '45px';
		outerCircle.style.height = '110px';
		outerCircle.style.width = '110px';
		middleCircle.style.paddingTop = 0;
		middleCircle.style.height = '110px';
		middleCircle.style.width = '110px';
	}else{
		
		input.innerHTML = '';
	}
});
function toggleButton(){
	var outerCircle = document.getElementById("outerCircle");
	var middleCircle = document.getElementById("middleCircle");
	if(outerCircle.style.paddingTop == '0px' || outerCircle.style.paddingTop == '' ){
		startOneCommandArtyom();
		// artyom.simulateInstruction(searchInstruction);
		outerCircle.style.paddingTop = '17px';
		outerCircle.style.height = '200px';
		outerCircle.style.width = '200px';
		outerCircle.style.marginTop = '75px';
		outerCircle.style.marginBottom= '0px';
		middleCircle.style.paddingTop = '25px';
		middleCircle.style.height = '161px';
		middleCircle.style.width = '161px';		
		// increaseScaleAnimation();	
	}
}

function makeAnimation(elem,pos,padding,lim,frm){
	var pad = 0;
  	var id = setInterval(frame, frm);
  	function frame() {
  	  if (pos == lim || pad == padding) {
  	    clearInterval(id);
   	} else {
  	 	   pos++; 
  	 	   pad+=0.5;
  	 	   elem.style.paddingTop = pad + 'px'; 
  	 	   elem.style.width = pos + 'px'; 
   		   elem.style.height = pos + 'px'; 
   	 	}
  	}			
}
function getLoc(service){
	if(navigator.geolocation){	
		navigator.geolocation.getCurrentPosition(function(location) {
			var latitude = location.coords.latitude;var longitude = location.coords.longitude;
		    
			var res;
		 	var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true`;
		   	let request = new XMLHttpRequest();
		    request.onreadystatechange = function() {
			    if (this.readyState === 4 && this.status === 200) {
			        let response = JSON.parse(this.responseText);
			        locationService(response,service,{latitude: latitude,longitude:longitude});

			    }
			}
		    request.open("GET", url, true);
		    request.send();		
		
		});
	}
}
function locationService(response,service,coords){
	if(service.need == 'location'){
		try{
			
			res = JSON.stringify(response.results[0].address_components[3].long_name).replace(/\"/g, "");
			res= "you are at " + res;
			
    		output.innerHTML = res;
			artyom.say(res);
		}
		catch(error){
			
			res = "there was some technical issues, give it a try again";
    		output.innerHTML = res;
			artyom.say(res);

		}
	}
	else if(service.need == 'weather'){
		if(service.area == 'location'){
			
			
			try{				
				pin = JSON.stringify(response.results[0].address_components[response.results[0].address_components.length-1].long_name);
				pin = pin.match(/\d/g);
				pin = pin.join("");
				var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${pin},in&appid=f10cee2f7747f01d053516a0570d29de&units=metric`;
			   	let request = new XMLHttpRequest();
				
			    request.onreadystatechange = function() {
			      if (this.readyState === 4 && this.status === 200) {
			        let weatherResponse = JSON.parse(this.responseText);
			        var weatherResult = "It's "+weatherResponse.main.temp+" degrees with "+weatherResponse.weather[0].description;
			      	output.innerHTML = weatherResult;
					artyom.say(weatherResult);	 
			      }
			    }
			    request.open("GET", weatherUrl, true);
			    request.send();	
			}catch(error){
				let res = "This seems like a technical issue. Please reload the page and try again.";
				output.innerHTML = res;
				artyom.say(res);
			}
		}
		else{
			
			
			try{				
				var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${service.area}&appid=f10cee2f7747f01d053516a0570d29de&units=metric`;
			   	let request = new XMLHttpRequest();
			    request.onreadystatechange = function() {
			      if (this.readyState === 4 && this.status === 200) {
			        let weatherResponse = JSON.parse(this.responseText);
			        var weatherResult = "The weather at "+service.area+" is "+weatherResponse.main.temp+" degrees with "+weatherResponse.weather[0].description;
			      	output.innerHTML = weatherResult;
					artyom.say(weatherResult);	 
			      }
			    }
			    request.open("GET", weatherUrl, true);
			    request.send();	
			}catch(error){
				let res = "This seems like a technical issue. Please reload the page and try again.";
				output.innerHTML = res;
				artyom.say(res);
			}
		}
	}
	else if(service.need === 'distance'){
		var origin = response.results[0].address_components[response.results[0].address_components.length-4].long_name;
		var destination = service.area;
		try{				
			var distanceURL = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&mode=driving&units=imperial&language=en-EN`;
		   	let request = new XMLHttpRequest();
		    request.onreadystatechange = function() {
		      if (this.readyState === 4 && this.status === 200) {
		        let distanceResponse = JSON.parse(this.responseText);
		        console.log(distanceResponse);
		        var distanceResult = distanceResponse.rows[0].elements[0].distance.text;
		        var distanceResult = Math.trunc(distanceResult.replace(/[^0-9]/g,'') * 1.609344);
		        // console.log(distanceResult);
		  		var distance = "It's approximately "+distanceResult+" kilometers from "+origin;
		        // var distanceResult = "The weather at "+service.area+" is "+weatherResponse.main.temp+" degrees with "+weatherResponse.weather[0].description;
		      	output.innerHTML = distance;
				artyom.say(distance);	 
		      }
		    }
		    request.open("GET", distanceURL, true);
		    request.send();	
		}catch(error){
			let res = "This seems like a technical issue. Please reload the page and try again.";
			output.innerHTML = res;
			artyom.say(res);
		}

		// var directionsService = new google.maps.DirectionsService();

		// var locResponse = {...response};
		// var res = JSON.stringify(locResponse.results[0].address_components[response.results[0].address_components.length-4].long_name).replace(/\"/g, "");

		// var request = {
		//   origin      : res, // a city, full address, landmark etc
		//   destination : service.area,
		//   travelMode  : google.maps.DirectionsTravelMode.DRIVING
		// };
		// directionsService.route(request, function(response, status) {
		//   if ( status == google.maps.DirectionsStatus.OK ) {
		//   		var distance = Math.round((response.routes[0].legs[0].distance.value)/1000); // the distance in metres
		  		
		//   		output.innerHTML = distance;
		// 		artyom.say(distance);
		//   }
		//   else {
		//     // oops, there's no route between these two locations
		//     // every time this happens, a kitten dies
		//     // so please, ensure your address is formatted properly
		//   }
		// });

	}
	else if(service.need == 'navigation'){
		if(isAndroid()) {
			
			
			window.location = "https://maps.google.com/maps?saddr="+coords.latitude+","+coords.longitude+"&daddr="+service.area;
			
		}	

	}
}
function speakTime(date){ 
	hours = date.getHours();
	minutes = date.getMinutes(); 
	minutes = (minutes == 00)? " O clock ": minutes;
	hours = (hours>12)? hours-12 : hours;
	artyom.say("The time is "+hours+" "+minutes);
	output.innerHTML = "It's "+hours+" : "+minutes;
}

function performSearchService(inputString){
	var splittedString = inputString.split(" ");
    var lastWord = splittedString[splittedString.length - 1];

    if(lastWord == 'google'){
    	inputString = removeLastTwoWords(inputString);
		window.open("https://www.google.com/search?q="+inputString,"_blank");
    }
 	else if(lastWord == 'facebook'){
 		inputString = removeLastTwoWords(inputString);
		window.open("https://www.facebook.com/search?q="+inputString,"_blank");
 	}
 	else if(lastWord == 'twitter'){
		inputString = removeLastTwoWords(inputString);
		window.open("https://www.twitter.com/search?q="+inputString,"_blank");
 	}
 	else if(lastWord == 'youtube'){
		inputString = removeLastTwoWords(inputString);
		window.open("https://www.youtube.com/search?q="+inputString,"_blank");
 	}
 	else{
		window.open("https://www.google.com/search?q="+inputString,"_blank"); 		
 	}
}
function triggerDefault(){
	output.innerHTML = "sorry, I didn't get that";
	artyom.say("sorry, I didn't get that");
}
function openWebsite(site){
	var splittedString = site.split(" ");

	var lastWordInsplittedString = splittedString[splittedString.length - 1];

	var splittedWithDot = lastWordInsplittedString.split(".");

	var endDomain = splittedWithDot[splittedWithDot.length - 1];
	
	var finalUrl ='';
	if(endDomain == 'com' || endDomain == 'org' || endDomain == 'net' || endDomain == 'in' || endDomain == 'ml'){
		for (i in splittedWithDot){
			if(i < splittedWithDot.length-1){
				finalUrl+= splittedWithDot[i]+".";
			}
		}
		finalUrl = "https://"+finalUrl+endDomain;
		
		
		openUrl(finalUrl);
	}else{
		
		finalUrl = "https://"+lastWordInsplittedString+".com";
		openUrl(finalUrl);
	}
}
function openApp(name){

	if(isAndroid()){
		if (name == 'facebook') {
			// artyom.say("okay, opening facebook");
			// output.innerHTML = "opening facebook"
			// window.location = "fb://home";
			artyom.say("sorry, our app opening services were still in development mode");
			output.innerHTML = "sorry, our app opening services were still in development mode";
		}
		else if(name == 'whatsapp'){
			alert("hello");
			window.location = "C:\\Users\\Jenish Modh\\Music\\Desktop\\WhatsApp Desktop.Ink";
			artyom.say("sorry, our app opening services were still in development mode");
			output.innerHTML = "sorry, our app opening services were still in development mode";

		}
		else{

			artyom.say("sorry, our app opening services were still in development mode");
			output.innerHTML = "sorry, our app opening services were still in development mode";
		}
	}
	else{

		artyom.say("sorry, were are still working on it");
		output.innerHTML = "sorry, our app opening services were still in development mode";
	}
}


function makeTranslation(textWithLanguage){
	var splittedText = textWithLanguage.split(" ");
    var lastWord = splittedText[splittedText.length - 1];
	var toBeTranslatedText = textWithLanguage;
	var sourceLang;
	var targetLang;
	
    if(getLanguageCode(lastWord)){

    	var lang = 	lastWord;

		toBeTranslatedText = removeLastTwoWords(toBeTranslatedText);
		sourceLang = 'auto';
		targetLang = getLanguageCode(lang);
    }
	else{
		sourceLang = 'auto';
		targetLang = 'en';
	}

	var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" 
        + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(toBeTranslatedText);

	// var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=hi&tl=en_GB&dt=t&q="+encodeURI(text);
	var result;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			result = JSON.parse(this.responseText);
			result = result[0][0][0];
			output.innerHTML = result;
			if(targetLang == 'en')
				artyom.say("It's "+result+" in english");
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}
function getLanguageCode(lang){
	var languageDb = {
		hindi : 'hi',
		english : 'en',
		telugu : 'te',
		tamil : 'ta',
		urdu : 'ur',
		kannada : 'kn',
		arabic : 'ar',
		chinese : 'zh-CN'
	};
	if(lang in languageDb){
		return languageDb[lang];
	}
	return undefined;
}
function rememeberItem(data){
	
	var splittedText = data.split(" is ");
	
	var remainingStrings = '';
	for (i in splittedText){
		if(i!=0)
			remainingStrings+=splittedText[i];
	}
	
	localStorage.setItem("towiBot_"+splittedText[0].trim(),remainingStrings );
	artyom.say("Alright ! I saved that");
	output.innerHTML = "Okay, I got it";

}
function getRememberedItem(data){
	var res = localStorage.getItem("towiBot_"+data);
	if(res){
		artyom.say("You said that your "+data+" is "+res);
		output.innerHTML = res;
	}
	else{
		artyom.say("Sorry, I could not found your "+data);
		output.innerHTML = "Sorry," + data+ " is not found";		
	}

}
function isAndroid(){
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1;
	return isAndroid;
}

function lemmaInfo(data){
	
	var lemmaURl = `https://api.pearson.com/v2/dictionaries/entries?headword=${data.word}`;
	let request = new XMLHttpRequest();
	
	request.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
		let dictResponse = JSON.parse(this.responseText);
		if(data.need === "meaning")
			var meaning = dictResponse.results[0].senses[0].definition;
		else 
			var meaning = dictResponse.results[1].senses[0].definition;
		
		var dictOutput = meaning ?  "It means"+meaning : "Sorry, There is no alternate meaning for "+data.word ;
		output.innerHTML = meaning ? meaning : "Sorry, There is no alternate meaning for "+data.word;
		artyom.say(dictOutput);	 
		}
	}
	
	request.open("GET", lemmaURl, true);
	
	request.setRequestHeader("Accept", "application/json");
	
	request.send();
}

