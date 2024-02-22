// pages/About.tsx
import React, { useEffect, useState } from "react";

export default function About() {
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    fetch("https://api.github.com/users/Nicodl05")
      .then((response) => response.json())
      .then((data) => {
        setAvatarUrl(data.avatar_url);
      });
  }, []);

  return (
    <div className="card">
      {avatarUrl && <img src={avatarUrl} alt="Avatar" className="avatar" />}
      <h1>Hello there, I'm Nicolas 👋</h1>
      <p>I'm an engineering student specializing in cybersecurity.</p>
      <p>
        I completed my studies at ECE Paris. I'm concluding my studies by
        working at Onepoint in Paris as a backend consultant.
      </p>
      <p>
        I'm passionate about software development, and I'm also interested in
        all kinds of new technologies.
      </p>
      <p>Skills: Java, C#, React, JavaScript, TypeScript</p>

      <h2>Education</h2>
      <ul>
        <li>ECE Paris, Engineering School</li>
        <li>Inseec U London</li>
      </ul>

      <h2>Contact Information</h2>
      <p>Email: nicolas.dreyfus@outlook.fr</p>
    </div>
  );
}
