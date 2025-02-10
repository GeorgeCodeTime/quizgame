let audio = new Audio("bgmusic.mp3");
audio.loop = true;
audio.volume = 0.25;

function toggleMusic(toggle) {

    isPlaying = toggle;

    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
}

let isGameActive = true;

function playAgain() {
    let gameTitle = document.getElementById("gameTitle");
    let buttons = document.getElementById("buttons");
    let endGameContent = document.getElementById("endGame");
    let overlay = document.getElementById("overlay");
    let questionTitle = document.getElementById("questionTitle");
    let countdownDisplay = document.getElementById("timerContent");
    let questionsDisplay = document.getElementById("questions");

    gameTitle.style.display = "block";
    buttons.style.display = "grid";
    endGameContent.style.display = "none";
    overlay.style.display = "flex";
    questionTitle.style.display = "none";
    countdownDisplay.style.fontSize = "100px";
    questionsDisplay.style.display = "none";

    isGameActive = true;

}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let usedQuestion = [];
let lastScore = [];

function getRadnomQuestion(questions) {

    let endGameContent = document.getElementById("endGame");
    let endGameBlurContent = document.getElementById("endGameBlurContent");
    let overlay = document.getElementById("overlay");
    let previousScore = document.getElementById("lastScore");
    let questionNumber = document.getElementById("questionNumber");
    let totalScore = document.getElementById("totalScore");

    questionNumber.textContent = usedQuestion.length + 1 + " din 10";
    totalScore.textContent = "Scor curent: " + score;


    if (usedQuestion.length === 10) {

        isGameActive = false;
        usedQuestion = [];

        overlay.style.display = 'none';
        endGameContent.style.display = 'flex';
        endGameBlurContent.innerHTML = `Jocul s-a terminat! Scorul final este: <span style="color: green; font-weight: bold; display: inline;">${score}</span>`;


        if (lastScore.length !== 0) {
            previousScore.innerHTML = `Scorul anterior: <span style="color: red; font-weight: bold; display: inline;">${lastScore}</span>`;
        }

        lastScore = [score];
        score = 0;

        questionNumber.textContent = " ";
        totalScore.textContent = " ";

        return 0;
    }

    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * questions.length);
    } while (usedQuestion.includes(randomIndex));

    usedQuestion.push(randomIndex);

    const randomQuestion = questions[randomIndex].question;
    const questionOptions = shuffleArray([...questions[randomIndex].options]);
    const correctOption = questions[randomIndex].correctAnswer;

    return {
        question: randomQuestion,
        options: questionOptions,
        correctAnswer: correctOption
    };
}

let score = 0;

function displayAnswer(field) {
    let questionData = getRadnomQuestion(field);

    move(field);

    if (questionData === 0) {
        return;
    }

    let questionsDisplay = document.getElementById("questions");

    let questionTitle = document.getElementById("questionTitle");
    let questionButtons = document.getElementById("questionButtons");

    questionsDisplay.style.display = 'flex';

    questionTitle.style.display = 'block';
    questionTitle.style.fontSize = "44px";
    questionTitle.textContent = questionData.question;

    questionData.options.forEach(option => {
        let optionButton = document.createElement("button");
        optionButton.textContent = option;

        optionButton.addEventListener("click", function () {
            if (option === questionData.correctAnswer) {
                timerCounter("Corect", 3, field, 'green');
                score += 300;
            } else {
                timerCounter("Gresit", 3, field, 'red');
                score -= 100;
            }
            questionButtons.innerHTML = '';
        })

        questionButtons.appendChild(optionButton);
    })
}

function timerCounter(text, seconds, field, color) {

    let countdownTime = seconds;
    let countdownDisplay = document.getElementById("timerContent");
    let timerText = document.getElementById("timerText")

    let buttons = document.getElementById("buttons");
    let gameTitle = document.getElementById("gameTitle");

    buttons.style.display = 'none';
    gameTitle.style.display = 'none';

    if(text === "Timpul a expirat!"){
        countdownDisplay.style.fontSize = "100px";
    }

    countdownDisplay.style.display = 'flex';
    timerText.textContent = text;
    countdownDisplay.style.color = color;
    resetBar();

    setTimeout(() => {
        let interval = setInterval(function () {
            
            countdownDisplay.style.fontSize = "200px";
            countdownDisplay.style.color = '#f6d8d5';
            timerText.textContent = countdownTime;
            countdownTime--;

            if (countdownTime < 0) {
                clearInterval(interval);
                countdownDisplay.style.display = 'none';
                let questionButtons = document.getElementById("questionButtons");
                questionButtons.innerHTML = ''; 
                displayAnswer(field);
            }
        }, 1000);
    }, 1000);
}

var id; // Interval global
function move(field) {

    if (!isGameActive) return;

    var elem = document.getElementById("myBar");
    var width = 0;
    var duration = 10 * 1000; 
    var interval = 10; 
    var step = (100 / (duration / interval));

    id = setInterval(function () {
        if (width > 102) {
            
            clearInterval(id);
            timerCounter("Timpul a expirat!", 3, field, 'red');
            score -= 100;

        } else {
            width += step;
            elem.style.width = width + "%";
        }
    }, interval);
}

function resetBar() {
    clearInterval(id);
    id = null;
    document.getElementById("myBar").style.width = "0%";
}


