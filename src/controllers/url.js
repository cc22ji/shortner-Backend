
const { TryCatch } = require("../middlewares/error");
const ErrorHandler = require("../utils/utility-class.js");
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
        return next(new ErrorHandler("Short URL not found",404))
    }
    
}
)


const Analytics = TryCatch(async (req, res, next) => {
    // Find all documents associated with the user's reference ID
      const results = await URL.findOne({ reference_id: req.user._id });

      if (!results) {
        // If no URLs are found for the user, return appropriate message
        return next(new ErrorHandler("No URLs found for the user",404))
      }
      // Collect analytics data for each URL
      const analyticsData = results.urls.map(urlDoc => {
        return {
          shortId: urlDoc.shortId,
          redirectURL: urlDoc.redirectURL,
          totalClicks: urlDoc.history.length,
          analytics: urlDoc.history
        };
      });
  
      // Return all analytics data
      return res.json({ user: req.user, analytics: analyticsData });
   
  });



const Deleteitem = TryCatch(async(req,res,next)=>{
    const shortId = req.params.shortId;
    const userId = req.user._id; // Assuming user ID is available in req.user

    // Find the document containing the given shortId and associated with the user's reference ID
    const result = await URL.findOneAndUpdate(
      { reference_id: userId, 'urls.shortId': shortId },
      { $pull: { 'urls': { shortId: shortId } } },
      { new: true }
    );

    if (!result) {
        return next(new ErrorHandler("URL reference not found",404))
    }

    // URL reference successfully deleted
    return res.json({ message: "URL reference deleted successfully" });
})





  



module.exports = {GenerateURL,Redirect,Analytics,Deleteitem}