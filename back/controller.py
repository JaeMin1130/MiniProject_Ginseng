from flask import Flask, render_template, request, redirect, url_for
import pymysql
from Connection import Connection
from werkzeug.utils import secure_filename
from flask_cors import CORS
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
            f = request.files['file']
            filename = secure_filename(f.filename)
            f.save(os.path.join('original_img', filename))
            files = os.listdir("original_img")

            sql = "INSERT INTO original_image (title, directory) VALUES ('%s', '%s')" % (secure_filename(f.filename), 'uploads/'+secure_filename(f.filename))
            cursor = connection.execute(db, sql)
            # 파일명과 파일경로를 데이터베이스에 저장함
            data = cursor.fetchall()
            db.commit()
            return 'File uploaded successfully!', 200  # Return a success response

        except Exception as e:
            return str(e), 500  # Return an error response
 
if __name__ == '__main__':
    app.run()