window.onload = () => {
  var html = document.querySelector('html');
  html.style.backgroundImage = 'url(' + 'https://source.unsplash.com/random/?nordic' + ')';
  ready();
}


function ready() {

  var preText = document.getElementById('preText');
  var afterText = document.getElementById('afterText');
  var text = document.getElementsByClassName('text')
  var input = document.getElementById('input');
  var user = document.getElementById('userName');
  var userName;
  var quoteDiv = document.getElementById('quote');

  if (!localStorage.username == '' || !localStorage.username == ' ') {
    preText.classList.add('hidden');
    afterText.classList.remove('hidden');
    quoteDiv.classList.remove('hidden');
  }

  input.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
    userName = input.value;
      if(typeof(Storage) !== 'undefined') {
        localStorage.setItem('username', userName);
      }
      input.value = '';
      e.preventDefault();
      hideShow();
      return false;
    }
  });

  function hideShow() {
    preText.classList.add('hidden');
    afterText.classList.remove('hidden');
    quoteDiv.classList.remove('hidden');
  }

  function name() {
    var localUserName = localStorage.getItem('username');
    user.innerHTML = 'Hello, ' + localUserName + '.';
    document.title = 'Morning ' + localUserName;
  } name();

  function startTime() {
    // var d = new Date();
    // var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    var time = moment().format('k:mm:ss');
    var dateText = document.getElementById('dateText');

    dateText.innerHTML = time;

    t = setTimeout(function () {
      startTime();
    }, 500);
  } startTime();

  function quote() {
    const url = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=";
    //const options = {mode:'no-cors'};

    fetch(url)
      .then((response) => response.json())
      .then((data => {
        quoteDiv.innerHTML = '<a href="' + data[0].link + '">' + data[0].content + '</a>';
      }))
      .catch((err) => {
        console.log(err);
      })
  } quote();
}
