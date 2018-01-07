
//ENTORNO
var g = 1.622;
var dt = 0.016683;
var timer;
var timerFuel;
//NAVE
var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;

//al cargar por completo la página...
window.onload = function(){
	
	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("fuel");

	
	//definición de eventos


	//mostrar menú 
    	document.getElementById("showm").onclick = function () {
		document.getElementById("menu").style.display = "block";
		document.getElementById("level").style.display = "none";
		document.getElementById("nave").style.display = "none";
		stop();
	}
	//mostrar controles
		document.getElementById("botoncontroles").onclick = function () {
		document.getElementById("menu").style.display = "none";
		document.getElementById("level").style.display = "none";
		document.getElementById("menuInstrucciones").style.display = "block";
		document.getElementById("nave").style.display = "none";
		stop();
	}
	//ocultar menú 
		document.getElementById("botonhidemenu").onclick = function () {
		document.getElementById("menu").style.display = "none";
		document.getElementById("nave").style.display = "block";
		start();
	}
	//mostrar niveles
    	document.getElementById("botonnivel").onclick = function () {
		document.getElementById("level").style.display = "block";
		document.getElementById("menu").style.display = "none";
		document.getElementById("nave").style.display = "none";
		stop();
	}
	
	//Empezar a mover la nave justo después de cargar la página
	start();

	document.onkeydown = function(event){
		if(event.keyCode==32){
			motorOn()
		}
	}

	document.onkeyup = function(event){
		if(event.keyCode==32){
			motorOff()
		}
	}
		
}

//Definición de funciones
function start(){
	//cada intervalo de tiempo mueve la nave
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	v +=a*dt*10;
	document.getElementById("velocidad").innerHTML=v.toFixed(2);
	y +=v*dt;
	document.getElementById("altura").innerHTML=(80 - y).toFixed(2);

	if(c<=0){
		motorOff();
}
	
	//mover hasta que top sea un 80% de la pantalla
	if (y<80){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else { 
		stop();
		if (v<2){
		alert("Has GANADO, has caido a una velocidad de " +v.toFixed(2)+"m/s")
		stop();
		motorOff();
		} 
		else {
		document.getElementById('naveoff').src = "img/explosion.gif";
		setTimeout(function(){gameOver()}, 2000);
		}
		stop();
		motorOff();
	}
}
function motorOn(){
	if(c!=0){
	//mientras el motor esté activado gasta combustible
	if (timerFuel==null)
	timerFuel=setInterval(function(){ actualizarFuel(); }, 100);
	a = - g;
	if(y<=80){
		document.getElementById('naveoff').src = "img/naveon.png";
	}	}
}

function motorOff(){
	a=g;
	if(y<=80){
		document.getElementById('naveoff').src = "img/naveoff.png";
	}
	clearInterval(timerFuel);
	timerFuel=null;
}
function actualizarFuel(){
	//Restamos combustible hasta que se agota
	
	if (c > 0 ) 
		c -=1;
	combustible.innerHTML=c.toFixed(2);	
}

function gameOver(){
	alert("Has PERDIDO, has caido a una velocidad de " +v.toFixed(2)+"m/s");
}