var competitors = [];
var tableObjects = [];

const TOPICS_NUM = 7;
const speechPercent = 0.8;

var PRSpeeches = [[]];
var PRQuestions = [[]];

var currentTopic = 0;
var correct;
var speechesList;
// [topic][competitor][isPrepped, sidePrepped (true = aff, false = neg)]

var speechesOrQuestions = false; // false = speeches, true = questions

var topicSide = false; // true = aff; false = neg
var speaker = "";

var questionNumber = 0;
var qBlockLength = 4;
var qBlocksGoneThru = 0;
var qPeriodsGoneThru = 0;

var score = 0;

function main(event)
{
	if (competitors.length < 2)
		return;
	speechesList = generateSpeeches(TOPICS_NUM);
	initVisuals();
	generateTable();
	generatePR();
	speechesLoop();
}

// Top-level gameplay loops
function speechesLoop()
{
	if (!checkTopicForSpeakers(currentTopic))
	{
		currentTopic++;
		console.log("The topic is now topic #" + currentTopic);
		if (currentTopic >= TOPICS_NUM)
		{
			gameOver();
		}
		speechesOrQuestions = false
		topicSide = false;
		questionNumber = 0;
		qBlockLength = 4;
		qBlocksGoneThru = 0;
		qPeriodsGoneThru = 0;


	}
	

	//console.log("speechesList[currentTopic] = ");
	//console.log(speechesList[currentTopic]);
	//console.log("topicSide = " + topicSide);
	//console.log("speechesList[currentTopic].includes([true, !topicSide]) = " + speechesList[currentTopic].includes([true, !topicSide]));
	//console.log("[true, !topicSide] = " + [true, !topicSide]);
	var tempVar1 = speechesList[currentTopic];
	//console.log("tempVar1 = ");
	//console.log(tempVar1);
	var tempVar2 = [true, !topicSide];
	//console.log("tempVar2 = " + tempVar2);
	//var doesInclude = tempVar1.includes(tempVar2);
	var doesInclude2D = includes2D(tempVar1, tempVar2);
	//console.log("doesInclude = " + doesInclude);
	//console.log("doesInclude2D = " + doesInclude2D);
	if (doesInclude2D) // Checks if there is a speech on the other side. If there is, switch the side.
	{
		topicSide = !topicSide;
		setState("Pick a speaker. " + (topicSide ? "Affirmation" : "Negation"));
	}
	else
	{
		setState("One-sided debate: Pick a speaker. " + (topicSide ? "Affirmation" : "Negation"));
	}
	//console.log("new topic side = " + topicSide);
	speechesOrQuestions = false;
	var speakers = randomSpeakers(currentTopic);
	correct = findCorrectPR(speakers, PRSpeeches);
	highlightSpeakers(speakers);
}
function questionsLoop()
{
	setState("Pick the questioner.");
	speechesOrQuestions = true;
	if (qPeriodsGoneThru == 2)
	{
		qBlockLength = 2;
	}
	qBlocksGoneThru++;
	var questioners = randomQuestioners();
	correct = findCorrectPR(questioners, PRQuestions);
	highlightSpeakers(questioners);
}
function onButtonClick(name)
{
	clearSpeakers();
	if (speechesOrQuestions)
	{
		checkAnswerForQuestions(name);
	}
	else
	{
		checkAnswerForSpeech(name);
	}
}