const historyQuestions = [
    {
        question: "Cine a fost primul împărat al Imperiului Roman?",
        options: ["Julius Caesar", "Augustus", "Nero", "Tiberius"],
        correctAnswer: "Augustus"
    },
    {
        question: "În ce an a avut loc căderea Imperiului Roman de Apus?",
        options: ["476", "395", "410", "550"],
        correctAnswer: "476"
    },
    {
        question: "Cine a fost liderul Revoluției Franceze?",
        options: ["Napoleon Bonaparte", "Louis XVI", "Maximilien Robespierre", "George Washington"],
        correctAnswer: "Maximilien Robespierre"
    },
    {
        question: "Care a fost prima mare expediție a exploratorului Cristofor Columb?",
        options: ["1492", "1485", "1500", "1515"],
        correctAnswer: "1492"
    },
    {
        question: "Cine a fost primul președinte al Statelor Unite ale Americii?",
        options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"],
        correctAnswer: "George Washington"
    },
    {
        question: "În ce an a început Primul Război Mondial?",
        options: ["1914", "1917", "1918", "1920"],
        correctAnswer: "1914"
    },
    {
        question: "Cine a fost conducătorul Germaniei Naziste în timpul celui de-al Doilea Război Mondial?",
        options: ["Adolf Hitler", "Kaiser Wilhelm", "Otto von Bismarck", "Erwin Rommel"],
        correctAnswer: "Adolf Hitler"
    },
    {
        question: "Care a fost evenimentul care a declanșat începutul celui de-al Doilea Război Mondial?",
        options: ["Invadarea Poloniei de către Germania", "Atacul asupra Pearl Harbor", "Invadarea Franței", "Semnarea Pactului Molotov-Ribbentrop"],
        correctAnswer: "Invadarea Poloniei de către Germania"
    },
    {
        question: "Cine a fost marele conducător al Uniunii Sovietice în timpul Războiului Rece?",
        options: ["Leon Trotsky", "Joseph Stalin", "Vladimir Lenin", "Mikhail Gorbachev"],
        correctAnswer: "Joseph Stalin"
    },
    {
        question: "În ce an s-a încheiat Războiul Civil American?",
        options: ["1865", "1870", "1880", "1900"],
        correctAnswer: "1865"
    },
    {
        question: "Cine a fost primul rege al Franței după Revoluția Franceză?",
        options: ["Napoleon Bonaparte", "Louis XVIII", "Charles X", "Louis XVI"],
        correctAnswer: "Louis XVIII"
    },
    {
        question: "Cine a fost fondatorul Imperiului Mongol?",
        options: ["Kublai Khan", "Genghis Khan", "Tamerlan", "Batu Khan"],
        correctAnswer: "Genghis Khan"
    },
    {
        question: "Care a fost numele civilizației care a construit piramidele din Egipt?",
        options: ["Egiptenii", "Mesopotamienii", "Grecii", "Romanii"],
        correctAnswer: "Egiptenii"
    },
    {
        question: "Ce imperiu a fost condus de Napoleon Bonaparte?",
        options: ["Imperiul Roman", "Imperiul Francez", "Imperiul Austro-Ungar", "Imperiul Britanic"],
        correctAnswer: "Imperiul Francez"
    },
    {
        question: "Ce eveniment istoric a avut loc pe 11 septembrie 2001?",
        options: ["Atacurile teroriste asupra SUA", "Căderea Zidului Berlinului", "Semnarea Tratatului de la Versailles", "Primul zbor pe Lună"],
        correctAnswer: "Atacurile teroriste asupra SUA"
    },
    {
        question: "Care țară a fost sub conducerea regimului comunist în perioada 1947-1989?",
        options: ["Polonia", "România", "Germania de Est", "Italia"],
        correctAnswer: "Germania de Est"
    },
    {
        question: "În ce an a avut loc Marea Revoluție Franceză?",
        options: ["1789", "1791", "1804", "1776"],
        correctAnswer: "1789"
    },
    {
        question: "Cine a fost împăratul Chinei în timpul Marelui Zid Chinezesc?",
        options: ["Qin Shi Huang", "Wu Zetian", "Kublai Khan", "Ming Chengzu"],
        correctAnswer: "Qin Shi Huang"
    },
    {
        question: "Care a fost primul imperiu colonial european care a început explorările maritimi?",
        options: ["Spania", "Portugalia", "Franța", "Marea Britanie"],
        correctAnswer: "Portugalia"
    },
    {
        question: "Care a fost numele războiului între Uniunea Sovietică și Afganistan în anii 1980?",
        options: ["Războiul Rece", "Războiul din Golf", "Războiul din Vietnam", "Războiul din Afganistan"],
        correctAnswer: "Războiul din Afganistan"
    },
    {
        question: "Ce se întâmpla pe 20 iulie 1969?",
        options: ["Primul zbor pe Lună", "Primul zbor al unui om în spațiu", "Semnarea Tratatului de la Versailles", "Deschiderea Canalului Suez"],
        correctAnswer: "Primul zbor pe Lună"
    },
    {
        question: "Cine a fost primul împărat al Chinei?",
        options: ["Qin Shi Huang", "Kublai Khan", "Ming Chengzu", "Emperor Wu"],
        correctAnswer: "Qin Shi Huang"
    },
    {
        question: "În ce an a avut loc Revoluția Rusă?",
        options: ["1917", "1921", "1914", "1905"],
        correctAnswer: "1917"
    },
    {
        question: "Ce țară a fost victima invaziei germane în timpul celui de-al Doilea Război Mondial?",
        options: ["Franța", "Marea Britanie", "Polonia", "Italia"],
        correctAnswer: "Polonia"
    },
    {
        question: "Cine a fost primul rege al Angliei?",
        options: ["Henry VIII", "William I", "Edward I", "Richard I"],
        correctAnswer: "William I"
    },
    {
        question: "În ce an a avut loc Revoluția Americană?",
        options: ["1776", "1789", "1812", "1607"],
        correctAnswer: "1776"
    },
    {
        question: "Cine a fost marele lider al Imperiului Otoman în timpul bătăliei de la Mohács?",
        options: ["Süleyman Magnificul", "Mehmed al II-lea", "Selim I", "Osman I"],
        correctAnswer: "Süleyman Magnificul"
    },
    {
        question: "Care țară a fost una dintre principalele părți implicate în Tratatul de la Versailles, care a încheiat Primul Război Mondial?",
        options: ["Franța", "Germania", "Italia", "SUA"],
        correctAnswer: "Franța"
    },
    {
        question: "Cine a fost fondatorul Imperiului Roman?",
        options: ["Julius Caesar", "Augustus", "Constantin", "Trajan"],
        correctAnswer: "Augustus"
    },
    {
        question: "Care a fost perioada cunoscută ca Renașterea Europeană?",
        options: ["Secolul al XV-lea și XVI-lea", "Secolul XIX", "Secolul XVII", "Secolul XIII"],
        correctAnswer: "Secolul al XV-lea și XVI-lea"
    },
    {
        question: "Ce a însemnat semnarea Tratatului de la Versailles în 1919?",
        options: ["Încheierea Primului Război Mondial", "Începutul celui de-al Doilea Război Mondial", "Formarea Națiunilor Unite", "Destrămarea Imperiului Austro-Ungar"],
        correctAnswer: "Încheierea Primului Război Mondial"
    },
    {
        question: "Care a fost motivul principal al declanșării Războiului Civil American?",
        options: ["Abolația sclaviei", "Controlul asupra teritoriilor", "Războiul pentru independență", "Problemele economice"],
        correctAnswer: "Abolația sclaviei"
    },
    {
        question: "Care a fost cauza principală a Revoluției Franceze?",
        options: ["Lipsa drepturilor sociale și economice", "Războiul cu Anglia", "Moartea regelui Ludovic XIV", "Invazia Germaniei"],
        correctAnswer: "Lipsa drepturilor sociale și economice"
    },
    {
        question: "Care a fost efectul imediat al căderii Zidului Berlinului în 1989?",
        options: ["Reunificarea Germaniei", "Căderea regimurilor comuniste din Europa de Est", "Începerea Războiului Rece", "Crearea Uniunii Europene"],
        correctAnswer: "Reunificarea Germaniei"
    },
    {
        question: "Care a fost scopul Cruciadelor?",
        options: ["Recucerirea Ierusalimului de la musulmani", "Expansiunea Imperiului Roman", "Mărturisirea creștinismului", "Înfrângerea imperiilor islamice"],
        correctAnswer: "Recucerirea Ierusalimului de la musulmani"
    },
    {
        question: "Cine a fost principalul lider al Uniunii Sovietice în timpul celui de-al Doilea Război Mondial?",
        options: ["Leon Trotsky", "Nikita Hrușciov", "Iosif Stalin", "Mikhail Gorbachev"],
        correctAnswer: "Iosif Stalin"
    },
    {
        question: "Care a fost motivul principal pentru crearea Organizației Națiunilor Unite?",
        options: ["Păstrarea păcii mondiale", "Consolidarea regimurilor comuniste", "Promovarea democrației în Europa", "Protejarea coloniilor"],
        correctAnswer: "Păstrarea păcii mondiale"
    },
    {
        question: "Care a fost evenimentul care a marcat sfârșitul Războiului Civil American?",
        options: ["Semnarea Tratatului de la Versailles", "Războiul de Independență al Americii", "Asasinarea lui Abraham Lincoln", "Capitularea Confederației Sudiste"],
        correctAnswer: "Capitularea Confederației Sudiste"
    },
    {
        question: "Care a fost ultimul imperiu european care a renunțat la coloniile sale din Africa?",
        options: ["Imperiul Britanic", "Imperiul Francez", "Imperiul Portugaliei", "Imperiul Olandez"],
        correctAnswer: "Imperiul Portugaliei"
    },
    {
        question: "În ce an a fost semnat Tratatul de la Versailles?",
        options: ["1918", "1919", "1920", "1921"],
        correctAnswer: "1919"
    },
    {
        question: "Cine a fost primul împărat al Chinei?",
        options: ["Qin Shi Huang", "Kublai Khan", "Ming Chengzu", "Wang Mang"],
        correctAnswer: "Qin Shi Huang"
    },
    {
        question: "Ce mare regim a fost condus de Adolf Hitler?",
        options: ["Nazismul", "Comunismul", "Fascismul", "Capitalismul"],
        correctAnswer: "Nazismul"
    },
    {
        question: "Cine a fost principalul autor al Declarației de Independență a Statelor Unite?",
        options: ["Thomas Jefferson", "Benjamin Franklin", "George Washington", "John Adams"],
        correctAnswer: "Thomas Jefferson"
    },
    {
        question: "Cine a fost primul împărat al Japoniei?",
        options: ["Hirohito", "Meiji", "Naruhito", "Jimmu"],
        correctAnswer: "Jimmu"
    },
    {
        question: "În ce an s-a înființat Organizația Națiunilor Unite?",
        options: ["1945", "1948", "1950", "1955"],
        correctAnswer: "1945"
    },
    {
        question: "Care a fost cauza principală a Războiului de 30 de ani (1618-1648)?",
        options: ["Conflicte religioase", "Lupte teritoriale", "Dispute economice", "Conflict între monarhii europeni"],
        correctAnswer: "Conflicte religioase"
    },
    {
        question: "Cine a fost primul rege al Angliei după Invazia Normandă din 1066?",
        options: ["William I", "Edward Confesorul", "Henry II", "Richard I"],
        correctAnswer: "William I"
    },
    {
        question: "Cine a fost liderul Mișcării pentru Drepturile Civile din SUA în anii 1960?",
        options: ["Malcolm X", "Martin Luther King Jr.", "Rosa Parks", "Jesse Jackson"],
        correctAnswer: "Martin Luther King Jr."
    },
    {
        question: "Cine a fost primul președinte al Uniunii Sovietice?",
        options: ["Vladimir Lenin", "Nikita Hrușciov", "Iosif Stalin", "Mikhail Gorbachev"],
        correctAnswer: "Vladimir Lenin"
    },
    {
        question: "Cine a fost primul împărat roman care s-a convertit la creștinism?",
        options: ["Constantin I", "Julius Caesar", "Augustus", "Nero"],
        correctAnswer: "Constantin I"
    },
    {
        question: "Care a fost țara în care a avut loc Revoluția Rusă din 1917?",
        options: ["Ucraina", "Polonia", "Rusia", "Germania"],
        correctAnswer: "Rusia"
    },
    {
        question: "Ce eveniment a avut loc pe 28 iunie 1914?",
        options: ["Asasinarea arhiducelui Franz Ferdinand", "Căderea Imperiului Austro-Ungar", "Atacul de la Pearl Harbor", "Semnarea tratatului de la Versailles"],
        correctAnswer: "Asasinarea arhiducelui Franz Ferdinand"
    },
    {
        question: "Cine a fost primul mare conducător al Imperiului Mongol?",
        options: ["Genghis Khan", "Kublai Khan", "Tamerlan", "Batu Khan"],
        correctAnswer: "Genghis Khan"
    },
    {
        question: "Care a fost primul imperiu care a intrat în conflict cu Roma Antică?",
        options: ["Carpații", "Imperiul Perșilor", "Imperiul Egiptean", "Imperiul Bizantin"],
        correctAnswer: "Imperiul Perșilor"
    },
    {
        question: "În ce an a început Războiul din Vietnam?",
        options: ["1954", "1965", "1962", "1970"],
        correctAnswer: "1965"
    },
    {
        question: "Cine a fost conducătorul Imperiului Aztec?",
        options: ["Moctezuma II", "Atahualpa", "Pizarro", "Hernán Cortés"],
        correctAnswer: "Moctezuma II"
    },
    {
        question: "Care a fost perioada care a marcat domnia lui Napoleon Bonaparte?",
        options: ["1799-1815", "1801-1825", "1789-1804", "1815-1848"],
        correctAnswer: "1799-1815"
    },
    {
        question: "Care a fost evenimentul care a dus la începutul celui de-al Doilea Război Mondial?",
        options: ["Atacul asupra Poloniei de către Germania", "Atacul asupra Pearl Harbor", "Căderea Franței", "Semnarea Pactului Molotov-Ribbentrop"],
        correctAnswer: "Atacul asupra Poloniei de către Germania"
    },
    {
        question: "Care a fost principala cauză a crizei economice din 1929?",
        options: ["Criza datoriilor suverane", "Căderea pieței de valori", "Al Doilea Război Mondial", "Lipsa resurselor naturale"],
        correctAnswer: "Căderea pieței de valori"
    },
    {
        question: "Care a fost anul în care a avut loc Revoluția Franceză?",
        options: ["1789", "1791", "1792", "1804"],
        correctAnswer: "1789"
    },
    {
        question: "Cine a fost prim-ministrul Marii Britanii în timpul celui de-al Doilea Război Mondial?",
        options: ["Winston Churchill", "Clement Attlee", "Neville Chamberlain", "Tony Blair"],
        correctAnswer: "Winston Churchill"
    },
    {
        question: "Cine a fondat Imperiul Carolingian?",
        options: ["Charlemagne", "Clovis I", "Pepin cel Scurt", "Louis cel Pios"],
        correctAnswer: "Charlemagne"
    },
    {
        question: "În ce an a avut loc asasinarea lui John F. Kennedy?",
        options: ["1963", "1965", "1968", "1970"],
        correctAnswer: "1963"
    },
    {
        question: "Care a fost cauza principală a prăbușirii Imperiului Roman de Apus?",
        options: ["Invaziile barbare", "Lipsa resurselor financiare", "Propriile conflicte interne", "Căderea Imperiului Bizantin"],
        correctAnswer: "Invaziile barbare"
    },
    {
        question: "Care a fost primul război global din istorie?",
        options: ["Primul Război Mondial", "Al Doilea Război Mondial", "Războiul din Vietnam", "Războiul Crimeii"],
        correctAnswer: "Primul Război Mondial"
    },
    {
        question: "Care a fost primul popor care a descoperit America înaintea lui Columb?",
        options: ["Vikingii", "Aztecii", "Irochezii", "Columbianii"],
        correctAnswer: "Vikingii"
    }
];


