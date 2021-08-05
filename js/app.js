//console.log('hello')
showNotes();
//if user adds a note, add it to the localStorage

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function(e){
    let addText=document.getElementById("addText");
    let addTitle=document.getElementById("addTitle");
    let notes=localStorage.getItem("notes");
    if(notes == null){
         notesObj=[];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    let myObj ={
        title: addTitle.value,
        text: addText.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value="";
    addTitle.value="";
    //console.log(notesObj);
    showNotes();
});

//function to show elements from localStorage
function showNotes(){
    let notes=localStorage.getItem("notes");
    if(notes == null){
        notesObj=[];
   }
   else{
       notesObj = JSON.parse(notes);
   }

   let html =""
   notesObj.forEach(function(element, index){
       html+= `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
       <div class="card-body">
         <h5 class="card-title">${element.title}</h5>
         <p class="card-text">${element.text}</p>
         <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-info">Delete Note</button>
       </div>
     </div>`;
   });

   let notesElm = document.getElementById('notes');
   if(notesObj.length!=0){
       notesElm.innerHTML= html;
   }
   else{
       notesElm.innerHTML=`Nothing to show! Use "Add a Note" section above to add notes.`
   }
}


//function to delete a note
function deleteNote(index){
    //console.log("delete");
    let notes=localStorage.getItem("notes");
    if(notes == null){
         notesObj=[];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){
    // console.log('fired');
    let inputVal =search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
})