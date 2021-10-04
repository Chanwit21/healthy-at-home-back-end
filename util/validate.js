function validateYouTubeUrl(urlToParse) {
  if (urlToParse) {
    var regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (urlToParse.match(regExp)) {
      return true;
    }
  }
  return false;
}

module.exports = { validateYouTubeUrl };
