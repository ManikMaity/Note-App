import app from "@/config/firebase.config";
import { toast } from "@/hooks/use-toast";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";


export function getErrorMessage(error) {
    if (Array.isArray(error?.err) && error?.err[0]){
        return error.err[0];
    }
    else if (error?.message){
        return error.message;
    }
    else {
        return "Something went wrong";
    }
}


export const htmlToMobileText = (html) => {
    return html
    .replace(/<b>(.*?)<\/b>|<strong>(.*?)<\/strong>/gi, "*$1$2*")  // Bold
    .replace(/<[^>]*>/g, "")                                       // Remove other HTML tags
    .trim();                                 
  };


 export const formatDate = (isoString) => {
    const date = new Date(isoString);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()]; // Local time
  
    const day = date.getDate();
    const year = date.getFullYear();
  
    let hours = date.getHours(); // Local time
    const minutes = date.getMinutes().toString().padStart(2, "0");
  
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
  
    return `${month} ${day}, ${year} · ${hours} : ${minutes} ${ampm}`;
  };


  export const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast({description : "Copied to clipboard"}))
      .catch((err) => toast({description : "Failed to copy to clipboard"}));
  };


  export function getImagePathFromFirebaseImageUrl(url) {
    const baseUrl =
      "https://firebasestorage.googleapis.com/v0/b/opendoor-db7d9.appspot.com/o/";
    let imagePath = url.replace(baseUrl, "");
    const indexOfEndPath = imagePath.indexOf("?");
    imagePath = imagePath.substring(0, indexOfEndPath);
    imagePath = decodeURIComponent(imagePath);
    return imagePath;
  }



export function makeTitleFromText(sentence) {
    const text = sentence.trim();
    if (text === "") {
        return "Untitled Note";
    }
    else {
       return text.length > 15 ? text.slice(0, 15) + "..." : text
    }
}