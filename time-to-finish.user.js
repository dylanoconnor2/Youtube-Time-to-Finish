// ==UserScript==
// @name         Youtube Time to Finish
// @supportURL   https://github.com/dylanoconnor2/Youtube-Time-to-Finish/issues
// @downloadURL  https://gist.githubusercontent.com/dylanoconnor2/f5ad56fb8b6a5b1c84b6a5e9edf6fe41/raw/time-to-finish.user.js
// @updateURL    https://gist.githubusercontent.com/dylanoconnor2/f5ad56fb8b6a5b1c84b6a5e9edf6fe41/raw/time-to-finish.user.js
// @license      MIT
// @version      1.2.0
// @description  Display when a Youtube video will finish!
// @author       Dylan O'Connor (https://github.com/dylanoconnor2)
// @match        https://www.youtube.com/watch?v=*
// @match        https://www.youtube.com/watch?v=*&t=*
// @grant        none
// ==/UserScript==

function addTextNode(node = new Node(), text = new String()) {
    const TextNode = document.createTextNode(text);
    node.appendChild(TextNode);
}

const CurrentTime = document.querySelector(".ytp-time-current");

const Span = document.createElement("span");
Span.setAttribute("id", "yt-end-time");

CurrentTime.parentNode.appendChild(Span);

const SpanNode = document.querySelectorAll("#yt-end-time")[0];

setInterval(() => {
    const VideoPlayer = document.querySelector(".html5-video-container > video");

    if (VideoPlayer == null) return;

    const NewTime = VideoPlayer.currentTime;
    const Duration = VideoPlayer.duration;

    const TimeDifference = Duration - NewTime;
    const CurrentDate = Date.now();

    const FutureTime = Math.ceil((CurrentDate + TimeDifference * 1000) / 1000) * 1000;

    if (SpanNode.firstChild) {
        SpanNode.removeChild(SpanNode.firstChild);
    }

    addTextNode(SpanNode, " Ends At: " + new Date(FutureTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
}, 1000);
