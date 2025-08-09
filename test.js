

(async () =>{
    const bcrypt = require("bcrypt")
    const hashed = await (bcrypt.hash('mostafa73#', 10))
    console.log(hashed);
})()

