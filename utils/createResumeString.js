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
      <p class="edu-duration">${resumeData.education[i].eduDuration}</p>
      <p>${resumeData.education[i].description}</p>
    </div>`;
  }

  let resumeString = `<main>
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
        <ul>${skills}</ul>
      </div>
      <div class="section">
        <h2>Experience</h2>${experience}</div>
      <div class="section">
        <h2>Education</h2>${education}</div>
      <div class="footer">
        <p>Contact: ${resumeData.contact}</p>
      </div>
    </div>
  </main>`;
  return resumeString;
}

module.exports.createResumeString = createResumeString;
