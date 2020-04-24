var tiles = document.querySelectorAll("#gameCenter section div");
var box = document.querySelectorAll("#gameCenter section");
var button = document.querySelectorAll(".btn");
var newGame = document.querySelector("#newGame");
var countDown = document.getElementById("gameCount");
var yourTime = document.querySelector("#yourTime");
var bestTime = document.querySelector("#bestTime");
var highScoreDisplay = document.querySelectorAll(".highScoreDisplay");
var btnclick = document.querySelector("#btnClick");
var bgm = document.querySelector("#bgm");
var gameon = false;

var emoji = [":)","<3",";)",":o",":/",":|"];
var nos = 20 ;
var mode= "Medium" ;
var arr ;
var timeIt = new stopWatch(yourTime);
var count = 1 ;
var touchColor = 255 ;
var est = 0 ;
var estoreTime = ["00:00.000"] ;
var estoredTimer = [] ; 
var eindexOfStoredTime =0;
var mst = 0 ;
var mstoreTime = ["00:00.000"] ;
var mstoredTimer = [] ; 
var mindexOfStoredTime =0;
var hst = 0 ;
var hstoreTime = ["00:00.000"] ;
var hstoredTimer = [] ; 
var hindexOfStoredTime =0 ;
var etimeInMs = ["-","-","-","-","-"] ;
var mtimeInMs = ["-","-","-","-","-"];
var htimeInMs = ["-","-","-","-","-"] ;

init();
button.forEach(function(element,index){
  gameon = true ;
  button[index].addEventListener("click",function(){
    btnclick.play();
    if(this.textContent == "Easy" ){
      button[0].classList.remove("on");
      button[1].classList.remove("on");
      button[2].classList.remove("on");
      newGame.classList.remove("on");
      button[0].classList.add("on");
      nos = 12 ; mode = "Easy";
      noAnimeSquare();
      noleaderboard();
      removeSquare();
      bestTime.textContent = "Best:" + estoreTime[eindexOfStoredTime];
      init();
    }
    else if (this.textContent == "Medium"){
      button[0].classList.remove("on");
      button[1].classList.remove("on");
      button[2].classList.remove("on");
      button[1].classList.add("on");
      newGame.classList.remove("on");
      nos = 20 ; mode = "Medium";
      noAnimeSquare();
      removeSquare();  
      noleaderboard();
      bestTime.textContent = "Best:" + mstoreTime[mindexOfStoredTime];
      init();
    }
    else {
      button[0].classList.remove("on");
      button[1].classList.remove("on");
      button[2].classList.remove("on");
      button[2].classList.add("on");
      newGame.classList.remove("on");
      nos=20 ; mode = "Hard";
       removeSquare();
       noleaderboard();
       bestTime.textContent = "Best:" + hstoreTime[hindexOfStoredTime]; 
       init();      
    }
  })
})

tiles.forEach(function(element,index){
  tiles[index].addEventListener("click",function(){
    if(this.textContent == count){
      document.getElementById("tilePush").play();
      if ( arr[nos+count-1] == undefined ){ arr[nos+count-1] = emoji[Math.floor(Math.random()*6)]; }
      this.textContent = arr[nos+count-1];
      this.style.backgroundColor = "rgb(0, 255, "+ touchColor + ")" ;
      touchColor-=6;
      count+=1;
    }
    else{document.getElementById("incorrect").play();}
    if (count==41){
    for(var i = 0 ; i <20 ; i++){
     tiles[i].style.backgroundColor = "rgb(0, 255, "+ touchColor + ")";         
     }
    touchColor = 255;  
    timeIt.stop();
    timeIt.store();
    setTimeout(finishedDisplay,1000);
    if(mode=="Hard" ){
      hstoredTimer[hst] = {} ;
      hstoredTimer[hst] = hstoreTheTime(hst);
      hst += 1 ; 
      hindexOfStoredTime = highScore(hstoredTimer);
      bestTime.textContent = "Best:" + hstoreTime[hindexOfStoredTime];
      }
      else if(mode=="Medium"){
      mstoredTimer[mst] = {} ;
      mstoredTimer[mst] = mstoreTheTime(mst);
      mst += 1 ; 
      mindexOfStoredTime = highScore(mstoredTimer);
      bestTime.textContent = "Best:" + mstoreTime[mindexOfStoredTime];} 
      else{
      estoredTimer[est] = {} ;
      estoredTimer[est] = estoreTheTime(est);
      est += 1 ; 
      eindexOfStoredTime = highScore(estoredTimer);
      bestTime.textContent = "Best:" + estoreTime[eindexOfStoredTime];
      }
  }
})
})

