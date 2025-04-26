import k from "../kaplayContx.js";

export function makeRing(pos)
{
    const ring = k.add([
        k.sprite("ring", {anim: "spin"}),
        k.scale(2.5),
        k.area(),
        k.anchor("center"),
        k.pos(pos.x, pos.y),
        k.offscreen(),
        "ring", // tag for identification
    ]);

    return ring;
}