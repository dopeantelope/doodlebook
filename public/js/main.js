// mobile menu

const btn = document.getElementById('menu-btn')
const nav = document.getElementById('menu')
const body = document.getElementById('body')

btn.addEventListener('click', () => {
  btn.classList.toggle('open')
  nav.classList.toggle('flex')
  nav.classList.toggle('hidden')
  body.classList.toggle('overflow-hidden')
})