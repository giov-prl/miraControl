window.document.body.insertAdjacentHTML( 'afterbegin', '<div id="conversejs" style="display:block;box-sizing: border-box;z-index:1031;bottom:5px;margin:0;right:10px;left:0;height:3em;position:fixed;padding-left: env(safe-area-inset-left);padding-right:env(safe-area-inset-right);"><div style="z-index: 1031;position: fixed;top: 10em;right: 260px;display: flex;flex-wrap: wrap;"><div  class="flyout box-flyout" style="width:250px;display: flex;flex-direction: column; justify-content: space-between;box-shadow: 1px 3px 5px 3px rgb(0 0 0 / 40%);z-index: 2;overflow: hidden; border-radius: 0;position:absolute;flex-direction: column;"><div class="player"><video class="vid" preload="none" poster="videoprev.png"><source src="video.mp4" type="video/mp4"><source src="video.mp4" type="video/webm"></video></div></div></div></div>' );
//window.document.body.insertAdjacentHTML( 'afterbegin', '<div style="position:absolute;z-index:1040;bottom:10px;width:100%;color:white" ><marquee id="scrolling_text" behavior="scroll" direction="left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget sem non lacus condimentum dictum quis id tortor.</marquee></div>' );
//window.document.body.insertAdjacentHTML('afterbegin0', '<p>Text Fits</p><div class="marquee"><div class="text">Text Here</div></div><p>Text overflows</p><div class="marquee"><div class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget sem non lacus condimentum dictum quis id tortor.</div></div>')

