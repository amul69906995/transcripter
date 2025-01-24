const express = require('express');
const cors = require('cors');
const app = express();
const port = 80;

// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS
app.use(cors({
    origin: '*'
})); // Allow all origins. Customize if needed.

// Endpoint
app.get('/', (req, res) => {
  res.send('Hello, World!'); // Send a response
});
//helper function
const baseUrl_tactiq = "https://tactiq-apps-prod.tactiq.io/transcript";
const baseUrl_submagic="https://submagic-free-tools.fly.dev/api/youtube-transcription";
const fetchTranscript_tactiq= async (videoUrl, langCode = "en") => {
    try {
        const response = await fetch(baseUrl_tactiq, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ langCode, videoUrl })
        });
        const data = await response.json();
        return convertToText_tactiq(data?.captions);
    } catch (e) {
        //console.log("error in fetchTranscript_tactiq",e,e.message);
        throw new Error(`Failed to fetch transcript: ${e.message}`);
    }
};
const convertToText_tactiq= (captions) => {
    return captions?.reduce((acc, caption) => acc + caption.text + " ", "").trim() || "No transcript found";
};
const fetchTranscript_submagic= async (videoUrl) => {
    try {
        const response = await fetch(baseUrl_submagic, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url:videoUrl })
        });
        const data = await response.json();
        console.log(data);
        const result=
            {
                transcript:data.transcripts[data.detectedLanguage],
                language:data.detectedLanguage,
                thimbnail:data.thumbnailUrl
            }
        
        return result;
    } catch (e) {
        //console.log("error in fetchTranscript_submagic",e,e.message);
        throw new Error(`Failed to fetch transcript: ${e.message}`);
    }
};

app.post('/transcribe-submagic',async(req,res,next)=>{
    try{
        console.log("backend hit /transcribe-submagic");
        const {videoUrl}=req.body;
        const result = await fetchTranscript_submagic(videoUrl);
        res.json({success:true,result});
    }catch(e){
        next(e);
    }
})
app.post('/transcribe-tactiq',async(req,res,next)=>{
    try{
        console.log("backend hit /transcribe-tactiq");
        const {videoUrl}=req.body;
        const transcript = await fetchTranscript_tactiq(videoUrl);
        res.json({success:true,transcript});
    }catch(e){
        next(e);
    }
})
app.use('*',(req,res)=>{
    res.status(404).send({message:'Route Not found'});
})
app.use((err,req,res,next)=>{
    const {statusCode=500,message="something went wrong on server"}=err
    res.status(statusCode).send({success:false,message,statusCode});
})
// Start the server
app.listen(port, () => {
  console.log(`Starting the server successfully on port ${port}`);
});
