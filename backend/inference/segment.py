import cv2
import numpy as np
from ultralytics import YOLO
from io import BytesIO
from PIL import Image

model = YOLO("models/wall_seg.pt")

def run_wall_segmentation(img_bytes):
    image = np.array(Image.open(BytesIO(img_bytes)).convert("RGB"))
    results = model.predict(source=image, task="segment")[0]
    
    # Extract mask
    masks = results.masks.data.cpu().numpy()
    return {
        "mask": masks[0].tolist() if len(masks) > 0 else []
    }