// custom typefaces
import "typeface-work-sans"

import "./src/global.css"
import "./src/forms.css"
import "./src/global-tabs.css"
import "./src/variables.css"

import "prismjs/themes/prism.css"

import cssVars from "css-vars-ponyfill"

cssVars({
  onlyLegacy: true,
  include: "link[rel=stylesheet],style"
});
