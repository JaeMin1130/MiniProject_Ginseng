# 모델 임포트
from VGG16 import VGG16

vgg = VGG16()

def predict(imgPath):
    
    # 모델 돌리는 부분
    grade = vgg.execute(imgPath)
    
    return grade