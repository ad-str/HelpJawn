# HelpJawn

Welcome to **HelpJawn**, a transformative platform dedicated to forging connections between volunteers, organizations, and individuals in need, all with the aim of cultivating a community where each action makes a meaningful impact.

### Our Vision: 
HelpJawn was founded on the belief that when we come together, we can truly make a difference. Our mission is to empower both volunteers and organizations, fostering a collaborative community that addresses societal needs with compassion and purpose.

### Platform Overview: 
At HelpJawn, we provide a way for volunteers to discover meaningful opportunities to contribute their time and skills. Whether you're passionate about education, environmental conservation, community health, or beyond, there's a place for you to make a difference here. We also provide a fun and heartfelt way for individuals to thank our volunteers for their amazing service. Organizations can also create accounts and post new events!

Get Started: Visit HelpJawn.com today to discover how you can be a part of our community-driven movement. Together, let's build a better world, one event at a time.



# Installation
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
