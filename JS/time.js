(function pageLoad() {
    const before = Date.now()
    window.addEventListener('load', (event) => {
        var after = Date.now()
        pgloadtime = (after - before) / 1000;
        document.getElementById("loadtime").innerHTML = "Page load time is " + pgloadtime + "seconds";
    })
})();