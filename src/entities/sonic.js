import k from "../kaplayContx.js";
export function makeSonic(pos)
{
    const sonic = k.add([
        k.sprite("sonic", {anim: "run"}),
        k.scale(3),
        k.area(),
        k.anchor("center"),
        k.pos(pos.x, pos.y),
        k.body({jumpForce: 1700}), // jumpForce is the force applied when jumping, maxVel is the maximum velocity of the player
        {
            ringCollectUI: null,
            setControls() {
                k.onButtonPress("jump", () =>{
                    if(this.isGrounded()) // need body component that's why use k.body()
                    {
                        this.play("jump")
                        this.jump(1700);
                        k.play("jumpSound", {volume: 0.5});
                    }
                });
            },
            setEvents(){
                this.onGround(() => {
                    this.play("run");
                });
            },
        },
    ]); 
    sonic.ringCollectUI = sonic.add([
        k.text("", {font: "mania", size: 24}),
        k.color(255, 255, 0),
        k.anchor("center"),
        k.pos(30, -10),
    ]);
    return sonic;
}