(function(){

$('#chessfield, #result').hide();

var userSymbol = "",
	moveCounter = 0,

	//takenFields array represents the board fields starting from top left corner
	takenFields = [false, false, false, false, false, false, false, false, false],

	//boardRows array represents the board rows in following order: 
	//bottom, middle (Y axis), upper, left, middle (X axis), right, diagonal (top left to bottom right) and diagonal (top right to bottom left)
	
	boardRows = [0, 0, 0, 0, 0, 0, 0, 0],
    compSymbol = "",
    isGameFinished = false;
    doesCompStart = Math.round(Math.random());

$('#optionX').on('click', () => { 

	$('#chooseOption').hide();
	$('#chessfield').show("slow");
	userSymbol = "x";
	compSymbol = "o";
	if (doesCompStart) compMoves();
})

$('#optionY').on('click', () => { 

	$('#chooseOption').hide();
	$('#chessfield').show("slow");
    userSymbol = "o";
    compSymbol = "x";
    if (doesCompStart) compMoves();
})

function gameOver (result) {
  isGameFinished = true;
  takenFields.forEach( (item, index, array) => {
  	array[index] = true;
  });
  $('#score').html(result);
  $('#result').show('fast');

};

var compFunctions = {

	markField1: () => {$("#1").html(compSymbol); moveCounter += 1; takenFields[0] = true; boardRows[3] -= 1; boardRows[2] -=1; boardRows[6] -= 1; winCondition();}, 
	markField2: () => {$("#2").html(compSymbol); moveCounter += 1; takenFields[1] = true; boardRows[4] -= 1; boardRows[2] -=1; winCondition();},    	
	markField3: () => {$("#3").html(compSymbol); moveCounter += 1; takenFields[2] = true; boardRows[5] -= 1; boardRows[2] -=1;  boardRows[7] -= 1; winCondition();},
	markField4: () => {$("#4").html(compSymbol); moveCounter += 1; takenFields[3] = true; boardRows[3] -= 1; boardRows[1] -=1; winCondition();},
	markField5: () => {$("#5").html(compSymbol); moveCounter += 1; takenFields[4] = true; boardRows[4] -= 1; boardRows[1] -=1; boardRows[6] -= 1; boardRows[7] -= 1; winCondition();},
	markField6: () => {$("#6").html(compSymbol); moveCounter += 1; takenFields[5] = true; boardRows[5] -= 1; boardRows[1] -=1; winCondition();},
	markField7: () => {$("#7").html(compSymbol); moveCounter += 1; takenFields[6] = true; boardRows[3] -= 1; boardRows[0] -=1; boardRows[7] -= 1; winCondition();},
	markField8: () => {$("#8").html(compSymbol); moveCounter += 1; takenFields[7] = true; boardRows[4] -= 1; boardRows[0] -=1; winCondition();},
	markField9: () => {$("#9").html(compSymbol); moveCounter += 1; takenFields[8] = true; boardRows[5] -= 1; boardRows[0] -=1; boardRows[6] -= 1; winCondition();}	
};

function rowChecks (fieldNum1, fieldNum2, fieldNum3) {

	if (!takenFields[fieldNum1]) {
	   	
	   	compFunctions["markField" + (fieldNum1 + 1)]();
		} else if (!takenFields[fieldNum2]) {
		compFunctions["markField" + (fieldNum2 + 1)]();	
		} else if (!takenFields[fieldNum3]) {
		compFunctions["markField" + (fieldNum3 + 1)]();	
	}
}

function compMoves() {

	var compVictoryCondition = boardRows.indexOf(-2);
	var playerVictoryCondition = boardRows.indexOf(2);

	if (isGameFinished === false) {
		if (moveCounter === 0) {
			compFunctions.markField5();

		} else if (!takenFields[4]) {
			compFunctions.markField5();

	    } else if (compVictoryCondition !== -1) {

	    	if (compVictoryCondition === 0) {
	    		rowChecks(6, 7, 8);
	    		
	    	} else if (compVictoryCondition === 1) {
	    		rowChecks(3, 4, 5);
	    		
	    	} else if (compVictoryCondition === 2) {
	    		rowChecks(0, 1, 2);
	    		
	    	} else if (compVictoryCondition === 3) {
	    		rowChecks(0, 3, 6);
	    		
	    	} else if (compVictoryCondition === 4) {
	    		rowChecks(1, 4, 7);
	    		
	    	} else if (compVictoryCondition === 5) {
	    		rowChecks(8, 5, 2);
	    		
	    	} else if (compVictoryCondition === 6) {
	    		rowChecks(0, 4, 8);
	    		
	    	} else if (compVictoryCondition === 7) {
	    		rowChecks(2, 4, 6);
	    	}	

	    } else if (playerVictoryCondition !== -1) {

	    	if (playerVictoryCondition === 0) {
	    		rowChecks(6, 7, 8);
	    		
	    	} else if (playerVictoryCondition === 1) {
	    		rowChecks(3, 4, 5);
	    		
	    	} else if (playerVictoryCondition === 2) {
	    		rowChecks(0, 1, 2);
	    		
	    	} else if (playerVictoryCondition === 3) {
	    		rowChecks(0, 3, 6);
	    		
	    	} else if (playerVictoryCondition === 4) {
	    		rowChecks(1, 4, 7);
	    		
	    	} else if (playerVictoryCondition === 5) {
	    		rowChecks(8, 5, 2);
	    		
	    	} else if (playerVictoryCondition === 6) {
	    		rowChecks(0, 4, 8);
	    		
	    	} else if (playerVictoryCondition === 7) {
	    		rowChecks(2, 4, 6);

	    	}
	   
	    }	else if (moveCounter === 3 && boardRows[6] === 1 && !takenFields[1]) {
	    		compFunctions.markField2();
			} else if (moveCounter === 3 && boardRows[7] === 1 && !takenFields[7]) {
		    	compFunctions.markField8();
			} else if (moveCounter === 3 && boardRows[0] === 1 && boardRows[3] === 1 && boardRows[5] === 1 && !takenFields[7]) {
		    	compFunctions.markField8();
			} else if (moveCounter === 3 && boardRows[0] === 1 && boardRows[3] === 1 && !takenFields[3]) {
		    	compFunctions.markField4();
			} else if (moveCounter === 3 && boardRows[2] === 1 && boardRows[3] === 1 && !takenFields[1]) {
		    	compFunctions.markField2();
			} else if (moveCounter === 3 && boardRows[2] === 1 && boardRows[5] === 1 && !takenFields[5]) {
		    	compFunctions.markField6(); 
		    } else if (moveCounter === 5 && boardRows[0] === 1 && boardRows[5] === 1 && !takenFields[8]) {
		    	compFunctions.markField9(); 
			} else if (!takenFields[0]) {

				compFunctions.markField1();
		    } else if (!takenFields[2]) {

				compFunctions.markField3();
		    } else if (!takenFields[6]) {

				compFunctions.markField7();
		    } else if (!takenFields[8]) {
		    	
				compFunctions.markField9();		
		    } else if (!takenFields[1]) {

				compFunctions.markField2();
		    } else if (!takenFields[3]) {

				compFunctions.markField4();
		    } else if (!takenFields[5]) {

				compFunctions.markField6();
		    } else if (!takenFields[7]) {
		    	
				compFunctions.markField8();
		    } 
	}
};

function playerMove(fieldIndex) {
	
	moveCounter += 1;
	takenFields[fieldIndex] = true;
	winCondition(); 
	compMoves();
}

$("#1").on('click', () => { if(!takenFields[0]) {$('#1').html(userSymbol); boardRows[3] += 1; boardRows[2] +=1; boardRows[6] += 1; playerMove(0); }});
$("#2").on('click', () => { if(!takenFields[1]) {$('#2').html(userSymbol); boardRows[4] += 1; boardRows[2] +=1; playerMove(1); }});
$("#3").on('click', () => { if(!takenFields[2]) {$('#3').html(userSymbol); boardRows[5] += 1; boardRows[2] +=1;  boardRows[7] += 1; playerMove(2); }});
$("#4").on('click', () => { if(!takenFields[3]) {$('#4').html(userSymbol); boardRows[3] += 1; boardRows[1] +=1; playerMove(3); }});
$("#5").on('click', () => { if(!takenFields[4]) {$('#5').html(userSymbol); boardRows[4] += 1; boardRows[1] +=1; boardRows[6] += 1; boardRows[7] += 1; playerMove(4); }});
$("#6").on('click', () => { if(!takenFields[5]) {$('#6').html(userSymbol); boardRows[5] += 1; boardRows[1] +=1; playerMove(5); }});
$("#7").on('click', () => { if(!takenFields[6]) {$('#7').html(userSymbol); boardRows[3] += 1; boardRows[0] +=1; boardRows[7] += 1; playerMove(6); }});
$("#8").on('click', () => { if(!takenFields[7]) {$('#8').html(userSymbol); boardRows[4] += 1; boardRows[0] +=1;  playerMove(7); }});
$("#9").on('click', () => { if(!takenFields[8]) {$('#9').html(userSymbol); boardRows[5] += 1; boardRows[0] +=1; boardRows[6] += 1; playerMove(8); }});

function winCondition () {
if (boardRows[2] === 3 || boardRows[4] === 3 || boardRows[1] === 3 || boardRows[0] === 3 || boardRows[3] === 3 || boardRows[5] === 3 || boardRows[6] === 3 || boardRows[7] === 3) {
	gameOver('You won!');
	
} else if (boardRows[2] === -3 || boardRows[4] === -3 || boardRows[1] === -3 || boardRows[0] === -3 || boardRows[3] === -3 || boardRows[5] === -3 || boardRows[6] === -3 || boardRows[7] === -3) {
	gameOver('You lost!');
	
} else if (moveCounter === 9) {
	gameOver('It\'s a tie!');
	
}
function reset() {

	$('#result').hide();
	$('#1, #2, #3, #4, #5, #6, #7, #8, #9').empty();
	isGameFinished = false;
  	
  	takenFields.forEach( (item, index, array) => {
  		array[index] = false;
  	});
  	boardRows.forEach( (item, index, array) => {
  		array[index] = 0;
  	});
  	moveCounter = 0;
	
};

$('#resetButton').on('click', reset);

};
}());