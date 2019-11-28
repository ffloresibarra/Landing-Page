const express = require('express');
const sgMail = require('@sendgrid/mail');
const config = require('../config/config');

const serviceRouter = express.Router();

const emailService = {
    async post (req, res) {
        try {            
            sgMail.setApiKey(config.key);                     
            const msg = {
                to: config.recipient,
                from: req.body.email,                
                templateId: config.templateId,
                dynamic_template_data: {
                    subject: 'Someone contacted us',
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