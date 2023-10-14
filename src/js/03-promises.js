function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const delay = parseInt(form.elements.delay.value);
  const step = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const currentDelay = delay + i * step;

    createPromise(position, currentDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Промис ${position} выполнен через ${delay} мс`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Промис ${position} отклонен через ${delay} мс`);
      });
  }
}

const form = document.querySelector('.form');
form.addEventListener('submit', handleFormSubmit);
