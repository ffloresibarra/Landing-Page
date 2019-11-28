const express = require('express');
const sgMail = require('@sendgrid/mail');
const config = require('../config/config');

const serviceRouter = express.Router();

const emailService = {
    async post (req, res) {
        try {            
            sgMail.setApiKey(config.key);
            sgMail.setSubstitutionWrappers('--', '--');            
            const msg = {
                to: 'edelgadillo@unitedvirtualities.com',
                from: req.body.email,
                subject: 'Someone contacted us',
                templateId: 'd-edce38ea4428474382cd9f74ef084fa6',
                dynamic_template_data: {                
                fulanito: req.body.username,
                body: req.body.message,
                email: req.body.email,
                telephone: req.body.telephone
                }                                   
            };           

            sgMail.send(msg);
            return res.json({ msg: 'ok' });

        } catch (error) {
            return res.status(501).json(error);
        }    
    }
};

serviceRouter.route('/').post(emailService.post);

module.exports = serviceRouter;