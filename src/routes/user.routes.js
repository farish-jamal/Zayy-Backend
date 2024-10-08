const express = require("express");
const multer = require("multer");
const { storage } = require("../utils/multer.utils");
const { auth } = require("../middlewares/protectedRoutes.middlewares");
const upload = multer({ storage: storage });
const {
  handleGetAllBrand,
  handleGetAllBoutique,
  handleGetAllBrandNames,
  handleGetAllBoutiqueNames,
  handleGetBrandById,
  handleGetAllProducts,
  handleBanners,
  handleThumbnail,
  handleGetCategories,
  handleGetParticularProduct,
  handlePostReview,
  handleAddToCart,
  handleAddToWishlist,
  handleGetCart,
  handleGetWishlist,
  handleRemoveCartItem,
  handleRemoveWishlistItem,
  updateCart,
  handleGetProfile,
  handlePlaceOrder,
  handleGetBrandCollection,
  handleGetAllMyOrders,
  handleGetReviews,
  handleGetDiscoverPage,
  handlePostCommentOnDiscover,
  handlePostLikeOnPost
} = require("../controllers/user.controllers");

const router = express.Router();

// Profile --> 

router.route("/").get(auth, handleGetProfile);

// Brands -->
router.route("/brands").get(auth, handleGetAllBrand);
router.route("/brandname").get(auth, handleGetAllBrandNames);
router.route("/brand/:id").get(auth, handleGetBrandById);

// Boutique -->
router.route("/boutiques").get(auth, handleGetAllBoutique);
router.route("/boutiquename").get(auth, handleGetAllBoutiqueNames);
router.route("/boutique/:id").get(auth, handleGetBrandById);

// Product -->
router.route("/products").post(auth, handleGetAllProducts);
router.route("/banners").get(auth, handleBanners);
router.route("/thumbnails").get(auth, handleThumbnail);
router.route("/lists").get(auth, handleGetCategories);
router.route("/product/:id").get(auth, handleGetParticularProduct);
router
  .route("/rateProduct")
  .post(upload.single("image"), auth, handlePostReview);

router.route("/getReviews/:id").get(auth, handleGetReviews);

// Cart and Wishlist -->
router.route("/cart").post(auth, handleAddToCart).get(auth, handleGetCart);
router.route("/updatecart").post(auth, updateCart);
router
  .route("/wishlist")
  .post(auth, handleAddToWishlist)
  .get(auth, handleGetWishlist);

router.route("/cart/remove").post(auth, handleRemoveCartItem);
router.route("/wishlist/remove").post(auth, handleRemoveWishlistItem);

// Place Order Api -->
router.route("/placeOrder").post(auth, handlePlaceOrder);

router.route("/brands/collection/:id").get(auth, handleGetBrandCollection);

router.route("/myOrders").get(auth, handleGetAllMyOrders);

router.route("/getDiscoverPage").get(auth, handleGetDiscoverPage);
router.route("/addCommentOnPost").post(auth, handlePostCommentOnDiscover);
router.route("/updateLike/:id").get(auth, handlePostLikeOnPost);

// Error handling middleware -->
router.use((err, req, res, next) => {
  console.error("Error in request:", err);
  if (err instanceof multer.MulterError) {
    return res
      .status(400)
      .json({ message: "File upload error: " + err.message });
  }
  res.status(500).json({ message: "Internal server error" });
});

module.exports = router;
