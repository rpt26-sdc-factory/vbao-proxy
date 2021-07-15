module.exports = (services, scripts) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
  <link rel="shortcut icon" href="favicon-32x32.png" type="image/x-icon">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="index.js" defer></script>
  <link rel="stylesheet" href="proxy.css" defer>
  <title>Coursera | Build Skills with Online Courses from Top Institutions</title>
</head>
<body>
  <header>
    <div class="header-left-wrapper">
      <div class="header-logo-wrapper">
        <div class="header-logo">
          <img src="logo.svg" alt="coursera logo">
        </div>
      </div>
      <div class="find-course">
        <button class=explore-button>
          <span>Explore</span>
          <span>
            <!-- <img src="reverseCarrot.svg" alt="down arrow"> -->
              <svg class="down-arrow-icon" viewBox="0 0 32 32" width="9" height="9"><path fill="#fff" d="M30.054 14.429l-13.25 13.232q-0.339 0.339-0.804 0.339t-0.804-0.339l-13.25-13.232q-0.339-0.339-0.339-0.813t0.339-0.813l2.964-2.946q0.339-0.339 0.804-0.339t0.804 0.339l9.482 9.482 9.482-9.482q0.339-0.339 0.804-0.339t0.804 0.339l2.964 2.946q0.339 0.339 0.339 0.813t-0.339 0.813z"></path></svg>
          </span>
        </button>
      </div>
      <div class="search-field-container">
        <input type="text" class="search-input" placeholder="What do you want to learn?">
      </div>
      <div class="magnifier-wrapper">
        <img src="magnifyingGlass.svg" alt="magnifying class icon">
      </div>
    </div>
    <div class="header-right-wrapper">
      <a href="#">For Enterprise</a>
      <a href="#">For Students</a>
      <a href="#" class="login-button">Log In</a>
      <button class="join-button">
        <span>Join for Free</span>
      </button>
    </div>

  </header>
  <div id="title"></div>
  <div id="primary-nav">
    <div class="nav-container">
      <nav class="dynamic-nav-bar">
        <ul>
          <li><a class="nav-link nav-link-about" href="#about">About</a></li>
          <li><a class="nav-link nav-link-instructors" href="#instructors">Instructors</a></li>
          <li><a class="nav-link nav-link-syllabus" href="#syllabus">Syllabus</a></li>
          <li><a class="nav-link nav-link-reviews" href="#reviews">Reviews</a></li>
          <li><a class="nav-link" href="#">Enrollment Options</a></li>
          <li><a class="nav-link" href="#">FAQ</a></li>
        </ul>
      </nav>
    </div>
  </div>
  ${services}
</body>
${scripts}
</html>
`;
