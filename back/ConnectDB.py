# 모듈 import
import pymysql

class ConnectDB():
    def connect(self):
        db = pymysql.connect(host='127.0.0.1', user='Iru', password='11300315', db='ginseng')
        return db

    def execute(self, db, sql):
        cursor = db.cursor()
        cursor.execute(sql)
        return cursor