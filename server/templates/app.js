module.exports = (instructors = '', about = '', syllabus = '', reviews = '') => `
  <div id="about" class="spaced">${about}</div>
  <div id="instructors" class="spaced">${instructors}</div>
  <div id="syllabus">${syllabus}</div>
  <div id="reviews">${reviews}</div> 
`;
