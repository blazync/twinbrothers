const Enquiry = require('../models/enquiry');
const Services = require('../models/services');
const Category = require('../models/category.js')
const Testimonial = require('../models/testimonial');
const Gallery = require('../models/gallery');
const Blog = require('../models/blog');
const Ad = require('../models/ads.js');
const mailer = require('../controllers/mailcontroller');

exports.index = async (req, res) => {
    const services = await Services.find();
    const category = await Category.find();
    const blog = await Blog.find();
    const testimonial = await Testimonial.find();
    res.render('index', { service: services,category,blog,testimonial,Ads: await Ad.findOne() });
}
exports.aboutus = async (req, res) => {
    const category = await Category.find();
    const services = await Services.find();
    res.render('about',{services,service:services,category,Ads: await Ad.findOne()});
}
exports.gallery = async (req, res) => {
    const services = await Services.find();
    const category = await Category.find();
    const type = req.query.type?req.query.type:null;
    const gallery = await Gallery.find();
    res.render('gallery',{ gallery,type,service:services,category,Ads: await Ad.findOne() });
}

exports.services = async (req, res) => {
    const slug = req.params.slug;
    const category = await Category.find();
   try {
        let services;
        if (slug) {
            services = await Services.findOne({ slug: slug});
            if (!services) {
                return res.redirect('/services');
            }
            res.render('servicesdetails', { servicedata: services,service:await Services.find(),category,Ads: await Ad.findOne() });
        } else {
            services = await Services.find();
            
            res.render('services', { service: services,category,Ads: await Ad.findOne() });
        }
    } catch (error) {
        const services = await Services.find();
    const category = await Category.find();
        console.error('Error fetching services:', error);
        return res.redirect('/services',{service:services,category,Ads: await Ad.findOne()});
        res.status(500).render('error');
    }
};
exports.category = async (req, res) => {
    const { service,category } = req.query;
    
    try {
        if (!service || !category) {
            // If either service or category is missing, redirect to the services page
            return res.redirect('/services',{category:await Category.find(),service:await Services.find()});
        }

        // Check if the service exists
        const foundService = await Services.findOne({ slug: service });
        if (!foundService) {
            // If the service does not exist, redirect to the services page
            return res.redirect('/services',{category:await Category.find(),service:await Services.find(),Ads: await Ad.findOne()});
        }
        // Check if the category exists
        const foundCategory = await Category.findOne({ slug: category });
        if (!foundCategory) {
            // If the category does not exist, redirect to the services page
            return res.redirect('/services',{category:await Category.find(),service:await Services.find(),Ads: await Ad.findOne()});
        }

        // If both service and category exist, render the service details page
        return res.render('servicessubdetails', { service: foundService, categorydata: foundCategory,category:await Category.find(),service:await Services.find(),Ads: await Ad.findOne() });
    } catch (error) {
        console.error('Error fetching services:', error);
        // If an error occurs, redirect to the services page
        return res.redirect('/services',{category:await Category.find(),service:await Services.find(),Ads: await Ad.findOne()});
    }
};


exports.contact = async (req, res) => {
    const services = await Services.find();
    const category = await Category.find();
    res.render('contact',{service:services,category,Ads: await Ad.findOne()});
}
exports.contactform = async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
      const enquiry = new Enquiry(data); 
      await enquiry.save();
      console.log(enquiry);
      mailer.sendEmail(enquiry.email?enquiry.email:'', 'Thanks for showing intrest', `
      <p>Hello  ${enquiry.name},</p>
                     <p>Thanks for showing intrest. our representative call you back shortly <br> Thanks and Regards <br> Twins Brothers Threapy.</p>
                     `);
      res.redirect(req.headers.referer || '/');
      console.log('Enquiry submitted successfully!');
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      res.status(500).send('An error occurred while processing your enquiry.');
    }
  };
// Controller function
exports.blog = async (req, res) => {

    const title = req.params.title;
   if(title){
    try {
        
        const blog = await Blog.findOne({ title: title.replace(/-/g, ' ') });
        if (!blog) {
            return res.status(404).send('Blog not found');
        }
        res.render('blogview', { blog,Ads: await Ad.findOne(),category:await Category.find(),service:await Services.find() });
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).send('An error occurred while fetching the blog.');
    }
   }else{
    const services = await Services.find();
    const category = await Category.find();
    const blog = await Blog.find();
        res.render('blog', { blog,service:services,category,Ads: await Ad.findOne() });
   }
};

exports.login = async (req, res) => {
    if (req.session && req.session.isLoggedIn) {
        // Session is active, render dashboard
        res.redirect('dashboard');
    } else {
        const services = await Services.find();
    const category = await Category.find();
        res.render('login',{service:services,category,Ads: await Ad.findOne()});
    }
}
exports.lostpassword = async (req, res) => {
    res.render('lost-password');
}
module.exports = exports;