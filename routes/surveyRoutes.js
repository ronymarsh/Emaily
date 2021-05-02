const _=require('lodash');
const {Path}=require('path-parser');
const {URL}=require('url');
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer= require('../services/Mailer')
const surveyTemplate=require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model("surveys");

module.exports = (app) => {
  app.get('/api/surveys',requireLogin,async (req,res)=>{
    const surveys= await Survey.find({_user:req.user.id})
    .select({recipients:false});
    
    res.send(surveys)
  })

  app.get('/api/surveys/:surveyId/:choise',(req,res)=>{
    res.send('Thanks for your feedback!')
  })
  
  app.post('/api/surveys/webhooks',(req,res)=>{
    const p=new Path('/api/surveys/:surveyId/:choise')

    //_.compact removes undefined elements from the array
    //_.uniqBy removes duplicates from the array, based on email and surveyId fields
    _.chain(req.body)
      .map(({email,url})=>{
        let match={};
        if(url)
        {
          match=p.test(new URL(url).pathname)
        }

        if (match){
          return {email, surveyId: match.surveyId, choise:match.choise}
        }
      })
      .compact()
      .uniqBy('email','surveyId')
      .each(({surveyId,email,choise})=>{
        Survey.updateOne(
          {
            _id:surveyId,
            recipients:{
                $elemMatch:{ email:email, responded:false }
            }
          }, 
          {
              $inc:{ [choise] : 1 },
              $set:{ 'recipients.$.responded' : true },
              lastResponded: new Date()
          }
        ).exec()
      })
      .value()

    res.send({})
  })
  
  //app.METHOD('PATH',arrowFunctionToRunFirst,arrowFunctionToRunSecond,..., arrowFuncToRunLast-this function must handle response with res.send...)
  //when someone makes a post req to 'api/surveys',
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(',')
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id, // user.id is returned by mongoose
      dateSent: Date.now()
    });

    const mailer=new Mailer(survey,surveyTemplate(survey))

    try {
      await mailer.send();
      await survey.save();
      req.user.credits-=1;
      const user= await req.user.save();

      res.send(user);
      
    } catch(err){
      res.status(422).send(err)
    }
    
  });
};
