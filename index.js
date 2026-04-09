import { createCanvas } from "canvas";
import fetch from "node-fetch";
import { createWriteStream, mkdirSync, rmSync } from "node:fs";
import path from "node:path";

const mainCanvas = createCanvas(1000, 1000);
const ctx = mainCanvas.getContext("2d");

main();

async function main() {
    const response = await fetch("https://mnfursplace.laravel.cloud/pixels?since=0").then(v => v.json());

    rmSync("output", { recursive: true });
    mkdirSync("output", { recursive: true });

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1000, 1000);

    const pixels = response.pixels;
    for(let j = 0; pixels.length > 0; j++) {
        for(let i = 0; i < 16; i++) {
            placeNext(pixels);
        }
        
        console.log("Frame " + j);
        const outfile = path.join("output", j.toString().padStart(4, "0") + ".png");
        await new Promise((res) => {
            mainCanvas.createPNGStream()
            .pipe(createWriteStream(outfile))
            .once("close", () => {
                res();
            })
        });
    }
}

function placeNext(pixels) {
    const [ next ] = pixels.splice(0, 1);
    if(next == null) return;

    ctx.fillStyle = next.color;
    ctx.fillRect(next.x, next.y, 1, 1);
}