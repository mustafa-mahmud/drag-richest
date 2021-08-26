'use strict';

const draggableContainer = document.getElementById('draggable-list');
const ul = document.querySelector('ul');
const checkBtn = document.getElementById('check');

let dragItemEl, dropItemEl, allLi;

const rishestPeoples = [
  'Jeff Bezos',
  'Elon Musk',
  'Bernard Arnault',
  'Mark Zuckerberg',
  'Bill Gates',
  'Warren Buffett',
  'Larry Ellison',
  'Larry Page',
  'Sergey Brin',
  'Larry Ellison',
];

let randIndex = [];

function randomFunc() {
  const rand = Math.floor(Math.random() * rishestPeoples.length);
  if (!randIndex.includes(rand)) randIndex.push(rand);

  if (randIndex.length <= 9) {
    randomFunc();
  } else {
    displayUI(randIndex);
  }
}

function displayUI(rand) {
  rand.forEach((val, ind) => {
    const html = `
			<li ondrop="dragDrop(event)" ondragend="dragEnd(event)" ondragover="dragOver(event)" data-index="${ind}">
				<span class="number">${ind + 1}</span>
				<div class="draggable" draggable="true">
				<img width="50" src="img/${val}.jpg" />
					<p class="person-name">${rishestPeoples[val]}</p> 
					<i class="fas fa-grip-lines"></i>
				</div>
			</li>
		`;

    draggableContainer.insertAdjacentHTML('beforeend', html);
  });
}

function dragOver(event) {
  event.preventDefault();
}

function dragEnd(event) {
  dropItemEl = event.target.closest('div');

  const dragIndex = dragItemEl.parentElement.getAttribute('data-index');
  const dropIndex = dropItemEl.parentElement.getAttribute('data-index');

  if (dragIndex !== dropIndex) {
    allLi[dragIndex].removeChild(dragItemEl);
    allLi[dropIndex].removeChild(dropItemEl);

    allLi[dragIndex].appendChild(dropItemEl);
    allLi[dropIndex].appendChild(dragItemEl);
  }
}

function dragDrop(event) {
  dragItemEl = event.target.closest('div');
  allLi = document.querySelectorAll('ul li');
}

function ckResult() {
  rishestPeoples.forEach((val, ind) => {
    const name = allLi[ind].querySelector('.person-name').textContent;
    if (val === name) {
      allLi[ind].classList.add('right');
      allLi[ind].classList.remove('wrong');
    } else {
      allLi[ind].classList.add('wrong');
      allLi[ind].classList.remove('right');
    }
  });
}

////////////////////////
randomFunc();
checkBtn.addEventListener('click', ckResult);
