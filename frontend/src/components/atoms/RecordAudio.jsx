import { useState, useRef, useEffect } from "react";
import { Mic } from "lucide-react";
import { Button } from "../ui/button";
import { makeTitleFromText } from "@/lib/utilFunc";
import useUploadAudio from "@/hooks/firebase/useUploadAudio";
import useCreateNote from "@/hooks/note/useCreateNote";

function RecordAudio() {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const recognitionRef = useRef(null);
  const audioChunks = useRef([]);
  const transcriptRef = useRef("");
  const timeoutRef = useRef(null);

  const { uploadAudio, isLoading } = useUploadAudio();
  const { createNoteMutateAsync, createNoteLoading } = useCreateNote();

  useEffect(() => {
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stream?.getTracks().forEach((track) => track.stop());
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
      if (stream.getAudioTracks().length === 0) {
        throw new Error("No audio tracks available");
      }

      const options = { mimeType: 'audio/webm' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        delete options.mimeType;
      }

      const recorder = new MediaRecorder(stream, options);
      audioChunks.current = [];

      recorder.ondataavailable = (e) => {
        audioChunks.current.push(e.data);
      };

      recorder.onstop = async () => {
        const mimeType = audioChunks.current[0]?.type || 'audio/webm';
        const audioBlob = new Blob(audioChunks.current, { type: mimeType });
        await handleRecordingComplete(audioBlob, transcriptRef.current.trim());
        transcriptRef.current = "";
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.onerror = (event) => {
        console.error('MediaRecorder error:', event.error);
      };

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
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
      // Request final data chunk before stopping
      if (mediaRecorder.state === "recording") {
        mediaRecorder.requestData();
      }
      mediaRecorder.stop();
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


  const handleRecordingComplete = async (audioBlob, transcript) => {
    console.log(audioBlob, transcript);
    if (!audioBlob || !transcript) return;
    const audioUrl = await uploadAudio(audioBlob);
    await createNoteMutateAsync({
      title: makeTitleFromText(transcript),
      content: `<p>${transcript}</p>`,
      unformatedContent : transcript,
      transcribedText : transcript,
      audioUrl,
      type : "transcript"
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        disabled={isLoading || createNoteLoading}
        variant="destructive"
        size="lg"
        onClick={isRecording ? stopRecording : startRecording}
        className="flex items-center rounded-full gap-2"
      >
        <Mic size={20} />
        {isRecording ? "Stop Recording" : `${isLoading || createNoteLoading ? "Creating.." : "Start"}`}
      </Button>
    </div>
  );
}

export default RecordAudio;
