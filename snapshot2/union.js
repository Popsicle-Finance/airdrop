const fs = require('fs');

let fantom = JSON.parse(fs.readFileSync("fantom2.json", 'utf8'))
let fantomUniqueArray = [...new Set([...fantom.minters, ...fantom.swappers])]

let addresses = {}
addresses.interactors = fantomUniqueArray
addresses.number = fantomUniqueArray.length

fs.writeFileSync("snapshot2.json", JSON.stringify(addresses, null, 4))