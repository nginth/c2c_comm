import os
from app.app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(port=os.environ['API_PORT'])
