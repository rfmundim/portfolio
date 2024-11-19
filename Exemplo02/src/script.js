const form = document.getElementById("form");
const name = document.getElementById("name")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const passwordConfirmation = document.getElementById("password-confirmation");
const seletores = document.getElementById("seletores");


form.addEventListener("submit", (event) => {
  event.preventDefault();
  checkForm();
})

email.addEventListener("blur", () => {
  checkInputEmail();
})

username.addEventListener("blur", () => {
  checkInputUsername();
})

name.addEventListener("blur", () => {
  checkInputName();
})

function checkInputName(){
  const nameValue = name.value;

  if(nameValue === ""){
    errorInput(name, "Preencha o nome.")
  } else if(nameValue.length > 60) {
      errorInput(name, "Quantidade de caracteres deverá ser menor que 60.")
    } else {
      const formItem = name.parentElement;
      formItem.className = "form-content"
    }    
}


function checkInputUsername(){
  const usernameValue = username.value;

  switch (true) {
    case usernameValue === "":
      errorInput(username, "Preencha um nome de usuário.")
      break
    
    case usernameValue.length > 15:
      errorInput(username, "Quantidade de caracteres deverá ser menor que 15.")
      break

    case usernameValue === "rob124net":
      errorInput(username, "Nome de usuário já existe.")
      break

    default:
      const formItem = username.parentElement;
      formItem.className = "form-content"  

  }
}
  

function checkInputEmail(){
  const emailValue = email.value;

  const er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);

  if(emailValue === ""){
    errorInput(email, "O email é obrigatório.")
  }else if(!er.test(emailValue)) {
    errorInput(email, "Informe um e-mail válido.")
  } else {  
    const formItem = email.parentElement;
    formItem.className = "form-content"
  }
}


function checkInputPassword(){
  const passwordValue = password.value;

  if(passwordValue === ""){
    errorInput(password, "A senha é obrigatória.")
  }else if(passwordValue.length < 8){
    errorInput(password, "A senha precisa ter no mínimo 8 caracteres.")
  }else{
    const formItem = password.parentElement;
    formItem.className = "form-content"
  }
}


function checkInputPasswordConfirmation(){
  const passwordValue = password.value;
  const confirmationPasswordValue = passwordConfirmation.value;

  if(confirmationPasswordValue === ""){
    errorInput(passwordConfirmation, "A confirmação de senha é obrigatória.")
  }else if(confirmationPasswordValue !== passwordValue){
    errorInput(passwordConfirmation, "As senhas não são iguais.")
  }else{
    const formItem = passwordConfirmation.parentElement;
    formItem.className = "form-content"
  }
}


function checkForm(){
  checkInputName();
  checkInputUsername();
  checkInputEmail();
  checkInputPassword();
  checkInputPasswordConfirmation();

  const formItems = form.querySelectorAll(".form-content")

  const isValid = [...formItems].every( (item) => {
    return item.className === "form-content"
  });

  if(isValid){
    if (!seletores.checked) {
    alert("Cadastro realizado com sucesso.")} else {
      alert("Cadastro realizado com sucesso e novidades.")  
    }
  }

}

function errorInput(input, message){
  const formItem = input.parentElement;
  const textMessage = formItem.querySelector("a")

  textMessage.innerText = message;
  formItem.className = "form-content error"
    
}