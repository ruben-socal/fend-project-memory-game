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
	let cards = shuffle(array);
	$( ".card" ).each(function( index ) {
		$(this).children().attr("class", cards[index]);
	});
}

/* displayCardSymbol function displays card symbol */
function displayCardSymbol (cardIcon) {
	cardIcon.addClass("show open");
	// cardIcon.off( "click");
}

/* updateMovesDisplay function updates the moves count display */
function updateMovesDisplay(moveCount) {
	$(".moves").text(moveCount);
}

/* updateStarDisplay function updates the stars display */
function updateStarsDisplay(moveCount) {
	if( moveCount === 13) {
		$(".stars li:last-child").children().attr("class", "fa fa-star-o");
	} else if(moveCount === 18) {
		$(".stars li:nth-child(2)" ).children().attr("class", "fa fa-star-o");
	} else if(moveCount === 20 ) {
		$(".stars li:first-child()" ).children().attr("class", "fa fa-star-o")
	}
}

/* resetStars function resets stars display to 3 */
function resetStars() {
	$(".stars li i").attr("class", "fa fa-star");
}

function cardsMatch(cardsToMatch,moveCount) {
	let cardOne = cardsToMatch[0],
	    cardTwo = cardsToMatch[1];
	cardOne.addClass("match");
	cardOne.removeClass("show open");
	cardOne.off( "click");
	cardTwo.addClass("match");
	cardTwo.removeClass("show open");
	cardTwo.off( "click"); // $this.on("click"); to turn event back on
}

function noCardMatch(cardsToMatch,moveCount) {
	let cardOne = cardsToMatch[0],
	    cardTwo = cardsToMatch[1];
	cardOne.removeClass("show open");
	cardTwo.addClass("nomatch");
	cardOne.addClass("nomatch");
 	// cardOne.on( "click");
	// use setTimeout to delay background change
	setTimeout(function(){
		cardTwo.removeClass("nomatch");
	 	cardOne.removeClass("nomatch");
	}, 1000);
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
	$( "ul li" ).on( "click", function( event ) {
	    event.preventDefault();
	    let cardIcon = $(this);
	    cardsToMatch.push(cardIcon);
	    if( cardsToMatch.length === 1) {
	    	displayCardSymbol(cardIcon);
	    } else if ( matchCount === 16 ) {
	    	/* TODO: 1. reset moveCount and matchCount 2. reset display for stars to 3 and move to 0
	    			 3. display win screen with play again button 4. turn on click events on cards
	    	*/
	    	gameWin();
	    } else {
	    	/* check for match */
	    	let cardOne = cardsToMatch[0],
	    		cardTwo = cardsToMatch[1],
	    		value1 = cardOne.children().attr("class"),
	    		value2 = cardTwo.children().attr("class");
	    	/* if cards match 1) change both card background colors to turquoise 2) disable click event */
	    	if( value1 === value2 ) {
	    		matchCount += 2;
			    moveCount ++;
	    		cardsMatch(cardsToMatch,moveCount);
	    	} else {
		    	/* if cards do not match 1) change both card background colors to red/orange for 1 second than
		    		back to solid dark gray 2) click events should still work */
		    	moveCount ++;
		    	noCardMatch(cardsToMatch,moveCount);
	    	}
	    	updateStarsDisplay(moveCount);
	    	updateMovesDisplay(moveCount);
	    	cardsToMatch = [];
	    }
	});
}

// When document is ready load javascript
$(document).ready(function(){
	$(addCards(cardList));
	$(addCardEvents);

});