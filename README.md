<h1>BizNepal Client</h1>

BizNepal is a comprehensive business directory and review platform for businesses in Nepal. This repository contains the client-side code, developed using React.

<h2>Features</h2>
<ul>
  <li><strong>Business Listings:</strong> View and search businesses based on user needs, location, and reviews.</li>
  <li><strong>User Reviews and Comments:</strong> Users can leave reviews and comments for businesses.</li>
  <li><strong>Facebook Integration:</strong> Integration with Facebook comments and pages for enhanced business interaction.</li>
  <li><strong>Business Recommendations:</strong> Personalized business recommendations based on user location.</li>
  <li><strong>Online Reservation:</strong> Users can make online reservations with listed businesses.</li>
  <li><strong>Dashboards:</strong>
    <ul>
      <li><strong>Business Dashboard:</strong> Business owners can manage their listings.</li>
      <li><strong>User Dashboard:</strong> Users can view and manage their activity on the platform.</li>
    </ul>
  </li>
</ul>

<h2>Tech Stack</h2>
<ul>
  <li><strong>React:</strong> Frontend library for building user interfaces.</li>
  <li><strong>Axios:</strong> For handling API requests.</li>
  <li><strong>Redux Toolkit:</strong> State management for the application.</li>
  <li><strong>React Router:</strong> For client-side routing.</li>
  <li><strong>Material-UI:</strong> UI component library for designing the application.</li>
</ul>

<h2>Installation and Setup</h2>

<h4>Prerequisites</h4>
Make sure you have the following installed on your system:

Node.js (v16+ recommended)
npm or Yarn

<h3>Steps</h3>

1. Clone the repository:
  git clone https://github.com/UTSAB-NI/BizNepal.git
  cd biznepal-client

2. Install the dependencies:

      Using npm:
      npm install
  
      Or using Yarn:<br>
      yarn install
  
3. Start the development server:

    Using npm:
      npm start
  
    Or using Yarn:
      yarn start
  
    The application should now be running at http://localhost:3000.

<h2>Configuration</h2>
You may need to set up environment variables for API endpoints and other configurations. Create a .env file in the root directory and add the following:

<h3>Make File</h3>

<ul>
  <li>REACT_APP_API_URL=http://your-backend-api-url</li>
  <li>REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key</li>
</ul>



Folder Structure
biznepal-client/
├── public/
├── src/
│   ├── assets/          # Images and other assets
│   ├── components/      # Reusable components
│   ├── pages/           # Page components
│   ├── redux/           # Redux store and slices
│   ├── services/        # API services
│   ├── App.js           # Main App component
│   ├── index.js         # Entry point
│   └── ...
├── .env                 # Environment variables
├── package.json         # Project metadata and scripts
└── README.md            # This file

<h2>Available Scripts</h2>
<p>In the project directory, you can run:</p>
<ul>
  <li><strong>npm start:</strong> Runs the app in development mode.</li>
  <li><strong>npm run build:</strong> Builds the app for production.</li>
  <li><strong>npm run lint:</strong> Lints the project code.</li>
  <li><strong>npm test:</strong> Runs tests (if configured).</li>
</ul>

<h2>Contributing</h2>
<p>If you'd like to contribute to this project:</p>
<ul>
  <li>Fork the repository.</li>
  <li>Create a new feature branch: <code>git checkout -b my-new-feature</code>.</li>
  <li>Commit your changes: <code>git commit -m 'Add some feature'</code>.</li>
  <li>Push to the branch: <code>git push origin my-new-feature</code>.</li>
  <li>Submit a pull request.</li>
</ul>


