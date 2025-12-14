const questions = document.querySelectorAll(".faq-question");

questions.forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.parentElement;

    document.querySelectorAll(".faq-item").forEach((el) => {
      el.classList.remove("active");
      el.querySelector(".icon").textContent = "+";
    });

    item.classList.add("active");
    question.querySelector(".icon").textContent = "−";
  });
});
