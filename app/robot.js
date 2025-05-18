document.addEventListener("DOMContentLoaded", function () {
  const leftEye = document.getElementById("leftEye");
  const rightEye = document.getElementById("rightEye");

  startRobotBlinking();

  function startRobotBlinking() {
    const initialDelay = getRandomNumber(800, 3000);
    setTimeout(() => executeBlinkSequence(), initialDelay);
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function executeBlinkSequence() {
    const blinkType = determineBlinkType();
    switch (blinkType) {
      case "standard":
        standardBlink();
        break;
      case "double":
        doubleBlink();
        break;
      case "longPause":
        longPauseBlink();
        break;
      case "tired":
        tiredBlinkSequence();
        break;
    }
  }

  function determineBlinkType() {
    const random = Math.random();
    if (random < 0.1) return "double";
    if (random < 0.15) return "longPause";
    if (random < 0.18) return "tired";
    return "standard";
  }

  function standardBlink() {
    closeBothEyes();
    setTimeout(() => {
      openBothEyes();
      scheduleNextBlink();
    }, getRandomNumber(40, 80)); // slightly variable blink duration.
  }

  function doubleBlink() {
    closeBothEyes();
    setTimeout(() => {
      openBothEyes();
      setTimeout(() => {
        closeBothEyes();
        setTimeout(() => {
          openBothEyes();
          scheduleNextBlink();
        }, getRandomNumber(40, 80));
      }, getRandomNumber(80, 150)); // time between blinks in double-blink.
    }, getRandomNumber(40, 80));
  }

  function longPauseBlink() {
    closeBothEyes();
    setTimeout(() => {
      setTimeout(() => {
        openBothEyes();
        scheduleNextBlink();
      }, getRandomNumber(200, 500));
    }, getRandomNumber(40, 80));
  }

  function tiredBlinkSequence() {
    let blinkCount = getRandomNumber(3, 5);
    executeTiredBlinks(blinkCount);
  }

  function executeTiredBlinks(remainingBlinks) {
    if (remainingBlinks <= 0) {
      scheduleNextBlink();
      return;
    }

    closeBothEyes();
    setTimeout(() => {
      openBothEyes();
      setTimeout(() => {
        executeTiredBlinks(remainingBlinks - 1);
      }, getRandomNumber(100, 200));
    }, getRandomNumber(30, 60));
  }

  function closeBothEyes() {
    leftEye.style.transform = "scaleY(0.1)";
    rightEye.style.transform = "scaleY(0.1)";
  }

  function openBothEyes() {
    leftEye.style.transform = "scaleY(1)";
    rightEye.style.transform = "scaleY(1)";
  }

  function scheduleNextBlink() {
    const baseDelay = getRandomNumber(5000, 15000);
    const extraDelay = Math.random() < 0.2 ? getRandomNumber(2000, 5000) : 0;
    setTimeout(() => executeBlinkSequence(), baseDelay + extraDelay);
  }
});
