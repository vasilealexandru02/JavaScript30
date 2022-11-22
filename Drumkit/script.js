
console.log("Loaded js");

// Read JSON drums file 
function  reqListener(){
    var toAdd = document.createDocumentFragment();
    //console.log(this.responseText);
    drums = JSON.parse(this.responseText);
    let drumsDiv = document.getElementById("drums");
    //console.log(drums);
    
    let drumsArray = drums['drums'];
    drumsArray.forEach(element => {
        // console.log('LETTER', element.LETTER);
        // console.log('SOUND', element.SOUND);
        // console.log('KEYCODE', element.KEYCODE);
        var newDiv = document.createElement('div');
         newDiv.className = 'drum';
         newDiv.setAttribute("id",element.KEYCODE);
        
         newDiv.innerHTML = "<div class='drumKey'>"+element.LETTER+"</div>";
         newDiv.innerHTML += "<div class='drumValue'>"+element.SOUND+"</div>";
         // Add event listener to each div -- could be done where the divs are created
         newDiv.addEventListener('click', function(){
            let keyCode = this.id;
            let drumSound = document.querySelector(`[data-key="${keyCode}"]`);
            this.classList.add("borderShown");
            
            drumSound.play();
            setInterval(()=>{
                this.classList.remove("borderShown");
            }, 500);
         });
        toAdd.appendChild(newDiv);

    });
    drumsDiv.appendChild(toAdd);
}

// When the request is done, drums div are generated
const req =  new XMLHttpRequest ();
req.addEventListener("load",reqListener);
req.open("GET","./media/drums.json");
req.send();

// Add event listener to the document when a key is pressed 
document.addEventListener("keydown", function(e){
    var toast = document.getElementById("snackbar");
    try{
        let drumSound = document.querySelector(`[data-key="${e.keyCode}"]`);
        let drumSoundDiv = document.getElementById(e.keyCode); 
        drumSoundDiv.classList.add("borderShown");
        drumSound.play();
        setInterval(()=>{
            drumSoundDiv.classList.remove("borderShown");
        }, 500); 
    }catch(error){
        toast.className = "show";
        setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 1000);
    }
  });
 