import k from "../kaplayContx";

export default function disclaimer() {

  const bg = k.add([
    k.sprite("bgdisc"),
    k.pos(k.center().x, k.center().y ), // adjust Y position as needed
    k.anchor("center"),
    k.scale(1), // scale if it's too big
  ]);

let t = 0;
k.onUpdate(() => {
  t += k.dt();
  bg.scale = k.vec2(1 + 0.03 * Math.sin(t * 4));
});

  k.wait(0.5, () => {
    k.go("main-menu");
  });
}