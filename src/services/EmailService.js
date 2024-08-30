import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import hbs from 'handlebars';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readHTMLFile = (path, callback) => {
    fs.readFile(path, {encoding: 'utf-8'}, (err, html) => {
        if(err) {
            callback(err);
        } else {
            callback(null, html);
        }
    });
}

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1f090989705a31",
      pass: process.env.MAILTRAP_PWD
    }
  });

export const sendEmail = async (email, token) => {
    readHTMLFile(path.join(__dirname, '..', 'views','welcome.hbs'), (err, html) => {
        if(err) {
            console.log('error here', err);
            return;
        }

        const template = hbs.compile(html);
        const replacements = {
            email: email,
            token: token
        }

        const htmlToSend = template(replacements);
        transporter.sendMail({
            from: 'Friend Finder <tecladistakeys@gmail.com>',
            to: email,
            subject: 'Welcome to Friend Finder',
            html: htmlToSend
        }, (error, res) => {
            if(error) {
                console.log('invalid', error);
            } else {
                console.log('ok', res.messageId);
            }
        });
    });
}

export const resetPassword = async (email = 'contact@divinaarcana.dev', token = 'token123') => {
    readHTMLFile(path.join(__dirname, `../views/forgot.hbs`), (err, html) => {
        if(err) {
            console.log('error here', err);
            return;
        }

        console.log('hello from email service');

        const template = hbs.compile(html);
        const replacements = {
            token: token,
            email: email
        }

        const htmlToSend = template(replacements);
        transporter.sendMail({
            from: 'Divina Arcana <tecladistakeys@gmail.com>',
            to: email,
            subject: 'Reset Password',
            html: htmlToSend
        }, (error, res) => {
            if(error) {
                console.log('invalid', error);
            } else {
                console.log(res.messageId);
            }
        });
    });
}
