import k from "../kaplayContx.js";

export function makeMotoBug(pos)
{
    const motobug = k.add([
        k.sprite("motobug", {anim: "run"}),
        k.scale(2.5),
        k.area(),
        k.anchor("center"),
        k.pos(pos.x, pos.y),
        k.offscreen(),
        "enemy", // tag for identification
    ]);

    return motobug;
}