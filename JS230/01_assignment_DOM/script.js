document.addEventListener('DOMContentLoaded', () => {
  document.body.prepend(document.querySelectorAll('header')[1])
  document.querySelector('header').prepend(document.querySelector('main h1'))

  let [baby, metro] = document.querySelectorAll('#content figure');

  document.querySelector('article').append(metro, baby)
  // no need to copy, as they are moved automatically
  
  let [babyCaption, metroCaption] = document.querySelectorAll('figcaption')
  baby.append(babyCaption)
  metro.append(metroCaption)
})

