from Connection import Connection
# 모델 임포트

connection = Connection()
db = connection.connect()

def predict(originalFile, id):
    
    '''
    
    모델 돌리는 부분
    
    '''

    sql = "INSERT INTO labeled_image VALUES ('%d', '%s', '%s', '%s')" % (id, secure_filename(labeledFile.filename), 'labeled_img/'+secure_filename(labeledFile.filename), grade)
    cursor = connection.execute(db, sql)
    data = cursor.fetchall()
    db.commit()

    return labeledFile, grade