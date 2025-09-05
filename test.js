const createElements=(arr)=>{
    const htmlElements=arr.map(el=> `<span class="btn>${el} </span>`)
    console.log(htmlElements.join(" "));
}

const synonyms= ["hellow","Hi","good"]
createElements(synonyms) 

/**
 * first step:
 * 1. loadLesson function e api data fetch kore json nye data gula pai. and ekta array of object pauya jai.
 * sai data gula ke lessons variable name dorsi diplay korar jonno.
 * 2. Data gula ke UI display dekhanor jonno displayLoadData function kaj kori.
 */