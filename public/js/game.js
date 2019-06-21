
$(function(){
	var socket = io();
	
	$('form').submit(function(e){
		e.preventDefault();
		
	});
	
	$('#login_btn').click(function(){
		socket.emit('user name', $('#login_txt').val());
		return false;
	});
	
	socket.on('user name', function(OnlineUsers){
		$('#players').append($('<li>').text(OnlineUsers));
	});
	
	$('#quit_btn').click(function(){
		socket.emit('logout',$('#login_txt').val()+" HAS LEFT");
		$('#login_txt').val('You are no more online');
	});

	
	// Game Logic
	var colors = ['pink', 'green', 'blue', 'white', 'yellow'];

	var y = colors[Math.floor(Math.random() * colors.length)];
	
	var guess = 1; 
	
	document.getElementById("submitcolor").onclick = function(){ 
	
	// Color guessed by user	 
	var x = document.getElementById("colorPick").value; 

	if(x == y) 
	{	  
		msg = "Congratulations! Your guess was right.";
        document.getElementById("result").innerHTML = msg;
		document.getElementById("trials").innerHTML = "You got it in: " +guess + " guesses!";
		socket.emit('winner',$('#login_txt').val()+" WON!");

	} 
 
	else
	{ 
		guess++;  
		msg = "Too bad! Try another color";
        document.getElementById("result").innerHTML = msg;

	} 
} 

});
