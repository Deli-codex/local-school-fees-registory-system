const form = document.getElementById("form");
const nameInput = form["name"];
const ageInput = form["age"];
const emailInput = form["email"];
const submitBtn = document.querySelector(".btn");
const userContainer = document.querySelector(".container");

const dataContainer = JSON.parse(localStorage.getItem("dataContainer")) || [];

const addUser = (name, age, email) => {
  dataContainer.push({ name, age, email});

  localStorage.setItem("dataContainer", JSON.stringify(dataContainer));

  return { name, age, email};
};

const createProfile = ({ name, age, email }) => {
  userContainer.innerHTML += `
    <div class='userContent' id='${email}'>
      <p><strong>name: </strong> ${name}</p>
      <p><strong>age: </strong> ${age}</p>
      <p><strong>email: </strong> ${email}</p>
      <button class="edit-btn" type="button" onclick="profileEdit(this)">edit</button> 
      <button type="button" class="delete-btn" onclick="profileDelete(this)">delete</button> 
    </div>`;
};

dataContainer.forEach(createProfile);

form.onsubmit = (e) => {
  e.preventDefault();

  const newStudent = addUser(nameInput.value, ageInput.value, emailInput.value);

  createProfile(newStudent);
  nameInput.value = "";
  ageInput.value = "";
  emailInput.value = "";
};

const profileDelete = (buttonEl) => {
  const userId = buttonEl.parentNode.getAttribute('id');
  const userIndex = dataContainer.findIndex((user) => user.email === userId);
  console.log(userIndex)
  buttonEl.parentElement.remove();
  dataContainer.splice(userIndex, 1);
  localStorage.setItem("dataContainer", JSON.stringify(dataContainer));
};

  const profileEdit = (buttonEl) => {
    const userId = buttonEl.parentElement.getAttribute('id');
    const userIndex = dataContainer.findIndex((user) => user.email === userId);
    nameInput.value = dataContainer[userIndex].name;
    ageInput.value = dataContainer[userIndex].age;
    emailInput.value = dataContainer[userIndex].email;
    submitBtn.addEventListener('click', ()=>{
    dataContainer.splice(userIndex, 1)
    buttonEl.parentElement.remove()
    })
}


form.onsubmit = (e)=>{
  e
  const selectValue = select.value;
  const nameValue = nameInput.value;
  const paidAmt = parseInt(amountPaid.value);
  const remainder = parseInt(amountRemaining.value);
  const paymentStatus = remainder === 0  ? 'paid' : 'oweing';
  
  const newStudent = addStudent(selectValue, nameValue, paymentStatus , remainder);

  creatTable(newStudent, index);
  selectValue = '';
  nameValue ='';
  remainder = '';
  paidAmt = '';
}

