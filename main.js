video = "";
status = "";
objects = [];

function setup() {
    canvas = createCanvas(640,480);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw() {
    image(video, 0, 0, 640, 480);

    if (status != "") {
        objectDetector.detect(video, gotResult);
        stop("Alarm.mp3");
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("no_of_objects").innerHTML = "No. of objects detected = " + objects.length;
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
        }
    }

    else {
        play("Alarm.mp3");
        document.getElementById("no_of_objects").innerHTML = "No Objects Found!"
    }
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.error();
    } else {
        console.log(results);
        objects = results;
    }
}