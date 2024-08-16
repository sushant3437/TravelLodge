const express=require ("express");
const router = express.Router({mergeParams:true});
const WrapAsync=require("../utils/WrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");

const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");

const reviewController=require("../controllers/review.js");

  //REVIEWS
  //POST REVIEW ROUTE
  router.post("/",isLoggedIn,validateReview,WrapAsync(reviewController.createReview));

  //DELETE REVIEW ROUTE
  router.delete("/:reviewId",isLoggedIn,isReviewAuthor,WrapAsync(reviewController.deleteReview))

  module.exports=router;

