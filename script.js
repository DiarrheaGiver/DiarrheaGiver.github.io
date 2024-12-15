let QuestionList = [
    {
        Text: "Что такое Cisco Packet Tracer?",
        Correct: ["Инструмент для моделирования и анализа сетей"],
        Wrong: ["Операционная система для сетевых устройств", "Физический маршрутизатор для обучения"],
    },
    {
        Text: "Какой режим позволяет анализировать движение пакетов пошагово?",
        Correct: ["Simulation"],
        Wrong: ["Realtime", "Logical"],
    },
    {
        Text: "Какая версия интернет-протокола использует 128-битные адреса?",
        Correct: ["IPv6"],
        Wrong: ["IPv4", "DNS"],
    },
    {
        Text: "Что делает DHCP?",
        Correct: ["Назначает IP-адреса автоматически"],
        Wrong: ["Переводит IP-адреса в MAC-адреса", "Шифрует данные между клиентом и сервером"],
    },
    {
        Text: "Каким цветом обозначается прямой кабель в Cisco Packet Tracer?",
        Correct: ["Чёрная прямая линия"],
        Wrong: ["Оранжевая линия", "Красная ломаная линия"],
    },
    {
        Text: "Какой протокол используется для диагностики сети и проверки доступности узла?",
        Correct: ["ICMP"],
        Wrong: ["FTP", "HTTP"],
    },
    {
        Text: "Какие устройства можно соединять перекрёстным кабелем?  ",
        Correct: ["Компьютер ↔️ Компьютер"],
        Wrong: ["Компьютер ↔️ Коммутатор", "Компьютер ↔️ Маршрутизатор"],
    },
    {
        Text: "Какой тип устройства работает на 3-м уровне модели OSI?",
        Correct: ["Маршрутизатор"],
        Wrong: ["Коммутатор", "Точка доступа"],
    },
    {
        Text: "Для чего используется Serial DCE-кабель?",
        Correct: ["Соединение двух маршрутизаторов"],
        Wrong: ["Соединение двух коммутаторов", "Подключение PC к коммутатору"],
    },
    {
        Text: "Как называется протокол, переводящий доменные имена в IP-адреса?",
        Correct: ["DNS"],
        Wrong: ["ARP", "DHCP"],
    },
    {
        Text: "Какой режим используется для быстрой проверки конфигураций сети?",
        Correct: ["Realtime"],
        Wrong: ["Simulation", "Physical"],
    },
    {
        Text: "Что обозначает \"Logical\" в Cisco Packet Tracer?",
        Correct: ["Логическая структура сети и её настройки"],
        Wrong: ["Физическое расположение устройств", "Симуляция трафика пакетов"],
    },
    {
        Text: "Какой кабель используется для первоначальной настройки устройства?",
        Correct: ["Консольный кабель"],
        Wrong: ["Прямой кабель", "Волоконно-оптический кабель"],
    },
    {
        Text: "Какой протокол сопоставляет IP-адреса с MAC-адресами?",
        Correct: ["ARP"],
        Wrong: ["ICMP", "HTTP"],
    },
    {
        Text: "Какой коммутатор поддерживает базовые функции и VLAN?",
        Correct: ["Cisco 2960"],
        Wrong: ["Cisco 3560", "Cisco 9200"],
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