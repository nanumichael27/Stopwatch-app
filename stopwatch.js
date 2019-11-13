$(function(){
    //Variables
        var mode = 0;//App mode
        var timeCounter = 0;//time counter
        var lapCounter = 0;//lap counter
        var action;//variable for setInterval
        var lapNumber =0;//Number of laps
        //minutes,seconds,centiseconds for time and lap
        var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;
    //On App load show start and lap buttons
    hideshowButtons("#startButton", "#lapButton")
    //Click on startButton
      $("#startButton").click(function(){
          mode = 1;  //mode on
hideshowButtons("#stopButton","#lapButton");//show stop and lap buttons
        
        startAction();//start counter
      });
    //click on stopButton
       $("#stopButton").click(function(){
    hideshowButtons("#resumeButton","#resetButton");//show resume and reset buttons
        //Stop counter
           clearInterval(action);
       });
    
    //click on resumeButton
     $("#resumeButton").click(function(){
           hideshowButtons("#stopButton","#lapButton");  //show stop and lap button
        //start action
         startAction();
     });
        
    //Click on resetButton
        $("#resetButton").click(function(){
            //reload the page
            location.reload();
        });
    
    //click on lap button
     $("#lapButton").click(function(){
            //if mode is ON
         if(mode){
            //stop action
             clearInterval(action);
            //resetLap and print previous lap details
             lapCounter=0;
             addLap();
            //start action
             startAction();
         }
     });
    
    //functions
    
    //hide others and show selected buttons
    function hideshowButtons(x,y){
        $(".control").hide();
        $(x).show();
        $(y).show();
    }
    
    //Start the counter
    function startAction(){
        action = setInterval(function(){ 
        timeCounter++;
            if(timeCounter == 100*60*100){
                timeCounter = 0;
            }
        lapCounter++;
             if(lapCounter == 100*60*100){
                lapCounter = 0;
            }
        updateTime();
        },10);
    }
  
  //Update Time: converts counters to min, sec,centiseconds..
  function updateTime(){
    //1min = 60*100centisec=6000centiseconds
      timeMinutes= Math.floor(timeCounter/6000);
    //1sec = 100 centi
      timeSeconds= Math.floor((timeCounter%6000)/100);
    //Time in cetiseconds
      timeCentiseconds= (timeCounter%6000)%100;

      $("#timeminute").text(format(timeMinutes));
      $("#timesecond").text(format(timeSeconds));
      $("#timecentisecond").text(format(timeCentiseconds));
      
            
      //1min = 60*100centisec=6000centiseconds
      lapMinutes= Math.floor(lapCounter/6000);
    //1sec = 100 centi
      lapSeconds= Math.floor((lapCounter%6000)/100);
    //Time in cetiseconds
      lapCentiseconds= (lapCounter%6000)%100;
      
      $("#lapminute").text(format(lapMinutes));
      $("#lapsecond").text(format(lapSeconds));
      $("#lapcentisecond").text(format(lapCentiseconds));
  
}
    
    function format(number){
        if(number<10){
            return "0"+number;
        }else{
            return number;
        }
    }
    
    //Add a lap: will print the lap details inside the lap box
    function addLap(){
          lapNumber++;
           var myLapDetails =
               '<div class="lap">'+
                    '<div class="laptimetitle">'+
                        'Lap'+ lapNumber +
                    '</div>'+
                    '<div class="laptime">'+
                        '<span>'+ format(lapMinutes) +'</span>'+
                        ':<span>'+ format(lapSeconds) +'</span>'+
                        ':<span>'+ format(lapCentiseconds) +'</span>'+
                    '</div>'+
               '</div>';
        $(myLapDetails).prependTo("#laps");
        
    }
});