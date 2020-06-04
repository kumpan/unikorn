function slugify(text) {
  return text.toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}

function truncateText(text, maxLength) {
  if(text.length >= maxLength) {
    return text.substring(0, maxLength) + " ...";
  }
}

function closestByClass(el, name) {
  while (el.className !== name) {
      el = el.parentNode;
      if (!el) {
          return null;
      }
  }
  return el;
}

module.exports = { slugify, truncateText, closestByClass }