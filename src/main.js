import k from "./kaplayContx.js";
import mainMenu from "./scenes/mainMenu.js";
import game from "./scenes/game.js";
import gameover from "./scenes/gameover.js"
import disclaimer from "./scenes/disclaimer.js";

// Importing assets
k.loadSprite("chemical-bg", "graphics/chemical-bg.png");
k.loadSprite("bg2", "graphics/bg2.png");
k.loadSprite("bg3", "graphics/bg3.png");
k.loadSprite("platforms", "graphics/platforms.png");
// k.loadSprite("bgdisc", "graphics/bgdisc.gif");
// k.loadSprite("bgdisc", "graphics/bgdisc.mp4");
k.loadSprite("bgdisc", "graphics/bgdisc.png");
k.loadSprite("sonic", "graphics/sonic.png", {
    sliceX: 8,
    sliceY: 2, // 8 frames in X, 2 frames in Y
    anims: {
        run: { from: 0, to: 7 , loop: true, speed: 30 },
        jump: { from: 8, to: 15, loop: true, speed: 100 },
    },
});
k.loadSprite("girls", "graphics/Girls.png", {
    sliceX: 8,
    sliceY: 2, // 8 frames in X, 2 frames in Y
    anims: {
        run: { from: 1, to: 7 , loop: true, speed: 30 },
        jump: { from: 8, to: 15, loop: true, speed: 100 },
    },
});
k.loadSprite("ring", "graphics/ring.png", {
    sliceX: 16,
    sliceY: 1, // 16 frames in X, 1 frames in Y
    anims: {
        spin: { from: 0, to: 15 , loop: true, speed: 30 },
    },
});
k.loadSprite("motobug", "graphics/motobug.png", {
    sliceX: 5,
    sliceY: 1, // 8 frames in X, 2 frames in Y
    anims: {
        run: { from: 0, to: 4 , loop: true, speed: 10 },
    },
});
k.loadFont("mania", "fonts/mania.ttf");
k.loadFont("kruti", "fonts/K144.ttf");
k.loadFont("cursive", "fonts/ComicRelief-Bold.ttf");
// k.loadFont("yatra", "fonts/yatraone.ttf");
// k.loadFont("hind-bold", "fonts/hindbold.ttf");

k.loadSound("ring", "sounds/Ring.wav");
k.loadSound("jumpSound", "sounds/Jump.wav");
k.loadSound("city", "sounds/city.mp3");
k.loadSound("hyper-ring", "sounds/HyperRing.wav");
k.loadSound("destroy", "sounds/Destroy.wav");
k.loadSound("hurt", "sounds/Hurt.wav");
k.loadSound("dheeme", "sounds/dheeme.mp3");

k.scene("disclaimer", disclaimer);
k.scene("main-menu", mainMenu);
k.scene("game", game);
k.scene("gameover", gameover);
    
k.go("disclaimer");