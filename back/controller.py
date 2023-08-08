from flask import Flask, render_template, request, redirect, url_for
import pymysql
from werkzeug.utils import secure_filename
from flask_cors import CORS
from Connection import Connection
from service import predict
import os

app = Flask(__name__)
# CORS 모든 도메인에 허용
CORS(app)

connection = Connection()
db = connection.connect()
@app.route('/fileUpload', methods=['POST'])
def file_upload():
    if request.method == 'POST':
        try:
            print("request", request.files)
            originalFile = request.files['file']
            fileName = secure_filename(originalFile.filename)
            originalFile.save(os.path.join('original_img', fileName))
            files = os.listdir("original_img")

            print("start db")
            sql = "INSERT INTO original_image(title, directory) VALUES ('%s', '%s')" % (fileName, 'original_img/'+fileName)
            cursor = connection.execute(db, sql)
            data = cursor.fetchall()
            db.commit()
            print("commit success")
            # predict(originalFile, id)
            return "success", 200

        except Exception as e:
            return str(e), 500  # Return an error response
 
if __name__ == '__main__':
    app.run()