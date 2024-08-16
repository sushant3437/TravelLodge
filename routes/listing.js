const express=require ("express");
const router = express.Router();
const WrapAsync=require("../utils/WrapAsync.js");

const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controllers/listing.js");
const {storage}=require("../cloudConfig.js");
 //multer is npm package used to upload images file
const multer  = require('multer')
const upload = multer({ storage })

//index route, //create route
router.route("/").get(WrapAsync(listingController.index))
.post(isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
WrapAsync(listingController.createListing));


//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);


//show route, //update route, //DELETE ROUTE

router.route("/:id").get(WrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner, upload.single("listing[image]"),validateListing,WrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,WrapAsync(listingController.destroyListing));


//edit route
router.get("/:id/edit",isLoggedIn,isOwner,WrapAsync(listingController.renderEditForm));

module.exports=router;
