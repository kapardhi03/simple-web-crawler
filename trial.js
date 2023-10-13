import {extractInformation} from "./parser.js";
import {downloadFromURL} from "./http-download.js";

const url = new URL("https://info.pagnis.in/blog/2020/10/13/basic-financial-hygiene/");
const html = await downloadFromURL(url);
console.log(extractInformation(url.origin, html.body));
