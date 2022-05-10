import Notiflix from 'notiflix';

const refs = {
  form:document.querySelector('.form')
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) { 
  e.preventDefault();
  const amount = Number(e.currentTarget.amount.value);
  const step = Number(e.currentTarget.step.value);
  const delay = Number(e.currentTarget.delay.value);

  for (let i = 0; i < amount; i += 1) { 
    setTimeout(() => {
      createPromise(i+1, delay+i*step).then(onSuccess).catch(onError)
    }, delay + i*step)
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

function onSuccess({ position, delay }) { 
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) { 
   Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}


