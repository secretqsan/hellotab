export default function pictureProxy(dataUrl){
    const timeStamp = new Date().getTime().toString(); 
    const imageStorage = useImageStore();
    const { pictures } = storeToRefs(imageStorage);
    pictures.value[timeStamp] = dataUrl;
    return timeStamp 
}