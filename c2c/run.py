import os
from app.app import create_app

app = create_app()

if __name__ == '__main__':
    
    app.run(port=int(os.environ.get('PORT') or 0) or 5001)
