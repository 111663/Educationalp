let count = 0;
const button = document.getElementById('incrementBtn');

button.addEventListener('click', () => {
  count++;
  button.innerHTML = count;
});