

const skillInfo = [
	{
		"Name": "Speaking",
		"Body": "Arguably the most important tool in a competitor's arsenal, a wise competitor does not take speaking lightly. This is a parent stat that can be boosted by developing the other speaking skills as well as through miscellaneous practice.",
		"MaxPoints": 2295,
	},
	{
		"Name": "Tone",
		"Body": "A speaker's style can greatly differentiate them from the competition. Tone is a combination of pitch, emphasis, volume, cadance, speed, etc. You can practice by focusing on a single aspect of tone or by doing start-stops with a coach.",
		"MaxPoints": 255,
	},
	{
		"Name": "Hand Gestures",
		"Body": "Hand gestures can greatly enchance a performance. You can enchance your hand gesture vocabulary by looking up new ones to try out.",
		"MaxPoints": 255,
	},
	{
		"Name": "Body Language",
		"Body": "Maintaining a good posture can help enchance your voice, and keeping body language in mind can elevate your performance..",
		"MaxPoints": 255,
	},
	{
		"Name": "Breathing",
		"Body": "Skillful breathing the base your voice is built on. Awareness on how you breath can be built through practice.",
		"MaxPoints": 255,
	},
	{
		"Name": "Projection",
		"Body": "Building awareness of how your voice can be shaped often makes the distinction between the mediocre and the best.",
		"MaxPoints": 255,
	},
	{
		"Name": "Diction",
		"Body": "The judges should understand you. Good diction can also give more freedom in tone. Diction can be improved by paying attention to how words are pronouced as well as by strengthening your mouth.",
		"MaxPoints": 255,
	},
	{
		"Name": "Memorization",
		"Body": "Having speeches memorized builds the basis for eye-contact and makes memorizing further speeches easier..",
		"MaxPoints": 255,
	},
	{
		"Name": "Eye Contact",
		"Body": "Strong and intentional eye contact can impact judges emotionally.",
		"MaxPoints": 255,
	},
	{
		"Name": "Extemporaneous Speaking",
		"Body": "Making up words on the fly can be the hardest skill to develop, but it makes for a powerful trump card..",
		"MaxPoints": 255,
	},
	
	
	
	{
		"Name": "Debating",
		"Body": "Debate makes up around one third of Congress. Being able to participate in the ongoing conversation is a must.",
		"MaxPoints": 1275,
	},
	{
		"Name": "Writing",
		"Body": "Preparing yourself with strong argumentation is the path to success in Congress.",
		"MaxPoints": 765,
	},
	{
		"Name": "Flow",
		"Body": "Flow is keeping track of what was said in-chamber. You can practice this by flowing televized national rounds.",
		"MaxPoints": 255,
	},
	{
		"Name": "Clash",
		"Body": "Clash is referencing other speakers in your speech.",
		"MaxPoints": 255,
	},
	{
		"Name": "Crystallization",
		"Body": "Crystallization speeches summarize the key issues..",
		"MaxPoints": 255,
	},
	{
		"Name": "Asking Questions",
		"Body": "Quantity and quality are both essential..",
		"MaxPoints": 255,
	},
	{
		"Name": "Answering Questions",
		"Body": "Defend yourself.",
		"MaxPoints": 255,
	},
	{
		"Name": "Researching",
		"Body": "Do this or I get mad.",
		"MaxPoints": 255,
	},
	{
		"Name": "Argument Strength",
		"Body": "Get good.",
		"MaxPoints": 255,
	},
	{
		"Name": "Writing Style",
		"Body": "Write good.",
		"MaxPoints": 255,
	},
	
	
	
	{
		"Name": "Presiding",
		"Body": "Presiding is a useful trump card in any debater's arsenal.",
		"MaxPoints": 1530,
	},
	{
		"Name": "Precedence and Recency",
		"Body": "don't suck.",
		"MaxPoints": 255,
	},
	{
		"Name": "Memorizing Precedence and Recency",
		"Body": "ong get good.",
		"MaxPoints": 255,
	},
	{
		"Name": "Procedure",
		"Body": "like know how congress works.",
		"MaxPoints": 255,
	},
	{
		"Name": "Gimmicks",
		"Body": "do funny stuff that people remember you for.",
		"MaxPoints": 255,
	},
	{
		"Name": "Presentation",
		"Body": "look confident.",
		"MaxPoints": 255,
	},
	{
		"Name": "Elections",
		"Body": "get popular.",
		"MaxPoints": 255,
	},

]
var competitor;
function signIn()
{
	const signIn = document.querySelector("#sign-in");
	let user = signIn.value;
	competitor = competitors.find(item => item.Name === user);
	
	console.log(competitor);
	
	const button = document.querySelector("#sign-in-button");
	
	signIn.remove();
	button.remove();
	
	init();
}
function init()
{
	
	// display the site
	const mainSection = document.querySelector("#main-section");
	
	mainSection.style.visibility = "visible";
	
	// update level data
	
	const levelText = document.querySelector("#level");
	levelText.textContent = "Level: " + competitor.Level;
	
	let expToLevelUp = competitor.Level * 100;
	let xpFraction = competitor.Experience / expToLevelUp * 100;
	
	const expBar = document.querySelector("#experience");
	expBar.style.width = (xpFraction + "%");
	expBar.textContent = competitor.Experience + " / " + expToLevelUp;
	
	// update streak
	const streak = document.querySelector("#streak");
	
	streak.textContent = "Streak: " + competitor.Streak + " days (" + competitor.Streak + "% exp bonus)";
	
	// add event listeners to all the boxes
	let subSections = document.querySelectorAll(".subSection");
	
	for (var i = 0; i < subSections.length; i++)
		subSections[i].addEventListener('click', function(e) {
			e = e || window.event;
			var target = e.target || e.srcElement,
				text = target.textContent || target.innerText;
			
			let id = "";
			if (target.id == "")
				id = target.parentNode.id;
			else
				id = target.id;
			
			displayStat(id);
		}, false);
		
	// update skill levels
	
	let speaking = competitor.Skills.find(item => item.Name === "Speaking");
	for (let i = 1; i <= 9; i++)
	{
		speaking.Level += competitor.Skills[i].Level;
	}
	let debating = competitor.Skills.find(item => item.Name === "Speaking");
	for (let i = 11; i <= 16; i++)
	{
		debating.Level += competitor.Skills[i].Level;
	}
	let writing = competitor.Skills.find(item => item.Name === "Speaking");
	for (let i = 17; i <= 19; i++)
	{
		writing.Level += competitor.Skills[i].Level;
	}
	let presiding = competitor.Skills.find(item => item.Name === "Speaking");
	for (let i = 21; i <= 26; i++)
	{
		presiding.Level += competitor.Skills[i].Level;
	}
		
	// color the boxes
	for (let i = 0; i < skillInfo.length; i++)
	{
		let skill = skillInfo[i];
		
		
		
		
		let skillBox = document.getElementById(skill.Name);
		skillBox.style.backgroundColor = getColorFromSkill(skill, competitor, true);
		
	}
	
	// set level ranking
	setLevelRanking();
	
	setSkillRanking(skillInfo[0]);
}
function getColorFromSkill(skill, person, white)
{
	let ratio = 255 / skill.MaxPoints;
	let rawScore = person.Skills.find(item => item.Name === skill.Name).Level;
	let score = rawScore * ratio;
	
	if (score > 255)
		score = 255;
	
	
	if (white)
		return "rgb(" + (255 - score) + ", " + (255 - score) + ", " + 255 + ")";
	else
		return "rgb(0, 0, " + score + ")";
	
	
}
function displayStat(skillName)
{
	let skill = skillInfo.find(item => item.Name === skillName);
	
	const title = document.querySelector("#skillTitle");
	const level = document.querySelector("#skillLevel");
	const body = document.querySelector("#skillBody");
	
	console.log(competitor);
	let levelNum = competitor.Skills.find(item => item.Name === skill.Name).Level;
	
	title.textContent = skill.Name;
	level.textContent = levelNum + " / " + skill.MaxPoints;
	body.innerHTML = skill.Body;
	
	setSkillRanking(skill);
}
function setLevelRanking()
{
	let first, second, third;
	
	first = competitors[0];
	second = competitors[1];
	third = competitors[2];
	
	// rank the team
	for (let i = 1; i < competitors.length; i++)
	{
		let currentCompetitor = competitors[i];
		let levelNum = currentCompetitor.Level;
		
		let firstNum = first.Level;
		let secondNum = second.Level;
		let thirdNum = third.Level;
		if (levelNum > firstNum)
		{
			third = second;
			second = first;
			first = currentCompetitor;
		}
		else if (levelNum > secondNum)
		{
			third = second;
			second = currentCompetitor;
		}
		else if (levelNum > thirdNum)
		{
			third = currentCompetitor;
		}
	}
	// display ranking
	let rank1 = document.querySelector("#levelRank1");
	let rank2 = document.querySelector("#levelRank2");
	let rank3 = document.querySelector("#levelRank3");
	
	rank1.textContent = first.Name;
	rank2.textContent = second.Name;
	rank3.textContent = third.Name;
	
	if (first == competitor)
		rank1.style.fontWeight = "bold";
	else if (second == competitor)
		rank2.style.fontWeight = "bold";
	else if (third == competitor)
		rank3.style.fontWeight = "bold";
	
	rank1.textContent += " (Level " + first.Level + ")";
	rank2.textContent += " (Level " + second.Level + ")";
	rank3.textContent += " (Level " + third.Level + ")";
}
function setSkillRanking(skill)
{
	
	document.querySelector("#skillRankingTitle").textContent = "Skill (" + skill.Name + "):";
	
	let first, second, third;
	
	// set ranking
	first = competitors[0];
	second = competitors[1];
	third = competitors[2];
	for (let i = 1; i < competitors.length; i++)
	{
		let currentCompetitor = competitors[i];
		let levelNum = currentCompetitor.Skills.find(item => item.Name === skill.Name).Level;
		
		let firstNum = first.Skills.find(item => item.Name === skill.Name).Level;
		let secondNum = second.Skills.find(item => item.Name === skill.Name).Level;
		let thirdNum = third.Skills.find(item => item.Name === skill.Name).Level;
		if (levelNum > firstNum)
		{
			third = second;
			second = first;
			first = currentCompetitor;
		}
		else if (levelNum > secondNum)
		{
			third = second;
			second = currentCompetitor;
		}
		else if (levelNum > thirdNum)
		{
			third = currentCompetitor;
		}
	}
	// display ranking
	let rank1 = document.querySelector("#skillRank1");
	let rank2 = document.querySelector("#skillRank2");
	let rank3 = document.querySelector("#skillRank3");
	
	rank1.textContent = first.Name;
	rank2.textContent = second.Name;
	rank3.textContent = third.Name;
	
	/*if (first == competitor)
		rank1.style.textDecoration = "underline";
	else if (second == competitor)
		rank2.style.textDecoration = "underline";
	else if (third == competitor)
		rank3.style.textDecoration = "underline";*/
	
	if (first == competitor)
		rank1.style.fontWeight = "bold";
	else if (second == competitor)
		rank2.style.fontWeight = "bold";
	else if (third == competitor)
		rank3.style.fontWeight = "bold";
	
	/*rank1.style.color = getColorFromSkill(skill, first, false);
	rank2.style.color = getColorFromSkill(skill, second, false);
	rank3.style.color = getColorFromSkill(skill, third, false);*/
	
	rank1.textContent += " (" + first.Skills.find(item => item.Name === skill.Name).Level + "/" + skill.MaxPoints + ")";
	rank2.textContent += " (" + second.Skills.find(item => item.Name === skill.Name).Level + "/" + skill.MaxPoints + ")";
	rank3.textContent += " (" + third.Skills.find(item => item.Name === skill.Name).Level + "/" + skill.MaxPoints + ")";
	
}

