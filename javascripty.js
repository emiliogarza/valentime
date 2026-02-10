// Text Animation


// SVG HEART ANIMATION USING d3 and GSAP
var paper = d3.select("#canvas");
var wsvg = $("#canvas").width();
var hsvg = $("#canvas").height();

var d =Math.ceil((Math.floor(Math.random() * 700) + 100)/10)*10;
var count = 0;

function rNumTime(){
  d = Math.ceil((Math.floor(Math.random() * 600) + 100)/10)*10;
}

setInterval(function(){
  count++;
  var x = Math.floor(Math.random() * (wsvg-100)) + 50;
  var y = Math.floor(Math.random() * (hsvg-100)) + 50;
  var b = paper.append("use").attr("xlink:href", "#heart").attr("id", "h"+count).attr("transform", "translate("+x+", "+y+")");
  setTimeLine();
  rNumTime();
}, d);

function setTimeLine(){
  var s = (Math.random() * (0.7 - 0.2) + 0.5).toFixed(1);
  var heart = $("#h"+count);
  
  var tl = new TimelineMax({repeat:1, yoyo:true});
  
  tl.from(heart, 0.7, {scale: 0, transformOrigin:"50% 50%"})
    .to(heart, 0.7, {scale: s, transformOrigin:"50% 50%"})
    .to(heart, 0.3, {scale: 1, transformOrigin:"50% 50%", opacity: 0});
  // Tried an onComplete here but it wasn't working properly, this was just the easier know-how
  setTimeout(function(){
    remove(heart);
  }, 1700);
}

function remove(h){
  h.remove();
}

$(window).on("resize", function(){
  wsvg = $("#canvas").width();
  hsvg = $("#canvas").height();
});

// Yes button click handler
$("#yes-btn").on("click", function(){
  $("#modal").addClass("show");
});

// Click anywhere on modal to close it
$("#modal").on("click", function(){
  $(this).removeClass("show");
});

// Make the "No" button run away from the mouse
var noButton = $(".btn:contains('No')");
var isRunningAway = false;
var returnTimer;
var hasMoved = false;

$(document).on("mousemove", function(e){
  if (isRunningAway) return;
  
  var buttonOffset = noButton.offset();
  var buttonWidth = noButton.outerWidth();
  var buttonHeight = noButton.outerHeight();
  var buttonCenterX = buttonOffset.left + buttonWidth / 2;
  var buttonCenterY = buttonOffset.top + buttonHeight / 2;
  
  var mouseX = e.pageX;
  var mouseY = e.pageY;
  
  var distance = Math.sqrt(Math.pow(mouseX - buttonCenterX, 2) + Math.pow(mouseY - buttonCenterY, 2));
  
  // If mouse is within 100px of button, make it run away
  if (distance < 100) {
    isRunningAway = true;
    hasMoved = true;
    
    // Clear any existing return timer
    clearTimeout(returnTimer);
    
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    
    var newX = Math.random() * (windowWidth - buttonWidth - 100) + 50;
    var newY = Math.random() * (windowHeight - buttonHeight - 100) + 50;
    
    noButton.css({
      position: 'fixed',
      left: newX + 'px',
      top: newY + 'px',
      transition: 'all 0.3s ease'
    });
    
    setTimeout(function(){
      isRunningAway = false;
    }, 300);
    
    // Set timer to return button after 3 seconds of no interaction
    returnTimer = setTimeout(function(){
      noButton.css({
        position: 'static',
        left: '',
        top: '',
        transition: 'all 0.5s ease'
      });
      hasMoved = false;
    }, 3000);
  } else if (hasMoved) {
    // If mouse is far away and button has moved, restart the return timer
    clearTimeout(returnTimer);
    returnTimer = setTimeout(function(){
      noButton.css({
        position: 'static',
        left: '',
        top: '',
        transition: 'all 0.5s ease'
      });
      hasMoved = false;
    }, 3000);
  }
});