import React from "react";
import "../Customcss/Developer.css";

const AboutDevelopers = () => {
  const developers = [
    {
      name: "Rahul Adhikari",
      role: "Frontend Developer/Ml developer",
      description:
        "I am a Front End Developer and Machine Learning Developer. I have experience in developing web applications using React.js, Node.js, and Express.js. I have also worked on projects involving Machine Learning and Data Analysis using Python and its libraries.",
      skills: [
        "Full Stack Development",
        "Project Management",
        "Machine Learning",
        "React.js",
        "Node.js",
        "Express.js",
        "Python",

        "MongoDb",
        "SQL",
      ],
      github: "https://github.com/Rahulad12",
      linkedin: "https://www.linkedin.com/in/rahul-adhikari-7b2a87214/",
    },
    {
      name: "Utsab Singh",
      role: "Backend Developer/ Ml developer",
      description:
        "Specializing in server architecture and database optimization to ensure BizNepal runs smoothly and efficiently.",
      skills: [
        "Node.js",
        "MongoDB",
        "AWS",
        "Python",
        "Machine Learning",
        ".NET",
        "C#",
        "SQL",
      ],
      github: "https://github.com/mikejohnson",
      linkedin: "https://linkedin.com/in/mikejohnson",
    },
    {
      name: "Saurav Pachhai",
      role: "UI/UX Designer",
      description:
        "Creating responsive and interactive user interfaces while ensuring cross-browser compatibility and optimal performance.",
      skills: ["React.js", "CSS/SASS", "JavaScript"],
      github: "https://github.com/alexkumar",
      linkedin: "https://linkedin.com/in/alexkumar",
    },
  ];

  return (
    <div className="dev-container">
      <div className="profile-section">
        {developers.map((dev, index) => (
          <div className="dev-card" key={index}>
            <div className="profile-image">
              <svg viewBox="0 0 100 100" fill="#6c757d">
                <circle cx="50" cy="35" r="25" />
                <path d="M50 65 C20 65 0 85 0 100 L100 100 C100 85 80 65 50 65Z" />
              </svg>
            </div>

            <div className="dev-info">
              <h1>{dev.name}</h1>
              <h2>{dev.role}</h2>
              <p>{dev.description}</p>

              <div className="skills">
                {dev.skills.map((skill, idx) => (
                  <span className="skill-tag" key={idx}>
                    {skill}
                  </span>
                ))}
              </div>

              <div className="social-links">
                <a href={dev.github} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                  </svg>
                </a>
                <a
                  href={dev.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutDevelopers;