newGame.addEventListener("click",function(){
  btnclick.play();
  leaderboard();
  newGame.classList.add("on"); 
})

function allignSquares(){
 for(var i=0 ; i<tiles.length ;i++){
   if( i < nos ){
    tiles[i].style.display = "block";
    tiles[i].classList.remove("no-square"); 
    tiles[i].classList.add("square");}
   else {
    tiles[i].style.display = "block"; 
    tiles[i].classList.add("no-square");}
  }
 generateArray(nos);
 for ( var i = 0 ; i < nos ; i++){
  tiles[i].textContent = arr[i] ;
 }
count = 1;
}

function animeSquares(){
 box.forEach(function(element,index){
  box[index].classList.add("box");
 })
 for(var i=0 ; i<tiles.length ;i++){
   tiles[i].classList.remove("square","no-square");
   tiles[i].classList.add("animate")
   tiles[i].style.display = "inline-block";
 }
 for(var i=0 ; i<2 ;i++){
   tiles[i*10].classList.add("square1");
   tiles[i*10+1].classList.add("square2");
   tiles[i*10+2].classList.add("square3");
   tiles[i*10+3].classList.add("square4");
   tiles[i*10+4].classList.add("square5");
   tiles[i*10+5].classList.add("square6");
   tiles[i*10+6].classList.add("square7");
   tiles[i*10+7].classList.add("square8");
   tiles[i*10+8].classList.add("square9");
   tiles[i*10+9].classList.add("square10");
 }
 generateArray(nos);
 for ( var i = 0 ; i < nos ; i++){
  tiles[i].textContent = arr[i] ;
 }
count = 1;
}

function noAnimeSquare(){
  box.forEach(function(element,index){
    box[index].classList.remove("box");
   })
   for(var i=0 ; i<tiles.length ;i++){
     tiles[i].classList.remove("animate");
   }
   for(var i=0 ; i<2 ;i++){
     tiles[i*10].classList.remove("square1");
     tiles[i*10+1].classList.remove("square2");
     tiles[i*10+2].classList.remove("square3");
     tiles[i*10+3].classList.remove("square4");
     tiles[i*10+4].classList.remove("square5");
     tiles[i*10+5].classList.remove("square6");
     tiles[i*10+6].classList.remove("square7");
     tiles[i*10+7].classList.remove("square8");
     tiles[i*10+8].classList.remove("square9");
     tiles[i*10+9].classList.remove("square10");
   }
}

tiles.forEach(function(element,index){tiles[index].style.display = "none";})
 
function init(){ 
  timeIt.reset();
  yourTime.textContent = "Time:00:00.000";
  countDown.style.display = "block";
  if (gameon==false){  countDown.textContent = "Count from 1 to 40 by pressing the right tiles as fast as possible.Start the game by selecting the difficulty mode. Happy counting:)" ; }
  if (gameon){
    bgm.play();
  countDown.textContent = "START";
  tiles.forEach(function(element,index){
    tiles[index].style.backgroundColor = "white";
  })
  countDown.addEventListener("click",function(){  
  timeIt.reset();yourTime.textContent= "Time:00:00.000"; bgm.pause();
  document.querySelector("#countDown").play();
  setTimeout(function(){  noleaderboard();newGame.classList.remove("on"); countDown.textContent = "3";  },1000);
  setTimeout(function(){ countDown.textContent = "2";  },2000);
  setTimeout(function(){ countDown.textContent = "1";  },3000);
  setTimeout(function(){ countDown.style.display="none"; 
  timeIt.start();
  if(mode=="Hard"){animeSquares();}
  else {allignSquares()} },4000);
  })
}
}

