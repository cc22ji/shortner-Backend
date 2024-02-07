
// const {nanoid} = require('nanoid');
const { TryCatch } = require("../middlewares/error");
const ErrorHandler = require("../utils/utility-class.js");
const user = require('../models/url.js')
const shortid = require('shortid');
const URL = require('../models/url')


const GenerateURL = TryCatch(async(req, res,next)=> {
  const body = req.body;
 
 if(!body.url){
  
  return next(new ErrorHandler("Enter long link",500))
 }
      // Check if the URL already exists for the user
      const existingUrl = await URL.findOne({ "reference_id": req.user._id, "urls.redirectURL": body.url });

      // If the URL exists, return its shortId
      if (existingUrl) {
          const shortId = existingUrl.urls.find(url => url.redirectURL === body.url).shortId;
          return res.json({ id: shortId });
      } else {
          // Generate a new shortId and create a new document
          const myShortId = shortid.generate();
          const newUrl = {
              shortId: myShortId,
              redirectURL: body.url,
              history: []
          };
          // Create a new document for the URL
          const createdUrl = await URL.findOneAndUpdate(
              { reference_id :req.user._id},
              { $push: { "urls": newUrl } },
              { upsert: true, new: true }
          );
          return res.json({ id: myShortId });
      }
  
}
)


const Redirect = TryCatch(async(req, res,next) => {

  const shortId = req.params.id;
  
  
   

     // Find the document containing the given shortId and associated with the user's reference ID
     const entry = await URL.findOne({ "reference_id": req.user._id, "urls.shortId": shortId });
     
     
      
      // If entry is found, update history and redirect
      if (entry) {
        const matchedUrl = entry.urls.find(url => url.shortId === shortId);
        matchedUrl.history.push({ timestamps: Date.now() });
        
        await entry.save();
       
        res.redirect(matchedUrl.redirectURL);
    
    } else {
        // If no entry found, handle accordingly
        res.status(404).send("Short URL not found");
        // return next(new ErrorHandler("Short URL not found",404))
    }
  
}
)



const Analytics = TryCatch(async(req,res,next)=> {
  const shortId = req.params.id;

     // Find the document containing the given shortId and associated with the user's reference ID
     const result = await URL.findOne({ "reference_id": req.user._id, "urls.shortId": shortId });

      // If the result is found, return analytics data
      if (result) {
        const matchedUrl = result.urls.find(url => url.shortId === shortId);
        const totalClicks = matchedUrl.history.length;
        const analyticsData = matchedUrl.history;

        return res.json({ totalClicks, analytics: analyticsData });
    } else {
        // If no result found, return appropriate message
        return res.status(404).json({ error: "Short URL not found" });
    }
  
})



module.exports = {GenerateURL,Redirect,Analytics}