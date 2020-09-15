let $buttonMain = $("section.main button.btn-main"); //przycisk główny
let $mainPopup = $("div.popup"); //cały popup
let $closePopup = $("div.popup div.popup__close"); //przycisk zamykający popup
let isClicked = false; //zmienna przechowująca czy kliknięto popup
let eMail; //zmiena zawierająca eMail
let password; //zmienna zawierająca hasło
if (JSON.parse(window.localStorage.getItem("saves")) === null) {
  //pobiera wszystkich użytkowników
  console.log("There is no user");
} else {
  getUsers();
}
function getUsers() {
  let user = JSON.parse(localStorage["saves"]);
  for (let i = 0; i < user.length; i++) {
    //pętla po wszystkich użytkownikach zarejestrowanych pobranych z lokalnej bazy, wyświetla tylko E-mail
    console.log(i + 1 + ". " + user[i].email);
  }
}

$buttonMain.click(function() {
  //pokazuje popup po naciśnięciu
  if (!isClicked) {
    isClicked = true;
    $mainPopup.toggleClass("show");
  }
});
$closePopup.click(function() {
  //chowa popup po nacisnieciu na zamknięcie
  isClicked = false;
  $mainPopup.toggleClass("show");
});
function validationForm() {
  //formularz do walidacji
  event.preventDefault(); //zabezpiecza przed odświeżeniem
  eMail = document.forms["myForm"]["fMail"].value; //pobiera email z formularza
  password = document.forms["myForm"]["fPassoword"].value; //pobiera hasło z formularza
  let terms = document.forms["myForm"]["checkTerms"].checked; //pobiera czy zaznaczono warunki pola wyboru
  if (eMail === "" && password === "") {
    //jesli hasło i e-mail puste pokazuję alert
    alert("Enter E-mail and Password!");
  } else if (!terms) {
    //jesli warunki nie zaznaczone pokazuję alert
    alert("Accept Terms!");
  } else if (!eMail.includes("@")) {
    //jesli e-mail nie zawiera @ pokazuję alert
    alert("Not valid E-mail!");
  } else {
    setTimeout(afterValidation, 3000); //funkcja wykonująca się jeśli wszystkie dane są poprawne po 3 sekundach
  }
}
function afterValidation() {
  $mainPopup.toggleClass("show");
  $buttonMain.text("Thank you!");
  let drop = JSON.parse(localStorage.getItem("saves")) || []; //pobiera wszystkie dane z bazy lokalnej
  const person = {
    email: eMail,
    password: password,
  }; //tworzy obiekt
  drop.push(person); //dodaje do pobranego obiektu, obiekt dodany
  localStorage.setItem("saves", JSON.stringify(drop)); //dodaje obiekty do bazy lokalnej
  isClicked = false;
  document.forms["myForm"].reset(); //reset formularza
}
