let btns = document.querySelectorAll(".tooltip-use");
for (const item of btns) {
    new bootstrap.Tooltip(item);
}