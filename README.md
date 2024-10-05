# HelpJawn ☘️

Welcome to **HelpJawn**, a transformative platform dedicated to forging connections between volunteers, organizations, and individuals in need, all with the aim of cultivating a community where each action makes a meaningful impact.

<img src="/frontend/public/images/flower.jpg" alt="The San Juan Mountains are beautiful!" title="San Juan Mountains" style="width: 400px; height: auto;">

## Our Vision: 
HelpJawn was founded on the belief that when we come together, we can truly make a difference. Our mission is to empower both volunteers and organizations, fostering a collaborative community that addresses societal needs with compassion and purpose.

## Platform Overview: 
At HelpJawn, we provide a way for volunteers to discover meaningful opportunities to contribute their time and skills. Whether you're passionate about education, environmental conservation, community health, or beyond, there's a place for you to make a difference here. 
<div style="display: flex; justify-content: center;">
    <img src="/frontend/public/images/homepage.jpg" alt="Home Page" title="Home Page">
</div>

<br><br>
Organizations can create accounts and post new events and users can update their profiles!
<div style="display: flex; justify-content: center; gap: 500px;">
    <img src="/frontend/public/images/organizerevents.jpg" alt="Events" title="Event" style="width: 675px;">
    <img src="/frontend/public/images/profile.jpg" alt="User Profile" title="User Profile" style="width: 283px;">
</div>

<br><br>
<br><br>
We also provide a fun and heartfelt way for individuals to thank our volunteers for their amazing service.

<div style="display: flex; justify-content: center; gap: 10px;">
    <img src="/frontend/public/images/moreinfo.jpg" alt="More Info" title="More info" style="width: 400px; height: auto;">
</div>
<div style="display: flex; justify-content: center; gap: 10px;">
    <img src="/frontend/public/images/impact.jpg" alt="Impact" title="Impact" style="width: 400px; height: auto;">
</div>
<br><br>
Get Started Today!
Vist our website and discover how you can be a part of our community-driven movement. Together, let's build a better world, one event at a time.
<br><br>
<br><br>

# Local Installation for project
To install Python (version >= 3.8) packages:
```
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

To install node (version >= 22) modules:
```
cd frontend
npm i
```

# Commands
Server migrations:
```
cd backend
python3 manage.py makemigrations
python3 manage.py migrate
```

Flush all data and populate database:
```
cd backend
python3 manage.py flush
python3 manage.py populate_test_data
```

Run Server
```
cd backend
python3 manage.py runserver
```

Run React+Vite Frontend
```
cd frontend
npm run dev
```