function removeSquare(){
  tiles.forEach(function(element,index){ tiles[index].classList.remove("square")
 tiles[index].style.display = "none";
})
}

function generateArray(nos){
   var i=0;
   arr = [] ;
   while(i<nos){   
    var flag = 0 ;
    var num = generateNumber(nos);
    arr.forEach(function(element) {
    if (num===element){
     flag = 1 ;
     }
    });
     if(flag===0) { arr.push(num); i++;}
   }
   while(i<40){
   arr.push(i+1);
   i++;
   }
}
 
function generateNumber(nos){
   var random = Math.floor(Math.random()*nos) +1 ;
   return random;
}

function stopWatch(elem){
    var time = 0 ;
    var interval ;
    var offset ;
    var timeformattedd ;

    function update(){
    time += delta();
    var timeformatted = timeformatter(time);
    timeformattedd = timeformatted ;
    elem.textContent = "Time:"+timeformatted ;

  }
  
    function delta(){
     var now = Date.now() ;
     var timePassed = now - offset ;
     offset = now ;
     return  timePassed ;
    } 
    function timeformatter(timeInMilliseconds){
     var time = new Date(0,0,0,0,0,0,timeInMilliseconds);   
     var minutes = time.getMinutes().toString();
     var seconds = time.getSeconds().toString() ;
     var milliseconds = time.getMilliseconds().toString() ;
     if(minutes.length<2){
      minutes = "0" + minutes;
     }
     if(seconds.length<2){
      seconds = "0" + seconds;
     }
     while(milliseconds.length<3){
      milliseconds = "0" + milliseconds;
     }
    return  minutes + ":" + seconds + "." + milliseconds;
    } 
    this.isOn = false;
    this.start = function(){
     if (!this.isOn){
      interval = setInterval(update, 10);
      offset = Date.now() ;
      this.isOn = true ;
     }
    }
    this.stop = function(){
     if (this.isOn){
      this.isOn = false ;
      clearInterval(interval);
     }
    }
    this.reset = function(){
     this.stop();
     time = 0 ;
     inteval = null ; 
    }
    this.store = function(){
       
      if(mode=="Hard"){hstoreTime[hst]=timeformattedd;
        htimeInMs[hst]=time;}
      else if(mode=="Medium"){mstoreTime[mst]=timeformattedd;
        mtimeInMs[mst]=time;}
      else {estoreTime[est]=timeformattedd;
        etimeInMs[est]=time;}
    }
}
function estoreTheTime(index){
    estoredTimer[index].minutes = Number(estoreTime[index][0]+estoreTime[index][1]);
    estoredTimer[index].seconds = Number(estoreTime[index][3]+estoreTime[index][4]);
    estoredTimer[index].milliseconds = Number(estoreTime[index][6]+estoreTime[index][7]+estoreTime[index][8]);
    return estoredTimer[index];
}
function mstoreTheTime(index){
    mstoredTimer[index].minutes = Number(mstoreTime[index][0]+mstoreTime[index][1]);
    mstoredTimer[index].seconds = Number(mstoreTime[index][3]+mstoreTime[index][4]);
    mstoredTimer[index].milliseconds = Number(mstoreTime[index][6]+mstoreTime[index][7]+mstoreTime[index][8]);
    return mstoredTimer[index];
} 
function hstoreTheTime(index){
    hstoredTimer[index].minutes = Number(hstoreTime[index][0]+hstoreTime[index][1]);
    hstoredTimer[index].seconds = Number(hstoreTime[index][3]+hstoreTime[index][4]);
    hstoredTimer[index].milliseconds = Number(hstoreTime[index][6]+hstoreTime[index][7]+hstoreTime[index][8]);
    return hstoredTimer[index];
}

