let actualQuestion = 0;
let score = 0;
const question = document.querySelector(".question h1");
const reponses = document.querySelectorAll(".question h3");
const btn = document.querySelectorAll(".answers .btn");

const questions = [
    {
        question: "Qu'est-ce que le sida ?",
        answers: [
            "Le Virus de l’Immunodéficience Humaine provoque une infection virale qui attaque le système immunitaire.",
            "Le Virus de l’Immunodéficience Humaine est la même chose que le sida",
        ],
        goodAnswer: 0
    },
    {
        question: "Quels sont les symptômes du VIH ?",
        answers: [
            "elles contractent une mononucléose infectieuse (accompagnée de fièvre, d’éruptions cutanées, d’articulations douloureuses et d’un gonflement des nœuds lymphatiques).",
            "elles contractent une mononucléose infectieuse et la stérilité, l'infertilité",
        ],
        goodAnswer: 0
    },
    {
        question: "À quel moment une personne a-t-elle le sida ?",
        answers: [
            "A partir du moment ou la personne est porteuse du VIH",
            "En cas d’absence de traitement, la majorité des personnes porteuses du VIH développent les signes du sida 8 à 10 ans après leur contamination.",
        ],
        goodAnswer: 1
    },
    {
        question: "Combien de temps faut-il à une personne infectée par le VIH pour développer le sida ?",
        answers: [
            "La durée varie grandement selon les personnes. Il peut s’écouler 10 à 15 ans, parfois plus, parfois moins, entre l’infection au VIH et les symptômes du sida.",
            "5 jours environ, c'est le temps moyen d'incubation d'un virus, bien que cela varie selon les personnes ( age, système imunitaire, etc...)",
        ],
        goodAnswer: 0
    },
    {
        question: "Où se trouve le VIH dans le corps ?",
        answers: [
            "Dans le sang et le sperme uniquement, puisqu'il ne se transmet pas par la salive",
            "Le VIH se situe dans les fluides corporels tels que le sang, le sperme, les fluides vaginaux et le lait maternel .",
        ],
        goodAnswer: 1
    },
    {
        question: "Comment le VIH se transmet-il ?",
        answers: [
            "Le VIH ne se transmet que par le sang ou lors de rapport sexuel, lorsqu'il y a eu un contact physique",
            "Le VIH se transmet par pénétration (anale ou vaginale) lors d’un rapport sexuel, par transfusion sanguine, par le partage d’aiguilles contaminées dans les établissements de soin et chez les toxicomanes, mais aussi de la mère à l’enfant au cours de la grossesse.",
        ],
        goodAnswer: 1
    },
    {
        question: "Quel est le risque de transmission du VIH en se faisant un piercing ou un tatouage ?",
        answers: [
            "Aucun, puisqu'il n'y a pas de contact physique ni de transmission de sang",
            "Un risque de transmission du VIH existe si des instruments contaminés ne sont pas stérilisés ou sont partagés entre plusieurs personnes.",
        ],
        goodAnswer: 1
    },
    {
        question: "Deux personnes vivant avec le VIH souhaitent avoir des relations sexuelles exclusives non protégées. Est-ce sans danger ?",
        answers: [
            "Il est vivement recommandé à une personne vivant avec le VIH de ne pas être infectée par une autre souche du virus.",
            "Les deux personnes sont déjà infecté par le VIH, il n'y a donc rien a craindre, sauf si vous aviez une santé fragile avec d'être infecté",
        ],
        goodAnswer: 0
    }
]

function updateText() {
    question.innerHTML = questions[actualQuestion].question
    reponses[0].innerHTML = "Reponse 1 : " + (questions[actualQuestion].answers[0] != "" ? questions[actualQuestion].answers[0] : "...")
    reponses[1].innerHTML = "Reponse 2 : " + (questions[actualQuestion].answers[1] != "" ? questions[actualQuestion].answers[1] : "...")
}

function endGame() {
    question.innerHTML = "Le Jeu est fini bravo a toi"
    reponses[0].innerHTML = `Tu as un score de ${score}/${questions.length}`
    reponses[1].innerHTML = "Merci d'avoir joué"
    btn[0].innerHTML = "Rejouer"
    btn[0].setAttribute("onclick", "window.location.reload()")
    btn[1].parentElement.removeChild(btn[1])
}

function validate(reponse) {
    if (questions[actualQuestion].goodAnswer === reponse) {
        alert("Bonne Réponse")
        score++
    } else {
        alert("Mauvaise Réponse")
    }
    actualQuestion++;
    console.log(actualQuestion, questions.length)
    if (actualQuestion+1 > questions.length) endGame()
    else updateText()
}

window.addEventListener('load', () => {
    updateText()
})