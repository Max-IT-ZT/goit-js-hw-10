import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
document.querySelector('.form').addEventListener('submit', function (e) {
  e.preventDefault();

  const delay = +this.elements.delay.value;
  const step = +this.elements.step.value;
  const amount = +this.elements.amount.value;

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    createPromise(position, delay + i * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});
