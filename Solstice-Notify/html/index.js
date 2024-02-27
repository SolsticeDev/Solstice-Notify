/*  
 ________   ________   ___        ________   _________   ___   ________   _______                    ________   _______    ___      ___ 
|\   ____\ |\   __  \ |\  \      |\   ____\ |\___   ___\|\  \ |\   ____\ |\  ___ \                  |\   ___ \ |\  ___ \  |\  \    /  /|
\ \  \___|_\ \  \|\  \\ \  \     \ \  \___|_\|___ \  \_|\ \  \\ \  \___| \ \   __/|    ____________ \ \  \_|\ \\ \   __/| \ \  \  /  / /
 \ \_____  \\ \  \\\  \\ \  \     \ \_____  \    \ \  \  \ \  \\ \  \     \ \  \_|/__ |\____________\\ \  \ \\ \\ \  \_|/__\ \  \/  / / 
  \|____|\  \\ \  \\\  \\ \  \____ \|____|\  \    \ \  \  \ \  \\ \  \____ \ \  \_|\ \\|____________| \ \  \_\\ \\ \  \_|\ \\ \    / /  
    ____\_\  \\ \_______\\ \_______\ ____\_\  \    \ \__\  \ \__\\ \_______\\ \_______\                \ \_______\\ \_______\\ \__/ /   
   |\_________\\|_______| \|_______||\_________\    \|__|   \|__| \|_______| \|_______|                 \|_______| \|_______| \|__|/    
   \|_________|                     \|_________|                                                                                       
*/

function removeNotification(number) {
  $(`.wrapper-${number}`).removeClass("slide-down");
  $(`.wrapper-${number}`).addClass("slide-up");
  setTimeout(function () {
    $(`.wrapper-${number}`).remove();
  }, 300);
}

$(function () {
  var icons = {
    "system" : "images/system.png",
    "info" : "images/info.png",
    "success" : "images/success.png",
    "error" : "images/error.png",
    "warning" : "images/warning.png",
    "sms" : "images/sms.png",
    "ems" : "images/ems.png",
    "police" : "images/police.png",
    "mechanic" : "images/mechanic.png",
    "taxi" : "images/taxi.png",
    "bank" : "images/bank.png"
  };

  var colours = {
    "system" : "#ff9d00",
    "info" : "#3d3d3d",
    "success" : "#1ee34f",
    "error" : "#a80c0c",
    "warning" : "#eaff00",
    "sms" : "#00d0ff",
    "ems" : "#c7384d",
    "police" : "#0300a6",
    "mechanic" : "#963203",
    "taxi" : "#ad9900",
    "bank" : "#ad9900"
  };

  var sound = new Audio("notification.wav");
  sound.volume = 0.2;

  window.addEventListener("message", function (event) {
    if (event.data.action === "notification") {
      var number = Math.floor(Math.random() * 1000 + 1);

      // Limit the number of visible notifications
      while ($(".notify-wrapper .notify-div").length >= 2) {
        $(".notify-wrapper .notify-div").first().remove();
      }

      $(".notify-wrapper").append(`
      <div class="notify-div wrapper-${number}" style="border-left-color: ${colours[event.data.type]}">
        <img src="${icons[event.data.type]}" class="notify-icon" />
        <div class="notify-content">
          <div class="title-timestamp"> <!-- This div contains the title and the timestamp -->
            <h5 class="notify-title-text" style="color: ${colours[event.data.type]}">${event.data.title}</h5>
            <span class="timestamp">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <p class="notify-main-text">${event.data.message}</p>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-inner" style="background-color: ${colours[event.data.type]};"></div>
        </div>
      </div>`);
// Get the current time and format it
var now = new Date();
var timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

// Add the timestamp to the newly created notification
$(`.wrapper-${number} .notify-timestamp`).text(timeString);


      $(`.wrapper-${number}`).addClass("slide-down");
      sound.play();

      // Add progress bar animation
      setTimeout(() => {
        $(`.wrapper-${number} .progress-bar-inner`).css({
          'width': '0%',
          'transition': `width ${event.data.time}ms linear`
        });
      }, 10);

      setTimeout(function () {
        $(`.wrapper-${number}`).removeClass("slide-down");
        $(`.wrapper-${number}`).addClass("slide-up");
        setTimeout(function () {
          $(`.wrapper-${number}`).remove();
        }, 300);
      }, event.data.time);

      var ui = document.querySelector(".notify-wrapper");
      ui.style.transform = "none";
      
      switch (event.data.position) {
        case "top-left":
          ui.style.top = "3%";
          ui.style.left = "1%";
          ui.style.right = "auto";
          ui.style.bottom = "auto";
          break;
        case "top-center":
          ui.style.top = "3%";
          ui.style.left = "50%";
          ui.style.right = "auto";
          ui.style.bottom = "auto";
          ui.style.transform = "translateX(-50%)";
          break;
        case "top-right":
          ui.style.top = "3%";
          ui.style.right = "1%";
          ui.style.left = "auto";
          ui.style.bottom = "auto";
          break;
        case "middle-left":
          ui.style.top = "50%";
          ui.style.bottom = "auto";
          ui.style.left = "1%";
          ui.style.right = "auto";
          ui.style.transform = "translateY(-50%)";
          break;
        case "middle-center":
          ui.style.top = "50%";
          ui.style.bottom = "auto";
          ui.style.left = "50%";
          ui.style.right = "auto";
          ui.style.transform = "translate(-50%, -50%)";
          break;
        case "middle-right":
          ui.style.top = "50%";
          ui.style.bottom = "auto";
          ui.style.right = "1%";
          ui.style.left = "auto";
          ui.style.transform = "translateY(-50%)";
          break;
        case "bottom-left":
          ui.style.bottom = "3%";
          ui.style.top = "auto";
          ui.style.left = "1%";
          ui.style.right = "auto";
          break;
        case "bottom-center":
          ui.style.bottom = "3%";
          ui.style.top = "auto";
          ui.style.left = "50%";
          ui.style.right = "auto";
          ui.style.transform = "translateX(-50%)";
          break;
        case "bottom-right":
          ui.style.bottom = "3%";
          ui.style.top = "auto";
          ui.style.right = "1%";
          ui.style.left = "auto";
          break;
        default:
          // Handle unexpected position inputs
          console.log(`Unexpected position: ${event.data.position}`);
          break;
      }    
        }
    });
});