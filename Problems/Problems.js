const problemurl="https://codeforces.com/api/problemset.problems?";
const maincontainer=document.querySelector("#main");
const tagmain=document.querySelector('#tagmain');
const footer=document.querySelector('#footer');
const pre=document.querySelector('#pre');
const next=document.querySelector('#next');
let data;
let id=0;
let aeasy=[];
let soleasy=[];
let amedium=[];
let solmedium=[];
let ahard=[];
let solhard=[];
let ieasy=0;
let imedium=0;
let ihard=0;
let ver="easy";

function display_problems(version){
    maincontainer.innerHTML="";
    document.getElementById("tagmain").style.display="block";
    let tmpcont,i,tmpsol;
    if(version=="easy")
    {
        i=ieasy;
        tmpcont=aeasy;
        tmpsol=soleasy;
    }
    if(version=="medium")
    {
        i=imedium;
        tmpcont=amedium;
        tmpsol=solmedium;
    }    
    if(version=="hard")
    {
        i=ihard;
        tmpcont=ahard;
        tmpsol=solhard;
    }
    // console.log(tmpsol);
    // console.log(soleasy);
    let len=tmpcont.length;
    // console.log(tmpcont);
    for(let j=1;j<=Math.min(len,10);i++,j++)
    {
        const dmain=document.createElement('div');
        dmain.classList="contests";
        const d1=document.createElement('div');
        d1.classList="content";

        const ques=tmpcont[i].index;
        const id=tmpcont[i].contestId;
        
        const u="https://codeforces.com/contest/"+tmpcont[i].contestId+"/problem/"+ques;
        
        d1.innerHTML=id+"-"+ques+": "+`<a href="${u}" target="_blank">${tmpcont[i].name}</a>`;
        dmain.appendChild(d1);

        const d2=document.createElement('div');
        d2.classList="content";
        d2.innerHTML="Difficulty: "+tmpcont[i].rating;
        dmain.appendChild(d2);

        const d3=document.createElement('div');
        d3.classList="content";
        d3.innerHTML="Solved Count: "+tmpsol[i].solvedCount;
        dmain.appendChild(d3);

        maincontainer.appendChild(dmain);
    }
}

async function fetch_problems() {
    const response = await fetch(problemurl);
    const t = await response.json();
    data=t;
    // console.log(data);
    let tt=data.result.problemStatistics;
    data=data.result.problems;
    // console.log(tt[0].solvedCount);
    for(let i=0;i<data.length;i++)
    {
        if(data[i].rating>1600)
        {
            ahard.push(data[i]);
            solhard.push(tt[i]);
        }
        if(data[i].rating>1000 && data[i].rating<=1600)
        {
            amedium.push(data[i]);
            solmedium.push(tt[i]);
        }
        if(data[i].rating<=1000)
        {
            aeasy.push(data[i]);
            soleasy.push(tt[i]);
        }
    }
    display_problems("easy");
    footer.style.display="flex";
}
fetch_problems();

next.addEventListener("click",function(){
    if(ver=="easy")
    {
        if(ieasy+10<aeasy.length)
            ieasy+=10;
        display_problems("easy");
    }
    if(ver=="medium")
    {
        if(imedium+10<amedium.length)
            imedium+=10;
        display_problems("medium");
    }
    if(ver=="hard")
    {
        if(ihard+10<ahard.length)
            ihard+=10;
        display_problems("hard");
    }   
});

pre.addEventListener("click",function(){
    if(ver=="easy")
    {
        ieasy-=10;
        if(ieasy<=0)
            ieasy=0;
        display_problems("easy");
    }
    if(ver=="medium")
    {
        imedium-=10;
        if(imedium<=0)
            imedium=0;
        display_problems("medium");
    }
    if(ver=="hard")
    {
        ihard-=10;
        if(ihard<=0)
            ihard=0;
        display_problems("hard");
    }   
});

document.getElementById("easy").style.backgroundColor="#337AF1";

document.getElementById("easy").addEventListener("click", function(){
        document.getElementById("easy").style.backgroundColor="#337AF1";
        document.getElementById("medium").style.backgroundColor="black";
        document.getElementById("hard").style.backgroundColor="black";
        ver="easy";
        ieasy=0;
        display_problems("easy");
    });


document.getElementById("medium").addEventListener("click", function(){
        document.getElementById("medium").style.backgroundColor="#337AF1";
        document.getElementById("easy").style.backgroundColor="black";
        document.getElementById("hard").style.backgroundColor="black";
        ver="medium";
        imedium=0;
        display_problems("medium");});

document.getElementById("hard").addEventListener("click", function(){
        document.getElementById("hard").style.backgroundColor="#337AF1";
        document.getElementById("medium").style.backgroundColor="black";
        document.getElementById("easy").style.backgroundColor="black";
        ver="hard";
        ihard=0;
        display_problems("hard");});


