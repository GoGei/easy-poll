# joker

## Installation

clone repo: 
```bash
git clone https://github.com/GoGei/joker.git
```

add hosts to **/etc/hosts** file:
```
127.0.0.1           easy-poll.local
127.0.0.1       api.easy-poll.local
127.0.0.1     admin.easy-poll.local
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