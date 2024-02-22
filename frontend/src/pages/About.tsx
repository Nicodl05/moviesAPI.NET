// pages/About.js
import React from "react";

const About = () => {
  return (
    <div className="about-container">
      <h1>About</h1>
      <h2>Technical Stack</h2>
      <table className="tech-stack-table">
        <thead>
          <tr>
            <th>Back-end</th>
            <th>Front-end</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>.NET 8 with ASP.NET</td>
            <td>React with TypeScript (TSX)</td>
          </tr>
          <tr>
            <td>Information retrieval via TMDB API</td>
            <td>Next.js 14</td>
          </tr>
          <tr>
            <td></td>
            <td>Basic CSS for styling</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default About;
