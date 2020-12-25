import os
from main import app
if __name__=='__main__':
    appPort=int(os.environ.get('PORT',5000))
    app.run(debug=True,host='0.0.0.0',port=appPort)