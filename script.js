//Javascript for Emi's Cute Anime Random Number Generator

    var clearTextButton = document.body.appendChild(document.createElement('button'));
    var minTextField = document.body.appendChild(document.createElement("input"));
    var maxTextField = document.body.appendChild(document.createElement("input"));
    var generateTotalTextField = document.body.appendChild(document.createElement("input"));
    var generateButton = document.body.appendChild(document.createElement('button'));
    var displayNumber = document.body.appendChild(document.createElement('button'));
    var randomNumberCopyButton = document.body.appendChild(document.createElement('button'));
    var notifyCopied = document.body.appendChild(document.createElement('button'));
    var generatedNumbersTextField = document.body.appendChild(document.createElement("div"));
    
    var dance = document.createElement("img");
    var generatedRandomNumberValue;
    var generatedNumberArray = [];
    var totalAmountOfGeneratedNumbers;
    
    window.onload = function () {
        makeTextField();
        createClearTextButton();
        createGenerateButton();
        dance.src = "pictures/frieren-dance-1.gif";
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
    
    function createClearTextButton() {
        populateElements(clearTextButton, "clearTextButton", "ClearTextButton", "Clear Text Fields");
        clearTextButton.addEventListener('click', function () {
            clearTextField("minTextField");
            clearTextField("maxTextField");
            clearTextField("generateTotalTextField");
        });
    }
    
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
        populateTextFields(generatedNumbersTextField, "generatedNumbersTextField", "GeneratedNumbersTextField", "Total Numbers Generated Will Be Displayed Here.");
        generatedNumbersTextField.innerHTML = "Total Numbers Generated Will Be Displayed Here.";
        
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
        var convertMinToInt = parseInt(document.getElementById("minTextField").value);
        var convertMaxToInt = parseInt(document.getElementById("maxTextField").value);
        var convertGenerateTotalToInt = parseInt(document.getElementById("generateTotalTextField").value);
        notifyCopied.innerHTML = "";
        
        if ((!isNaN(convertMinToInt)) && (!isNaN(convertMaxToInt)) && (!isNaN(convertGenerateTotalToInt))) {
            if (convertGenerateTotalToInt < convertMaxToInt) {
                //generatedRandomNumberValue = getRandomInt(parseInt(document.getElementById("minTextField").value), parseInt(document.getElementById("maxTextField").value));
                totalAmountOfGeneratedNumbers = parseInt(document.getElementById("generateTotalTextField").value);
                populateGeneratedNumbersArray();
                displayRandomNumber(generatedRandomNumberValue);
                createRandomNumberCopyButton();
            }
            else{
                generateTotalTextField.value = "Total amount of Numbers must be less than Max Number.";
            }

        }
        
        if ((isNaN(convertMinToInt)) || (isNaN(convertMaxToInt))) {
            document.getElementById("minTextField").value = "We need real numbers here Emi!";
            document.getElementById("maxTextField").value = "We need real numbers here Emi!";
        }
    }
    
    function generateRandomNumber(){
        generatedRandomNumberValue = getRandomInt(parseInt(document.getElementById("minTextField").value), parseInt(document.getElementById("maxTextField").value));
        return generatedRandomNumberValue;
    }
    
    function displayRandomNumber(value) {
        populateElements(displayNumber, "DisplayNumber", "DisplayNumber", (generatedRandomNumberValue));
        addDancingGif();
    }
    
    function createRandomNumberCopyButton() {
        populateElements(randomNumberCopyButton, "randomNumberCopyButton", "RandomNumberCopyButton", "Click Here To Copy Random Number");
        randomNumberCopyButton.addEventListener("click", function () {
            CopyRandomNumber();
        });
    }

    function CopyRandomNumber() {
        //Below 2 lines for Mobile if needed?
        //generatedRandomNumberValue.select();
        //generatedRandomNumberValue.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(generatedRandomNumberValue);
        notifierNumberCopied();
    }
    
    function notifierNumberCopied() {
        populateElements(notifyCopied, "NotifyCopied", "NotifyCopied", ("Copied the Cute Anime Random Number: " + generatedRandomNumberValue));
    }
    
    function addDancingGif(){
        var addDance;
        if (!addDance) {
            dance.id = "Dance";
            dance.className = "Dance";
            document.body.appendChild(dance);
        }
    }
    
    //TODO: Crashes if totalAmountOfGeneratedNumbers ia greater than or equla to maxTextField
    function populateGeneratedNumbersArray (){
        var tempNumber;
        for (var i = 0; i < totalAmountOfGeneratedNumbers; i++) {
            tempNumber = generateRandomNumber();
            if (!generatedNumberArray.includes(tempNumber)) {
                    generatedNumberArray[i] = tempNumber;
                }
            else{
                    i--;
                }
            }   
        displayAllNumberGenerated();    
        }    
            
    function displayAllNumberGenerated(){
        generatedNumberArray.sort(function(a, b){return a - b;});   
        var textFieldHolder = "";
        for (var i = 0; i < generatedNumberArray.length; i++) {
                textFieldHolder = textFieldHolder + generatedNumberArray[i] +  ", ";
                generatedNumbersTextField.innerHTML = textFieldHolder;
            }
        }
        
    function dupeNumberChecker(){
        
    }    
    

