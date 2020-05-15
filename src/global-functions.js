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
    return text.substring(0, maxLength) + ' ...';
  }

  console.log(text)
}

module.exports = { slugify, truncateText }