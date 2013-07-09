$(function(){

	var cacheElem = function () {
		return {
			$input : $('#input'),
			$question : $("#question")
		};
	}();

	var lineLimit = 16;
	var length;

	var counter = 0;
	var quiz = {
		lavel1 : [
			{
				"question" : "Show present working directory",
				"answer"	: "pwd"
			},
			{
				"question" : "Show content of current directory",
				"answer"	: "ls"
			},
			{
				"question" : "Show hidden files of current directory",
				"answer"	: "ls -a"
			},
			{
				"question" : "shows as who you are logged in",
				"answer"	: "whoami"
			},
			{
				"question" : "shows on which machine you are",
				"answer"	: "hostname"
			},
			{
				"question" : "creates directory foo",
				"answer"	: "mkdir foo"
			},
			{
				"question" : "switches into directory foo",
				"answer"	: "cd foo"
			},
			{
				"question" : "moves one directory up",
				"answer"	: "cd .."
			},
			{
				"question" : "renames file f1 to f2",
				"answer"	: "mv f1 f2"
			},
			{
				"question" : "location of application nodejs",
				"answer"	: "which nodejs"
			},
			{
				"question" : "searches for nodejs executeables",
				"answer"	: "whereis nodejs"
			},
			{
				"question" : "memory info",
				"answer"	: "free"
			},
			{
				"question" : "shows tech info about machine",
				"answer"	: "uname -a"
			},
			{
				"question" : "rdisk space",
				"answer"	: "df"
			},
			{
				"question" : "shows who is logged into system",
				"answer"	: "who"
			}
		]
	};

	var showQuesion = function (index) {
		if(index < length){				
			cacheElem.$question.empty().text('Q'+ (index+1) +': '+ quiz.lavel1[index].question);				
		} else {
			cacheElem.$question.empty().text("Done");
		}
	};

	var assert = function (condition) {
	    if (!condition) {
	        throw "Wrong answer";
	    }
	};

	var initListeners = function () {
		$('.container').on('click', function() {
			cacheElem.$input.find('input').focus();
		});
	};

	var addLine = function (input, style, color) {
		if($('.console div').length==lineLimit) {
			$('.console div').eq(0).remove();
		}
		style = typeof style !== 'undefined' ? style : 'line';
		color = typeof color !== 'undefined' ? color : 'white';
		$('.console').append('<div class="'+style+' '+color+'">'+input+'</div>');
	};

	var execCommand = function (command){
		try {
			assert(command == quiz.lavel1[counter].answer);
			addLine("Correct", 'line', 'green');
			showQuesion(++counter);
		} catch (error) {
			addLine(error, "line", "red");
		}   
	};

	var main = function () {
		cacheElem.$input.find('input').focus();
		initListeners();
		$('#input').cssConsole({
			inputName:'console',
			charLimit: 60,
			onEnter: function(){
				addLine("> "+$('#input').find('input').val());
				execCommand($('#input').find('input').val());
				$('#input').cssConsole('reset');	
				$('#input').find('input').focus();
			}
		});
		length = quiz.lavel1.length;
		showQuesion(0);
	};

	main();
});





