
//selecting the inputs and form
const form = document.getElementById('form');
const select = document.getElementById('select');
const nameInput = document.querySelector('.name');
const feesInput = document.getElementById('fees');
const amountPaid = document.getElementById('paid');
const amountRemaining = document.getElementById('remain');
const table = document.querySelector('.table');
const createBtn = document.querySelector('.create');
const deleteAllBtn = document.querySelector('.delete');
const sortSelect = document.querySelector('.sort');

const reflectValues = (sourceInput, targetInput) => {
    const sourceValue = parseInt(sourceInput.value) || 0; 
    targetInput.value = Math.abs(parseInt(sourceValue ) - parseInt(feesInput.value));
};

//function that reflects the calculated value
amountPaid.addEventListener('input', () => {
    reflectValues(amountPaid, amountRemaining);
});

//array that holds the input object
const inputArr = JSON.parse(localStorage.getItem('inputArr')) || [];

//function that adds the student object to the input array
const addStudent = ({className, name, status, amountDue})=>{
    inputArr.push({className, name, status, amountDue});
    localStorage.setItem('inputArr', JSON.stringify(inputArr));
    return {className, name, status, amountDue};
}


const tbody= document.createElement('tbody');
//function that creates the table dynamically
const creatTable = ({ className, name, status, amountDue }, index) => {
    tbody.innerHTML += `
        <tr id ="${name}">
            <td>${index + 1}</td>
            <td>${className}</td>
            <td>${name}</td>
            <td>${status}</td>
            <td>${amountDue}</td>
            <td><button type='button' style='background-color: green' onclick='editEntry(this)'>edit</button></td>
            <td><button type='button' onclick='deleteEntry(this)'>delete</button></td>
        </tr>
    `;
    table.appendChild(tbody);
}
inputArr.forEach((student, index)=> creatTable(student, index))

//function that gets user input and add to the array on submit
let currentIndex = inputArr.length
form.onsubmit = (e)=>{
    e.preventDefault();
    const selectValue = `Primary ${select.value}`;
    const nameValue = nameInput.value
    const PaidValue = parseInt(amountPaid.value);
    const remainderValue = parseInt(amountRemaining.value);

    if(selectValue == ' ' || nameValue == '' || PaidValue == ''){
        return;
    } else {
        const newStudent = addStudent({
            className: selectValue,
            name: nameValue,
            status: `${remainderValue === 0 ? 'paid' : 'owing'}`,
            amountDue: `${remainderValue === 0 ? 'cleared' : remainderValue}`
        });
        creatTable(newStudent, currentIndex)
    
        currentIndex ++;
    }

    select.value = '';
    nameInput.value = '';
    amountRemaining.value = '';
    amountPaid.value = '';
}

//function that deletes an entry 
const deleteEntry = (buttonEl) => {
    const userId = buttonEl.parentElement.parentElement.getAttribute('id');
    const userIndex = inputArr.findIndex((user) => user.name === userId);
    buttonEl.parentElement.parentElement.remove();
    inputArr.splice(userIndex, 1); 
    localStorage.setItem('inputArr', JSON.stringify(inputArr));
};

const editEntry = (buttonEl) => {
    const userId = buttonEl.parentElement.parentElement.getAttribute('id')
    const userIndex = inputArr.findIndex((user) => user.name === userId);
    console.log(inputArr[userIndex].amountDue)
            nameInput.value = inputArr[userIndex].name;
            select.value = inputArr[userIndex].className;
            amountRemaining.value = inputArr[userIndex].amountDue
            amountPaid.value = parseInt(inputArr[userIndex].amountDue) + parseInt(feesInput.value);
            createBtn.addEventListener('click', ()=>{
            inputArr.splice(userIndex, 1)
            buttonEl.parentElement.parentElement.remove();
        });

}

deleteAllBtn.addEventListener('click', ()=>{
    confirm('are you sure you want to clear all entry? ');
    if (confirm === true){
        localStorage.clear();
        tbody.remove();
    }else {
        return;
    }
})

//how to sort an array and render the  display;

//working with modals