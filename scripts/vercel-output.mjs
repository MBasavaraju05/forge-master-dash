import { cpSync, mkdirSync, copyFileSync, existsSync } from "fs";
import { resolve } from "path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const output = resolve(root, ".vercel", "output");

// Clean and create output dir
if (existsSync(output)) {
  cpSync(output, output + "_bak", { recursive: true, force: true });
}
mkdirSync(resolve(output, "functions", "__server.func"), { recursive: true });
mkdirSync(resolve(output, "static"), { recursive: true });

// Copy static assets (client)
cpSync(resolve(dist, "client"), resolve(output, "static"), { recursive: true });

// Copy server function
cpSync(resolve(dist, "server"), resolve(output, "functions", "__server.func"), { recursive: true });

// Copy config
copyFileSync(resolve(dist, "config.json"), resolve(output, "config.json"));

console.log("✓ .vercel/output ready");
