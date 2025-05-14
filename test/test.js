//For text overlay
let headerText = document.querySelector(".header-text");
let overlayText = document.querySelector(".header-text[data-overlay]");

overlayText.innerText = headerText.textContent;



//Remove swiper classes
let swiperInstance = null;

function createSwiperLayout() {
    const projects = document.querySelector('.projects');
    projects.innerHTML = ''

    const container = document.createElement('div');
    container.className = 'project-container swiper'

    const wrapperContainer = document.createElement('div');
    wrapperContainer.className = 'all-projects';

    const swiperWrapper = document.createElement('div');
    swiperWrapper.className = 'swiper-wrapper';

    const pagination = document.createElement('div');
    pagination.className = 'swiper-pagination';

    const cardTemplate = document.querySelector('#project-card-template').content.cloneNode(true);
    const cards = cardTemplate.querySelectorAll('.project-card');

    cards.forEach(card => {
      card.classList.add('swiper-slide');
      swiperWrapper.appendChild(card)
    });

    wrapperContainer.appendChild(swiperWrapper);
    wrapperContainer.appendChild(pagination);
    container.appendChild(wrapperContainer);
    projects.appendChild(container);

    requestAnimationFrame(() => {
      swiperInstance = new Swiper('.all-projects', {
        loop: true,
        spaceBetween: 32,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoHeight: true,
      });
    });
}


function createGridLayout() {
    const projects = document.querySelector('.projects');
    projects.innerHTML = '';

    const card = document.querySelector('#project-card-template').content.cloneNode(true);
    projects.appendChild(card);
}


function toggleLayout() {
    if (window.innerWidth < 750) {
      if (!swiperInstance) createSwiperLayout();
    } else {
      if (swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
      }
      createGridLayout();
    }
}
  
window.addEventListener('load', toggleLayout);
window.addEventListener('resize', toggleLayout);

//For Canvas
var c = document.getElementById('canv');
var $ = c.getContext('2d');

var col = function(x, y, r, g, b) {
  $.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
  $.fillRect(x, y, 1,1);
}
var R = function(x, y, t) {
  return( Math.floor(192 + 64*Math.cos( (x*x-y*y)/300 + t )) );
}

var G = function(x, y, t) {
  return( Math.floor(192 + 64*Math.sin( (x*x*Math.cos(t/4)+y*y*Math.sin(t/3))/300 ) ) );
}

var B = function(x, y, t) {
  return( Math.floor(192 + 64*Math.sin( 5*Math.sin(t/9) + ((x-100)*(x-100)+(y-100)*(y-100))/1100) ));
}

var t = 0;

var run = function() {
  for(let x=0;x<=35;x++) {
    for(let y=0;y<=35;y++) {
      col(x, y, R(x,y,t), G(x,y,t), B(x,y,t));
    }
  }
  t = t + 0.01;
  window.requestAnimationFrame(run);
}

run();