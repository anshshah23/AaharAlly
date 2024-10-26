from flask import Flask, request, jsonify
from google.cloud import speech, texttospeech
from pydub import AudioSegment
from pydub.playback import play
import io
import random

app = Flask(__name__)

# Predefined dietary recommendations for medical conditions
dietary_recommendations = {
    "diabetes": {
        "Foods to Eat": ["Leafy greens", "Whole grains", "Lean protein", "Non-starchy vegetables"],
        "Foods to Avoid": ["Sugary drinks", "Processed carbs", "High-sugar fruits", "High-fat dairy"]
    },
    "hypertension": {
        "Foods to Eat": ["Leafy greens", "Berries", "Potassium-rich foods", "Whole grains"],
        "Foods to Avoid": ["Salt", "Processed foods", "High-fat dairy", "Caffeine"]
    },
    # Add more conditions here as needed
}

# Initialize Google Cloud clients
speech_client = speech.SpeechClient()
tts_client = texttospeech.TextToSpeechClient()

def transcribe_speech(audio_content):
    """Convert audio content to text using Google Speech-to-Text."""
    audio = speech.RecognitionAudio(content=audio_content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        language_code="en-US"
    )

    response = speech_client.recognize(config=config, audio=audio)
    for result in response.results:
        return result.alternatives[0].transcript
    return None

def synthesize_speech(text):
    """Convert text to audio using Google Text-to-Speech."""
    synthesis_input = texttospeech.SynthesisInput(text=text)
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US",
        ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
    )
    audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3)
    response = tts_client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )
    return response.audio_content

def get_dietary_recommendations(condition):
    """Fetch dietary recommendations based on the medical condition."""
    condition = condition.lower()
    if condition in dietary_recommendations:
        suggestions = dietary_recommendations[condition]
        response_text = (
            f"For {condition.capitalize()}, here are some suggestions. "
            f"Foods to Eat: {', '.join(suggestions['Foods to Eat'])}. "
            f"Foods to Avoid: {', '.join(suggestions['Foods to Avoid'])}."
        )
    else:
        response_text = f"Sorry, I don't have dietary recommendations for {condition}."
    
    return response_text

@app.route('/api/voice_dietary_assistant', methods=['POST'])
def voice_dietary_assistant():
    """Handle incoming audio file, transcribe it, and return dietary advice."""
    if 'audio' not in request.files:
        return jsonify({"success": False, "message": "No audio file provided"}), 400

    # Read audio file from request
    audio_file = request.files['audio'].read()
    
    try:
        # Transcribe the speech to text
        user_text = transcribe_speech(audio_file)
        
        # Process the text to extract the medical condition
        if user_text:
            response_text = None
            for condition in dietary_recommendations.keys():
                if condition in user_text.lower():
                    response_text = get_dietary_recommendations(condition)
                    break
            
            if response_text is None:
                response_text = "I'm sorry, I didn't understand the medical condition. Please try again."

            # Convert response text to speech
            audio_content = synthesize_speech(response_text)

            # Return the audio content as a response
            return jsonify({
                "success": True,
                "message": response_text,
                "audio_content": audio_content.decode("ISO-8859-1")  # To handle binary data
            })
        else:
            return jsonify({"success": False, "message": "Could not transcribe the audio."}), 400
    except Exception as e:
        return jsonify({"success": False, "message": f"Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
