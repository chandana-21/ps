# 1. Import the library
from inference_sdk import InferenceHTTPClient
import cv2
import supervision as sv
import time
import json

# 2. Connect to your local server
client = InferenceHTTPClient(
    api_url="http://localhost:9001", # Local server address
    api_key="JyLF9S5kAoZpIXolaZuB"
)

def get_details_json(data):
    preds_data = data.get('predictions', {})
    image_data = preds_data.get('image', {})
    
    result = {
        "image_width": image_data.get('width'),
        "image_height": image_data.get('height'),
        "count_objects": data.get('count_objects'),
        "predictions": []
    }
    
    for pred in preds_data.get('predictions', []):
        result["predictions"].append({
            "class": pred.get('class'),
            "accuracy": pred.get('confidence'),
            "x": pred.get('x'),
            "y": pred.get('y'),
            "width": pred.get('width'),
            "height": pred.get('height')
        })
    return result

def process_image(input_image_path, output_image_path):
    start_time = time.time()
    # 3. Run your workflow on an image
    result = client.run_workflow(
        workspace_name="duygascjkh",
        workflow_id="detect-count-and-visualize",
        images={
            "image": input_image_path
        },
        use_cache=True
    )
    end_time = time.time()
    print("Time taken:", end_time - start_time)

    if not result:
        return None

    # Get JSON details
    json_result = get_details_json(result[0])

    # Annotation
    preds = result[0].get("predictions", {})
    pred_list = preds.get("predictions", [])
    
    class_ids = {}
    for p in pred_list:
        class_id = p.get("class_id")
        if class_id is None:
            continue
        if class_id not in class_ids:
            class_ids[class_id] = p.get("class", str(class_id))

    detections = sv.Detections.from_inference(preds)

    image = cv2.imread(input_image_path)

    box_annotator = sv.BoxAnnotator()
    label_annotator = sv.LabelAnnotator()
    labels = [
        f"{class_ids[class_id]} {confidence:0.2f}"
        for confidence, class_id in zip(detections.confidence, detections.class_id)
    ]

    annotated_frame = box_annotator.annotate(
        scene=image.copy(), detections=detections
    )
    annotated_frame = label_annotator.annotate(
        scene=annotated_frame, detections=detections, labels=labels
    )

    # save image
    cv2.imwrite(output_image_path, annotated_frame)
    
    return json_result

if __name__ == "__main__":
    input_img = "/Users/chandana/Downloads/studio_frontend/ai/boxes.jpg"
    output_img = "boxes_a.jpg"
    
    result_json = process_image(input_img, output_img)

    # save json
    with open("box_annotated.json", "w") as f:
        json.dump(result_json, f, indent=4)