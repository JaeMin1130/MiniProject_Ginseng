import tensorflow as tf
import numpy as np
import h5py
from tensorflow.keras.models import model_from_json

class VGG16():
    def execute(self, img_path):
        h5_file_path = "./ginsengVGG16.h5"

        h5_file = h5py.File(h5_file_path, "r")
        model_json = h5_file.attrs["model_config"]
        model_config = model_json.encode("utf-8").decode("utf-8")

        model = model_from_json(model_config)

        img = tf.keras.preprocessing.image.load_img(img_path, target_size=(224,224))
        img_tensor = tf.keras.preprocessing.image.img_to_array(img)
        img_tensor = np.expand_dims(img_tensor, axis = 0)
        img_tensor /= 255.0
        # print(img_tensor.shape)

        class_labels = sorted(["4년근중","5년근대","5년근소","4년근대","4년근소","6년근중","6년근대","6년근소","5년근중"])

        # 모델 예측
        prediction = model.predict(img_tensor)

        # 가장 높은 확률을 가진 class의 index를 가져옴
        predicted_class_index = np.argmax(prediction[0])

        # mapping을 통해 index와 label 연결1
        predicted_class_label = class_labels[predicted_class_index]

        # 결과 출력
        print("분류 예측 결과: ", predicted_class_label)
        return predicted_class_label
