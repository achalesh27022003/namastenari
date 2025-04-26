import kaplay from "kaplay";

const k = kaplay({
    width: 1920,
    height: 1080,
    letterbox: true,
    background: "#000000",
    global: false,
    touchToMouse: true,
    buttons:{
        jump: {
            keyboard: ["space"],
            mouse: ["left"],
            touch: ["tap"],
        }
    },
    debugKey: "q",
    debug: true,
});

export default k;