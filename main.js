song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreRightWrist=0;
scoreLeftWrist=0;


function preload()
{
    song=loadSound("music.mp3");
}

function setup()
{
    canvas=createCanvas(400,300);
    canvas.center();
    canvas.position(450,250);

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw()
{
    image(video,0,0,400,300);

    fill("#FF0000");
    stroke("#FF0000");
    
    if(scoreLeftWrist>0.2)
    {
        circle(leftWristX,leftWristY,50);

    InNumberleftWristY= Number(leftWristY);
    remove_decimal=floor(InNumberleftWristY);
    volume=remove_decimal/300;

    document.getElementById("volume").innerHTML="Volume = " + volume;

    song.setVolume(volume);
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded()
{
    console.log('Posenet is Initialized');
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist);
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log(" leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
        
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log(" rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}