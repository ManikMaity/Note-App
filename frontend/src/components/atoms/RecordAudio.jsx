import { useState, useRef, useEffect } from "react";
import { Mic } from "lucide-react";
import { Button } from "../ui/button";



function RecordAudio() {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const recognitionRef = useRef(null);
  const audioChunks = useRef([]);
  const transcriptRef = useRef("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stream?.getTracks().forEach(track => track.stop());
        mediaRecorder.stop();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [mediaRecorder]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunks.current = [];

      recorder.ondataavailable = (e) => {
        audioChunks.current.push(e.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        handleRecordingComplete(audioBlob, transcriptRef.current.trim());
        transcriptRef.current = "";
      };

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Speech recognition not supported in this browser.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        transcriptRef.current += transcript + " ";
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.start();
      recorder.start();

      setMediaRecorder(recorder);
      recognitionRef.current = recognition;
      setIsRecording(true);

      timeoutRef.current = setTimeout(() => {
        stopRecording();
      }, 60000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsRecording(false);
  };

  const handleRecordingComplete = (audioBlob, transcript) => {
    
    console.log("Audio blob:", audioBlob);
    console.log("Transcript:", transcript);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="destructive"
        size="lg"
        onClick={isRecording ? stopRecording : startRecording}
        className="flex items-center rounded-full gap-2"
      >
        <Mic size={20} />
        {isRecording ? "Stop Recording" : "Record"}
      </Button>
    </div>
  );
}

export default RecordAudio;