const IO = document.getElementById("IODiv");
function gameOver()
{
	const gameOverElement = document.getElementById("gameOver");
	table.style.visibility = "hidden";
	state.style.visibility = "hidden";
	IO.style.visibility = "hidden";
	gameOverElement.style.visibility = "visible";
}
// Initalization functions
function generateSpeeches (topics)
{
	var speechesList = [];
	for (var x = 0; x < topics; x++)
	{
		var speechesOnTopic = [];
		for (var y = 0; y < competitors.length; y++)
		{
			var competitorSpeech = [];
			var isSpeech = Math.random() < speechPercent;
			competitorSpeech.push(isSpeech);
			if (isSpeech == false)
			{
				competitorSpeech.push(false);
				speechesOnTopic.push(competitorSpeech);
				continue;
			}
			var side = Math.random() < 0.5;
			competitorSpeech.push(side);
			speechesOnTopic.push(competitorSpeech);
		}
		speechesList.push(speechesOnTopic);
	}
	return speechesList;
}
function generateTable()
{
	var table = document.getElementById("table");
	
	var rows = competitors.length / 5;
	
	var iterations;
	
	for (var x = 0; x < rows; x++)
	{
		var row = document.createElement("tr");
		table.appendChild(row);
		for (var y = 0; y < 5; y++)
		{
			iterations = x * 5 + y;
			if (iterations >= competitors.length)
				break;
			
			var competitor = competitors[iterations];
			var textNode = document.createTextNode(competitor);
			
			var tableElement = document.createElement("th");
			//tableElement.addEventListener('click', onButtonClick(competitor));
			tableElement.addEventListener('click', (event) => {
				onButtonClick(event.target.textContent);
			});
			
			tableElement.appendChild(textNode);
			row.appendChild(tableElement);
			tableObjects.push(tableElement);
			
		}
	}
}
function generatePR()
{
	var PRSpeechesRowZero = [];
	for (var i = 0; i < competitors.length; i++)
	{
		PRSpeechesRowZero.push(competitors[i]);
	}
	PRSpeeches[0] = PRSpeechesRowZero;
	
	var PRQuestionsRowZero = [];
	for (var i = 0; i < competitors.length; i++)
	{
		PRQuestionsRowZero.push(competitors[i]);
	}
	PRQuestionsRowZero.reverse();
	PRQuestions[0] = PRQuestionsRowZero;
}
function findCorrectPR(standing, PR)
{
	//console.log("===================================================");
	
	var precedence = []; // Precedence, matched up with standing[]
	
	//console.log("standing = " + standing);
	
	//console.log("PR = " + PR);
	
	for (var x = 0; x < standing.length; x++) // Fills precedence[]
	{
		for (var y = 0; y < PR.length; y++)
		{
			//console.log("PR[" + y + "] = " + PR[y]);
			//console.log("standing[ " + x + "] = " + standing[x]);
			if (PR[y].includes(standing[x]))
			{
				//console.log("precedence.push( " + y + ");");
				precedence.push(y);
			}
		}
	}
	
	var least = precedence[0];
	
	for (var i = 0; i < competitors.length; i++) // Finds the lowest row
	{
		if (precedence[i] < least)
			least = precedence[i];
	}
	
	var personToPick = "";
	
	//console.log("PR[" + 0 + "] = " + PR[0]);
	//console.log("standing = " + standing);
	//console.log("precedence = " + precedence);
	//console.log("least = " + least);
	
	for (var i = 0; i < PR[least].length; i++) // Picks the lowest person from the lowest row
	{
		//console.log("PR[" + least + "][" + i + "] = " + PR[least][i]);
		if (standing.includes(PR[least][i]))
		{
			
			personToPick = PR[least][i];
			break;
		}
	}
	
	return personToPick;
	
}

// Utility functions
function findItemByName(name)
{
	var result;
	
	for (var i = 0; i < tableObjects.length; i++)
	{
		if (tableObjects[i].textContent == name)
		{
			result = tableObjects[i];
			break;
		}
	}
	
	return result;
}
function includes2D(origArray, checkArray)
{
    var result = false;

    for (var x = 0; x < origArray.length; x++)
    {
        var resultTemp = true;
        for (var y = 0; y < checkArray.length; y++)
        {
            if (origArray[x][y] != checkArray[y])
                resultTemp = false;
        }
        if (resultTemp)
            result = true;
    }

    return result;
}

// Visual functions

const output = document.getElementById("output");
const state = document.getElementById("state");
const scoreBoard = document.getElementById("score");

function highlightSpeakers(standing)
{
	for (var i = 0; i < standing.length; i++)
	{
		var speakerItem = findItemByName(standing[i]);
		speakerItem.classList.add("highlighted");
	}
}
function clearSpeakers()
{
	for (var i = 0; i < tableObjects.length; i++)
	{
		tableObjects[i].classList.remove("highlighted");
	}
}
function showMessage(message)
{
	output.innerText = message;
	/*setTimeout(() => {
		output.innerText = " ";
	}, (1000));*/
}
function setState(message)
{
	state.innerText = message;
}
const SCORE_FORMAT = "Score ";
function updateScore()
{
	score++;
	scoreBoard.innerText = SCORE_FORMAT + score;
	scoreBoard.style.animation = "scoreAnim .25s ease-in";
	setTimeout(() => {
		scoreBoard.style.animation = "";
	}, (250));
}
function initVisuals()
{
	document.getElementById("button").remove();
	document.getElementById("inputDiv").remove();
	document.getElementById("table").style.visibility = "visible";
	document.getElementById("IODiv").style.visibility = "visible";
}
// Randomly select competitors
function randomSpeakers(topic)
{
	var result = [];
	
	//console.log(speechesList);
	//console.log("topic = " + topic);
	
	for (var i = 0; i < competitors.length; i++)
	{
		if (speechesList[topic][i][0])
		{
			if (speechesList[topic][i][1] == topicSide)
				result.push(competitors[i]);
		}
			
	}
	
	return result;
}
const questionPercent = 0.3;
function randomQuestioners()
{
	var result = [];
	
	for (var i = 0; i < competitors.length; i++)
	{
		var isQuestion = Math.random() < questionPercent;
		if (i == 0 || i == 1)
			isQuestion = true;
		if (competitors[i] == speaker)
			continue;
		if (isQuestion)
		{
			result.push(competitors[i]);
		}
		
	}
	
	return result;
}