const MathQuestions = [

    {
        question: "Care este suma unui unghi intern și a unui unghi extern într-un triunghi?",
        options: ["180°", "90°", "360°", "270°"],
        correctAnswer: "180°"
    },
    {
        question: "Care este valoarea expresiei 5^3 - 4^3?",
        options: ["61", "125", "30", "49"],
        correctAnswer: "61"
    },
    {
        question: "Cât face ∫x² dx de la 0 la 2?",
        options: ["8/3", "6", "10/3", "4"],
        correctAnswer: "8/3"
    },
    {
        question: "Care este valoarea lui cos(45°)?",
        options: ["√2/2", "1", "√3/2", "0"],
        correctAnswer: "√2/2"
    },
    {
        question: "Care este derivata funcției f(x) = sin(x)?",
        options: ["cos(x)", "-cos(x)", "sin(x)", "tan(x)"],
        correctAnswer: "cos(x)"
    },
    {
        question: "Care este valoarea expresiei 1/(x - 1) pentru x = 2?",
        options: ["1", "2", "3", "-1"],
        correctAnswer: "1"
    },
    {
        question: "Cum se numește un poligon cu 10 laturi?",
        options: ["Decagon", "Heptagon", "Nonagon", "Pentagon"],
        correctAnswer: "Decagon"
    },
    {
        question: "Ce este un număr prim?",
        options: ["Un număr care are exact 2 divizori", "Un număr care are mai mult de 2 divizori", "Un număr care este divizibil cu 3", "Un număr care se împarte la 2"],
        correctAnswer: "Un număr care are exact 2 divizori"
    },
    {
        question: "Cât face 3x² - 2x + 1 atunci când x = 2?",
        options: ["11", "12", "13", "10"],
        correctAnswer: "11"
    },
    {
        question: "Care este valoarea ecuației x² + 6x + 9 = 0?",
        options: ["x = -3", "x = 3", "x = 0", "x = -1"],
        correctAnswer: "x = -3"
    },
    {
        question: "Care este soluția ecuației log(x) = 2?",
        options: ["x = 100", "x = 10", "x = 1", "x = 0"],
        correctAnswer: "x = 100"
    },
    {
        question: "Ce reprezintă teorema lui Pitagora?",
        options: ["a² + b² = c²", "x² + y² = z²", "a + b = c", "a = b"],
        correctAnswer: "a² + b² = c²"
    },
    {
        question: "Care este valoarea expresiei 4 + 6 ÷ 2 × 3?",
        options: ["13", "12", "15", "14"],
        correctAnswer: "13"
    },
    {
        question: "Care este valoarea expresiei 7 × (4 + 5) ÷ 3?",
        options: ["21", "15", "22", "18"],
        correctAnswer: "21"
    },
    {
        question: "Care este valoarea soluției ecuației x² - 7x + 10 = 0?",
        options: ["x = 5 și x = 2", "x = 3 și x = -2", "x = 4 și x = -3", "x = 6 și x = -1"],
        correctAnswer: "x = 5 și x = 2"
    },
    {
        question: "Cât face 6! / 4! ?",
        options: ["30", "36", "60", "720"],
        correctAnswer: "30"
    },
    {
        question: "Care este numărul de permutări posibile pentru 3 elemente?",
        options: ["6", "3", "9", "5"],
        correctAnswer: "6"
    },
    {
        question: "Cât face √(49 + 16)?",
        options: ["√65", "√50", "√81", "√25"],
        correctAnswer: "√65"
    },
    {
        question: "Care este valoarea derivatei funcției f(x) = ln(x)?",
        options: ["1/x", "x", "x²", "e^x"],
        correctAnswer: "1/x"
    },
    {
        question: "Care este valoarea ecuației x² + 5x + 6 = 0?",
        options: ["x = -2 și x = -3", "x = -3 și x = 2", "x = 3 și x = -2", "x = 2 și x = 3"],
        correctAnswer: "x = -2 și x = -3"
    },
    {
        question: "Care este valoarea integralei ∫1/x dx?",
        options: ["ln(x) + C", "x + C", "1/x + C", "x² + C"],
        correctAnswer: "ln(x) + C"
    },
    {
        question: "Care este suma unghiurilor interne ale unui dodecaedru?",
        options: ["1800°", "1080°", "1440°", "360°"],
        correctAnswer: "1800°"
    },
    {
        question: "Cât face 8 ÷ 2 × (2 + 2)?",
        options: ["16", "8", "12", "4"],
        correctAnswer: "16"
    },
    {
        question: "Ce număr se află la mijloc între 10 și 20?",
        options: ["15", "12", "14", "13"],
        correctAnswer: "15"
    },
    {
        question: "Care este soluția ecuației x² - 4x + 3 = 0?",
        options: ["x = 3 și x = 1", "x = 2 și x = 2", "x = 1 și x = -3", "x = 3 și x = -1"],
        correctAnswer: "x = 3 și x = 1"
    },
    {
        question: "Care este valoarea expresiei 2 + 2 × 2?",
        options: ["6", "8", "4", "10"],
        correctAnswer: "6"
    },
    {
        question: "Care este valoarea integralei ∫x dx?",
        options: ["(x²)/2 + C", "(x³)/3 + C", "(x²)/3 + C", "(x³)/2 + C"],
        correctAnswer: "(x²)/2 + C"
    },
    {
        question: "Care este valoarea soluției ecuației x³ - 3x² + 2x = 0?",
        options: ["x = 0, 2, -1", "x = 1, 2, 3", "x = -1, 1, 3", "x = 0, -1, 1"],
        correctAnswer: "x = 0, 2, -1"
    },
    {
        question: "Care este soluția ecuației x² + 2x - 8 = 0?",
        options: ["x = -4 și x = 2", "x = 4 și x = -2", "x = -2 și x = 4", "x = -2 și x = 3"],
        correctAnswer: "x = -4 și x = 2"
    },
    {
        question: "Care este formula pentru suma unui șir geometric?",
        options: ["S = a(1 - r^n)/(1 - r)", "S = a/(1 - r)", "S = (a + b) / 2", "S = r² + a"],
        correctAnswer: "S = a(1 - r^n)/(1 - r)"
    },
    {
        question: "Ce număr obținem dacă înmulțim 5! cu 3?",
        options: ["360", "120", "30", "60"],
        correctAnswer: "360"
    },
    {
        question: "Cât face 8 × (4 + 6)?",
        options: ["80", "72", "40", "64"],
        correctAnswer: "80"
    },
    {
        question: "Care este valoarea expresiei 2sin(45°)?",
        options: ["√2", "√3", "1", "0.5"],
        correctAnswer: "√2"
    },
    {
        question: "Care este valoarea expresiei (x + 5)(x - 5)?",
        options: ["x² - 25", "x² + 25", "x² - 5", "x² + 5"],
        correctAnswer: "x² - 25"
    },
    {
        question: "Care este valoarea soluției ecuației 3x + 9 = 0?",
        options: ["x = -3", "x = 3", "x = 0", "x = -9"],
        correctAnswer: "x = -3"
    },
    {
        question: "Care este valoarea lui π (aproximativ)?",
        options: ["3.14159", "3.14", "3", "2.72"],
        correctAnswer: "3.14159"
    },
    {
        question: "Care este valoarea soluției ecuației x² - 9 = 0?",
        options: ["x = 3 și x = -3", "x = 9 și x = -9", "x = 0", "x = 1 și x = -1"],
        correctAnswer: "x = 3 și x = -3"
    },

    {
        question: "Care este valoarea lui √(144)?",
        options: ["12", "14", "16", "10"],
        correctAnswer: "12"
    },
    {
        question: "Cât face 2^5?",
        options: ["32", "25", "30", "40"],
        correctAnswer: "32"
    },
    {
        question: "Care este derivata funcției f(x) = 3x^3?",
        options: ["9x^2", "6x^2", "3x^2", "12x^2"],
        correctAnswer: "9x^2"
    },
    {
        question: "Care este valoarea lui log(1000)?",
        options: ["3", "2", "1", "4"],
        correctAnswer: "3"
    },
    {
        question: "Care este limita lui lim(x→∞) (1/x)?",
        options: ["0", "∞", "1", "-1"],
        correctAnswer: "0"
    },
    {
        question: "Cât face 7! (7 factorial)?",
        options: ["5040", "4032", "10080", "720"],
        correctAnswer: "5040"
    },
    {
        question: "Cât face integrala ∫x² dx?",
        options: ["(x³)/3 + C", "(x⁴)/4 + C", "(x³)/2 + C", "(x²)/3 + C"],
        correctAnswer: "(x³)/3 + C"
    },
    {
        question: "Care este suma unghiurilor într-un octogon?",
        options: ["1080°", "720°", "900°", "1350°"],
        correctAnswer: "1080°"
    },
    {
        question: "Care este formula pentru volumul unui cilindru?",
        options: ["πr²h", "2πrh", "πr³", "πr²h²"],
        correctAnswer: "πr²h"
    },
    {
        question: "Cât face 5 + 6 × (4 + 2)?",
        options: ["41", "40", "32", "42"],
        correctAnswer: "41"
    },
    {
        question: "Cât face 4 + 5 × 3 ÷ 2?",
        options: ["11.5", "10.5", "12", "13"],
        correctAnswer: "11.5"
    },
    {
        question: "Ce reprezintă funcția cos(x)?",
        options: ["Proiecția pe axa orizontală", "Proiecția pe axa verticală", "Amplitudinea unui val sinusoidal", "Mărimea unghiului"],
        correctAnswer: "Proiecția pe axa orizontală"
    },
    {
        question: "Care este rădăcina pătrată a lui 625?",
        options: ["25", "35", "45", "50"],
        correctAnswer: "25"
    },
    {
        question: "Care este valoarea expresiei 9^(2/3)?",
        options: ["27", "81", "6", "3"],
        correctAnswer: "27"
    },
    {
        question: "Care este formula pentru aria unui trapez?",
        options: ["(b1 + b2)h / 2", "(b1 - b2)h / 2", "b1h", "(b1 + b2)² / 2"],
        correctAnswer: "(b1 + b2)h / 2"
    },
    {
        question: "Ce reprezintă integrală de ordinul 2?",
        options: ["Aria sub curba funcției", "Raportul dintre două valori", "Proprietatea derivării", "Panta tangentei la curbă"],
        correctAnswer: "Aria sub curba funcției"
    },
    {
        question: "Care este valoarea soluției ecuației x² - 5x + 6 = 0?",
        options: ["3 și 2", "6 și 1", "2 și -3", "1 și -6"],
        correctAnswer: "3 și 2"
    },
    {
        question: "Care este derivata funcției f(x) = e^x?",
        options: ["e^x", "x^2", "x", "1"],
        correctAnswer: "e^x"
    },
    {
        question: "Care este valoarea expresiei 2sin(π/4)?",
        options: ["√2", "1", "√3/2", "2"],
        correctAnswer: "√2"
    },
    {
        question: "Care este suma interioră a unui dodecaedru?",
        options: ["1800°", "1440°", "1080°", "1200°"],
        correctAnswer: "1800°"
    },
    {
        question: "Ce reprezintă funcția logaritmică log(x)?",
        options: ["Rădăcina unui număr", "Puterea unui număr", "Inversul unei funcții exponențiale", "Frecvența unui val sinusoidal"],
        correctAnswer: "Inversul unei funcții exponențiale"
    },
    {
        question: "Care este valoarea expresiei 10^3 × 10^2?",
        options: ["10^5", "10^6", "10^4", "10^7"],
        correctAnswer: "10^5"
    },
    {
        question: "Care este determinatul matricei [1, 2; 3, 4]?",
        options: ["-2", "2", "4", "0"],
        correctAnswer: "-2"
    },
    {
        question: "Care este valoarea lui tan(π/4)?",
        options: ["1", "0", "-1", "√3"],
        correctAnswer: "1"
    },
    {
        question: "Care este suma primelor 10 numere naturale?",
        options: ["55", "45", "65", "60"],
        correctAnswer: "55"
    },
    {
        question: "Cât face cos(60°)?",
        options: ["0.5", "1", "0.25", "0.75"],
        correctAnswer: "0.5"
    },
    {
        question: "Care este valoarea expresiei (4 + 3)²?",
        options: ["49", "7", "16", "25"],
        correctAnswer: "49"
    },
    {
        question: "Care este volumul unei sfere cu raza de 6 cm?",
        options: ["904.32 cm³", "500 cm³", "144.72 cm³", "288.72 cm³"],
        correctAnswer: "904.32 cm³"
    },
    {
        question: "Care este diferența dintre 8x^2 și 4x^2?",
        options: ["4x²", "12x²", "8x²", "6x²"],
        correctAnswer: "4x²"
    },
    {
        question: "Care este formula pentru aria unei elipse?",
        options: ["πab", "πa²b", "2πab", "πa + b"],
        correctAnswer: "πab"
    },
    {
        question: "Care este volumul unui con cu raza de 5 cm și înălțimea de 10 cm?",
        options: ["π × 25 × 10 / 3", "50π", "100π", "25π"],
        correctAnswer: "π × 25 × 10 / 3"
    },
    {
        question: "Care este valoarea expresiei log(10^3)?",
        options: ["3", "1000", "2", "5"],
        correctAnswer: "3"
    },
    {
        question: "Care este valoarea expresiei 3(5 + 2) - 4?",
        options: ["17", "20", "18", "21"],
        correctAnswer: "17"
    },
    {
        question: "Care este valoarea lui sin(π/6)?",
        options: ["0.5", "0.25", "0.75", "1"],
        correctAnswer: "0.5"
    },
    {
        question: "Ce este un număr complex?",
        options: ["Un număr care conține o parte reală și o parte imaginară", "Un număr rațional", "Un număr irațional", "Un număr care poate fi divizat doar cu 1 și el însuși"],
        correctAnswer: "Un număr care conține o parte reală și o parte imaginară"
    },
    {
        question: "Care este valoarea 1 + √3 × (1 - √3)?",
        options: ["1", "2", "3", "4"],
        correctAnswer: "1"
    },
    {
        question: "Care este valoarea unui unghi de 270° în radiani?",
        options: ["3π/2", "π/3", "π/2", "π"],
        correctAnswer: "3π/2"
    },
    {
        question: "Ce este o funcție bijectivă?",
        options: ["O funcție care este atât injectivă cât și surjectivă", "O funcție care nu are invers", "O funcție care este continuă", "O funcție care este derivabilă"],
        correctAnswer: "O funcție care este atât injectivă cât și surjectivă"
    },
    {
        question: "Care este valoarea soluției ecuației x³ + 5x² - 6x = 0?",
        options: ["x = 0, -1, 6", "x = -3, 2, 0", "x = 0, -2, 3", "x = 1, -5, 3"],
        correctAnswer: "x = 0, -1, 6"
    },
    {
        question: "Ce reprezintă ecuația lui Euler?",
        options: ["e^(iπ) + 1 = 0", "x² + y² = z²", "ax² + bxy + cy² = 0", "y = mx + b"],
        correctAnswer: "e^(iπ) + 1 = 0"
    }
];


