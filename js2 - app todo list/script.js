const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value ===''){
        alert("Tu dois écrire quelque chose !");
    }else{

        // Créer une variable pour créer un élément "li" 
        let li = document.createElement("li");

        // innerHTML -> C'est ce que l'on veut écrire dans le "li" donc
        //  prend la valeur du champ d'entrée "inputbox"
        li.innerHTML = inputBox.value;

        // On envoie le nouveau "li" en tant que nouvel enfant dans le liste 
        // containeur (on ajoute une nouvelle tâche)
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"
        li.appendChild(span);

    }

        inputBox.value='';
        saveData();
}

// "e" représente le module cliqué
listContainer.addEventListener("click", function(e){

    //on vérifié que "e" soit un "LI"
    if(e.target.tagName === "LI"){

        // on le passe en mode check si il est pas, sinon en mode uncheck
        e.target.classList.toggle("checked");
        saveData();
    }

    //on vérifié que "e" soit un "SPAN"
    else if(e.target.tagName === "SPAN"){

        //on supprime l'élement parent alias le LI
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Stock la liste dans la data
function saveData(){
    localStorage.setItem("Data", listContainer.innerHTML);
}
// affiche la data
function showTask(){
    listContainer.innerHTML = localStorage.getItem("Data");
}
showTask();