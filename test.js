const result = await fetch("https://bedrock-theta.vercel.app")
console.log(await result.text() === "<h1>Bedrock Home page 3</h1>");