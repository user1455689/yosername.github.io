document.addEventListener("mousemove", (e) => {
    const cursorText = document.querySelector(".follow-cursor");
    const x = e.clientX;
    const y = e.clientY;

    cursorText.style.left = x + "px";
    cursorText.style.top = y + "px";
});
