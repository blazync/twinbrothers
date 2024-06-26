const express = require('express');
const router = express.Router();
const path = require('path')
const controller = require('../controllers/controller');
const dashcontroller = require('../controllers/dashcontroller');
const isAuthenticated = require('../middlewares/authentication');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // Specify the destination directory
  },
  filename: function (req, file, cb) {
     cb(null, Date.now() + path.extname(file.originalname)); // Use the original file name
  }
});
const upload = multer({ storage: storage });

// Now use `upload` middleware in your route
router.post('/dashboard/embedgallery', isAuthenticated, upload.single('image'), dashcontroller.embedgallery);


router.get('/', controller.index);
router.get('/aboutus', controller.aboutus);
router.get('/services', controller.services);
router.get('/services/:slug', controller.services);
router.get('/category', controller.category);
router.get('/contact', controller.contact);
router.post('/contact', controller.contactform);
router.get('/blog/', controller.blog);
router.get('/blog/:title', controller.blog);
router.get('/account', controller.login);
router.get('/lost-password', controller.lostpassword);
router.post('/login', dashcontroller.loginform);
router.get('/gallery',controller.gallery);

//dashboard
router.get('/dashboard', isAuthenticated, dashcontroller.dashboard);
router.get('/logout',isAuthenticated, dashcontroller.logout);
router.get('/dashboard',isAuthenticated, dashcontroller.dashboard);

router.get('/dashboard/users',isAuthenticated, dashcontroller.users);
router.get('/dashboard/adduser',isAuthenticated, dashcontroller.addUser);
router.post('/dashboard/embedUser',isAuthenticated, dashcontroller.embedUser);
router.get('/dashboard/edituser',isAuthenticated, dashcontroller.editUser);
router.post('/dashboard/edituser',isAuthenticated, dashcontroller.editUser);

router.get('/dashboard/addservices',isAuthenticated, dashcontroller.addservices);
router.get('/dashboard/editservices',isAuthenticated, dashcontroller.editservices);
router.post('/dashboard/embedservice',upload.single('imageUrl'),isAuthenticated, dashcontroller.embedservice);
router.get('/dashboard/deleteservices',isAuthenticated, dashcontroller.deleteservices);
router.get('/dashboard/services', isAuthenticated,dashcontroller.services);


router.get('/dashboard/addcategory',isAuthenticated, dashcontroller.addcategory);
router.get('/dashboard/editcategory',isAuthenticated, dashcontroller.editcategory);
router.post('/dashboard/embedcategory',upload.single('imageUrl'),isAuthenticated, dashcontroller.embedcategory);
router.get('/dashboard/deletecategory',isAuthenticated, dashcontroller.deletecategory);
router.get('/dashboard/category/', isAuthenticated,dashcontroller.category);

router.get('/dashboard/gallery/', isAuthenticated,dashcontroller.gallery);
router.get('/dashboard/addgalleryimage/', isAuthenticated,dashcontroller.addgalleryimage);
router.get('/dashboard/deletegalleryimage/', isAuthenticated,dashcontroller.deletegalleryimage);

router.get('/dashboard/blog/', isAuthenticated,dashcontroller.blog);
router.get('/dashboard/addblog',isAuthenticated, dashcontroller.addblog);
router.get('/dashboard/editblog',isAuthenticated, dashcontroller.editblog);
router.post('/dashboard/embedblog',upload.single('image'),isAuthenticated, dashcontroller.embedblog);
router.get('/dashboard/deleteblog',isAuthenticated, dashcontroller.deleteblog);


router.get('/dashboard/servicesenquiry', isAuthenticated,dashcontroller.servicesenquiry);
router.get('/dashboard/contact', isAuthenticated,dashcontroller.contact);


router.get('/dashboard/ads', isAuthenticated,dashcontroller.ads);
router.get('/dashboard/editads',isAuthenticated, dashcontroller.editads);
router.post('/dashboard/embedads',upload.single('imageUrl'),isAuthenticated, dashcontroller.embedads);

module.exports = router;