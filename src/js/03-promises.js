import Notiflix from 'notiflix';

const refs = {
  form:document.querySelector('.form')
}

const formData = {};

refs.form.addEventListener('input', e => {
  formData[e.target.name] = e.target.value;
});

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) { 
  e.preventDefault();
  for (let i = 0; i < formData.amount; i += 1) { 

    createPromise(formData.step, formData.delay)
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