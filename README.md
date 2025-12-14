🍬 Sweet Shop Management System
📌 Project Overview

The Sweet Shop Management System is a full-stack web application designed to manage sweets inventory, purchases, and administration for a sweet shop.
It supports role-based access, allowing admins to manage inventory and users to browse and purchase sweets.

This project is implemented as part of the AI Kata – Sweet Shop Management System task.

🏗️ Tech Stack
Backend

Python

FastAPI

SQLite

SQLAlchemy

JWT Authentication

Frontend

React

JavaScript

HTML & CSS

🔐 User Roles
👤 User

Register and login

View sweets

Search sweets

Purchase sweets (if in stock)

👑 Admin

Add new sweets

Update sweet details

Delete sweets

Restock sweets

All user permissions

⚙️ Functional Requirements (Task Compliance)
Authentication & Authorization

User registration and login

JWT-based authentication

Role-based authorization (admin, user)

Sweet Management

Add sweet (Admin only)

View all sweets

Update sweet details (Admin only)

Delete sweet (Admin only)

Inventory Management

Purchase sweet (quantity decreases)

Prevent purchase when out of stock

Restock sweet (Admin only)

Search & Filter

Search sweets by name

Hide out-of-stock sweets

🧪 Test-Driven Development (TDD)

The application follows Test-Driven Development principles as outlined in the task:

API behaviors were verified through:

FastAPI automatic OpenAPI/Swagger testing

Manual endpoint validation for edge cases:

Out-of-stock purchases

Unauthorized access

Role-based restrictions

Frontend behavior validated through:

UI-based testing of user/admin flows

Role-based UI visibility testing

Each feature was tested before moving to the next implementation step to ensure correctness and stability.

🚀 How to Run the Project
🔹 Backend Setup
cd back
python -m venv .venv
.\.venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload


Backend will run at:

http://127.0.0.1:8000


Swagger API docs:

http://127.0.0.1:8000/docs

🔹 Frontend Setup
cd front
npm install
npm start


Frontend will run at:

http://localhost:3000




🤖 AI Usage Declaration (As Required by Task)

AI tools such as ChatGPT was used only as a development aid, including:

Understanding task requirements

Designing application architecture

Debugging errors

Improving code clarity and correctness

All final implementation decisions and understanding of the system are my own.
AI was used strictly as a learning and productivity aid.

