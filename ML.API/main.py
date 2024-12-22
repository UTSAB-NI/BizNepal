from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import joblib
import numpy as np

# Load pre-trained model and vectorizer using joblib
model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

# Define FastAPI app
app = FastAPI()

# Define input and output models
class ReviewInput(BaseModel):
    reviews: List[str]

class ReviewOutput(BaseModel):
    sentiment: int
    positive_review: int
    negative_review: int

# Define endpoint
@app.post("/predict-sentiment", response_model=ReviewOutput)
async def predict_sentiment(input_data: ReviewInput):
    try:
        # Handle case where reviews are empty
        if not input_data.reviews:
            raise HTTPException(status_code=400, detail="No reviews provided")
        
        positive_count = 0
        negative_count = 0

        # Special case handling for a single review
        if len(input_data.reviews) == 1:
            # If there is only one review, return its sentiment directly
            transformed_review = vectorizer.transform([input_data.reviews[0]])
            prediction = model.predict(transformed_review)[0]
            
            # Update counts for the single review
            if prediction == 0:
                negative_count += 1
            elif prediction == 1:
                positive_count += 1
            
            # Return sentiment directly without comparing
            return ReviewOutput(sentiment=prediction, positive_review=positive_count, negative_review=negative_count)

        # Loop through each review in the input
        for review in input_data.reviews:
            # Transform each review using the vectorizer
            transformed_review = vectorizer.transform([review])
            
            # Predict the sentiment of the review
            prediction = model.predict(transformed_review)[0]
            
            # Count occurrences of positive and negative sentiments (0 = negative, 1 = positive)
            if prediction == 0:
                negative_count += 1
            elif prediction == 1:
                positive_count += 1

        # Handle cases for multiple reviews based on positive and negative counts
        if positive_count > negative_count:
            sentiment = 1  # More positives, return positive sentiment
        elif negative_count > positive_count:
            sentiment = 0  # More negatives, return negative sentiment
        else:
            sentiment = 2  # Equal number, return neutral sentiment

        # Return the final sentiment with counts
        return ReviewOutput(sentiment=sentiment, positive_review=positive_count, negative_review=negative_count)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
