function HMStoSeconds(HMS = new String()) {
    const Array = HMS.split(":");

    if (Array.length == 3) return +Array[0] * 60 * 60 + +Array[1] * 60 + +Array[2];
    if (Array.length == 2) return +Array[0] * 60 + +Array[1];
    if (Array.length == 1) return +Array[0];
    return null;
}

function addTextNode(node = new Node(), text = new String()) {
    const TextNode = document.createTextNode(text);
    node.appendChild(TextNode);
}

const CurrentTime = document.querySelector(".ytp-time-current");

const Span = document.createElement("span");
Span.setAttribute("id", "yt-end-time");
CurrentTime.parentNode.appendChild(Span);

const SpanNode = document.querySelectorAll("#yt-end-time")[0];
addTextNode(SpanNode, " Ends At: ");

const Observer = new MutationObserver(function (mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type == "childList" && mutation.addedNodes.length == 1) {
            const NewTime = mutation.addedNodes[0].data;
            const DurationTime = document.querySelector(".ytp-time-duration").innerText;

            const TimeDifference = HMStoSeconds(DurationTime) - HMStoSeconds(NewTime);
            const CurrentDate = Date.now();

            const FutureTime = Math.ceil((CurrentDate + TimeDifference * 1000) / 1000) * 1000;

            SpanNode.removeChild(SpanNode.firstChild);
            addTextNode(SpanNode, " Ends At: " + new Date(FutureTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
        }
    }
});

Observer.observe(CurrentTime, {
    childList: true,
});
