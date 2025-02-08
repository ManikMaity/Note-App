import React, { useState } from "react";
import { Mic, Image, Pen } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const InputBar = () => {
  const [showTextInput, setShowTextInput] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  // Toggle text input visibility
  const handleTextInputClick = () => {
    setShowTextInput(!showTextInput);
  };

  return (
    <footer className="shadow-lg bg-gray-50 p-2 rounded-md">
      <div className="container">
        {showTextInput && (
          <div className="mb-3">
            <Input
              type="text"
              placeholder="Type a message..."
              className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={handleTextInputClick}
              className="flex items-center"
            >
              <Pen size={20} />
            </Button>

            <label className="flex items-center cursor-pointer">
              <input type="file" accept="image/*" className="hidden" />
              <Button variant="ghost" className="flex items-center">
                <Image size={20} />
              </Button>
            </label>
          </div>

          <Button
            variant="destructive"
            size="lg"
            onClick={() => {}}
            className="flex items-center rounded-full"
          >
            <Mic size={20} />
            <span>Record</span>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default InputBar;
