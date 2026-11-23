
from ultralytics import YOLO
import cv2
import json
import os

# YAMA OBJECT VISION AI
# Version 1.0

class YAMAObjectDetector:

    def __init__(self):
        print("Initializing YAMA AI...")

        # Load YOLO model
        self.model = YOLO("yolov8n.pt")

        print("YAMA AI is ready!")

    def detect(self, image_path):

        if not os.path.exists(image_path):
            raise FileNotFoundError(
                f"Image not found: {image_path}"
            )

        # Read image
        image = cv2.imread(image_path)

        if image is None:
            raise ValueError("Cannot read image")

        # Run object detection
        results = self.model.predict(
            source=image,
            conf=0.35,
            verbose=False
        )

        objects = []

        for result in results:

            for box in result.boxes:

                class_id = int(box.cls[0])
                confidence = float(box.conf[0])

                name = self.model.names[class_id]

                x1, y1, x2, y2 = map(
                    int, box.xyxy[0].tolist()
                )

                objects.append({
                    "name": name,
                    "confidence": round(confidence, 3),
                    "box": [x1, y1, x2, y2]
                })

        return objects


if __name__ == "__main__":

    detector = YAMAObjectDetector()

    print("YAMA Object Vision AI initialized.")
    print("Waiting for an image to analyze.")
