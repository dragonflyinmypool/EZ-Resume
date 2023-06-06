// export prompt;
const htmlTemplate = `
<main>
  <div class="container">
    <div class="header">
      <h1>My Name</h1>
      <p>My Job Title</p>
    </div>
    <div class="section">
      <h2>About Me</h2>
      <p>Short description about myself...</p>
    </div>
    <div class="section">
      <h2>Skills</h2>
      <ul>
        <li>Skill 1</li>
        <li>Skill 2</li>
        <!-- Add more skills here -->
      </ul>
    </div>
    <div class="section">
      <h2>Experience</h2>
      <div class="job">
        <h3>Job Title at Company</h3>
        <p class="job-duration">Dates</p>
        <p>Description of job...</p>
      </div>
      <!-- Add more jobs here -->
    </div>
    <div class="section">
      <h2>Education</h2>
      <div class="education">
        <h3>Degree at Institution</h3>
        <p class="edu-duration">Dates</p>
        <p>Description...</p>
      </div>
      <!-- Add more education here -->
    </div>
    <div class="footer">
      <p>Contact: myemail@example.com</p>
    </div>
  </div>
<style>
@import url('https://fonts.googleapis.com/css2?family=Lora&family=Poppins:wght@300&family=Roboto+Slab&display=swap');

body {
    font-family: 'Roboto Slab', serif;
    margin: 0;
    padding: 0;
    background-color: #f5f7fa;
    color: #333;
}

.container {
    max-width: 800px;
    margin: 5px auto;
    padding: 5px;
    background-color: #ffffff;
    box-shadow: 0 2px 20px rgba(0,0,0,0.05);
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
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    color: #1a1a2e;
    border-bottom: 1px solid #1a1a2e;
}

.section p, .section ul {
    margin: 2px 0;
    padding: 0;
    font-size: 12px;
}

.section ul li {
    margin-left: 15px;
}

.job, .education {
    margin-bottom: 3px;
}

.job h3, .education h3 {
    font-family: 'Lora', serif;
    font-size: 12px;
    color: #333;
}

.job-duration, .edu-duration {
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
</main>`;

// exports.generatePrompt = (
//   jobListing,
//   firstName,
//   lastName,
//   phone,
//   location,
//   jobs,
//   skills,
//   education
// ) =>
//   `# Generate a resume in html and with css style tag for the following job. It should be in pure html with a css style tag. This html will be placed directly in a web page.
//   ========
//   job: ${jobListing}
//   ========
//   Try to stay true to the following information provided by the user. If you think it is necessary, you can add additional information to the resume. Color the new info in green.
//   ========
//   ## Based on the following information provided by the user:
//   ${firstName} ${lastName}
//   ## Basic Information
//   ${firstName} ${lastName}
//   ${phone}
//   ${location}
//   ## Work Experience
//   ${jobs.map((job) => `### ${job.description}`).join('\n')}
//   ## Skills
//   ${skills.map((skill) => `### ${skill.description}`).join('\n')}
//   ## Education
//   ${education.map((edu) => `### ${edu.description}`).join('\n')}

//     ## You can use the following html template to get started:
//     ${htmlTemplate}
//   `;

exports.generatePrompt = () => 'create a resume';
