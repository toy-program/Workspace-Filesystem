const submitBtn = document.querySelector("#submit");
const fileUpload = document.querySelector("#file");

if (fileUpload.value === "") {
  submitBtn.disabled = true;
}

fileUpload.onchange = () => {
  submitBtn.disabled;
};