// Update data
function updatePR(PR)
{
	var row = 0;
	for (var i = 0; i < PR.length; i++)
	{
		if (PR[i].includes(correct))
		{
			row = i;
			break;
		}
	}

	
	var indexOfAnswer = PR[row].indexOf(correct);
	// //console.log(PR[row]);
	// //console.log(correct);
	
	if (indexOfAnswer > -1)
	{
		PR[row].splice(indexOfAnswer, 1);
	}
	else
	{
		console.log("row = " + row);
		console.log("PR.length = " + PR.length);
		console.log("correct = " + correct);
		console.log("PR:");
		console.log(PR);
		console.log("topic = " + currentTopic);
		throw "Index is < 0. Index was " + indexOfAnswer;
	}
	
	if (PR[row + 1] === undefined)
	{
		PR.push([]);
	}

	PR[row + 1].push(correct);
	
	return PR
}
function updateCompetitorSpeeches(name, topic)
{
	var personIndex = 0;
	for (var i = 0; i < competitors.length; i++)
	{
		if (competitors[i] == name)
		{
			personIndex = i;
			break;
		}
	}
	
	speechesList[topic][personIndex] = [false, false];
}

// Check functions
function checkAnswerForSpeech(name)
{
	if (correct != name)
	{
		showMessage(name + " is not correct. The answer should be " + correct + ".");
	}
	else
	{
		updateScore();
		showMessage(name + " is correct!");
	}
	
	PRSpeeches = updatePR(PRSpeeches)
	
	updateCompetitorSpeeches(correct, currentTopic);
	
	speaker = correct;
	questionsLoop();
}
function checkAnswerForQuestions(name)
{
	if (correct != name)
	{
		showMessage(name + " is not correct. The answer should be " + correct + ".");
	}
	else
	{
		updateScore();
		showMessage(name + " is correct!");
	}
	/*var row = 0;
	for (var i = 0; i < PRQuestions.length; i++)
	{
		if (PRQuestions[i].includes(correct))
		{
			row = i;
			break;
		}
	}
	//console.log("PRQuestions[row] = " + PRQuestions[row]);
	var indexOfAnswer = PRQuestions[row].indexOf(correct); // update PRQuestions
	//console.log("indexOfAnswer = " + indexOfAnswer);
	if (indexOfAnswer > -1)
	{
		PRQuestions[row].splice(indexOfAnswer, 1);
	}
	else
	{
		throw "Index is < 0";
	}
	
	
	
	PRQuestions[row + 1].push(correct);
	//console.log(PRQuestions);
	*/
	
	PRQuestions = updatePR(PRQuestions);
	
	if (qBlocksGoneThru >= qBlockLength)
	{
		qPeriodsGoneThru++;
		qBlocksGoneThru = 0;
		speechesLoop();
	}
	else
	{
		questionsLoop();
	}
		
	
}
function checkTopicForSpeakers(topic)
{
	var result = false;
	
	for (var i = 0; i < speechesList[topic].length; i++)
	{
		if (speechesList[topic][i][0])
		{
			result = true;
			break;
		}
	}
	
	return result;
}

// Initial table
document.getElementById("initialInput").onkeypress = function(e){
	if (e.keyCode == 13) {
		addElement(e);
    }
}

var inputList = document.getElementById("inputList");

function addElement(event)
{
	if (event.target.value == "")
	{
		return;
	}
	competitors.push(event.target.value);
	event.target.value = "";
	updateList();
}
function updateList()
{
	clearList();

	for (var i = 0; i < competitors.length; i++)
	{
		
		var itemName = competitors[i];
		var textNode = document.createTextNode(itemName);
		
		var listElement = document.createElement("li");
		//tableElement.addEventListener('click', onButtonClick(competitor));
		listElement.classList.add("listItem");
		listElement.addEventListener('click', (e) => {
			removeElement(e);
		});
		
		listElement.appendChild(textNode);
		inputList.appendChild(listElement);
		
	}

}
function clearList()
{
	toDelete = document.querySelectorAll('.listItem'); // https://bobbyhadz.com/blog/javascript-remove-all-elements-with-class
	//console.log(toDelete);
	toDelete.forEach(element =>  {
		element.remove();
	})

	/*for (var i = 0; i < toDelete.length; i++)
	{
		toDelete[i].remove();
	}*/
}
function removeElement(event)
{
	var competitorsIndex = competitors.indexOf(event.target.textContent);

	if (competitorsIndex > -1)
	{
		competitors.splice(competitorsIndex, 1);
	}
	else
	{
		
		throw "Index is < 0. Index was " + competitorsIndex;
	}

	updateList();
	
}