let competitors = [
	{
		"Name": "Andrew",
		"Level": 100,
		"Experience": 2000,
		"Streak": 51,
		"Skills":
		[
			{
				"Name": "Speaking",
				"Level": 1,
			},
			{
				"Name": "Tone",
				"Level": 255,
			},
			{
				"Name": "Hand Gestures",
				"Level": 200,
			},
			{
				"Name": "Body Language",
				"Level": 150,
			},
			{
				"Name": "Breathing",
				"Level": 100,
			},
			{
				"Name": "Projection",
				"Level": 10,
			},
			{
				"Name": "Diction",
				"Level": 20,
			},
			{
				"Name": "Memorization",
				"Level": 10,
			},
			{
				"Name": "Eye Contact",
				"Level": 1,
			},
			{
				"Name": "Extemporaneous Speaking",
				"Level": 1,
			},
			
			
			
			{
				"Name": "Debating",
				"Level": 1,
			},
			{
				"Name": "Writing",
				"Level": 1,
			},
			{
				"Name": "Flow",
				"Level": 1,
			},
			{
				"Name": "Clash",
				"Level": 1,
			},
			{
				"Name": "Crystallization",
				"Level": 1,
			},
			{
				"Name": "Asking Questions",
				"Level": 1,
			},
			{
				"Name": "Answering Questions",
				"Level": 1,
			},
			{
				"Name": "Researching",
				"Level": 1,
			},
			{
				"Name": "Argument Strength",
				"Level": 1,
			},
			{
				"Name": "Writing Style",
				"Level": 1,
			},
			
			
			
			
			{
				"Name": "Presiding",
				"Level": 1,
			},
			{
				"Name": "Precedence and Recency",
				"Level": 1,
			},
			{
				"Name": "Memorizing Precedence and Recency",
				"Level": 1,
			},
			{
				"Name": "Procedure",
				"Level": 1,
			},
			{
				"Name": "Gimmicks",
				"Level": 1,
			},
			{
				"Name": "Presentation",
				"Level": 1,
			},
			{
				"Name": "Elections",
				"Level": 1,
			},
			
		],
	},
	{
		"Name": "Bandrew",
		"Level": 1,
		"Experience": 0,
		"Streak": 0,
		"Skills":
		[
			{
				"Name": "Speaking",
				"Level": 1,
			},
			{
				"Name": "Tone",
				"Level": 1,
			},
			{
				"Name": "Hand Gestures",
				"Level": 1,
			},
			{
				"Name": "Body Language",
				"Level": 1,
			},
			{
				"Name": "Breathing",
				"Level": 1,
			},
			{
				"Name": "Projection",
				"Level": 1,
			},
			{
				"Name": "Diction",
				"Level": 1,
			},
			{
				"Name": "Memorization",
				"Level": 1,
			},
			{
				"Name": "Eye Contact",
				"Level": 1,
			},
			{
				"Name": "Extemporaneous Speaking",
				"Level": 1,
			},
			
			
			
			{
				"Name": "Debating",
				"Level": 1,
			},
			{
				"Name": "Writing",
				"Level": 1,
			},
			{
				"Name": "Flow",
				"Level": 1,
			},
			{
				"Name": "Clash",
				"Level": 1,
			},
			{
				"Name": "Crystallization",
				"Level": 1,
			},
			{
				"Name": "Asking Questions",
				"Level": 1,
			},
			{
				"Name": "Answering Questions",
				"Level": 1,
			},
			{
				"Name": "Researching",
				"Level": 1,
			},
			{
				"Name": "Argument Strength",
				"Level": 1,
			},
			{
				"Name": "Writing Style",
				"Level": 1,
			},
			
			
			
			
			{
				"Name": "Presiding",
				"Level": 1,
			},
			{
				"Name": "Precedence and Recency",
				"Level": 1,
			},
			{
				"Name": "Memorizing Precedence and Recency",
				"Level": 1,
			},
			{
				"Name": "Procedure",
				"Level": 1,
			},
			{
				"Name": "Gimmicks",
				"Level": 1,
			},
			{
				"Name": "Presentation",
				"Level": 1,
			},
			{
				"Name": "Elections",
				"Level": 1,
			},
			
		]
	},
	{
		"Name": "Chad",
		"Level": 1,
		"Experience": 0,
		"Streak": 0,
		"Skills":
		[
			{
				"Name": "Speaking",
				"Level": 1,
			},
			{
				"Name": "Tone",
				"Level": 1,
			},
			{
				"Name": "Hand Gestures",
				"Level": 1,
			},
			{
				"Name": "Body Language",
				"Level": 1,
			},
			{
				"Name": "Breathing",
				"Level": 1,
			},
			{
				"Name": "Projection",
				"Level": 1,
			},
			{
				"Name": "Diction",
				"Level": 1,
			},
			{
				"Name": "Memorization",
				"Level": 1,
			},
			{
				"Name": "Eye Contact",
				"Level": 1,
			},
			{
				"Name": "Extemporaneous Speaking",
				"Level": 1,
			},
			
			
			
			{
				"Name": "Debating",
				"Level": 1,
			},
			{
				"Name": "Writing",
				"Level": 1,
			},
			{
				"Name": "Flow",
				"Level": 1,
			},
			{
				"Name": "Clash",
				"Level": 1,
			},
			{
				"Name": "Crystallization",
				"Level": 1,
			},
			{
				"Name": "Asking Questions",
				"Level": 1,
			},
			{
				"Name": "Answering Questions",
				"Level": 1,
			},
			{
				"Name": "Researching",
				"Level": 1,
			},
			{
				"Name": "Argument Strength",
				"Level": 1,
			},
			{
				"Name": "Writing Style",
				"Level": 1,
			},
			
			
			
			
			{
				"Name": "Presiding",
				"Level": 1,
			},
			{
				"Name": "Precedence and Recency",
				"Level": 1,
			},
			{
				"Name": "Memorizing Precedence and Recency",
				"Level": 1,
			},
			{
				"Name": "Procedure",
				"Level": 1,
			},
			{
				"Name": "Gimmicks",
				"Level": 1,
			},
			{
				"Name": "Presentation",
				"Level": 1,
			},
			{
				"Name": "Elections",
				"Level": 1,
			},
			
		]
	},
	{
		"Name": "Griffin",
		"Level": 1,
		"Experience": 0,
		"Streak": 0,
		"Skills":
		[
			{
				"Name": "Speaking",
				"Level": 1,
			},
			{
				"Name": "Tone",
				"Level": 1,
			},
			{
				"Name": "Hand Gestures",
				"Level": 1,
			},
			{
				"Name": "Body Language",
				"Level": 1,
			},
			{
				"Name": "Breathing",
				"Level": 1,
			},
			{
				"Name": "Projection",
				"Level": 1,
			},
			{
				"Name": "Diction",
				"Level": 1,
			},
			{
				"Name": "Memorization",
				"Level": 1,
			},
			{
				"Name": "Eye Contact",
				"Level": 1,
			},
			{
				"Name": "Extemporaneous Speaking",
				"Level": 1,
			},
			
			
			
			{
				"Name": "Debating",
				"Level": 1,
			},
			{
				"Name": "Writing",
				"Level": 1,
			},
			{
				"Name": "Flow",
				"Level": 1,
			},
			{
				"Name": "Clash",
				"Level": 1,
			},
			{
				"Name": "Crystallization",
				"Level": 1,
			},
			{
				"Name": "Asking Questions",
				"Level": 1,
			},
			{
				"Name": "Answering Questions",
				"Level": 1,
			},
			{
				"Name": "Researching",
				"Level": 1,
			},
			{
				"Name": "Argument Strength",
				"Level": 1,
			},
			{
				"Name": "Writing Style",
				"Level": 1,
			},
			
			
			
			
			{
				"Name": "Presiding",
				"Level": 1,
			},
			{
				"Name": "Precedence and Recency",
				"Level": 1,
			},
			{
				"Name": "Memorizing Precedence and Recency",
				"Level": 1,
			},
			{
				"Name": "Procedure",
				"Level": 1,
			},
			{
				"Name": "Gimmicks",
				"Level": 1,
			},
			{
				"Name": "Presentation",
				"Level": 1,
			},
			{
				"Name": "Elections",
				"Level": 1,
			},
			
		]
	},
	{
		"Name": "Jacob",
		"Level": 1,
		"Experience": 0,
		"Streak": 0,
		"Skills":
		[
			{
				"Name": "Speaking",
				"Level": 1,
			},
			{
				"Name": "Tone",
				"Level": 1,
			},
			{
				"Name": "Hand Gestures",
				"Level": 1,
			},
			{
				"Name": "Body Language",
				"Level": 1,
			},
			{
				"Name": "Breathing",
				"Level": 1,
			},
			{
				"Name": "Projection",
				"Level": 1,
			},
			{
				"Name": "Diction",
				"Level": 1,
			},
			{
				"Name": "Memorization",
				"Level": 1,
			},
			{
				"Name": "Eye Contact",
				"Level": 1,
			},
			{
				"Name": "Extemporaneous Speaking",
				"Level": 1,
			},
			
			
			
			{
				"Name": "Debating",
				"Level": 1,
			},
			{
				"Name": "Writing",
				"Level": 1,
			},
			{
				"Name": "Flow",
				"Level": 1,
			},
			{
				"Name": "Clash",
				"Level": 1,
			},
			{
				"Name": "Crystallization",
				"Level": 1,
			},
			{
				"Name": "Asking Questions",
				"Level": 1,
			},
			{
				"Name": "Answering Questions",
				"Level": 1,
			},
			{
				"Name": "Researching",
				"Level": 1,
			},
			{
				"Name": "Argument Strength",
				"Level": 1,
			},
			{
				"Name": "Writing Style",
				"Level": 1,
			},
			
			
			
			
			{
				"Name": "Presiding",
				"Level": 1,
			},
			{
				"Name": "Precedence and Recency",
				"Level": 1,
			},
			{
				"Name": "Memorizing Precedence and Recency",
				"Level": 1,
			},
			{
				"Name": "Procedure",
				"Level": 1,
			},
			{
				"Name": "Gimmicks",
				"Level": 1,
			},
			{
				"Name": "Presentation",
				"Level": 1,
			},
			{
				"Name": "Elections",
				"Level": 1,
			},
			
		]
	},
	{
		"Name": "Jenny",
		"Level": 1,
		"Experience": 0,
		"Streak": 0,
		"Skills":
		[
			{
				"Name": "Speaking",
				"Level": 1,
			},
			{
				"Name": "Tone",
				"Level": 1,
			},
			{
				"Name": "Hand Gestures",
				"Level": 1,
			},
			{
				"Name": "Body Language",
				"Level": 1,
			},
			{
				"Name": "Breathing",
				"Level": 1,
			},
			{
				"Name": "Projection",
				"Level": 1,
			},
			{
				"Name": "Diction",
				"Level": 1,
			},
			{
				"Name": "Memorization",
				"Level": 1,
			},
			{
				"Name": "Eye Contact",
				"Level": 1,
			},
			{
				"Name": "Extemporaneous Speaking",
				"Level": 1,
			},
			
			
			
			{
				"Name": "Debating",
				"Level": 1,
			},
			{
				"Name": "Writing",
				"Level": 1,
			},
			{
				"Name": "Flow",
				"Level": 1,
			},
			{
				"Name": "Clash",
				"Level": 1,
			},
			{
				"Name": "Crystallization",
				"Level": 1,
			},
			{
				"Name": "Asking Questions",
				"Level": 1,
			},
			{
				"Name": "Answering Questions",
				"Level": 1,
			},
			{
				"Name": "Researching",
				"Level": 1,
			},
			{
				"Name": "Argument Strength",
				"Level": 1,
			},
			{
				"Name": "Writing Style",
				"Level": 1,
			},
			
			
			
			
			{
				"Name": "Presiding",
				"Level": 1,
			},
			{
				"Name": "Precedence and Recency",
				"Level": 1,
			},
			{
				"Name": "Memorizing Precedence and Recency",
				"Level": 1,
			},
			{
				"Name": "Procedure",
				"Level": 1,
			},
			{
				"Name": "Gimmicks",
				"Level": 1,
			},
			{
				"Name": "Presentation",
				"Level": 1,
			},
			{
				"Name": "Elections",
				"Level": 1,
			},
			
		]
	},
	{
		"Name": "Kristian",
		"Level": 1,
		"Experience": 0,
		"Streak": 0,
		"Skills":
		[
			{
				"Name": "Speaking",
				"Level": 1,
			},
			{
				"Name": "Tone",
				"Level": 1,
			},
			{
				"Name": "Hand Gestures",
				"Level": 1,
			},
			{
				"Name": "Body Language",
				"Level": 1,
			},
			{
				"Name": "Breathing",
				"Level": 1,
			},
			{
				"Name": "Projection",
				"Level": 1,
			},
			{
				"Name": "Diction",
				"Level": 1,
			},
			{
				"Name": "Memorization",
				"Level": 1,
			},
			{
				"Name": "Eye Contact",
				"Level": 1,
			},
			{
				"Name": "Extemporaneous Speaking",
				"Level": 1,
			},
			
			
			
			{
				"Name": "Debating",
				"Level": 1,
			},
			{
				"Name": "Writing",
				"Level": 1,
			},
			{
				"Name": "Flow",
				"Level": 1,
			},
			{
				"Name": "Clash",
				"Level": 1,
			},
			{
				"Name": "Crystallization",
				"Level": 1,
			},
			{
				"Name": "Asking Questions",
				"Level": 1,
			},
			{
				"Name": "Answering Questions",
				"Level": 1,
			},
			{
				"Name": "Researching",
				"Level": 1,
			},
			{
				"Name": "Argument Strength",
				"Level": 1,
			},
			{
				"Name": "Writing Style",
				"Level": 1,
			},
			
			
			
			
			{
				"Name": "Presiding",
				"Level": 1,
			},
			{
				"Name": "Precedence and Recency",
				"Level": 1,
			},
			{
				"Name": "Memorizing Precedence and Recency",
				"Level": 1,
			},
			{
				"Name": "Procedure",
				"Level": 1,
			},
			{
				"Name": "Gimmicks",
				"Level": 1,
			},
			{
				"Name": "Presentation",
				"Level": 1,
			},
			{
				"Name": "Elections",
				"Level": 1,
			},
			
		]
	},
	{
		"Name": "Lukas",
		"Level": 1,
		"Experience": 0,
		"Streak": 0,
		"Skills":
		[
			{
				"Name": "Speaking",
				"Level": 1,
			},
			{
				"Name": "Tone",
				"Level": 1,
			},
			{
				"Name": "Hand Gestures",
				"Level": 1,
			},
			{
				"Name": "Body Language",
				"Level": 1,
			},
			{
				"Name": "Breathing",
				"Level": 1,
			},
			{
				"Name": "Projection",
				"Level": 1,
			},
			{
				"Name": "Diction",
				"Level": 1,
			},
			{
				"Name": "Memorization",
				"Level": 1,
			},
			{
				"Name": "Eye Contact",
				"Level": 1,
			},
			{
				"Name": "Extemporaneous Speaking",
				"Level": 1,
			},
			
			
			
			{
				"Name": "Debating",
				"Level": 1,
			},
			{
				"Name": "Writing",
				"Level": 1,
			},
			{
				"Name": "Flow",
				"Level": 1,
			},
			{
				"Name": "Clash",
				"Level": 1,
			},
			{
				"Name": "Crystallization",
				"Level": 1,
			},
			{
				"Name": "Asking Questions",
				"Level": 1,
			},
			{
				"Name": "Answering Questions",
				"Level": 1,
			},
			{
				"Name": "Researching",
				"Level": 1,
			},
			{
				"Name": "Argument Strength",
				"Level": 1,
			},
			{
				"Name": "Writing Style",
				"Level": 1,
			},
			
			
			
			
			{
				"Name": "Presiding",
				"Level": 1,
			},
			{
				"Name": "Precedence and Recency",
				"Level": 1,
			},
			{
				"Name": "Memorizing Precedence and Recency",
				"Level": 1,
			},
			{
				"Name": "Procedure",
				"Level": 1,
			},
			{
				"Name": "Gimmicks",
				"Level": 1,
			},
			{
				"Name": "Presentation",
				"Level": 1,
			},
			{
				"Name": "Elections",
				"Level": 1,
			},
			
		]
	},
	{
		"Name": "Nadia",
		"Level": 1,
		"Experience": 0,
		"Streak": 0,
		"Skills":
		[
			{
				"Name": "Speaking",
				"Level": 1,
			},
			{
				"Name": "Tone",
				"Level": 1,
			},
			{
				"Name": "Hand Gestures",
				"Level": 1,
			},
			{
				"Name": "Body Language",
				"Level": 1,
			},
			{
				"Name": "Breathing",
				"Level": 1,
			},
			{
				"Name": "Projection",
				"Level": 1,
			},
			{
				"Name": "Diction",
				"Level": 1,
			},
			{
				"Name": "Memorization",
				"Level": 1,
			},
			{
				"Name": "Eye Contact",
				"Level": 1,
			},
			{
				"Name": "Extemporaneous Speaking",
				"Level": 1,
			},
			
			
			
			{
				"Name": "Debating",
				"Level": 1,
			},
			{
				"Name": "Writing",
				"Level": 1,
			},
			{
				"Name": "Flow",
				"Level": 1,
			},
			{
				"Name": "Clash",
				"Level": 1,
			},
			{
				"Name": "Crystallization",
				"Level": 1,
			},
			{
				"Name": "Asking Questions",
				"Level": 1,
			},
			{
				"Name": "Answering Questions",
				"Level": 1,
			},
			{
				"Name": "Researching",
				"Level": 1,
			},
			{
				"Name": "Argument Strength",
				"Level": 1,
			},
			{
				"Name": "Writing Style",
				"Level": 1,
			},
			
			
			
			
			{
				"Name": "Presiding",
				"Level": 1,
			},
			{
				"Name": "Precedence and Recency",
				"Level": 1,
			},
			{
				"Name": "Memorizing Precedence and Recency",
				"Level": 1,
			},
			{
				"Name": "Procedure",
				"Level": 1,
			},
			{
				"Name": "Gimmicks",
				"Level": 1,
			},
			{
				"Name": "Presentation",
				"Level": 1,
			},
			{
				"Name": "Elections",
				"Level": 1,
			},
			
		]
	},
	{
		"Name": "Nathan",
		"Level": 1,
		"Experience": 0,
		"Streak": 0,
		"Skills":
		[
			{
				"Name": "Speaking",
				"Level": 1,
			},
			{
				"Name": "Tone",
				"Level": 1,
			},
			{
				"Name": "Hand Gestures",
				"Level": 1,
			},
			{
				"Name": "Body Language",
				"Level": 1,
			},
			{
				"Name": "Breathing",
				"Level": 1,
			},
			{
				"Name": "Projection",
				"Level": 1,
			},
			{
				"Name": "Diction",
				"Level": 1,
			},
			{
				"Name": "Memorization",
				"Level": 1,
			},
			{
				"Name": "Eye Contact",
				"Level": 1,
			},
			{
				"Name": "Extemporaneous Speaking",
				"Level": 1,
			},
			
			
			
			{
				"Name": "Debating",
				"Level": 1,
			},
			{
				"Name": "Writing",
				"Level": 1,
			},
			{
				"Name": "Flow",
				"Level": 1,
			},
			{
				"Name": "Clash",
				"Level": 1,
			},
			{
				"Name": "Crystallization",
				"Level": 1,
			},
			{
				"Name": "Asking Questions",
				"Level": 1,
			},
			{
				"Name": "Answering Questions",
				"Level": 1,
			},
			{
				"Name": "Researching",
				"Level": 1,
			},
			{
				"Name": "Argument Strength",
				"Level": 1,
			},
			{
				"Name": "Writing Style",
				"Level": 1,
			},
			
			
			
			
			{
				"Name": "Presiding",
				"Level": 1,
			},
			{
				"Name": "Precedence and Recency",
				"Level": 1,
			},
			{
				"Name": "Memorizing Precedence and Recency",
				"Level": 1,
			},
			{
				"Name": "Procedure",
				"Level": 1,
			},
			{
				"Name": "Gimmicks",
				"Level": 1,
			},
			{
				"Name": "Presentation",
				"Level": 1,
			},
			{
				"Name": "Elections",
				"Level": 1,
			},
			
		]
	},
];