import cv2
import numpy as np
from ultralytics import YOLO
from io import BytesIO
from PIL import Image

model = YOLO("models/object_detect.pt")

def run_object_detection(img_bytes):
    image = np.array(Image.open(BytesIO(img_bytes)).convert("RGB"))
    results = model(image)[0]

    detections = []
    for box in results.boxes.data.tolist():
        x1, y1, x2, y2, conf, cls = box
        detections.append({
            "x": int((x1 + x2) / 2),
            "y": int((y1 + y2) / 2),
            "width": int(x2 - x1),
            "height": int(y2 - y1),
            "confidence": round(conf, 2),
            "class": results.names[int(cls)]
        })
    return { "predictions": detections }