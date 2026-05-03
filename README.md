PassGen – Secure Password Generator
Introduction

PassGen is a fast, lightweight, and secure web application for generating strong, customizable passwords. It runs entirely in the browser, ensuring that no generated passwords are stored or transmitted—keeping user data private.


Table of Contents


Introduction
Live Demo
Features
Usage
Tech Stack
Project Structure
Configuration
Examples
Troubleshooting
Future Improvements
Contributors
License

Live Demo
🌐 https://passgen-navy-seven.vercel.app/
💻 https://github.com/Delna-730/passgen.git

Features

Generate strong, random passwords instantly
Customize password length
Toggle character sets:
Uppercase letters (A–Z)
Lowercase letters (a–z)
Numbers (0–9)
Symbols (!@#$%^&*)
Copy to clipboard with one click
Responsive and user-friendly interface
Fully client-side (no backend required)

Usage

Open the app
Set your desired password length.

Select character options.

Click Generate Password.

Copy the password and use it securely.

Tech Stack

HTML5

CSS3

JavaScript

Vercel (deployment)

Project Structure

passgen/
│── index.html
│── style.css
│── script.js
│── README.md
⚙️ Configuration

You can customize password generation logic in the utility file:

const length = 12;
const includeUppercase = true;
const includeNumbers = true;
const includeSymbols = true;

You may adjust:

Character sets
Password length limits
Randomization logic
💡 Examples

Generated Password:

Xk9#pL2@qW7!

Settings:

Length: 12
Uppercase: Enabled
Numbers: Enabled
Symbols: Enabled
🐞 Troubleshooting
Issue	Solution
App not starting	Run npm install
Port already in use	Change port or stop other service
Copy button not working	Check browser permissions
🚧 Future Improvements
Password strength indicator
Dark/light mode toggle
Passphrase generator
Option to exclude ambiguous characters
Generate multiple passwords at once
👥 Contributors
Delna (GitHub: Delna-730)

License 
This project is licensed under the MIT License.
