// ==UserScript==
// @name Sprint board intensifies
// @namespace https://tusksoft.com
// @version 0.3
// @description draws attention to items that are approaching or going over original estimate
// @author Joel Marshall
// @match *://*.atlassian.net/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @run-at document-end
// ==/UserScript==


'use strict';

$(`<style type='text/css'>
.oh-dang {
  animation: shake 0.7s;
  animation-iteration-count: infinite;
  background-color:red;
}

@keyframes shake {
 0% { transform: translate(.5px, .5px); }
  10% { transform: translate(-.5px, -1px); }
  20% { transform: translate(-1.5px, 0px); }
  30% { transform: translate(1.5px, 1px); }
  40% { transform: translate(.5px, -.5px); }
  50% { transform: translate(-.5px, 1px); }
  60% { transform: translate(-1.5px, .5px); }
  70% { transform: translate(1.5px, .5px); }
  80% { transform: translate(-.5px, -.5px); }
  90% { transform: translate(.5px, 1px); }
  100% { transform: translate(.5px, -1px); }
}


.oh-shit {
  animation: rattle 0.2s;
  animation-iteration-count: infinite;
  background-color:red;
}

@keyframes rattle {
 0% { transform: translate(.5px, .5px) rotate(0deg); }
  10% { transform: translate(-.5px, -1px) rotate(-1deg); }
  20% { transform: translate(-1.5px, 0px) rotate(1deg); }
  30% { transform: translate(1.5px, 1px) rotate(0deg); }
  40% { transform: translate(.5px, -.5px) rotate(1deg); }
  50% { transform: translate(-.5px, 1px) rotate(-1deg); }
  60% { transform: translate(-1.5px, .5px) rotate(0deg); }
  70% { transform: translate(1.5px, .5px) rotate(-1deg); }
  80% { transform: translate(-.5px, -.5px) rotate(1deg); }
  90% { transform: translate(.5px, 1px) rotate(0deg); }
  100% { transform: translate(.5px, -1px) rotate(-1deg); }
}
</style>`).appendTo("head");


setInterval(function () {
    let issues = $(".ghx-issue");

    if (issues.length < 1) {
        console.log("nothing loaded yet");
        return;
    }

    issues.each(function () {
        let originalEstimate = Number.parseFloat($(this).find(".ghx-estimate").text());
        let actualTime = Number.parseFloat($(this).find(".ghx-extra-field-content").text());

        if (actualTime > originalEstimate) {

            if ($(this).hasClass("oh-shit") === false) {
                setTimeout(() => { $(this).addClass("oh-shit"); $(this).removeClass("oh-dang"); }, Math.floor(Math.random() * 200));
            }
        }
        else if (actualTime > (originalEstimate * .8)) {
            if ($(this).hasClass("oh-dang") === false) {
                setTimeout(() => { $(this).addClass("oh-dang"); $(this).removeClass("oh-shit"); }, Math.floor(Math.random() * 200));
}
        }
        else {
            $(this).removeClass("oh-dang");
            $(this).removeClass("oh-shit");
    }
    });
}, 1000);
