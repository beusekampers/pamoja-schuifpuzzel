window.addEventListener("load", function() {
    let start = new Start();
    document.getElementById('startButton').onclick = function() {
        start.remove();
        new Game();
    }​;​
});