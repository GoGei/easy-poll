# joker

## Installation

clone repo: 
```bash
git clone https://github.com/GoGei/joker.git
```

create virtual env
```bash
python3.8 -m venv env
source env/bin/activate
pip install -r requirements.txt
./manage.py migrate
``` 

setup local settings
```bash
cp config/settings_example.py config/local_settings.py
```

# Commands
```bash
fab runserver
```
```bash
fab deploy_local
```