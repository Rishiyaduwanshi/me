const currentYear = document.getElementById('currentYear')

const currentDate = new Date();
// console.log(currentDate.getFullYear())
currentYear.innerText = currentDate.getFullYear()