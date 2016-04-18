(function(){

// Check for features that are not universally supported 
if (!window.addEventListener || !window.localStorage)
  return;

var options = INSTALL_OPTIONS; 

// Function that increments x by 1 if x is less than max
var add = function (x, max) {
  if (x > max)
    return x;
  else 
    return x + 1; 
}

// Function that decrements x by 1 if x is greater than min
var minus = function (x, min) {
  if (x < min)
    return x; 
  else
    return x - 1;
}

// Add or subtract 1 to all elements with font size 
var changefont = function (o1, m) {
  // Get all elements 
  var body = document.getElementsByTagName("*"); 
  for (i = 0; i < body.length; i++) {
    // Check that element is not part of app button (don't want to change font size of that) 
    if (body[i].getAttribute("class") !== "fontchanger" 
      && body[i].getAttribute("class") !== "fontchanger " + options.position) {
      // Get font size and add, subtract or don't change fontsize
      var style = window.getComputedStyle(body[i], null).getPropertyValue('font-size');
      var fontSize = parseFloat(style); 
      body[i].style.fontSize = (o1(fontSize, m)) + "px"; 
    }
  }
}

var addbutton = function () {
  // Create span container for buttons
  var s1 = document.createElement('SPAN'); 
  document.body.appendChild (s1); 
  s1.id = "fontbuttons";
  s1.className = "fontchanger " + options.position; 
  // Create font size increase button
  var buttoni = document.createElement('button');
  buttoni.id = "increasefont";
  buttoni.className = "fontchanger";
  var texti = document.createTextNode ("+"); 
  buttoni.appendChild(texti); 
  // Create font size decrease button
  var buttond = document.createElement ('button'); 
  buttond.id = "decreasefont";
  buttond.className = "fontchanger";
  var textd = document.createTextNode ("—"); 
  buttond.appendChild(textd); 
  // Create Fontsize text 
  var span = document.createElement ("SPAN");
  span.className = "fontchanger"; 
  span.id = "fonttext"; 
  var textspan = document.createTextNode("Fontsize");
  span.appendChild(textspan); 
  s1.appendChild(buttond);
  s1.appendChild(span); 
  s1.appendChild(buttoni);
  // Check for button click
  buttoni.onclick = function (){changefont(add, options.max - 1)}; 
  buttond.onclick = function (){changefont(minus, options.min + 1)}; 
}

  // Wait until DOM is ready
  if (document.readyState == 'loading')
    document.addEventListener('DOMContentLoaded', addbutton);
  else
    addbutton();
})()