const sportQuestions = [
    {
        question: "Care este sportul național al Japoniei?",
        options: ["Sumo", "Karate", "Baseball", "Fotbal"],
        correctAnswer: "Sumo"
    },
    {
        question: "Cine detine recordul pentru cele mai multe goluri marcate într-un meci de fotbal la nivel de selecționată?",
        options: ["Cristiano Ronaldo", "Lionel Messi", "Ali Daei", "Pelé"],
        correctAnswer: "Cristiano Ronaldo"
    },
    {
        question: "Care este numele stadionului echipei FC Barcelona?",
        options: ["Old Trafford", "Camp Nou", "Santiago Bernabéu", "Anfield"],
        correctAnswer: "Camp Nou"
    },
    {
        question: "Care este sportul care se joacă cu o minge ovală și este popular în Marea Britanie?",
        options: ["Rugby", "Cricket", "Fotbal", "Hochei pe iarbă"],
        correctAnswer: "Rugby"
    },
    {
        question: "Cine a câștigat turneul de tenis Wimbledon în 2021?",
        options: ["Roger Federer", "Novak Djokovic", "Rafael Nadal", "Andy Murray"],
        correctAnswer: "Novak Djokovic"
    },
    {
        question: "În ce an a avut loc primul Campionat Mondial de Fotbal?",
        options: ["1930", "1924", "1950", "1962"],
        correctAnswer: "1930"
    },
    {
        question: "Cine este cunoscut ca 'Regele fotbalului'?",
        options: ["Diego Maradona", "Cristiano Ronaldo", "Pelé", "Lionel Messi"],
        correctAnswer: "Pelé"
    },
    {
        question: "Care este sportul practicat la Jocurile Olimpice sub apă?",
        options: ["Volei subacvatic", "Scufundări sincronizate", "Hockey pe gheață", "Hochei subacvatic"],
        correctAnswer: "Hochei subacvatic"
    },
    {
        question: "Cine deține recordul pentru cele mai multe medalii olimpice câștigate?",
        options: ["Michael Phelps", "Usain Bolt", "Larisa Latynina", "Paavo Nurmi"],
        correctAnswer: "Michael Phelps"
    },
    {
        question: "În ce sport se joacă 'scorul 15-30-40'?",
        options: ["Basketball", "Volei", "Tenis", "Handbal"],
        correctAnswer: "Tenis"
    },
    {
        question: "Cine este considerat cel mai mare jucător de fotbal din istorie?",
        options: ["Cristiano Ronaldo", "Lionel Messi", "Pelé", "Diego Maradona"],
        correctAnswer: "Pelé"
    },
    {
        question: "Ce sport se joacă cu un disc și este popular pe plajă?",
        options: ["Frisbee", "Volei pe plajă", "Hochei pe iarbă", "Rugby"],
        correctAnswer: "Frisbee"
    },
    {
        question: "Cine este cunoscut pentru expresia 'Goat' în lumea sportului?",
        options: ["Cristiano Ronaldo", "Michael Jordan", "Usain Bolt", "Tom Brady"],
        correctAnswer: "Cristiano Ronaldo"
    },
    {
        question: "Cine este cea mai mare campioană olimpică la gimnastică?",
        options: ["Simone Biles", "Nadia Comăneci", "Larisa Latynina", "Maria Olaru"],
        correctAnswer: "Simone Biles"
    },
    {
        question: "În ce an a avut loc primul Super Bowl?",
        options: ["1967", "1968", "1970", "1972"],
        correctAnswer: "1967"
    },
    {
        question: "Care este cel mai rapid animal care participă la cursele de câini?",
        options: ["Greyhound", "Labrador", "Beagle", "Poodle"],
        correctAnswer: "Greyhound"
    },
    {
        question: "Cine deține recordul mondial pentru cele mai multe titluri de Formula 1?",
        options: ["Lewis Hamilton", "Michael Schumacher", "Ayrton Senna", "Sebastian Vettel"],
        correctAnswer: "Michael Schumacher"
    },
    {
        question: "În ce an a avut loc primul meci al Ligii Naționale de Fotbal American?",
        options: ["1920", "1932", "1945", "1955"],
        correctAnswer: "1920"
    },
    {
        question: "Care este sportul în care se joacă 'slam dunk'?",
        options: ["Volei", "Fotbal", "Baschet", "Hochei pe gheață"],
        correctAnswer: "Baschet"
    },
    {
        question: "Cine a câștigat Cupa Mondială de Fotbal în 1998?",
        options: ["Brazilia", "Franța", "Germania", "Argentina"],
        correctAnswer: "Franța"
    },
    {
        question: "Care este cel mai mare turneu de tenis din lume?",
        options: ["Roland Garros", "Wimbledon", "US Open", "Australian Open"],
        correctAnswer: "Wimbledon"
    },
    {
        question: "Cine deține recordul pentru cele mai multe victorii în MotoGP?",
        options: ["Valentino Rossi", "Marc Márquez", "Jorge Lorenzo", "Mick Doohan"],
        correctAnswer: "Valentino Rossi"
    },
    {
        question: "Ce echipă de fotbal a câștigat cele mai multe trofee UEFA Champions League?",
        options: ["FC Barcelona", "Real Madrid", "Bayern Munchen", "AC Milan"],
        correctAnswer: "Real Madrid"
    },
    {
        question: "Care este jucătorul cu cele mai multe titluri de Grand Slam la tenis?",
        options: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Pete Sampras"],
        correctAnswer: "Roger Federer"
    },
    {
        question: "Cine a câștigat Cupa Mondială de Fotbal în 2006?",
        options: ["Italia", "Brazilia", "Germania", "Franța"],
        correctAnswer: "Italia"
    },
    {
        question: "În ce sport se joacă 'scrimă'?",
        options: ["Volei", "Fotbal", "Baschet", "Scrimă"],
        correctAnswer: "Scrimă"
    },
    {
        question: "Care este țara cu cele mai multe titluri la Cupa Mondială de Fotbal?",
        options: ["Germania", "Brazilia", "Italia", "Argentina"],
        correctAnswer: "Brazilia"
    },
    {
        question: "Ce sport se joacă cu o minge mare și ușoară și două echipe se întrec să o plaseze în coșuri?",
        options: ["Baschet", "Volei", "Hochei", "Rugby"],
        correctAnswer: "Baschet"
    },
    {
        question: "Care este sportul în care se joacă 'hockey pe gheață'?",
        options: ["Fotbal", "Rugby", "Hochei pe gheață", "Cricket"],
        correctAnswer: "Hochei pe gheață"
    },
    {
        question: "În ce țară se află stadionul de fotbal Old Trafford?",
        options: ["Anglia", "Spania", "Germania", "Franța"],
        correctAnswer: "Anglia"
    },
    {
        question: "Care este sportul în care se joacă 'triatlon'?",
        options: ["Înot", "Ciclism", "Maraton", "Triatlon"],
        correctAnswer: "Triatlon"
    },
    {
        question: "Care este cel mai mare eveniment sportiv din lume?",
        options: ["Cupa Mondială", "Super Bowl", "Jocurile Olimpice", "Tour de France"],
        correctAnswer: "Jocurile Olimpice"
    },
    {
        question: "În ce an s-a înființat Formula 1?",
        options: ["1945", "1950", "1960", "1970"],
        correctAnswer: "1950"
    },
    {
        question: "Care este sportul în care se joacă 'curling'?",
        options: ["Hochei pe gheață", "Scrimă", "Curling", "Baschet"],
        correctAnswer: "Curling"
    },
    {
        question: "Cine a câștigat Tour de France de cele mai multe ori?",
        options: ["Eddy Merckx", "Bernard Hinault", "Lance Armstrong", "Miguel Indurain"],
        correctAnswer: "Eddy Merckx"
    },
    {
        question: "Care este echipa de fotbal cu cele mai multe titluri de La Liga?",
        options: ["Real Madrid", "Barcelona", "Atletico Madrid", "Sevilla"],
        correctAnswer: "Real Madrid"
    },
    {
        question: "În ce sport se joacă 'cross-country'?",
        options: ["Hochei", "Fotbal", "Ciclism", "Atletism"],
        correctAnswer: "Atletism"
    },
    {
        question: "Care este cel mai rapid sport cu motor?",
        options: ["Formula 1", "MotoGP", "IndyCar", "Nascar"],
        correctAnswer: "Formula 1"
    }
];


