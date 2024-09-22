# GiveBack
Platform to connect volunteers, organizations, and individuals in-need to foster a community with visible impact.

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
