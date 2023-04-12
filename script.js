let form = document.querySelector(".form");
let emailInput = document.querySelector(".email");
let countryInput = document.querySelector(".country");
let zipCodeInput = document.querySelector(".zip-code");
let passwordInput = document.querySelector(".password");
let passwordConfirmInput = document.querySelector(".password-confirm");

let emailValid = false;
let zipCodeValid = false;
let passwordValid = false;
let passwordConfirmValid = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  verifyForm();
});

function verifyForm() {
  console.log("verifying");
  verifyEmail();
  verifyZipCode();
  verifyPassword();
  verifyPasswordConfirm();
  submitForm();
}

function verifyEmail() {
  console.log("verifying email");
  emailInput.setCustomValidity("");

  let validRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
  console.log(validRegex.test(emailInput.value));

  if (!validRegex.test(emailInput.value)) {
    console.log(emailInput.value);
    emailInput.setCustomValidity(
      "Please use valid email - example@example.com"
    );
    emailInput.reportValidity();
  } else {
    emailInput.setCustomValidity("");
    emailValid = true;
  }
}
function verifyZipCode() {
  console.log("verifying zip code");
  if (countryInput.value === "United States") {
    usZipCode();
  } else if (countryInput.value === "Canada") {
    canadaZipCode();
  } else if (countryInput.value === "United Kingdom") {
    ukZipCode();
  } else if (countryInput.value === "Australia") {
    australiaZipCode();
  }
}

function usZipCode() {
  let validRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  console.log(validRegex.test(zipCodeInput.value));
  if (!validRegex.test(zipCodeInput.value)) {
    zipCodeInput.setCustomValidity(
      "Please use a valid zip code. Example - 12345 or 12345-6789"
    );
    zipCodeInput.reportValidity();
  } else {
    zipCodeInput.setCustomValidity("");
    zipCodeValid = true;
  }
}

function canadaZipCode() {
  let validRegex =
    /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i;
  console.log(validRegex.test(zipCodeInput.value));
  if (!validRegex.test(zipCodeInput.value)) {
    zipCodeInput.setCustomValidity(
      "Please use a valid zip code. Example - A1A 1A1"
    );
    zipCodeInput.reportValidity();
  } else {
    zipCodeInput.setCustomValidity("");
    zipCodeValid = true;
  }
}

function ukZipCode() {
  let validRegex =
    /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/;
  console.log(validRegex.test(zipCodeInput.value));
  if (!validRegex.test(zipCodeInput.value)) {
    zipCodeInput.setCustomValidity(
      "Please use a valid zip code. Examples - AA9A 9AA, A9A 9AA, A9 9AA, A99 9AA, AA9 9AA, AA99 9AA"
    );
    zipCodeInput.reportValidity();
  } else {
    zipCodeInput.setCustomValidity("");
    zipCodeValid = true;
  }
}

function australiaZipCode() {
  let validRegex = /(^(0[289][0-9]{2})$|^([1-9][0-9]{3})$)/;
  console.log(validRegex.test(zipCodeInput.value));
  if (!validRegex.test(zipCodeInput.value)) {
    zipCodeInput.setCustomValidity(
      "Please use a valid zip code. Example - 2599"
    );
    zipCodeInput.reportValidity();
  } else {
    zipCodeInput.setCustomValidity("");
    zipCodeValid = true;
  }
}

function verifyPassword() {
  let numRegex = /\d/;
  let lowerRegex = /[a-z]/;
  let upperRegex = /[A-Z]/;
  let specialRegex = /[!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]/;

  let numValid = false;
  let lowerValid = false;
  let upperValid = false;
  let specialValid = false;

  if (6 <= passwordInput.value.length && passwordInput.value.length <= 12) {
    console.log("verifying password");
    if (!numRegex.test(passwordInput.value)) {
      passwordInput.setCustomValidity(
        "Password must contain at least one number"
      );
      passwordInput.reportValidity();
    } else {
      passwordInput.setCustomValidity("");
      numValid = true;
    }
    if (!lowerRegex.test(passwordInput.value)) {
      passwordInput.setCustomValidity(
        "Password must contain at least one lowercase letter"
      );
      passwordInput.reportValidity();
    } else {
      passwordInput.setCustomValidity("");
      lowerValid = true;
    }
    if (!upperRegex.test(passwordInput.value)) {
      passwordInput.setCustomValidity(
        "Password must contain at least one uppercase letter"
      );
      passwordInput.reportValidity();
    } else {
      passwordInput.setCustomValidity("");
      upperValid = true;
    }
    if (!specialRegex.test(passwordInput.value)) {
      passwordInput.setCustomValidity(
        "Password must contain at least one special character"
      );
      passwordInput.reportValidity();
    } else {
      passwordInput.setCustomValidity("");
      specialValid = true;
    }

    if (numValid && lowerValid && upperValid && specialValid) {
      console.log("Valid Password");
      passwordValid = true;
    }
  } else {
    passwordInput.setCustomValidity("Password must be 6-12 characters long");
    passwordInput.reportValidity();
  }
}

function verifyPasswordConfirm() {
  if (passwordConfirmInput.value !== passwordInput.value) {
    passwordConfirmInput.setCustomValidity("Passwords do not match!");
    passwordConfirmInput.reportValidity();
    console.log(passwordConfirmInput.value, passwordInput.value);
  } else {
    passwordConfirmInput.setCustomValidity("");
    console.log("Test");
    passwordConfirmValid = true;
  }
}
function submitForm() {
  if (emailValid && zipCodeValid && passwordValid && passwordConfirmValid) {
    alert("HIGH FIVE!! You filled out the form correctly!");
  }
}

emailInput.addEventListener("change", verifyEmail);
countryInput.addEventListener("change", verifyZipCode);
zipCodeInput.addEventListener("change", verifyZipCode);
passwordInput.addEventListener("change", verifyPassword);
passwordConfirmInput.addEventListener("change", verifyPasswordConfirm);
