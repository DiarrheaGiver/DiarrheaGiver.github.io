let QuestionList = [
    {
        Text: "Социальный ...",
        Correct: ["Пранк"],
        Wrong: ["Проект", "Лифт", "Туалет"],
    },
    {
        Text: "Я хочу ...",
        Correct: ["Отдыхать"],
        Wrong: ["Работать", "Делать лабы", "Ничего"],
    },
]

function getRandomInt(max) {
    let a = Math.floor(Math.random() * max);
    return a;
}

const TestList = document.getElementById("TestList");

function FinishTest(){
    let FullCorrect = 0;
    let Correct = 0;
    let List = TestList.children;
    for(Question of List){
        let NumOfCorrectAnswers = 0;
        let NumOfWrongAnswers = 0;
        let CorrectAnswers = Question.getElementsByClassName("CorrectAnswer");
        let WrongAnswers = Question.getElementsByClassName("WrongAnswer");
        let CAN = CorrectAnswers.length;
        let WAN = WrongAnswers.length;
        for(Answer of CorrectAnswers){
            Answer.nextElementSibling.style.color = "#00ff00"
            if(Answer.checked){
                NumOfCorrectAnswers++;
            }
        }
        for(Answer of WrongAnswers){
            Answer.nextElementSibling.style.color = "#ff0000"
            if(Answer.checked){
                NumOfWrongAnswers++;
            }
        }
        if(NumOfCorrectAnswers == CAN && NumOfWrongAnswers == 0){
            FullCorrect++;
        }
    }

    document.getElementById("FinishTest").remove();

    document.getElementById("TestFinisher").insertAdjacentHTML("beforeend", `<p>Ваш результат: ${FullCorrect}/${List.length}</p><p><a href="/">Вернуться на главную страницу</a></p><p><a href="Test.html">Попробовать ещё раз</a></p>`)
}

document.getElementById("FinishTest").onclick = FinishTest

let TempQuestionList = [...QuestionList];

while (TempQuestionList.length > 0) {
    let i = getRandomInt(TempQuestionList.length);
    let Question = TempQuestionList[i];
    let Div = document.createElement("div");
    Div.classList.add("QuestionContainer");
    Div.innerHTML = `<p">${Question.Text}</p>`;

    let Variants = [...Question.Correct, ...Question.Wrong]
    let Line = Question.Correct.length;
    while (Variants.length > 0) {
        let j = getRandomInt(Variants.length);
        let item = Variants[j];
        let Type = j < Line ? "CorrectAnswer" : "WrongAnswer"
        Div.insertAdjacentHTML("beforeend", `<div>
    <input type="checkbox" name="${item}" class="${Type}"/>
    <label>${item}</label>
  </div>`);

        if (Type == "CorrectAnswer") {
            Line--;
        }
        Variants.splice(j, 1);
    }

    TestList.append(Div);
    TempQuestionList.splice(i, 1);
}
