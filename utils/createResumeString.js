function createResumeString(resumeData) {
  let skills = '';
  for (let i = 0; i < resumeData.skills.length; i++) {
    skills += `<li>${resumeData.skills[i]}</li>`;
  }

  let experience = '';
  for (let i = 0; i < resumeData.experience.length; i++) {
    let jobDuties = '';
    for (
      let e = 0;
      e < resumeData.experience[i].JobDutiesOrAccomplishments.length;
      e++
    ) {
      jobDuties += `<li>${resumeData.experience[i].JobDutiesOrAccomplishments[e]}</li>`;
    }
    experience += `<div class="job">
      <h3>${resumeData.experience[i].jobTitle}</h3>
      <p class="job-duration">${resumeData.experience[i].jobDuration}</p>
      <ul>${jobDuties}</ul>
    </div>`;
  }

  let education = '';
  for (let i = 0; i < resumeData.education.length; i++) {
    education += `<div class="education">
      <h3>${resumeData.education[i].degree}</h3>
      <p>${resumeData.education[i].description}</p>
    </div>`;
  }

  let resumeString = `<html><body><main>
    <div class="container">
      <div class="header">
        <h1>${resumeData.basicInfo.name}</h1>
        <p>${resumeData.basicInfo.jobTitle}</p>
      </div>
      <div class="section">
        <h2>About Me</h2>
        <p>${resumeData.aboutMe}</p>
      </div>
      <div class="section">
        <h2>Skills</h2>
        <ul class="skills">${skills}</ul>
      </div>
      <div class="section">
        <h2>Experience</h2>${experience}</div>
      <div class="section">
        <h2>Education</h2>${education}</div>
      <div class="footer">
        <p>Contact: ${resumeData.contact}</p>
      </div>
    </div>
  </main>
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Lora&family=Poppins:wght@300&family=Roboto+Slab&display=swap');

  .skills {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  body {
    font-family: 'Roboto Slab', serif;
    margin: 0;
    padding: 15;
    background-color: #f5f7fa;
    color: #333;
  }

  .container {
    max-width: 800px;
    margin: 5px auto;
    padding: 5px;
    background-color: #ffffff;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }

  .header {
    text-align: center;
    padding: 5px 0;
    background-color: #1a1a2e;
    color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .header h1 {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
  }

  .header p {
    margin: 0;
    font-family: 'Lora', serif;
    font-size: 12px;
  }

  .section {
    margin: 3px 0;
  }

  .section h2 {
    margin-top: 15px;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    color: #1a1a2e;
    border-bottom: 1px solid #1a1a2e;
  }

  .section p,
  .section ul {
    margin: 2px 0;
    padding: 0;
    font-size: 12px;
  }

  .section ul li {
    margin-left: 15px;
  }

  .job,
  .education {
    margin-bottom: 3px;
  }

  .job h3,
  .education h3 {
    font-family: 'Lora', serif;
    font-size: 12px;
    color: #333;
  }

  .job-duration,
  .edu-duration {
    font-size: 10px;
    color: #666;
    font-style: italic;
  }

  .footer {
    text-align: center;
    padding: 5px;
    background-color: #1a1a2e;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
</style>
</body>
</html>
  `;
  return resumeString;
}

module.exports.createResumeString = createResumeString;
