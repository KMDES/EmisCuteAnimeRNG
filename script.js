//Javascript for Emi's Cute Anime Random Number Generator


//TODO: If generation is taking too long add a for loop break (say generation took too long) Eats up a huge amount of memory
//TODO: see if can clear memory after generating
//TODO: Add website icon

    const generatedNumbersTextField = document.body.appendChild(document.createElement("div"));
    //var clearTextButton = document.body.appendChild(document.createElement('button'));
    const minTextField = document.body.appendChild(document.createElement("input"));
    const maxTextField = document.body.appendChild(document.createElement("input"));
    const generateTotalTextField = document.body.appendChild(document.createElement("input"));
    const generateButton = document.body.appendChild(document.createElement('button'));
    const randomNumberCopyButton = document.body.appendChild(document.createElement('button'));
    const notifyCopied = document.body.appendChild(document.createElement('button'));
    
    //var darkMode;
    const dance = document.createElement("img");
    const darkModeIcon = document.createElement("img");
    var darkModeState = true;
    var generatedNumberArray = [];
    var totalAmountOfGeneratedNumbers;
    
    const body = document.body;
    const darkModeButton = document.getElementById('darkModeIcon');
    
    window.onload = function () {
        makeTextField();
        //createClearTextButton();
        createGenerateButton();
        dance.src = "pictures/frieren-dance-1.gif";
        darkModeIcon.src = "pictures/dark-mode.png";
        addDarkMode();
    };
    
    function populateElements(element, id, className, innerHTML){
        element.id = id;
        element.className = className;
        element.innerHTML = innerHTML;
    }
    
    function populateTextFields(textField, id, className, setAttributeValue){
        textField.id = id;
        textField.className = className;
        textField.setAttribute("value", setAttributeValue);
        textField.addEventListener('click', function () {
            clearTextField(id);
        });
    }
    
    /*function createClearTextButton() {
        populateElements(clearTextButton, "clearTextButton", "ClearTextButton", "Clear Text Fields");
        clearTextButton.addEventListener('click', function () {
            clearTextField("minTextField");
            clearTextField("maxTextField");
            clearTextField("generateTotalTextField");
        });
    }*/
    
    function createGenerateButton() {
        populateElements(generateButton, "generateButton", "GenerateButton", "Generate Cute Anime Random Number List");
        generateButton.addEventListener("click", function () {
            acceptConfigRandomNumbers();
        });
    }

    function makeTextField() {
        const minTextFieldID = document.getElementById("MIN");
        const maxTextFieldID = document.getElementById("MAX");
        const generateTotalTextFieldID = document.getElementById("GENERATETOTAL");
        populateTextFields(minTextField, "minTextField", "MinimumTextField", "Minimum number Emi!");
        populateTextFields(maxTextField, "maxTextField", "MaximumTextField", "Maximum number Emi!");
        populateTextFields(generateTotalTextField, "generateTotalTextField", "GenerateTotalTextField", "How many numbers do you want Emi?");
        //populateTextFields(generatedNumbersTextField, "generatedNumbersTextField", "GeneratedNumbersTextField", "Total Numbers Generated Will Be Displayed Here.");
        populateTextFields(generatedNumbersTextField, "generatedNumbersTextField", "GeneratedNumbersTextField", "");
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function clearTextField(field){
        if (field === "minTextField") {
            document.getElementById("minTextField").value = "";
        }
        
        if (field === "maxTextField") {
            document.getElementById("maxTextField").value = "";
        }
        
        if (field === "generateTotalTextField") {
            document.getElementById("generateTotalTextField").value = "";
        }
    }
    
    function acceptConfigRandomNumbers() {
        let convertMinToInt = parseInt(document.getElementById("minTextField").value);
        let convertMaxToInt = parseInt(document.getElementById("maxTextField").value);
        let convertGenerateTotalToInt = parseInt(document.getElementById("generateTotalTextField").value);
        notifyCopied.innerHTML = "";
        generatedNumberArray = [];
        
        if ((!isNaN(convertMinToInt)) && (!isNaN(convertMaxToInt)) && (!isNaN(convertGenerateTotalToInt))) {
            
            if (convertGenerateTotalToInt < convertMaxToInt) {
                totalAmountOfGeneratedNumbers = parseInt(document.getElementById("generateTotalTextField").value);
                populateGeneratedNumbersArray();
                createRandomNumberCopyButton();
                addDancingGif();
            }
            else{
                generateTotalTextField.value = "Total amount of Numbers must be less than Max Number.";
            }
        }
        
        else if(document.getElementById("generateTotalTextField").value === "Evan"){
                generateTotalTextField.value = "I am not a number Emi! D:<"; 
            }    
            
        else if(isNaN(convertGenerateTotalToInt)){
                generateTotalTextField.value = "This needs to be a real number Emi!"; 
            }
        
        if ((isNaN(convertMinToInt)) || (isNaN(convertMaxToInt))) {
            document.getElementById("minTextField").value = "We need real numbers here Emi!";
            document.getElementById("maxTextField").value = "We need real numbers here Emi!";
        }
    }
    
    function generateRandomNumber(){
        let generatedRandomNumberValue;
        generatedRandomNumberValue = getRandomInt(parseInt(document.getElementById("minTextField").value), parseInt(document.getElementById("maxTextField").value));
        return generatedRandomNumberValue;
    }
    
    function createRandomNumberCopyButton() {
        populateElements(randomNumberCopyButton, "randomNumberCopyButton", "RandomNumberCopyButton", "Click Here To Copy The Cute Anime Random Number List");
        randomNumberCopyButton.addEventListener("click", function () {
            CopyRandomNumber();
        });
    }

    function CopyRandomNumber() {
        navigator.clipboard.writeText(generatedNumbersTextField.innerHTML);
        notifierNumberCopied();
    }
    
    function notifierNumberCopied() {
        populateElements(notifyCopied, "NotifyCopied", "NotifyCopied", ("Copied the Cute Anime Random Number list!"));
    }
    
    function addDancingGif(){
        let addDance;
        if (!addDance) {
            dance.id = "Dance";
            dance.className = "Dance";
            document.body.appendChild(dance);
        }
    }
    
    function populateGeneratedNumbersArray (){
        let tempNumber;
        let startTime = Date.now();
        let currentTime;
        let timeUntilRunAwayBreak = 4000;
        
        for (let i = 0; i < totalAmountOfGeneratedNumbers; i++) {
            
            tempNumber = generateRandomNumber();
            
            if (!generatedNumberArray.includes(tempNumber)) {
                    generatedNumberArray[i] = tempNumber;
                    currentTime = Date.now();
                } 
                    
            else{
                    i--;
                    currentTime = Date.now();
                }
                
            if (currentTime > (startTime + timeUntilRunAwayBreak)) {
                    i = totalAmountOfGeneratedNumbers;
                    console.log("BREAKING!!");
                    generatedNumberArray = [];
                    generatedNumbersTextField.innerHTML = "Tried generating too many numbers at once. Operation canceled to avoid browser crash.  ";
                    break;
                }     
            }
            
        displayAllNumberGenerated();    
        }    
            
    function displayAllNumberGenerated(){
        generatedNumberArray.sort(function(a, b){return a - b;});
        let textFieldHolder = "";
        
        for (let i = 0; i < generatedNumberArray.length; i++) {
                textFieldHolder = textFieldHolder + generatedNumberArray[i] +  ", ";
                generatedNumbersTextField.innerHTML = textFieldHolder;
            }
        trimEndOfList();    
        }
        
    function trimEndOfList(){
        generatedNumbersTextField.innerHTML = generatedNumbersTextField.innerHTML.substring(0, generatedNumbersTextField.innerHTML.length - 2);
    }
    
    function addDarkMode (){
        darkModeIcon.id = "darkModeIcon";
        darkModeIcon.className = "DarkModeIcon";
        document.body.appendChild(darkModeIcon);
        darkModeButton = document.getElementById('darkModeIcon');
        darkModeToggler();
    }
    
    function darkModeToggler(){
        darkModeButton.addEventListener('click', () => {
            body.classList.toggle('DarkMode');
            darkModeState = !darkModeState;
            
            if (darkModeState === false){
                darkModeIcon.src = "pictures/light-mode.png";
            }
            
            else{
                
                darkModeIcon.src = "pictures/dark-mode.png";
            }
        });
   }