export async function render(parentSelector, content) {
  const element = await content;
  const parent = document.querySelector(parentSelector);
  parent.replaceChildren(element);
};
