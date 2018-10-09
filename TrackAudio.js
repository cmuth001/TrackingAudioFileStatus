
    
    function onClickAudio(id){
        console.log("Audio: "+id);
        var audio = document.getElementById("audio_"+id);
        var timeStarted = -1;
    var timePlayed = 0;
    var duration = 0;
    // If audio metadata is laoded get duration
    if(audio.readyState > 0)
      getDuration.call(audio);
    //If metadata not loaded, use event to get it
    else
    {
      audio.addEventListener('loadedmetadata', getDuration);
    }
    // remember time user started the audio
    function audioStartedPlaying() {
      timeStarted = new Date().getTime()/1000;
    }
    function audioStoppedPlaying(event) {
      // Start time less then zero means stop event was fired vidout start event
      if(timeStarted>0) {
        var playedFor = new Date().getTime()/1000 - timeStarted;
        timeStarted = -1;
        // add the new ammount of seconds played
        timePlayed+=playedFor;
      }
      $("#played_"+id).html(Math.round(timePlayed)); 
    }
    
    function getDuration() {
      duration = audio.duration;
      $("#duration_"+id).html(new Text(Math.round(duration)+""));
      console.log("Duration: ", duration);
    }
    function onTrackedaudioFrame(event, currentTime, duration){
      var audioId = event.currentTarget.id;
      audioId = audioId.split("_")[1];
    $(".current_"+audioId).text("Current Time: "+currentTime); //Change #current to currentTime
    $(".duration_"+audioId).text("audio Length: "+ duration)
    }
    $(".activeState").bind("timeupdate", function(event){


      
      onTrackedaudioFrame(event, this.currentTime, this.duration);
    });
    
    audio.addEventListener("play", audioStartedPlaying);
    audio.addEventListener("playing", audioStartedPlaying);
    
    audio.addEventListener("ended", audioStoppedPlaying);
    audio.addEventListener("pause", audioStoppedPlaying);
  }


    
