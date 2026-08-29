const defaults = [
  { mode: 'named', value: 'white' },
  { mode: 'rgb', value: 'rgb(255, 255, 255)' },
  { mode: 'hex', value: '#FFFFFF' }
];
let mode = 'named'; // the default color mode
let color;

$(function() {
  resetUi();
  $('#clickMeBtn').on('click', onClickMeClickedController);
  $('ul.navbar-nav').on('click', 'button', onMenuBtnClickedController);
});

/**
 * Actions taken after the 'CLICK ME!' button is clicked.
 * Actions include updating the color.
 */
function onClickMeClickedController() {
  updateColor();
}

/**
 * Actions taken after one of the menu buttons is clicked. 
 * Each button represents a different color mode.
 * Actions include updating the color mode according to the 
 * selected button.
 */
function onMenuBtnClickedController() {
  updateMode($(this));
}

/**
 * Generates a color value and renders the UI based on this color.
 */
function updateColor() {
  getColor();
  showColor();
}

/**
 * Updates the color mode according to the menu button
 * that was clicked, styles the menu buttons and resets
 * the UI.
 * @param $menuBtn the menu button that was clicked.
 */
function updateMode($menuBtn) {
  mode = $menuBtn.data('mode');
  styleMenuBtns($menuBtn);
  resetUi();
}

/**
 * Generates a color value depending on the selected color mode.
 */
function getColor() {
  if (mode === 'named') getHtmlColor();
  else if (mode === 'rgb') getRgbColor();
  else getHexColor();
}

/**
 * Selects randomly a color name from a standard array.
 * The array contains all the names that are currently 
 * valid to use as HTML color.
 */
function getHtmlColor() {
  const htmlColors = ['aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen'];

  color = htmlColors[Math.floor(Math.random() * htmlColors.length)];
}

/**
 * Generates an RGB color value.
 */
function getRgbColor() {
  let values = [];
  
  // generate randomly 3 integers between 0 and 255
  for (let i = 1; i <= 3; i++) {
    values.push(Math.floor(Math.random() * 256));
  }
  color = `rgb(${values.join(', ')})`;
}

/**
 * Generates a HEX color value.
 */
function getHexColor() {
  const hexSymbols = ['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  color = '#';
  // generate randomly 6 elements from the array 'hexSymbols'
  for (let i = 1; i <= 6; i++) {
    color += hexSymbols[Math.floor(Math.random() * hexSymbols.length)];
  }
}

/**
 * Assigns the generated color to the corresponding elements.
 */
function showColor() {
  $('#color').text(color);
  $('body').css('background-color', color);
}

/**
 * Renders the menu buttons to indicate the selected mode.
 * @param $menuBtn the menu button that was clicked.
 */
function styleMenuBtns($menuBtn) {
  let $currentMenuBtn = $('.nav-link.active');

  if ($currentMenuBtn !== $menuBtn) {
    $currentMenuBtn.removeClass('active');
    $menuBtn.addClass('active');
  }
}

/**
 * Resets the color to 'white' and renders the UI.
 */
function resetUi() {
  color = defaults.find(el => el.mode === mode).value;
  showColor();
}