const questions = [
    {
        question: "Quel est l'animal le plus gros du monde ?",
        answers: [
            {text: "Requin", correct: false},
            {text: "Blaine bleue", correct: true},
            {text: "Elephant", correct: false},
            {text: "Poisson Rouge", correct: false},
        ]
    },
    {
        question: "Quel est le plus petit pays du monde ?",
        answers: [
            {text: "Vatican", correct: true},
            {text: "France", correct: false},
            {text: "Russie", correct: false},
            {text: "Espagne", correct: false},
        ]
    },
    {
        question: "Quel est le plus grand desert du monde ?",
        answers: [
            {text: "Sahara", correct: false},
            {text: "Desert Artic", correct: false},
            {text: "Kalahari", correct: false},
            {text: "Antarctique", correct: true},
        ]
    },
    {
        question: "Quel est l'animal le plus gros du monde ?",
        answers: [
            {text: "Requin", correct: false},
            {text: "Balaine bleue", correct: true},
            {text: "Elephant", correct: false},
            {text: "Poisson Rouge", correct: false},
        ]
    },
    {
        question: "Quel est le continent le plus petit du monde ?",
        answers: [
            {text: "Asie", correct: false},
            {text: "Afrique", correct: false},
            {text: "Australie", correct: true},
            {text: "Amerique", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuizz(){
    // Initialisation de toutes les variables à 0
    currentQuestionIndex = 0;
    score= 0;

    // Réécrire le bouton sur "suivant" car il s'était transformé en "finir"
    nextButton.innerHTML = "Suivant";
    showQuestion();
}

function showQuestion(){
    resetStates();

    // Question actuelle est déterminé grâce à l'index
    let currrentQuestion = questions[currentQuestionIndex]

    // Numéro de question, on prend la position dans le tableau et rajoute +1
    let questionNo = currentQuestionIndex + 1;

    //On écrit dans le h2 question, le numéro de la question + la question
    // ex : 1. Quel est l'animal le plus gros du monde ?
    // explication "currrentQuestion.question" ->
    // 1. On prend la question actuelle grâce à "questions[currentQuestionIndex]"
    // 2. on prend uniquement le txt grâce au ".question"
    questionElement.innerHTML = questionNo + ". " + currrentQuestion.question;
    
    // Pour chaque réponse on fait ... 
    currrentQuestion.answers.forEach(answer => {
    
    // On créer un élément "boutton"
        const button = document.createElement("button");
    // On écrit uniquement la réponse grâce au ".text"
        button.innerHTML=answer.text;

    // Le nouveau bouton est ajouté à la classe btn HTML
        button.classList.add("btn");

    // Le nouveau bouton devient enfant de la div answer-button
        answerButtons.appendChild(button);

    // Si answer est true alors
        if(answer.correct){


            button.dataset.correct = answer.correct;
        }
    // On capte le click et appel la fonction "selectAnswer"
        button.addEventListener("click", selectAnswer);
    });
}

function resetStates(){
    nextButton.style.display = "none";

    // retire toutes les réponses précédentes
    // Tant qu'il y a des boutons alors on les supprimes
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    // On récupère dans un premier temps le bouton ciblé
    const selectedBtn = e.target;

    // Vérifie que le bouton selectionné est relié à une réponse "true"
    const isCorrect = selectedBtn.dataset.correct === "true";

    // Condition pour mettre le bouton selectionné dans une liste correct / incorrect
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    //-------- Ici on cherche à afficher la bonne réponse + le bouton suivant 

    // Pour chaque bouton, on vérifie le quel est correct
    Array.from(answerButtons.children).forEach(button => {

        //Si c'est correct, on le l'ajoute à la liste des éléments correct
        if(button.dataset.correct === "true"){
            // Le bouton correcte devient alors vert si il etait pas selectionné
            button.classList.add("correct");
        }

        //chaque bouton est désactivé
        button.disabled = true;
    });

    // Le bouton suivant apparait
    nextButton.style.display="block";

}

function showScore() {
    resetStates();
    questionElement.innerHTML = `Votre résultat est de ${score}/${questions.length}`;
    nextButton.innerHTML = "Rejouer !";
    nextButton.style.display="block";
}

function handleNextButton(){

    // Fin d'une question, on incrémente
    currentQuestionIndex++;

    // Si la valeur de l'index est strictement inf a questions.lenght (5)
    // alors renvoie une question, sinon afficher score

    if(currentQuestionIndex < questions.length){
        showQuestion();

    }else{
        showScore();
    }
        
}
    // On capte le click sur le bouton suivant
nextButton.addEventListener("click", ()=>{
    
    // Si la valeur de l'index est strictement inf a questions.lenght (5)
    // alors renvoie la fonction handlenextbutton. Sinon débuter le quizz
    if(currentQuestionIndex<questions.length){
        handleNextButton();

    }else {
        startQuizz();
    }
});


startQuizz();