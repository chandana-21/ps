from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse, FileResponse
import shutil
import os
import uuid
from box import process_image

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Create directories for uploads and outputs if they don't exist
UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

@app.post("/process-image/")
async def process_image_endpoint(file: UploadFile = File(...)):
    """
    Endpoint to upload an image, process it using box.py logic, 
    and return the analysis JSON. The annotated image is saved locally.
    """
    try:
        # Generate unique filenames to avoid collisions
        file_id = str(uuid.uuid4())
        # Sanitize filename just in case
        safe_filename = os.path.basename(file.filename) if file.filename else "image.jpg"
        input_filename = f"{file_id}_{safe_filename}"
        input_path = os.path.join(UPLOAD_DIR, input_filename)
        
        output_filename = f"annotated_{input_filename}"
        output_path = os.path.join(OUTPUT_DIR, output_filename)

        # Save the uploaded file to disk
        with open(input_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Call the process_image function from box.py
        # This function returns the JSON result and saves the annotated image to output_path
        result = process_image(input_path, output_path)

        if result is None:
             raise HTTPException(status_code=500, detail="Failed to process image or no result returned.")

        # Construct a URL or path for the annotated image
        # Assuming the client can access the image via the /images/ endpoint
        annotated_image_url = f"/images/{output_filename}"

        return {
            "message": "Image processed successfully",
            "analysis": result,
            "annotated_image_url": annotated_image_url
        }

    except Exception as e:
        # Clean up if something goes wrong (optional)
        if 'input_path' in locals() and os.path.exists(input_path):
            os.remove(input_path)
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.get("/images/{filename}")
async def get_image(filename: str):
    """
    Endpoint to retrieve the annotated image.
    """
    file_path = os.path.join(OUTPUT_DIR, filename)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    raise HTTPException(status_code=404, detail="Image not found")

if __name__ == "__main__":
    import uvicorn
    # Run the FastAPI app
    uvicorn.run(app, host="0.0.0.0", port=8000)
