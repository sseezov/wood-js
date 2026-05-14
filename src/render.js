export async function render(parentSelector, content) {
  const innerHTML = await content;
  document.querySelector(parentSelector).innerHTML = innerHTML;
}
