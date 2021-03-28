const fs = require('fs');

let fantom = JSON.parse(fs.readFileSync("fantom.json", 'utf8'))
let fantomUniqueArray = [...new Set([...fantom.minters, ...fantom.swappers])]

let bsc = JSON.parse(fs.readFileSync("bsc.json", 'utf8'))
let bscUniqueArray = [...new Set([...bsc.minters, ...bsc.swappers])]

const union = [...new Set([...bscUniqueArray, ...fantomUniqueArray])]

let addresses = {}
addresses.interactors = union
addresses.number = union.length
addresses.binancePeople = bscUniqueArray.length
addresses.fantomPeople = fantomUniqueArray.length
addresses.apePeople = fantomUniqueArray.filter(element => bscUniqueArray.includes(element)).length

fs.writeFileSync("snapshot1.json", JSON.stringify(addresses, null, 4))