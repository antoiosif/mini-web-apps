const quotes = [
  {text: 'Every day is a fresh start.', author: 'UNKNOWN'},
  {text: `Trust the process. Good things take time.`, author: 'UNKNOWN'},
  {text: 'Don\'t be pushed by your problems. Be led by your dreams.', author: 'RALPH WALDO EMMERSON'},
  {text: 'Today I will not stress over things I can\'t control.', author: 'UNKNOWN'},
  {text: 'Everything comes to you at the right time. Be patient.', author: 'UNKNOWN'},
  {text: 'Stay close to people who feel like sunshine.', author: 'UNKNOWN'},
  {text: 'There is no time to be bored in a world as beautiful as this.', author: 'UNKNOWN'},
  {text: 'Create the things you wish existed.', author: 'UNKNOWN'},
  {text: 'Give every day the chance to become the most beautiful day of your life.', author: 'MARK TWAIN'},
  {text: 'Great things never came from comfort zones.', author: 'UNKNOWN'},
  {text: 'Feel the fear and do it anyway.', author: 'UNKNOWN'},
  {text: 'Good decisions come from experience. Experience comes from making bad decisions.', author: 'MARK TWAIN'},
  {text: 'A negative mind will never give you a positive life.', author: 'UNKNOWN'},
  {text: 'In today\'s rush, we all think too much - seek too much - want too much - and forget about the joy of just being.', author: 'ECKHART TOLLE'},
  {text: 'You never get stronger if you only do easy things.', author: 'MARIE FORLEO'},
];

window.addEventListener('DOMContentLoaded', function() {
  let quote = getQuote();
  showQuote(quote);
});

/**
 * Selects randomly a quote from a given array.
 * @returns a quote.
 */
function getQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

/**
 * Assigns the given quote to the corresponding UI Elements.
 * @param {object} quote the quote to be shown.
 */
function showQuote(quote) {
  document.querySelector('#quote').innerHTML = quote.text.replace('.', `.<br>`); // every sentence starts in a new line
  document.querySelector('#author').textContent = quote.author;
}