//css animation instead of marquee element
window.document.body.insertAdjacentHTML('afterbegin', '<body> <style> @keyframes slide {from { left:100%; transform: translate(0, 0); }to { left: -100%; transform: translate(-100%, 0); }}@-webkit-keyframes slide {from { left:100%; transform: translate(0, 0); }to { left: -100%; transform: translate(-100%, 0); }} #text {position:absolute;top:0;white-space: nowrap;height:70px;font-size:22px;animation-name: slide;animation-duration: 30s;animation-fill-mode: forwards;animation-timing-function: linear;-webkit-animation-name: slide;-webkit-animation-duration: 30s;-webkit-animation-timing-function:linear;}</style> <div class="marquee" style="position:absolute;z-index:1040;bottom:28px;width:20%;color:white"><div id="text"></div></div> </body>');

	//event listener for partial reproduction
	var media = document.querySelector("video");
	let ptime = 0;
    media.addEventListener("timeupdate", talk); 
    let stime = 0;
	function talk(){
	if(media.currentTime >= stime + ptime) 
	media.pause();
}
	//indexes in json
	var actionTranslation;
	var precedentCanvas;
	var currentCanvas = 0;
	var i =0;
	var n= json.canvas[currentCanvas].videos.length;
	//action to be programmatically changed
    var action1;

	//sliding text with css
	var text = document.getElementById("text");
	text.style.animationPlayState = "paused";

	//change animation duration only once media is loaded, no update otherwise due to async method load
	media.addEventListener('loadeddata', function() {
		//animation duration = video duration + 20%

		if (json.canvas[currentCanvas].videos[i].video.duration === -1)
		text.style.animationDuration =(media.duration + media.duration * 0.2).toString() + "s";
		else text.style.animationDuration =((ptime - stime) * 0.2).toString() + "s";

	 }, false);

	//when t is pressed go forward
	//document.onkeydown = function(e)
	function prepare()
	{
    	//e = e || window.event;
    	//var key = e.which || e.keyCode;
		////vai avanti
    	//if(key===84)
		//{
			//if (i < n)
			//{	
			if (precedentCanvas != currentCanvas && json.canvas[currentCanvas].name != "no_canvas")
			eval("miradorInstance.store.dispatch(Mirador.actions.setCanvas('main_window', 'http://localhost/capua/mostra/index.json/canvas/" + currentCanvas.toString() + "'))");
			else alert(json.canvas[currentCanvas].videos[i].action.type);
			switch (json.canvas[currentCanvas].videos[i].action.type)
			
				{	
					case "SELECT_ANNOTATION" :
					actionTranslation="selectAnnotation";
					console.log("annotation");
					action1 = eval("Mirador.actions. " + actionTranslation + "('" +json.canvas[currentCanvas].videos[i].action.parameters.window_id + "', '" + json.canvas[currentCanvas].videos[i].action.parameters.argument + "')");
					setTimeout(go, 500);
					break;

					case "ZOOM_WINDOW" : 
					actionTranslation="updateViewport";
					console.log("upview");
					action1 = eval("Mirador.actions. " + actionTranslation + "('" +json.canvas[currentCanvas].videos[i].action.parameters.window_id + "'," + json.canvas[currentCanvas].videos[i].action.parameters.argument + ")");
					setTimeout(go, 500);
					break;

					case "CHANGE_CANVAS" : 
					actionTranslation="setCanvas";
					console.log("change canvas");
					action1 = eval("Mirador.actions. " + actionTranslation + "('" +json.canvas[currentCanvas].videos[i].action.parameters.window_id + "','" + json.canvas[currentCanvas].videos[i].action.parameters.argument + "')");
					setTimeout(go, 500);
					break;

					case "CHANGE_MANIFEST" : 
					actionTranslation="addResource";
					console.log("add manifest");
					action1 = eval("Mirador.actions. " + actionTranslation + "(" + json.canvas[currentCanvas].videos[i].action.parameters.argument + "')");
					setTimeout(go, 500);
					break;

					//no action
					case "NO_ACTION" : 
					actionTranslation="";
					console.log("no action");
					setTimeout(go, 500);
					break;

					default :
					alert("ERROR: syntax error(s) or action not supported");
					break;


				//}
				//console.log("Mirador.actions. " + json.videos[i].action.type + "('" +json.videos[i].action.parameters.window_id + "'," + json.videos[i].action.parameters.argument + ")");
				//action1 = eval("Mirador.actions. " + json.videos[i].action.type + "('" +json.videos[i].action.parameters.window_id + "'," + json.videos[i].action.parameters.argument + ")");
				//Mirador.selectAnnotation('main_window', 'http://localhost/annotations/1');
				//media.src = json.videos[i++].video;
				//forward();
			}
					//next canvas
				/*	else {
					currentCanvas++;
					eval("miradorInstance.store.dispatch(Mirador.actions.setCanvas('main_window', 'http://localhost/capua/mostra/index.json/canvas/" + currentCanvas.toString() + "'))");
					i = 0;
					
					n= json.canvas[currentCanvas].videos.length;
				}*/

		//}
		/*else 
				{	console.log("ann");
					miradorInstance.store.dispatch(Mirador.actions.selectAnnotation('main_window', 'http://localhost/annotations/1'));

			} */


		

	
	}

	function go()
	{	
		// reflow to reset animation for each action
		text.style.animation = 'none';
		text.offsetHeight; /* trigger reflow */
		text.style.animation = null; 

		media.src = json.canvas[currentCanvas].videos[i].video.uri;
		media.load(); //async
		 
		stime = json.canvas[currentCanvas].videos[i].video.start_time;
		//play whole video
		if (json.canvas[currentCanvas].videos[i].video.duration === -1)
			ptime = media.duration;
		else ptime = stime + json.canvas[currentCanvas].videos[i].video.duration;
		//if no action do not dispatch
		if (!actionTranslation == "")
		{	
			miradorInstance.store.dispatch(action1);
			//alert("dispatch");
		}
		
		text.textContent=json.canvas[currentCanvas].videos[i].text;
		//i++;
		media.play();
		text.style.animationPlayState = "running";
		
		
	}

	function searchPredict(pred){
		if (json.canvas[currentCanvas].name != "no_canvas")
		precedentCanvas = currentCanvas;

		currentCanvas = 0;
		
		while (true){
			for (i = 0; i< json.canvas[currentCanvas].videos.length; i++)
				if (json.canvas[currentCanvas].videos[i].intent == pred)
				{	alert("found");
				//alert(currentCanvas);
				//alert(precedentCanvas);
					prepare();
					return;
				}
				currentCanvas++;
		}
		
		



	}
