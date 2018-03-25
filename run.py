import os
from app.app import create_app

app = create_app()

if __name__ == '__main__':
    # port = os.environ['API_PORT'] or 5001
    app.run(port=5001)
