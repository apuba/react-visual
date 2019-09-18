const path = require("path")
const aliasPath = [
    "assets",
    "commons",
    "components",
    "config",
    "pages",
    "redux",
    "utils"
]

const alias = {}
aliasPath.forEach(item => {
    alias["@"+item] = path.resolve(__dirname,"../../src/" + item)
})
alias["@left"] = path.resolve(__dirname,"../../src/pages/components/left")
alias["@right"] = path.resolve(__dirname,"../../src/pages/components/right")

module.exports = alias