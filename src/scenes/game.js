import k from "../kaplayContx.js";
import { makeSonic } from "../entities/sonic.js";
import { makeMotoBug } from "../entities/motobug.js";
import { makeRing } from "../entities/ring.js";
export default function game(){
    k.setGravity(3100);
    const citySfx =k.play("dheeme", {volume: 0.025, loop: true});   
    const bgPieceWidth = 1920;
    const bgPieces = [
        k.add([
            k.sprite("bg2"),
            k.pos(0, 0),
            k.scale(2),
            k.opacity(0.75), // 0 -> makes opaque.
            //k.area(),
        ]),
        k.add([
            k.sprite("chemical-bg"),
            k.pos(bgPieceWidth, 0),
            k.scale(2),
            k.opacity(0.75), // 0 -> makes opaque.
            //k.area(),
        ]),
        k.add([
            k.sprite("bg3"),
            k.pos(bgPieceWidth*2, 0),
            k.scale(2),
            k.opacity(0.75), // 0 -> makes opaque.
            //k.area(),
        ]),
    ];
    const platformWidth = 1280
    const platforms = [
        k.add([k.sprite("platforms"), k.pos(0, 480), k.scale(4)]), //k.area()]), // more the height, more below it goes from top
        k.add([k.sprite("platforms"), k.pos(platformWidth, 480), k.scale(4)]) //k.area()]), // more the height, more below it goes from top
    ];
    
    let score = 0;
    let scoreMultiplier = 0; 

    const sonic = makeSonic(k.vec2(200, 815));
    sonic.setControls();
    sonic.setEvents();
    sonic.onCollide("enemy", (e) => {
      if(!sonic.isGrounded()) // need body component that's why use k.body()
      {
        k.play("destroy", {volume: 0.2});
        k.play("hyper-ring", {volume: 0.2});
        k.destroy(e);
        sonic.play("jump");
        sonic.jump();
        scoreMultiplier += 1;
        score += 10*scoreMultiplier;
        scoreText.text = `SCORE: ${score}`;
        // yeh ni krna hai for better UX: sonic.ringCollectUI.text = `+${score}`;
        // instead niche ki do lines krni hai:

        if(scoreMultiplier == 1) sonic.ringCollectUI.text = "+10";
        if(scoreMultiplier > 1) sonic.ringCollectUI.text = `x${scoreMultiplier}`;
        k.wait(1, () => {
            sonic.ringCollectUI.text = ""; // Clear the text after 1 second
        });
        return;
      }
      k.play("hurt", {volume: 0.4});
      k.setData("current-score", score);
      k.go("gameover", citySfx);
    });
    

    const scoreText = k.add([
        k.text("SCORE: 0", {font: "mania", size: 72}),
        k.pos(20, 20),
    ]);
    
    sonic.onCollide("ring", (rg) => {
        k.play("ring", {volume: 0.5});
        k.destroy(rg);
        score++;
        scoreText.text = `SCORE: ${score}`;
        sonic.ringCollectUI.text = "+1";
        k.wait(1, () => {
            sonic.ringCollectUI.text = ""; // Clear the text after 1 second
        });
        //console.log(score);
    });

    let gameSpeed = 300;
    k.loop(1, () =>{
        gameSpeed += 50;
    });

    // Spawning or Reappearance of Motobug
    const spawnMotoBug = () => {
        const motobug = makeMotoBug(k.vec2(1938, 820));
        motobug.onUpdate(() => {
            if(gameSpeed < 3000)
            {
                motobug.move(-(gameSpeed+250), 0);
                return;
            }
            motobug.move(-(gameSpeed), 0);
        });
        motobug.onExitScreen(() => {
            if(motobug.pos.x < 0)
            {
                k.destroy(motobug);
            }
        });

        const waitTime = k.rand(0.5, 2.5);
       // console.log(waitTime);
        k.wait(waitTime, spawnMotoBug);
    };
    spawnMotoBug();

    const spawnRing = () =>{
        const ring = makeRing(k.vec2(1938, 650));
        ring.onUpdate(() => {
            if(gameSpeed < 3000)
            {
                ring.move(-(gameSpeed+250), 0);
                return;
            }
            ring.move(-(gameSpeed), 0);
        });
        ring.onExitScreen(() => {
            if(ring.pos.x < 0)
            {
                k.destroy(ring);
            }
        });
        const waitTime = k.rand(0.5, 3);
        //console.log(waitTime);
        k.wait(waitTime, spawnRing);
    };
    spawnRing();

    k.add([
        k.rect(1920, 1080),
        k.opacity(0),
        k.area(),
        k.pos(0, 875),
        k.body({isStatic: true}),
        "platform",
    ]);
    k.onUpdate(() => {
        if(sonic.isGrounded()) scoreMultiplier = 0;
        for (const bg of bgPieces) {
            bg.move(-100, 0);
        }
        
        // Check if the first piece is completely offscreen
        if (bgPieces[0].pos.x + bgPieceWidth * bgPieces[0].scale.x < 0) {
            // Move it to the end after the last piece
            bgPieces[0].pos.x = bgPieces[2].pos.x + bgPieceWidth * bgPieces[2].scale.x;
            // Rearrange the array order
            bgPieces.push(bgPieces.shift());
        }
        // if(bgPieces[1].pos.x < 0)
        //     {
        //         bgPieces[0].moveTo(bgPieces[1].pos.x+bgPieceWidth*2, 0);
        //         bgPieces.push(bgPieces.shift()); 
        //     }
        
        // bgPieces[0].move(-100, 0); 
        // bgPieces[1].moveTo(bgPieces[0].pos.x+bgPieceWidth, 0); 
        
        if(platforms[1].pos.x < 0)
            {
                platforms[0].moveTo(platforms[1].pos.x+platformWidth*2, 480);
                platforms.push(platforms.shift()); // removes first element and appends it to the end of the array.
            }
        
        platforms[0].move(-gameSpeed, 0); // moves the first element to the left by 100 pixels/second in x direction.
        platforms[1].moveTo(platforms[0].pos.x+platformWidth, 480); 
    })
};