/*
 * Create a list that holds all of your cards
 */
var cardList = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt",
				"fa fa-cube","fa fa-anchor","fa fa-leaf","fa fa-bicycle","fa fa-diamond",
				"fa fa-bomb","fa fa-leaf","fa fa-bomb","fa fa-bolt",
				"fa fa-bicycle","fa fa-paper-plane-o","fa fa-cube"];

/* cardMatch keeps track of 2 cards being selected */
var cardsToMatch = [];

/* moveCounter keeps track the number of moves before winning the game */
var moveCount = 0;

/* matchCounter keeps track of the cards matched */
var matchCount = 0;

/* timer keeps track of setInterval and totalTime keeps track of total time */
var timer, totalTime, hour, min, seconds;

/* jquery selectors holders */
var $card = $(".card"),
	$moves = $(".moves"),
	$header = $("header"),
	$deck = $(".deck");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* addCards function add each cards html to the page after shuffling cards */
function addCards(array) {
	$(".gameWinPanel").hide();
	let cards = shuffle(array);
	$card.each(function( index ) {
		$(this).children().attr("class", cards[index]);// replacing existing symbol instead of using removeClass() and addClass(cards[i])
	});
}

/* openCards fumction keeps track of open cards */
function openCards(card) {
	cardsToMatch.push(card);
}

/* displayCardSymbol function displays card symbol */
function displayCardSymbol (cardIcon) {
	cardIcon.addClass("show open");
}

/* updateGameDisplay function updates the stars and moves count display */
function updateGameDisplay(moveCount) {
	$(".moves").text(moveCount);
	if( moveCount === 13) {
		$(".stars li:last-child").children().attr("class", "fa fa-star-o");
	} else if(moveCount === 18) {
		$(".stars li:nth-child(2)" ).children().attr("class", "fa fa-star-o");
	}
}

/* resetStars function resets stars display to 3 */
function resetStars() {
	$(".stars li i").attr("class", "fa fa-star");
}

/* resetCard function sets the card background display to dark gray  */
function resetCards() {
	$card.each(function( index ) {
		$(this).removeClass("match");
	});
}

/* function startTimer starts the timer for the game */
function startTimer() {
	hour=0, min=0, seconds=0;
	timer = setInterval(function() {
 		seconds++;
 		if(min===60) {
 			hour++;
 			min=0;
 		} else if( seconds === 60) {
 			min++;
 			seconds=0;
 		}
 		totalTime = hour+":"+min+":"+seconds;
    	 $(".timer").text(totalTime);
	}, 1000);
}

/* function resetTime resets the time for the time function startTimer*/
function resetTime() {
	hour=0,min=0,seconds=0;
}

/* notSameCard function checks if the same card was clicked twice, returns true or false
   https://stackoverflow.com/questions/3176962/jquery-object-equality */
function notSameCard(cardsToMatch) {
	return !cardsToMatch[0].is(cardsToMatch[1]);
}

/*  doCardsMatch functions checks if cards match and returns true or false */
function doCardsMatch(cardsToMatch) {
	let cardOne = cardsToMatch[0].children(),
	    cardTwo = cardsToMatch[1].children().attr("class");
	return cardOne.hasClass(cardTwo);
}

/* processCards function displays card color background for cards that has been matched (orange red) or not matched (dark gray) */
function processCards(cardsToMatch, isMatched ) {
	let cardOne = cardsToMatch[0],
	    cardTwo = cardsToMatch[1];
		moveCount++;
	if(isMatched) {
		matchCount += 2;
		cardOne.addClass("match");
		cardOne.removeClass("show open");
		cardTwo.addClass("match");
		cardTwo.removeClass("show open");
		cardsToMatch.length = 0;
		if(matchCount === 16) {
			gameWin();
		}
	} else {
		cardOne.removeClass("show open");
		cardTwo.addClass("nomatch");
		cardOne.addClass("nomatch");
		setTimeout(function(){
			cardTwo.removeClass("nomatch");
		 	cardOne.removeClass("nomatch");
		}, 1000);
		cardsToMatch.length = 0;
	}
}

/* gameWin function displays panel congratulating the player for winning with number of moves, stars, total time and a play again button  */
function gameWin() {
	let numStars = $(".fa.fa-star").length;
	$header.hide();
	$(".score-panel").hide();
	$deck.hide();
	$(".gameWinPanel").show();
	$moves.text(moveCount);
	$(".star-count").text(numStars);
	$(".total-time").text(totalTime);
	playAgainEvent();
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
// card event listener
function addCardEvents() {
	// Attach a directly bound event handler
	$card.on( "click", function( event ) {
	    event.preventDefault();
	    let card = $(this);
	    /* if card does not have class match continue, else remove card from cardsToMatch,  */
	    if( !card.hasClass("match") ){
	    	openCards(card);
		    if( cardsToMatch.length === 1) {
		    	displayCardSymbol(card);
		    } else if ( notSameCard(cardsToMatch) ) {
		    	var isMatched = doCardsMatch(cardsToMatch);
				processCards(cardsToMatch, isMatched );
		    	updateGameDisplay(moveCount);
		    } else {
		    	/* remove card from cardsToMatch if same card is clicked twice */
		    	cardsToMatch.pop();
			}
		}
	});
}

/* playAgain function sets up play again click event button on game win display panel to restart the game */
function playAgainEvent() {
	$( ".play-again" ).on( "click", function( event ) {
		$(".gameWinPanel").hide();
		$header.show();
		$(".score-panel").show();
		$deck.show();
		moveCount = 0;
		matchCount = 0;
		resetStars();
		$moves.text(moveCount);
		resetCards();
		addCards(cardList);
		resetTime();
	});
}

/* restartGameEvent function is a click event on thr reload symbol  to retsart the game any time */
function restartGameEvent() {
	$( ".restart" ).on( "click", function( event ) {
		moveCount = 0;
		matchCount = 0;
		cardsToMatch.length = 0;
		resetStars();
		$moves.text(moveCount);
		$card.removeClass("show");
		$card.removeClass("open");
		$card.removeClass("match");
		resetCards();
		addCards(cardList);
		resetTime();
	});
}

// When document is ready load javascript
$(document).ready(function(){
	$(restartGameEvent);
	$(addCards(cardList));
	$(addCardEvents);
	$(startTimer);

});