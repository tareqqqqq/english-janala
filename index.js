 const createElements=(arr)=>{
    const htmlElements=arr.map(el=> `<span class="btn>${el} </span>`)
    return htmlElements.join(" ");
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}



const loadLesson = () =>{

    fetch ("https://openapi.programming-hero.com/api/levels/all")
        .then(res=> res.json())
        .then(json=> displayLesson(json.data))
}

const removeActive=()=>{
    const lessonBtn=document.querySelectorAll(".lesson-btn")
    lessonBtn.forEach(btn=>btn.classList.remove("active"))
}

const loadLevelWord=(id)=>{
    manageSpinner(true)
    const url=`https://openapi.programming-hero.com/api/level/${id}`


     fetch (url)
        .then(res=> res.json())
        .then((data)=> {
            removeActive()
            const clickBtn=document.getElementById(`lesson-btn-${id}`)
// console.log(clickBtn);
clickBtn.classList.add("active")
            displayWordData(data.data)

        })
             

        
           
    
    } 

    const loadWordDetail=async(id)=>{
        const url =`https://openapi.programming-hero.com/api/word/${id}`

        // console.log(url);
        const res=await fetch(url)
        const details= await res.json()
        displayWordDetails(details.data);
    }

   const manageSpinner=(status)=>{
    if(status===true){
        document.getElementById("spinner").classList.remove('hidden')
        document.getElementById("word-container").classList.add('hidden')
    }else{
        document.getElementById("word-container").classList.remove('hidden')
        document.getElementById("spinner").classList.add('hidden')

    }
   }

    const displayWordDetails=(word)=>{
console.log(word);

const detailsBox=document.getElementById("details-container")
detailsBox.innerHTML=`<div class="div">
    <h2 class="text-2xl font-bold">${word.word}(<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>

</div>
<div class="div">
    <h2 class=" font-bold">Meaning</h2>
    <p>${word.meaning}</p>

</div>
<div class="div">
    <h2 class=" font-bold">Example</h2>
    <p>${word.sentence}</p>

</div>
<div class="div">
    <h2 class=" font-bold">Synonyms</h2>
   <div class="">${createElements(word.synonyms)}</div>

</div>



`
document.getElementById("my_modal").showModal()




    }
const displayWordData=(words)=>{

  const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if(words.length===0){
        wordContainer.innerHTML = ` <div class="text-center col-span-full rounded py-10 space-y-6 font-bangla">
        <img class="mx-auto" src="./assets/alert-error.png" alt="">
    <p class="text-xl font-semibold text-gray-400 ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
    <h1 class="text-4xl font-bold">নেক্সট Lesson এ যান</h1>
  </div>
        
        `;
        manageSpinner(false)
        return;
    }   
    words.forEach(word => {
        // console.log(word); 
        const card=document.createElement("div")
    card.innerHTML=`  <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word? word.word: "not found"}</h2>
        <p class="font-semibold"> meaning  / pronunciation</p>
        <div class="text-2xl font-medium font-bangla">
         ${word.meaning?word.meaning:"not found"}  / ${word.pronunciation ?word.pronunciation :"invalid"}
        </div>
        <div onclick="loadWordDetail(${word.id})" class="flex justify-between items-center">
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
            <button onclick="pronounceWord('${word.word}')"  class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
    </div> `
    wordContainer.appendChild(card)
        
    });
    manageSpinner(false)

}
   

function displayLesson(lessons) {
    // console.log(lessons);
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    // lessons.forEach(lesson => { 
    for (let lesson of lessons) {

        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
  
   <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open-reader"></i>Lesson -${lesson.level_no}</button>
   `;
        levelContainer.appendChild(btnDiv);
    }

    // );
}
loadLesson()  


document.getElementById("btn-search").addEventListener("click", ()=>{
    removeActive()
    const input=document.getElementById("input-search");
     const searchValue=input.value.trim().toLowerCase() 
    console.log(searchValue);

     fetch ("https://openapi.programming-hero.com/api/words/all")
        .then(res=> res.json())
        .then(json=> {
            const allWords=json.data
            const filterWords=allWords.filter(word=>word.word.toLowerCase().includes(searchValue))
            console.log(filterWords);

            displayWordData(filterWords)
        })
    
})