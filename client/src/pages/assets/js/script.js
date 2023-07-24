// 9 Jan 2022

const Day = document.getElementById('day');
const Hour = document.getElementById('hour');
const Minute = document.getElementById('minute');
const Second = document.getElementById('second');

const menuBtn = document.getElementById('menu-bar');
const navBar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');
const menuHeader = document.querySelector('.header-2');

let countDate = new Date('may 1, 2022 00:00:00');

const CountDown = () => {

    let now = new Date().getTime();
    let gap = countDate - now;

    let second = 1000;
    let minute = second * 60;
    let hour = minute * 60;
    let day = hour * 24;

    let d = Math.floor(gap / (day));
    let h = Math.floor((gap % (day)) / (hour));
    let m = Math.floor((gap % (hour)) / (minute));
    let s = Math.floor((gap % (minute)) / (second));


    Day.innerText = d;
    Hour.innerText = h;
    Minute.innerText = m;
    Second.innerText = s;

}

setInterval(() => {
    CountDown();
}, 1000);

// Show Dropdown Menu when user click
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('fa-times');
    navBar.classList.toggle('userClick');
});



// Removing Dropdown Menu after user click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('fa-times');
        navBar.classList.remove('userClick');
    });
});



window.addEventListener('scroll', () => {

    // menuBtn.classList.remove('fa-times');
    // navBar.classList.remove('userClick');

    // MenuBar going to stick on top... 
    if (window.scrollY > 150) {
        menuHeader.classList.add('fixedHere');
    } else {
        menuHeader.classList.remove('fixedHere');
    }
});