var Score = 0;
var cross = true;

var audio = new Audio('gameAudio.mp3');

audio.addEventListener('canplaythrough', function() {
    audio.play().catch(function(error) {
        console.error('Audio playback failed:', error);
    });
});

setTimeout(() => {
    audio.play().catch(function(error) {
        console.error('Audio playback failed:', error);
    });
}, 1000);

document.onkeydown = function (e) {
    console.log("key code is ", e.keyCode);

    var thief = document.querySelector('.thief');
    var thiefX = parseInt(window.getComputedStyle(thief, null).getPropertyValue('left'));

    if (e.keyCode == 38 || e.keyCode == 32) {
        thief.classList.add('animatethief');

        setTimeout(() => {
            thief.classList.remove('animatethief');
        }, 700);
    } else if (e.keyCode == 39) {
        thiefX += 112;
        thief.style.left = thiefX + "px";
    } else if (e.keyCode == 37) {
        thiefX -= 112;
        thief.style.left = thiefX + "px";
    }

    var gameover = document.querySelector('.gameOver');
    var obstacle = document.querySelector('.police');

    var dx = window.getComputedStyle(thief, null).getPropertyValue('left');
    var dy = window.getComputedStyle(thief, null).getPropertyValue('top');

    var ox = window.getComputedStyle(obstacle, null).getPropertyValue('left');
    var oy = window.getComputedStyle(obstacle, null).getPropertyValue('top');

    var offsetX = Math.abs(parseFloat(dx) - parseFloat(ox));
    var offsetY = Math.abs(parseFloat(dy) - parseFloat(oy));

    if (offsetX < 73 && offsetY < 52) {
        gameover.innerHTML = "Game Over - Reload To Start";
        gameover.style.visibility = 'visible';
        obstacle.classList.remove('policeAni');
    } else if (offsetX < 145 && cross) {
        Score += 1;
        updateScore(Score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            cross = true;
        }, 1000);
        aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
        newDur = aniDur - 0.1;
        police.style.animationDuration = newDur + 's';
    }
};

function updateScore(score) {
    var scoreCount = document.getElementById('scoreCount');
    scoreCount.innerHTML = "Your Score: " + score * 100;
}
