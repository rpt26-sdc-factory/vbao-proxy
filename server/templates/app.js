module.exports = (services) => `
  <div id="about" class="spaced">${services?.about?.server || ''}</div>
  <div id="instructors" class="spaced">${services?.instructors?.server || ''}</div>
  <div id="syllabus">${services?.syllabus?.server || ''}</div>
  <div id="reviews">${services?.reviews?.server || ''}</div> 
`;
