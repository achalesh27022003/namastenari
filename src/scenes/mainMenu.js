import k from "../kaplayContx.js";
import { makeSonic } from "../entities/sonic.js";

export default function mainMenu(){
    // Setting best score to be zero, if we don't have anything in local storage
    if(!k.getData("best-score"))
    {
        k.setData("best-score", 0);
        // console.log("Hey");
    }
    // On pressing jump key button, go the next scene: "game"
    k.onButtonPress("jump", () => {
        k.go("game");
    });

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
          k.pos(2*bgPieceWidth, 0),
          k.scale(2),
          k.opacity(0.75), // 0 -> makes opaque.
          //k.area(),
      ]),
    ];
    const platformWidth = 1280;
    const platforms = [
        k.add([k.sprite("platforms"), k.pos(0, 480), k.scale(4)]), //k.area()]), // more the height, more below it goes from top
        k.add([k.sprite("platforms"), k.pos(platformWidth, 480), k.scale(4)]) //k.area()]), // more the height, more below it goes from top
    ];
/* 
    const texts = [
        { value: "NAMASTE NAARI", font: "mania" },
        { value: "नमस्ते नारी", font: "yatra" },
        { value: "नमस्कार नारी", font: "yatra" },
      ];
      
    let current = 0;
    let label = createText(texts[current]);

function createText(textObj) {
  return k.add([
    k.text(textObj.value, {
      font: textObj.font,
      size: 96,
    }),
    k.pos(k.center()),
    k.anchor("center"),
    k.opacity(1),
  ]);
}
// Every 3 seconds, destroy and replace the text with the next one
k.loop(3, () => {
    label.destroy();
  
    current = (current + 1) % texts.length;
  
    label = k.add([
      k.text(texts[current].value, {
        font: texts[current].font,
        size: 96,
      }),
      k.pos(k.center()),
      k.anchor("center"),
    ]);
  });

*/
// const hindiText = "\u0928\u092e\u0938\u094d\u0915\u093e\u0930 \u0928\u093e\u0930\u0940"; // नमस्कार नारी
k.add([
    k.text("NAMASTE NARI", {
        font: "mania",
        size: 96,
        color: k.color(255, 255, 255),
    }),
    k.pos(k.center().x, 200),
    k.anchor("center"),
]);

k.add([
    k.text("Press SPACE or Tap TOUCH to Play", {
        font: "mania",
        size: 32,
        color: k.color(255, 255, 255),
    }),
    k.pos(k.center().x, 300),
    k.anchor("center"),
]);

/* Need to revisit for preference selection task
const languages = {
    en: {
      welcome: "English",
      gameOver: "Game Over",
      score: "Score",
      playAgain: "Press to Play Again",
    },
    hi: {
      welcome: "Hindi",
      gameOver: "खेल समाप्त",
      score: "अंक",
      playAgain: "फिर से खेलें",
    },
    mr: {
      welcome: "Marathi",
      gameOver: "गेम ओव्हर",
      score: "गुण",
      playAgain: "पुन्हा खेळा",
    }
  };
  
  // Load this at the top of your game (global storage):
  k.setData("language", "en");  // default
  
 k.add([
      k.text("Choose Language:", { size: 48 }),
      k.pos(k.center().x, 400),
      k.anchor("center"),
    ]);
  
    const languagesList = ["en", "hi", "mr"];
  
    languagesList.forEach((lang, i) => {
      const button = k.add([
        k.rect(300, 60, { radius: 12 }),
        k.pos(k.center().x, 500 + i * 100),
        k.anchor("center"),
        k.area(),
        k.color(150, 150, 150),
        k.scale(1.5),
        "lang-btn",
        { lang },
      ]);
      button.add([
        k.text(languages[lang].welcome, { size: 36 }),
        k.anchor("center"),
        k.color(255, 255, 255), // text color white
      ]);
    });
  
    k.onClick("lang-btn", (btn) => {
      k.setData("language", btn.lang);
      k.go("game");
    });
    k.onHover("lang-btn", (btn) => {
        btn.scale = k.vec2(2); // grow a bit on hover
      });
      k.onHoverEnd("lang-btn", (btn) => {
        btn.scale = k.vec2(1); // reset scale
      });
*/

makeSonic(k.vec2(100, 815));

// parallax effect (foreword moving fast than backward)
k.onUpdate(() => {

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
    // {
    //     bgPieces[0].moveTo(bgPieces[1].pos.x+bgPieceWidth*2, 0);
    //     bgPieces.push(bgPieces.shift()); // removes first element and appends it to the end of the array.
    // }

    // bgPieces[0].move(-100, 0); // moves the first element to the left by 100 pixels/second in x direction.
    // bgPieces[1].moveTo(bgPieces[0].pos.x+bgPieceWidth, 0); 
        // console.log(bgPieces[0].pos.x);
        // console.log(bgPieces[1].pos.x);

    if(platforms[1].pos.x < 0)
        {
            platforms[0].moveTo(platforms[1].pos.x+platformWidth*2, 480);
            platforms.push(platforms.shift()); // removes first element and appends it to the end of the array.
        }
    
    platforms[0].move(-4000, 0); // moves the first element to the left by 100 pixels/second in x direction.
    platforms[1].moveTo(platforms[0].pos.x+platformWidth, 480); 
    });
};