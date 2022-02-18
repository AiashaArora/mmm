status="";
objects=[];


function setup() {
    canvas=createCanvas(300,300);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(300,300);
    video.hide();
    
}



function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    object_name=document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log("Model Loaded!")
status=true;
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function draw()
{
    image(video,0,0,300,300);
    if(status !="")
    {
        objectDetector.detect(video,gotResult);
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML="Status ; Object detected";
            fill('#74acd6');
            percent=floor(objects[i].confidence*100);
            text(objects[i].label +" "+ percent + "%",objects[i].x +15, objects[i].y +15);
            noFill();
            stroke('#fed6ff');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                     
          if(objects[i].label == object_name)
          {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_status").innerHTML = object_name + " Found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_name + "Found");
            synth.speak(utterThis);
          }
          else
          {
            document.getElementById("object_status").innerHTML = object_name + " Not Found";
          }          
         }
      }
}