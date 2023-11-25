let date = JSON.parse(localStorage.getItem('date of birth')) || { day: 0, month: 0, year: 0 };
function findAge(date) {
    let currentDate = new Date();
    let birthDate = new Date(date.year, date.month - 1, date.day);
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    let monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) { age--; }
    return age;
}
function show() {
    let inputDate = document.getElementById('date').valueAsDate;
    let currentDate = new Date();
    if (inputDate && inputDate.getFullYear() > currentDate.getFullYear() - 100) {
        date.year = inputDate.getFullYear();
        date.month = inputDate.getMonth() + 1;
        date.day = inputDate.getDate();
        localStorage.setItem('date of birth', JSON.stringify(date));
        document.getElementById('main').style.display = ``;
        document.getElementById('form').style.display = `none`;
        updateText();
    } else {
        document.getElementById('date').style.backgroundColor = `red`
        setTimeout( function() { document.getElementById('date').style.backgroundColor = `transparent` }, 100)
    }
}
function updateText() {
    const width = [35, 30, 25, 20, 16, 15.3]
    let i = 0
    if (screen.width >= 690) { i = 0; }
    else if (screen.width < 690 && screen.width >= 590) { i = 1; }
    else if (screen.width < 590 && screen.width >= 490) { i = 2; }
    else if (screen.width < 490 && screen.width >= 400) { i = 3; }
    else if (screen.width < 400 && screen.width >= 355) { i = 4; }
    else if (screen.width < 355) { i = 5; }
    document.getElementById("progress").style.width = (findAge(date) > 100) ? width[i] : findAge(date) / 100 * width[i] + "em";
    document.getElementById('main').querySelector('p:nth-child(3)').innerHTML = `In those ${findAge(date)} years, check what you have done:`;
    console.log(width[i])
}
window.addEventListener('resize', updateText);
function save(i) {
    let checkbox = document.getElementsByClassName('items')[i].querySelector('input:nth-child(1)');
    if (checkbox.checked) { checked.push(i) }
    else { checked.splice(checked.indexOf(i), 1); }
    localStorage.setItem('checked', JSON.stringify(checked));
}
window.onload = function() {
    if (date.year == 0) { document.getElementById('form').style.display = ``; }
    else {
        document.getElementById('main').style.display = ``;
        updateText();
    }
    for (let i = 0; i < lifeChecklist.length; i++) {
        const div = document.createElement('div');
        div.classList.add('items');
      
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', `cb${i}`);
        checkbox.setAttribute('onclick', `save(${i})`);
        checkbox.classList.add('checkbox');
        if (checked.includes(i)) { checkbox.checked = true }

        const label = document.createElement('label');
        label.setAttribute('for', `cb${i}`);
        label.setAttribute('class', `checklist`);
        label.textContent = lifeChecklist[i];
      
        div.appendChild(checkbox);
        div.appendChild(label);
      
        document.getElementById('list').appendChild(div);
    }
}