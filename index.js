//selecting the inputs and form
const form = document.getElementById('form');
const select = document.getElementById('select');
const nameInput = document.querySelector('.name');
const feesInput = document.getElementById('fees');
const amountPaid = document.getElementById('paid');
const amountRemaining = document.getElementById('remain');
const table = document.querySelector('.table');
const tbody = document.querySelector('#tbody');

//function that reflects the calculated value
const reflectValues = (sourceInput, targetInput) => {
    const sourceValue = parseInt(sourceInput.value) || 0; 
    targetInput.value = parseInt(sourceValue ) - parseInt(feesInput.value) ;
};

amountPaid.addEventListener('input', () => {
    reflectValues(amountPaid, amountRemaining);
});


//array that holds the input object
const inputArr = JSON.parse(localStorage.getItem('inputArr')) || [
    {
        className: 'primary 1',
        name: 'omotola',
        status: 'paid',
        amountDue: 'none'
    },
  
];

//function that adds the student object to the input array
const addStudent = ({className, name, status, amountDue})=>{
    inputArr.push({className, name, status, amountDue});
    localStorage.setItem('inputArr', JSON.stringify(inputArr));
    return {className, name, status, amountDue};
}

//function that creates the table dynamically
const creatTable = ({className, name, status, amountDue}, index)=>{
        table.innerHTML += `
        <tbody>
            <td>${index + 1}</td>
            <td>${className}</td>
            <td>${name }</td>
            <td>${status}</td>
            <td>${amountDue}</td>
            <td><button style='background-color: green'>edit</button></td>
            <td><button>delete</button></td>
        </tbody> `
};
inputArr.forEach((student, index)=> creatTable(student, index))

//function that gets user input and add to the array on submit
let currentIndex = inputArr.length
form.onsubmit = (e)=>{
    e.preventDefault();
    const selectValue = `Primary ${select.value}`;
    const nameValue = nameInput.value
    const PaidValue = parseInt(amountPaid.value);
    const remainderValue = parseInt(amountRemaining.value);

    //calling the addStudent function to add  add input to the array
 const newStudent = addStudent({
        className: selectValue,
        name: nameValue,
        status: `${remainderValue === 0 ? 'paid' : 'owing'}`,
        amountDue: `${remainderValue === 0 ? 'cleared' : remainderValue}`
    });

    //calling the function that creates the table for the student profile
    creatTable(newStudent, currentIndex)

    currentIndex ++;
    nameValue = '';
    PaidValue = '';
    remainderValue = '';
    console.log(inputArr)

    
}