const geographyQuestions = [
    {
        question: "Care este capitala Franței?",
        options: ["Paris", "Berlin", "Roma", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "Care este cel mai lung fluviu din lume?",
        options: ["Amazon", "Nil", "Yangtze", "Mississippi"],
        correctAnswer: "Amazon"
    },
    {
        question: "Ce țară este cunoscută sub numele de 'Țara Soarelui Răsare'?",
        options: ["China", "Coreea de Sud", "Japonia", "Thailanda"],
        correctAnswer: "Japonia"
    },
    {
        question: "Care este cea mai mare insulă din lume?",
        options: ["Greenland", "Australia", "Madagascar", "Borneo"],
        correctAnswer: "Greenland"
    },
    {
        question: "Ce mare este situată între Europa și Africa?",
        options: ["Marea Roșie", "Marea Baltică", "Marea Mediterană", "Marea Nordului"],
        correctAnswer: "Marea Mediterană"
    },
    {
        question: "Care este țara cu cea mai mare populație din lume?",
        options: ["China", "India", "Statele Unite", "Indonezia"],
        correctAnswer: "China"
    },
    {
        question: "În ce continent se află țara Brazilia?",
        options: ["Africa", "America de Nord", "America de Sud", "Asia"],
        correctAnswer: "America de Sud"
    },
    {
        question: "Care este cel mai înalt munte din lume?",
        options: ["K2", "Mont Blanc", "Everest", "Makalu"],
        correctAnswer: "Everest"
    },
    {
        question: "Care este cel mai mare lac din lume ca suprafață?",
        options: ["Lacul Caspic", "Lacul Superior", "Lacul Victoria", "Lacul Baikal"],
        correctAnswer: "Lacul Caspic"
    },
    {
        question: "În ce țară se află Marele Zid Chinezesc?",
        options: ["China", "Coreea de Sud", "Japonia", "India"],
        correctAnswer: "China"
    },
    {
        question: "Ce ocean se află la est de Africa?",
        options: ["Oceanul Indian", "Oceanul Atlantic", "Oceanul Pacific", "Oceanul Arctic"],
        correctAnswer: "Oceanul Indian"
    },
    {
        question: "Care este cel mai mic stat din lume?",
        options: ["Vatican", "Monaco", "Nauru", "San Marino"],
        correctAnswer: "Vatican"
    },
    {
        question: "Care este capitala Egiptului?",
        options: ["Cairo", "Alexandria", "Luxor", "Giza"],
        correctAnswer: "Cairo"
    },
    {
        question: "În ce țară se află cel mai mare vulcan activ din lume, Mauna Loa?",
        options: ["Statele Unite ale Americii", "Indonezia", "Japonia", "Chile"],
        correctAnswer: "Statele Unite ale Americii"
    },
    {
        question: "Care este cel mai mare oraș din Australia?",
        options: ["Sydney", "Melbourne", "Brisbane", "Perth"],
        correctAnswer: "Sydney"
    },
    {
        question: "Ce mare separă Europa de Asia?",
        options: ["Marea Mediterană", "Marea Baltică", "Marea Caspică", "Marea Nordului"],
        correctAnswer: "Marea Caspică"
    },
    {
        question: "În ce țară se află Muntele Kilimanjaro?",
        options: ["Kenya", "Tanzania", "Uganda", "Eritreea"],
        correctAnswer: "Tanzania"
    },
    {
        question: "Ce țară are cele mai multe insule?",
        options: ["Suedia", "Indonezia", "Grecia", "Filipine"],
        correctAnswer: "Suedia"
    },
    {
        question: "Care este cea mai mare țară din Europa?",
        options: ["Rusia", "Franța", "Spania", "Ucraina"],
        correctAnswer: "Rusia"
    },
    {
        question: "Care este cel mai adânc lac din lume?",
        options: ["Lacul Baikal", "Lacul Superior", "Lacul Titicaca", "Marea Moartă"],
        correctAnswer: "Lacul Baikal"
    },
    {
        question: "Care este capitala Italiei?",
        options: ["Roma", "Milano", "Veneția", "Florenta"],
        correctAnswer: "Roma"
    },
    {
        question: "Ce țară are cea mai mare rețea feroviară din lume?",
        options: ["Statele Unite ale Americii", "Rusia", "India", "China"],
        correctAnswer: "Rusia"
    },
    {
        question: "Care este țara cu cel mai înalt punct al său la nivelul mării?",
        options: ["Nepal", "Chile", "India", "Tajikistan"],
        correctAnswer: "Nepal"
    },
    {
        question: "Care este capitala Canadei?",
        options: ["Ottawa", "Toronto", "Vancouver", "Montreal"],
        correctAnswer: "Ottawa"
    },
    {
        question: "În ce țară se află ruinele orașului Petra?",
        options: ["Egipt", "Irak", "Iordania", "Siria"],
        correctAnswer: "Iordania"
    },
    {
        question: "Care este cel mai mare oraș din Brazilia?",
        options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
        correctAnswer: "São Paulo"
    },
    {
        question: "Ce continent are cele mai multe țări?",
        options: ["Africa", "Asia", "Europa", "America de Sud"],
        correctAnswer: "Africa"
    },
    {
        question: "Care este capitala Suediei?",
        options: ["Stockholm", "Helsinki", "Oslo", "Copenhaga"],
        correctAnswer: "Stockholm"
    },
    {
        question: "Care este cel mai mic ocean?",
        options: ["Oceanul Arctic", "Oceanul Indian", "Oceanul Pacific", "Oceanul Atlantic"],
        correctAnswer: "Oceanul Arctic"
    },
    {
        question: "Care este capitala Rusiei?",
        options: ["Moscova", "Sankt Petersburg", "Kazan", "Novosibirsk"],
        correctAnswer: "Moscova"
    },
    {
        question: "În ce țară se află insula Bora Bora?",
        options: ["Tahiti", "Polinezia Franceză", "Fiji", "Vanuatu"],
        correctAnswer: "Polinezia Franceză"
    },
    {
        question: "Care este cel mai mare deșert din lume?",
        options: ["Sahara", "Arabian", "Karakum", "Gobi"],
        correctAnswer: "Sahara"
    },
    {
        question: "Ce țară este cunoscută pentru Marele Canal?",
        options: ["Egipt", "China", "Indonezia", "Olanda"],
        correctAnswer: "China"
    },
    {
        question: "Ce țară are cea mai lungă graniță cu Statele Unite ale Americii?",
        options: ["Canada", "Mexic", "Cuba", "Guatemala"],
        correctAnswer: "Canada"
    },
    {
        question: "În ce țară se află insula Madagascar?",
        options: ["Kenya", "Mozambic", "Mauritius", "India"],
        correctAnswer: "Mozambic"
    },
    {
        question: "Care este capitala Argentinei?",
        options: ["Buenos Aires", "Montevideo", "Lima", "Brasília"],
        correctAnswer: "Buenos Aires"
    },
    {
        question: "În ce țară se află Canionul Grand?",
        options: ["Statele Unite ale Americii", "Mexic", "Canada", "Brazilia"],
        correctAnswer: "Statele Unite ale Americii"
    },
    {
        question: "Care este cel mai mare oraș din Africa?",
        options: ["Lagos", "Cairo", "Kinshasa", "Johannesburg"],
        correctAnswer: "Lagos"
    },
    {
        question: "Ce ocean se află la vest de Statele Unite ale Americii?",
        options: ["Oceanul Atlantic", "Oceanul Pacific", "Oceanul Indian", "Oceanul Arctic"],
        correctAnswer: "Oceanul Pacific"
    },
    {
        question: "Care este cel mai înalt vârf din America de Nord?",
        options: ["Denali", "Mount Logan", "Mount Rainier", "Mount McKinley"],
        correctAnswer: "Denali"
    },
    {
        question: "În ce țară se află Muntele Fuji?",
        options: ["Coreea de Sud", "China", "Japonia", "Indonezia"],
        correctAnswer: "Japonia"
    },
    {
        question: "Care este cel mai mare port din lume?",
        options: ["Portul Shanghai", "Portul Rotterdam", "Portul Singapur", "Portul Los Angeles"],
        correctAnswer: "Portul Shanghai"
    },
    {
        question: "Care este cel mai adânc punct de pe Pământ?",
        options: ["Groapa Marianelor", "Marea Moartă", "Lacul Baikal", "Deșertul Atacama"],
        correctAnswer: "Groapa Marianelor"
    },
    {
        question: "Care este cel mai mare munte din Africa?",
        options: ["Kilimanjaro", "Mount Kenya", "Mount Rwenzori", "Mount Elgon"],
        correctAnswer: "Kilimanjaro"
    },
    {
        question: "Care este capitala Thailandei?",
        options: ["Bangkok", "Chiang Mai", "Phuket", "Pattaya"],
        correctAnswer: "Bangkok"
    },
    {
        question: "Care este capitala Danemarcei?",
        options: ["Copenhaga", "Aarhus", "Odense", "Esbjerg"],
        correctAnswer: "Copenhaga"
    },
    {
        question: "Care este cel mai înalt vârf din Alpi?",
        options: ["Mont Blanc", "Matterhorn", "Monte Rosa", "Dufourspitze"],
        correctAnswer: "Mont Blanc"
    },
    {
        question: "Ce țară se află pe cel mai mare continent, Asia?",
        options: ["China", "India", "Rusia", "Australia"],
        correctAnswer: "China"
    },
    {
        question: "Ce țară are cea mai mare peninsulă?",
        options: ["Rusia", "Canada", "Arabia Saudită", "Alaska"],
        correctAnswer: "Arabia Saudită"
    }
];
