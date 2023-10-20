// registerForm.js
import register from "../js/templates/register/index";

export const handleRegisterFormSubmit = (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const profile = Object.fromEntries(formData.entries());

  const action = form.action;
  const method = form.method;

  // send it to the APi

  register(profile, action, method);
};
