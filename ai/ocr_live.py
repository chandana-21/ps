import os
import json
import time
import argparse
from datetime import datetime
import google.generativeai as genai
from PIL import Image

def process_image(image_path, output_path="ocr_result.json"):
    """
    Reads an image, sends it to Gemini API for object detection and OCR,
    and saves the result as a JSON file.
    """
    
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY environment variable not set.")
        print("Please set it using: export GEMINI_API_KEY='your_api_key'")
        return

    genai.configure(api_key=api_key)

    # Use a model that supports vision and JSON output
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config={"response_mime_type": "application/json"}
    )

    if not os.path.exists(image_path):
        print(f"Error: Image file not found at {image_path}")
        return

    print(f"Processing image: {image_path}...")
    
    try:
        img = Image.open(image_path)
    except Exception as e:
        print(f"Error opening image: {e}")
        return

    # Construct the prompt based on the user's desired output format
    prompt = """
    Analyze this image and provide a JSON output with the following structure:
    {
      "image_id": "unique_id_based_on_filename",
      "processing_timestamp": "current_timestamp_iso8601",
      "detection_results": [
        {
          "label": "object_label",
          "confidence": float_between_0_and_1,
          "bounding_box": {"x_min": float, "y_min": float, "x_max": float, "y_max": float},
          "attributes": {
            "key": "value" 
            // e.g., material, color, condition for boxes; carrier, service_type for labels
          }
        }
      ],
      "ocr_text_extraction": {
        "raw_text": "full_extracted_text",
        "structured_entities": {
          "sender": {
            "name": "string",
            "address": "string",
            "city": "string",
            "state": "string",
            "zip": "string"
          },
          "recipient": {
            "name": "string",
            "address": "string",
            "city": "string",
            "state": "string",
            "zip": "string"
          },
          "tracking_info": {
            "tracking_number": "string",
            "barcode_type": "string",
            "authorization": "string"
          }
        }
      }
    }
    
    Identify objects like shipping boxes and shipping labels. 
    Extract all visible text and structure it into sender, recipient, and tracking info if present.
    """

    try:
        response = model.generate_content([prompt, img])
        
        # Parse the JSON response
        try:
            json_output = json.loads(response.text)
            
            # Update timestamp and image_id locally if needed, or rely on the model
            # Let's ensure the timestamp is accurate to now
            json_output["processing_timestamp"] = datetime.utcnow().isoformat() + "Z"
            json_output["image_id"] = os.path.basename(image_path)

            # Save to file
            with open(output_path, 'w') as f:
                json.dump(json_output, f, indent=2)
            
            print(f"Successfully processed image. Results saved to {output_path}")
            print(json.dumps(json_output, indent=2))
            
        except json.JSONDecodeError as e:
            print("Error decoding JSON from model response:")
            print(response.text)
            print(e)
            
    except Exception as e:
        print(f"An error occurred during API call: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Process an image using Gemini API for OCR and detection.")
    parser.add_argument("image_path", nargs="?", default="box.jpeg", help="Path to the image file")
    parser.add_argument("--output", default="ocr_result.json", help="Path to save the JSON output")
    
    args = parser.parse_args()
    process_image(args.image_path, args.output)
