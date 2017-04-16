var ref;
var arrContext = [];
var arrData = [];

function createSync(){
	var config = {
		authDomain:"dmapp1.wilddogio.com",
		syncURL: "https://dmapp1.wilddogio.com/message"};
	wilddog.initializeApp(config);
	ref = wilddog.sync().ref();
}

function subContext(){
	var context = $(".danmu-input-box").val();
	arrContext.push(context);
	ref.set(arrContext);
	$(".danmu-input-box").val("");
}

function clsContext(){
	ref.remove();
	arrContext = [];
	arrData = [];
	$(".danmu-screen").empty();
}

function listenData(){
	var data;
	ref.on("child_added",function(snapshot){
		data = snapshot.val();
		arrData.push(data);
	});	
}

function run(){
	var num;
	var ranColor;
	for(var i=0;i<arrData.length;i++){
		num = Math.floor(Math.random()*341+9).toString()+"px";
		ranColor = contextColor();
		$(".danmu-screen").append('<div id="d'+i+'">'+arrData[i]+'</div>');	
		$('#d'+i).css({"position":"absolute","right":"0","top":num,"color":ranColor});
		$('#d'+i).animate({left:"0"},3000,function(){
			$(".danmu-screen").empty();
		});
	}
	setTimeout(run,5000);
}

function contextColor(){
	var red = Math.floor(Math.random()*255).toString();
	var green = Math.floor(Math.random()*255).toString();
	var blue = Math.floor(Math.random()*255).toString();	
	var color = "rgb("+red+","+green+","+blue+")";
	
	return color;
}

$(document).ready(function(){
	createSync();
	listenData();
	run();
	$(".danmu-sub").on("click",subContext);
	$(".danmu-cls").on("click",clsContext);
});