import Notiflix from 'notiflix';

const refs = {
  form:document.querySelector('.form')
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) { 
  e.preventDefault();
  const amount = e.currentTarget.amount.value;
  const step = e.currentTarget.step.value;
  const delay = e.currentTarget.delay.value;
  
  for (let i = 0; i < amount; i += 1) { 

    createPromise(step, delay)
    .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }

  refs.form.reset()
}

function createPromise(position, delay) {

  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {

    setTimeout(() => { 
      if (shouldResolve) {
        resolve({ position, delay } );
        } else {
        reject({ position, delay });
        }

    }, delay)
  });
}