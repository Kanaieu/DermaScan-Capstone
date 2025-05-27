from tensorflow.keras.models import load_model
from fastapi import FastAPI, File, UploadFile
from PIL import Image
from io import BytesIO
import numpy as np

model = load_model('app/model.h5')

class_names = np.array(["Acne", "Actinic Keratosis", "Benign Tumors", "Bullous", "Candidiasis",
    "Drug Eruption", "Eczema", "Infestations/Bites", "Lichen", "Lupus",
    "Moles", "Psoriasis", "Rosacea", "Seborrheic Keratoses", "Skin Cancer",
    "Sun/Sunlight Damage", "Tinea", "Vascular Tumors", "Vasculitis", "Vitiligo",
    "Warts"])

app = FastAPI()
@app.get("/")
def read_root():
    return {"message": "Welcome to DermaScan API"}

@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    '''Predicts the skin condition from the provided image bytes.
    
    Args:
        image (bytes): The image bytes to be processed.
        
    Returns:
        dict: A dictionary containing the predicted class name.
    '''

    # Read image content
    contents = await image.read()
    img = Image.open(BytesIO(contents)).convert("RGB")
    img = img.resize((224, 224))
    img = np.array(img)
    img = np.expand_dims(img, axis=0)
    img = img / 255.0

    # Make the prediction
    prediction = model.predict(img)
    predicted_class = np.argmax(prediction)

    return {"prediction": class_names[predicted_class]}
