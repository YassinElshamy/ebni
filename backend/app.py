from flask import Flask, request, jsonify
from inference.segment import run_wall_segmentation
from inference.detect import run_object_detection

app = Flask(__name__)

@app.route('/infer/walls', methods=['POST'])
def infer_walls():
    image = request.files['file'].read()
    result = run_wall_segmentation(image)
    return jsonify(result)

@app.route('/infer/objects', methods=['POST'])
def infer_objects():
    image = request.files['file'].read()
    result = run_object_detection(image)
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)