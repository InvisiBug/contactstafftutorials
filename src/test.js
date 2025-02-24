const gifs = [
  "src/gifs/moves/angel/angelroll.json",
  "src/gifs/moves/steve/caged.json",
  "src/gifs/moves/steve/steve.json",
];

const moveName = "caged";

const result = gifs.find((gif) => gif.includes(moveName));
console.log(result);
