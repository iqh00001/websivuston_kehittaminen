const form = document.getElementById("myForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
function saveData() {
    const data = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value
    };

    localStorage.setItem("formData", JSON.stringify(data));
}
nameInput.addEventListener("input", saveData);
emailInput.addEventListener("input", saveData);
phoneInput.addEventListener("input", saveData);
function loadData() {
    const saved = localStorage.getItem("formData");

    if (saved) {
        const data = JSON.parse(saved);

        nameInput.value = data.name || "";
        emailInput.value = data.email || "";
        phoneInput.value = data.phone || "";
    }
}

loadData();
form.addEventListener("submit", (e) => {
    e.preventDefault();

    alert("Form submitted!");

    localStorage.removeItem("formData");

    form.reset();
});
phoneInput.addEventListener("blur", () => {
    let value = phoneInput.value;

    value = value.replace(/\D/g, "");

    if (value.startsWith("0")) {
        value = "+358" + value.substring(1);
    }

    phoneInput.value = value;
});