import k from "../kaplayContx.js";

export default function gameover(citySfx)
{
    citySfx.paused = true; // Pause the citySfx
    let bestScore = k.getData("best-score");
    const currentScore = k.getData("current-score");

    if(bestScore < currentScore)
    {
        k.setData("best-score", currentScore);
        bestScore = currentScore;
    }
    k.add([
        k.text("GAME OVER", {font: "mania", size: 96}),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y-400),
    ]);
    k.add([
        k.text(`BEST SCORE:`, {font: "mania", size: 64}),
        k.anchor("center"),
        k.pos(k.center().x-400, k.center().y - 250),
    ]);
    k.add([
        k.text(`CURRENT SCORE:`, {font: "mania", size: 64}),
        k.anchor("center"),
        k.pos(k.center().x+400, k.center().y - 250),
    ]);

    const bestRankBox = k.add([
        k.rect(300, 150, {radius: 2}),
        k.color(0, 0, 0),
        k.area(),
        k.anchor("center"),
        k.outline(6, k.Color.fromArray([255,255,255])),
        k.pos(k.center().x-400, k.center().y-80),
    ]);

    bestRankBox.add([
        k.text(bestScore, {font: "mania", size: 70}),
        k.anchor("center"),
    ]);
    const currRankBox = k.add([
        k.rect(300, 150, {radius: 2}),
        k.color(0, 0, 0),
        k.area(),
        k.anchor("center"),
        k.outline(6, k.Color.fromArray([255,255,255])),
        k.pos(k.center().x+400, k.center().y-80),
    ]);

    currRankBox.add([
        k.text(currentScore, {font: "mania", size: 70}),
        k.anchor("center"),
    ]);

    const tipBox = k.add([
        k.rect(1400, 200, {radius: 2}),
        k.color(0, 0, 0),
        k.area(),
        k.anchor("center"),
        k.outline(6, k.Color.fromArray([255,255,255])),
        k.pos(k.center().x, k.center().y+200),
    ]);
    // 1. Tip Texts Array
const tips = [
    "Reminder to drink water regularly & stay hydrated.",
    "Your body deserves rest. Don’t skip sleep!",
    "A balanced diet fuels a strong mind.",
    "Take a deep breath. You’re doing great!",
    "Spinach is rich in Iron — perfect to keep your energy up, especially during periods.",
    "Carrots help your eyes stay sharp—like a superhero’s night vision!",
    "Bananas aren’t just tasty—they help with mood swings too!",
    "Protein builds muscles and repairs your body — Eggs, Pulses, & Paneer are your friends.",
    "Fiber keeps your tummy happy—Fruits, Veggies, and Whole Grains are full of it!",
    "Too much sugar = energy rollercoaster. Try fruits for a natural sweet fix.",
    "An apple a day? Maybe! But mix it up with guava, papaya, and watermelon",
    "You’re not 'too early' or 'too late'—everyone hits puberty at their own pace.",
    "Voice cracking or deepening? Your vocal cords are just tuning up.",
    "Too much screen = fuzzy brain. Take eye + brain breaks!",
    "It’s okay to not feel okay. You’re allowed to ask for help.",
    "Consent isn’t silent. It’s clear, loud, and enthusiastic.",
    "STDs don’t care about age. Protection is protection.",
    "Have questions about sex? Learn from reliable sources (ex. doctors/WHO/sex-ed content), not random reels.",
    "Tampons, pads, cups—period products are choices, not rules.",
    "Cramps? Warm water bottle + gentle movement = relief!",
    "Skipping a period sometimes is normal—but talk to a doctor if it's frequent.",
    "Everyone should know about periods—not just girls.",
    "Bloating, mood swings, cravings? Blame hormones, not yourself.",
    "Periods aren’t gross—they’re your body doing monthly maintenance.",
    "Good touch vs. bad touch—know it, speak up, teach others.",
    "Helping someone understand their body is a gift, not gossip.",
    "Being kind online is as important as offline.",
    "Calcium = strong bones. Find it in milk, curd, ragi & almonds!",
    "Vitamin C boosts your immunity—citrus fruits are your daily shield.",
    "Junk food is fun, but real energy comes from real food.",
    "Dark chocolate (in moderation) = happy mood + iron boost!",
    "Hydration hack: Add lemon or mint to water if plain feels boring.",
  ];
  
  // 2. Choose random tip
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

    // 4. Add "Tip of the Day" heading
tipBox.add([
    k.text("📝Tip of the Day", {
      font: "mania", // your preferred font
      size: 50, // yellow
    }),
    k.color(255, 255, 255),
    k.anchor("top"),
    k.pos(0, -80), // shift upwards from center
  ]);
  
  // 5. Add the random tip content
 const tipText = tipBox.add([
    k.text("", {
      font: "cursive",
      size: 36,
      width: 1300, // for automatic line wrapping
      align: "center",
    }),
    k.color(0, 255, 0),
    k.anchor("center"),
    k.pos(0, 20), // below the heading
  ]);
  
let displayText = `"${randomTip}"`;
let currentIndex = 0;

// Typewriter effect
k.loop(0.03, () => { // Adjust speed by changing 0.05 (smaller = faster)
  if (currentIndex < displayText.length) {
    tipText.text += displayText[currentIndex];
    currentIndex++;
  }
});
    k.wait(1, () => {
        k.add([
            k.text("Press SPACE or Tap TOUCH to Play", {
                font: "mania",
                size: 36,
                color: k.color(255, 255, 255),
            }),
            k.anchor("center"),
            k.pos(k.center().x, k.center().y + 500),
        ]);
        k.onButtonPress("jump", () =>{
            k.go("game");
        });
    });
};   