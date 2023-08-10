from flask import Flask, render_template, request, redirect, url_for
import pymysql
from werkzeug.utils import secure_filename
from flask_cors import CORS
from service import predict
import os

app = Flask(__name__)
# CORS 모든 도메인에 허용
CORS(app)

@app.route('/fileupload', methods=['POST'])
def file_upload():
    if request.method == 'POST':
        try:
            print("request", request.files)
            originalFile = request.files['file']
            fileName = secure_filename(originalFile.filename)
            imgPath = './original_img/'+fileName
            originalFile.save(os.path.join(imgPath))
            print("save image")
            grade = predict(imgPath)

            return grade, 200

        except Exception as e:
            return str(e), 500  # Return an error response
 
if __name__ == '__main__':
    app.run(host="localhost")