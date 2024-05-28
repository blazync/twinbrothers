const Enquiry = require('../models/enquiry');
const Services = require('../models/services');
const Testimonial = require('../models/testimonial');
const Gallery = require('../models/gallery');
const Blog = require('../models/blog');
const mailer = require('../controllers/mailcontroller');

exports.index = async (req, res) => {
    const services = await Services.find();
    const blog = await Blog.find();
    const testimonial = await Testimonial.find();
    res.render('index', { service: services,blog,testimonial });
}
exports.aboutus = async (req, res) => {
    const services = await Services.find();
    res.render('about',{services});
}
exports.gallery = async (req, res) => {
    const type = req.query.type?req.query.type:null;
    const gallery = await Gallery.find();
    res.render('gallery',{ gallery,type });
}

exports.services = async (req, res) => {
    const servicesname = req.params.servicesname;
   try {
        let services;
        if (servicesname) {
            services = await Services.findOne({ name: servicesname.replace(/-/g, ' ') });
            if (!services) {
                res.render('services');
            }
            res.render('servicesdetails', { service: services });
        } else {
            services = await Services.find();
            res.render('services', { service: services });
        }
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).render('error');
    }
};

exports.contact = async (req, res) => {
    res.render('contact');
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
        res.render('blogview', { blog });
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).send('An error occurred while fetching the blog.');
    }
   }else{
    const blog = await Blog.find();
        res.render('blog', { blog });
   }
};

exports.login = async (req, res) => {
    if (req.session && req.session.isLoggedIn) {
        // Session is active, render dashboard
        res.redirect('dashboard');
    } else {
        res.render('login');
    }
}
exports.lostpassword = async (req, res) => {
    res.render('lost-password');
}
module.exports = exports;