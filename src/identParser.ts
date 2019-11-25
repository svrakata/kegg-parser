const str =
    `Therapeutic category of drugs in Japan [BR:br08301]
 5  Crude drugs and Chinese medicine formulations
  51  Crude drugs
   510  Crude drugs
    5100  Crude drugs
     D00092  Coptis rhizome (JP17); Powdered coptis rhizome (JP17)`

const lines = str.split("\n")
lines.map((line) => {
    const code = line.split("  ")[ 0 ]
    console.log(code)
})