function highScore(array){
    var index=0 ; 
    var smallm = array[0]["minutes"];
    var smalls = array[0]["seconds"];
    var smallms = array[0]["milliseconds"];
     
    for ( var i=0 ; i < array.length ; i++){
      if(smallm > array[i]["minutes"]){
        smallm = array[i]["minutes"];
        smalls = array[i]["seconds"];
        smallms = array[i]["milliseconds"];
        index = i ;
      }
      if ( smallm == array[i]["minutes"] && smalls > array[i]["seconds"]){
       smallm = array[i]["minutes"];
       smalls = array[i]["seconds"];
       smallms = array[i]["milliseconds"]; 
       index = i ;
      }
      if ( smallm == array[i]["minutes"] && smalls == array[i]["seconds"] && smallms > array[i]["milliseconds"]){
       smallm = array[i]["minutes"];
       smalls = array[i]["seconds"];
       smallms = array[i]["milliseconds"]; 
       index = i ;
      }
   }
   return index ;
}

function finishedDisplay(){
    for (var i=0;i<20;i++){
      tiles[i].style.backgroundColor = "white" ;    
      tiles[i].classList.add("no-square");
    }
    countDown.classList.remove("no-square");
    countDown.style.display = "block";
    bgm.play();
       if(mode=="Hard"){gameCount.textContent = "Your Time:"+ hstoreTime[hst-1] + " Restart";}
       else if(mode=="Medium"){gameCount.textContent = "Your Time:"+ mstoreTime[mst-1] + "Restart";}
       else{gameCount.textContent = "Your Time: "+ estoreTime[est-1] + " :) " + " Restart";}
}

function sortit(){
     if (mode=="Hard"){htimeInMs.sort(function(a,b){return a-b})}
     else if(mode=="Medium"){mtimeInMs.sort(function(a,b){return a-b})}
     else{etimeInMs.sort(function(a,b){return a-b})}
}
 
function leaderboard(){
    sortit();
    for(var i=0;i<5;i++){
      highScoreDisplay[i].style.display = "block";
        if (mode=="Hard"){
          
          
          var time = new Date(0,0,0,0,0,0,htimeInMs[i]);   
          var minutes = time.getMinutes().toString();
          var seconds = time.getSeconds().toString() ;
          var milliseconds = time.getMilliseconds().toString() ;
          if(minutes.length<2){
           minutes = "0" + minutes;
          }
          if(seconds.length<2){
           seconds = "0" + seconds;
          }
          while(milliseconds.length<3){
           milliseconds = "0" + milliseconds;
          }
          var x = minutes + ":" + seconds + "." + milliseconds ;
        highScoreDisplay[i].textContent = i+1+ ". " + x; 
       
      }


      else if(mode=="Medium"){
        
        var time = new Date(0,0,0,0,0,0,mtimeInMs[i]);   
        var minutes = time.getMinutes().toString();
        var seconds = time.getSeconds().toString() ;
        var milliseconds = time.getMilliseconds().toString() ;
        if(minutes.length<2){
         minutes = "0" + minutes;
        }
        if(seconds.length<2){
         seconds = "0" + seconds;
        }
        while(milliseconds.length<3){
         milliseconds = "0" + milliseconds;
        }
        var y = minutes + ":" + seconds + "." + milliseconds ;
        highScoreDisplay[i].textContent = i+1 + ". " + y;}
      else{        
        
        var time = new Date(0,0,0,0,0,0,etimeInMs[i]);   
        var minutes = time.getMinutes().toString();
        var seconds = time.getSeconds().toString() ;
        var milliseconds = time.getMilliseconds().toString() ;
        if(minutes.length<2){
         minutes = "0" + minutes;
        }
        if(seconds.length<2){
         seconds = "0" + seconds;
        }
        while(milliseconds.length<3){
         milliseconds = "0" + milliseconds;
        }
        var z = minutes + ":" + seconds + "." + milliseconds ;
        highScoreDisplay[i].textContent = i+1 + ". " + z;
      }
    }
}

function noleaderboard(){
    highScoreDisplay.forEach(function(element,index){
      highScoreDisplay[index].style.display = "none";
    })
}