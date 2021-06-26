

/* video controls */

    
function choose(chat) {
	ptime=20;
	if (chat.includes("Ciao") || chat.includes("ciao")){
    stime=0;
    ptime=2;
    media.currentTime=0;
    media.play();
   }  
   else if (chat.includes("hi sei") || chat.includes("hi sei")){
    stime=2;
    ptime=3;
    media.currentTime=2;
    media.play();
   }
   else if (chat.includes("cerca") || chat.includes("mostra")){
    stime = 6;
    ptime = 4;  
    media.currentTime=7;
    media.play();
    }
        
    else {
    stime = 10;
    ptime = 20;   
    media.currentTime=11;
    media.play();
    }   
  
}


function talk(){

if(media.currentTime >= stime + ptime) 
        media.pause();

}


function clear(){

 media.removeEventListener("timeupdate", altrimenti);
 media.removeEventListener("timeupdate", chisei);
 media.removeEventListener("timerupdate", ciao);
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function ciao(){

 if(media.currentTime >= 0 + ptime) 
        media.pause();
        
}

function chisei(){
if(media.currentTime >= 2 + ptime) 
        media.pause();
}

function altrimenti(){
  if(media.currentTime >= 7 + ptime) 
        media.pause();
     
}

function playGreen()
{
    media.currentTime=3;
    media.play();
    media.addEventListener("timeupdate", function(){
    if(this.currentTime >= 3 + ptime) {
        this.pause();
    }
});

}

  
