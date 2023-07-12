// export prompt;
const htmlTemplate = `
{
    "basicInfo": {
        "name": "My Name",
        "jobTitle": "My Job Title"
    },
    "aboutMe": "Short description about myself...",
    "skills": ["Skill 1", "Skill 2"],
    "experience": [
        {
            "jobTitle": "Job Title at Company",
            "jobDuration": "Dates",
            "JobDutiesOrAccomplishments": ["Duty/Accomplishment 1",  "Duty/Accomplishment Duty 2", "Duty/Accomplishment Duty 2"]
        }
    ],
    "education": [
        {
            "degree": "Name of Institution",
            "eduDuration": "Dates",
            "description": "Description..."
        }
    ],
    "contact": "phone number"
}
`;

exports.generatePrompt = (
  jobListing,
  firstName,
  lastName,
  phone,
  location,
  jobs,
  skills,
  education
) =>
  `# Generate a resume for the following job. ## Return the resume in the following format, as a Javascript object:
    ${htmlTemplate}
  ========
  job: ${jobListing}
  ========
  Try to stay true to the following information provided by the user. If you think it is necessary, you can add additional information to the resume.
  ========
  ## Based on the following information provided by the user:
  ${firstName} ${lastName}
  ## Basic Information
  ${firstName} ${lastName}
  ${phone}
  ${location}
  ## Work Experience
  ${jobs
    .map(
      (job) =>
        `### Company: ${job.company}, Position: ${job.position}, Start Date: ${job.startDate}, End Date: ${job.endDate}, Description: ${job.jobDescription}`
    )
    .join('\n')}
  ## Skills
  ${skills.map((skill) => `### ${skill.skill}`).join('\n')}
  ## Education
  ${education.map((edu) => `### ${edu.school}, ${edu.info}`).join('\n')}
  `;
