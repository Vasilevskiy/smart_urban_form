window.addEventListener("submit", submitForm);
async function submitForm(e) {
  e.preventDefault();

  const form = document.querySelector(".form");
  const formValues = Object.values(form).reduce((obj, field) => {
    obj[field.name] = field.value;
    return obj;
  }, {});
  await fetch("smtp/send-mail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
  downloadPDF();
}

function downloadPDF() {
  var link = document.createElement("a");
  link.href = "./public/20.08.20_smart_urban new_compressed.pdf";
  link.download = "20.08.20_smart_urban new_compressed.pdf";
  link.dispatchEvent(new MouseEvent("click"));
}
