const inputEl = document.getElementById("input");
const infoTexteEl = document.getElementById("info-text");
const meaningCotaninerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio")


async function fetchAPI(word) {
    try {
               
    infoTexteEl.style.display = "block";

    infoTexteEl.innerText = `Searching the meaning of "${word}"`

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    const result = await fetch(url).then((res) => res.json());
    
    if(result.title) {
        meaningCotaninerEl.style.display = "block";

        titleEl.innerText = word;
        meaningEl.innerText = "N/A";
        audioEl.style.display = "none"
    } else {
        infoTexteEl.style.display = "none";
        meaningCotaninerEl.style.display = "block";
        audioEl.style.display = "inline-flex";

        titleEl.innerText = result[0].word;
        meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
        audioEl.src = result[0].phonetics[0].audio;
    }  

    } catch (error) {
        console.log(error)
    }
}

inputEl.addEventListener("keyup", (e) => {
    if(e.target.value && e.key == "Enter") {
        fetchAPI(e.target.value)
    }
})