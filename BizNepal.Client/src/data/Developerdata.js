import { FaGithub } from "react-icons/fa";

const Developerdata = [
  {
    id: 1,
    name: "Rahul Adhikari",
    Role: "Front End Developer/Ml developer",
    description:
      "I am a Front End Developer and Machine Learning Developer. I have experience in developing web applications using React.js, Node.js, and Express.js. I have also worked on projects involving Machine Learning and Data Analysis using Python and its libraries.",

    img: "https://randomuser.me/api/portraits",
    skills: [
      "React.js",
      "Node.js",
      "Express.js",
      "Python",
      "Machine Learning",
      "Data Analysis",
    ],

    social: [
      {
        id: 1,
        link: "https://facebook.com/whybusinessthis",
        icon: <FaTwitter />,
      },
      {
        id: 2,
        link: "https://twitter.com/whybusinessthis",
        icon: <FaLinkedin />,
      },
      {
        id: 3,
        link: "https://linkedin.com/company/whybusinessthis",
        icon: <FaGithub />,
      },
    ],
  },
];
