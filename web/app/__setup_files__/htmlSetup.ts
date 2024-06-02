import fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve("public/", "index.html"), "utf8");
document.documentElement.innerHTML = html;
