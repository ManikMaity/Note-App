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


  export function handleMutipleFileUpload(files, setImageUrls, setIsUploadError, setUploading, setFiles) {
    if (files.length <= 0 || files.length > 7) {
        setIsUploadError({
            isError: true,
            message: `${files.length <= 0 ? "No files" : "Max 7 files"} selected`
        });
        return;
    }

    setIsUploadError({ isError: false, message: "" });
    setUploading(true);
    
    const promiseImage = [];

    for (let i = 0; i < files.length; i++) {
        promiseImage.push(uploadImageAsPromise(files[i], setIsUploadError));
    };
    
    Promise.all(promiseImage)
        .then((urls) => {
            setImageUrls((prev) => [...prev, ...urls]); // Set image URLs on successful uploads
            setUploading(false);
            setFiles([]);
        })
        .catch(() => {
            setUploading(false); // Ensure loading is reset if any promise fails
        });
}

function uploadImageAsPromise(file, setIsUploadError) {
    return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                if (snapshot.state === "paused") console.log("Upload is paused");
            },
            (error) => {
                setIsUploadError({ isError: true, message: error.message });
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    resolve(downloadURL);
                });
            }
        );
    });
}


export function handleFileUpload(file, setFileUploading, setFileUploaded, setProgress, setProfileImageLink, setIsUploadError) {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    let i = 0;
    uploadTask.on("state_changed", 
    (snapshot) => {
        setFileUploading(true);
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
    }, 
    (error) => {
        setIsUploadError(true);
        setFileUploading(false)
    }, 
    () => {
        setFileUploading(false);
        setIsUploadError(false);
        setFileUploaded(true);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProfileImageLink(downloadURL);
            console.log("File available at", downloadURL);
        });
    }
    );
    
}