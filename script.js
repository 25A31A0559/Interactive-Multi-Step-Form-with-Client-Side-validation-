const form = document.getElementById("multiStepForm");
const steps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const nextButtons = document.querySelectorAll(".next");
const prevButtons = document.querySelectorAll(".prev");

let currentStep = 0;

function showStep(step) {
    steps.forEach((item, index) => {
        item.classList.toggle("active", index === step);
    });

    progressSteps.forEach((item, index) => {
        item.classList.toggle("active", index <= step);
    });
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(error => {
        error.textContent = "";
    });
}

function validateStep(step) {
    clearErrors();

    if (step === 0) {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        let valid = true;

        if (name.length < 3) {
            document.getElementById("nameError").textContent = "Enter at least 3 characters.";
            valid = false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById("emailError").textContent = "Enter a valid email address.";
            valid = false;
        }

        return valid;
    }

    if (step === 1) {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        let valid = true;

        if (username.length < 4) {
            document.getElementById("usernameError").textContent = "Username must contain at least 4 characters.";
            valid = false;
        }

        if (password.length < 8) {
            document.getElementById("passwordError").textContent = "Password must contain at least 8 characters.";
            valid = false;
        }

        return valid;
    }

    if (step === 2) {
        const phone = document.getElementById("phone").value.trim();
        const country = document.getElementById("country").value;
        let valid = true;

        if (!/^[0-9]{10}$/.test(phone)) {
            document.getElementById("phoneError").textContent = "Enter a valid 10-digit phone number.";
            valid = false;
        }

        if (country === "") {
            document.getElementById("countryError").textContent = "Please select a country.";
            valid = false;
        }

        return valid;
    }

    return true;
}

nextButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
        }
    });
});

prevButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentStep--;
        clearErrors();
        showStep(currentStep);
    });
});

form.addEventListener("submit", event => {
    event.preventDefault();

    if (validateStep(currentStep)) {
        form.style.display = "none";
        document.querySelector(".progress").style.display = "none";
        document.getElementById("successMessage").textContent =
            "Registration completed successfully!";
    }
});
