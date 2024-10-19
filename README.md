# Job Posting Board
Assignment of Cuvette Team :  Job Posting Board with Email Automation [MERN]

This is the frontend of the project.

Frontend deployment link: https://cuvette-job-posting-board.vercel.app/

# Job Posting Board with Email Automation

This is a full-stack application built for companies to register, verify their accounts via email, post jobs, and send automated emails to candidates. The project is developed using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).

## Objective

The goal of this project is to create a job posting board where companies can register, post jobs, and send automated job alerts to candidates via email.

## Features

1. **User Registration (Company):**
   - Companies can register with their basic details.
   - Email and mobile verification required for account activation.
   - Only verified users can post jobs.

2. **Company Login:**
   - Implemented auto login with JWT or session-based authentication.

3. **Job Posting:**
   - Authenticated companies can post jobs with details like:
     - Job title
     - Job description
     - Experience level
     - Candidate list
     - Job end date

4. **Candidate Email Automation:**
   - Companies can send job alerts/updates to candidates via email.
   - Used `Nodemailer` to automate sending emails.
   - Emails include job details and sender information.

5. **Logout:**
   - Logout functionality clears JWT tokens or session data.

## Technologies

- **Frontend:** React.js (Responsive forms for registration, login, and job posting)
- **Backend:** Node.js & Express.js (RESTful APIs for registration, login, posting, and email automation)
- **Database:** MongoDB (Stores company details, job postings, and email logs)
- **Email Service:** Nodemailer for sending automated emails
- **Authentication:** JWT for protecting routes

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MongoDB installed locally or an active MongoDB Atlas connection
- A service like Gmail or SMTP set up for sending emails via `Nodemailer`

## Installation

1. **Clone the repository**
   
2. **In the terminal, type the following to run the frontend locally** 
   ```bash
   npm start
