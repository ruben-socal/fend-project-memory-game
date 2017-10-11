/*
 * Create a list that holds all of your cards
 */
var cardList = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt",
				"fa fa-cube","fa fa-anchor","fa fa-leaf","fa fa-bicycle","fa fa-diamond",
				"fa fa-bomb","fa fa-leaf","fa fa-bomb","fa fa-bolt",
				"fa fa-bicycle","fa fa-paper-plane-o","fa fa-cube"];

var cardsToMatch = [];

/* function check for card match */
// function checkForMatch(currentCard) { }
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

// add cards
function addCards(array) {
	let cards = shuffle(array);
	$( ".card" ).each(function( index ) {
		$(this).children().attr("class", cards[index]);
	});
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
	    if( cardsToMatch.length === 1 ) {
	    	$(this).addClass("show open");
	    } else {
	    	/* check for match */
	    	let cardOne = cardsToMatch[0],
	    		cardTwo = cardsToMatch[1],
	    		value1 = cardOne.children().attr("class"),
	    		value2 = cardTwo.children().attr("class"),
	    		$this = $(this); // remove if not used
	    	/* if matched 1) change both card background colors to turquoise 2) disable click event */
	    	if( value1 === value2 ) {
	    		cardOne.addClass("match");
	    		cardOne.removeClass("show open");
	    		cardOne.off( "click");
	    		cardTwo.addClass("match");
	    		cardTwo.removeClass("show open");
	    		cardTwo.off( "click"); // $this.on("click"); to turn event back on
	    	} else {
		    	/* if not matched 1) change both card background colors to red/orange for 1 second than back to solid dark gray 2) click events should still work*/
		    	cardOne.removeClass("show open");
		    	cardTwo.addClass("nomatch");
		    	cardOne.addClass("nomatch");
		    	// use setTimeout to delay background change
		    	setTimeout(function(){
		    		cardTwo.removeClass("nomatch");
		    	 	cardOne.removeClass("nomatch");
		    	}, 1000);

	    	}
	    	cardsToMatch = [];
	    }
	});
}

// When document is ready load javascript
$(document).ready(function(){
	$(addCards(cardList));
	$(addCardEvents);

});