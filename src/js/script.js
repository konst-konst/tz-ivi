var item = document.querySelector(".clip-path__item");
var itemText = document.querySelector(".clip-path__item-text");
var itemWrapper = document.querySelector(".clip-path");
var words = ["1", "2", "3", "Go!"];
var counter = 0;
var arrayLength = words.length - 1;

item.addEventListener("mouseover", mouseOver, false);
item.addEventListener("mouseout", mouseOut, false);

function mouseOver() {
    itemWrapper.classList.add('active');
}

function mouseOut() {  
    itemWrapper.classList.remove('active');
}

function changeText() {
  if (counter == arrayLength){
    counter = 0;    
  }
  else {
    counter++;
  }
  itemText.innerHTML = words[counter];
 setTimeout(changeText, 1000);
}
setTimeout(changeText, 1000);