import { Image, Pen } from "lucide-react";
import { Button } from "../ui/button";
import useModalStore from "@/hooks/store/modalStore";
import RecordAudio from "../atoms/RecordAudio";

const InputBar = () => {

    const {openCreateNote} = useModalStore();


  return (
    <footer className="shadow-lg bg-gray-50 p-2 rounded-md">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => openCreateNote()}
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

          <RecordAudio/>
         
        </div>
      </div>
    </footer>
  );
};

export default InputBar;
