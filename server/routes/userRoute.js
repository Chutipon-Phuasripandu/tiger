var express = require('express');
var router = express.Router();

let bisec_model = require('../models/bisec_model');
let false_model = require('../models/false_model');
let newton_model = require('../models/newton_model');

let Trap_model = require('../models/Trap_model');
let Simpson_model = require('../models/Simpson_model');
let CompoTrap_model = require('../models/CompoTrap_model');
let CompoSimp_model = require('../models/CompoSimp_model');

let forward_model = require('../models/forward_model');
let forward2_model = require('../models/forward2_model');
let backward_model = require('../models/backward_model');
let backward2_model = require('../models/backward2_model');
let Central2_model = require('../models/Central2_model');
let Central4_model = require('../models/Central4_model');


/* GET users listing. */

////////////////////////////////////////////////////////
router.get('/showforward', function(req, res, next) {
 
  forward_model.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/forward_node',(req,res)=>{
  console.log(req.body);
  let doc = new forward_model(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

//////////////////////////////////////////////////////////
router.get('/showforward2', function(req, res, next) {
 
  forward2_model.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/forward2_node',(req,res)=>{
  console.log(req.body);
  let doc = new forward2_model(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})


/////////////////////////////////////////////////////////////
router.get('/showbackward', function(req, res, next) {
 
  backward_model.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/backward_node',(req,res)=>{
  console.log(req.body);
  let doc = new backward_model(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
//////////////////////////////////////////////////////////////
router.get('/showbackward2', function(req, res, next) {
 
  backward2_model.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/backward2_node',(req,res)=>{
  console.log(req.body);
  let doc = new backward2_model(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

////////////////////////////////////////////////////////////////
router.get('/showCentral2', function(req, res, next) {
 
  Central2_model.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/Central2_node',(req,res)=>{
  console.log(req.body);
  let doc = new Central2_model(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
///////////////////////////////////////////////////////////////
router.get('/showCentral4', function(req, res, next) {
 
  Central4_model.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/Central4_node',(req,res)=>{
  console.log(req.body);
  let doc = new Central4_model(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
///////////////////////////////////////////////////////////////
router.get('/showbisection', function(req, res, next) {
 
  bisec_model.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/bisec_model',(req,res)=>{
  console.log(req.body);
  let doc = new bisec_model(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
///////////////////////////////////////////////////////////////
router.get('/showfalsepos', function(req, res, next) {
 
  false_model.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/false_model',(req,res)=>{
  console.log(req.body);
  let doc = new false_model(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
///////////////////////////////////////////////////////////////
router.get('/showTrap', function(req, res, next) {
 
  Trap_model.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/Trap_model',(req,res)=>{
  console.log(req.body);
  let doc = new Trap_model(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
///////////////////////////////////////////////////////////////
router.get('/showSimpson', function(req, res, next) {
 
  Simpson_model.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/Simpson_model',(req,res)=>{
  console.log(req.body);
  let doc = new Simpson_model(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
///////////////////////////////////////////////////////////////
router.get('/showCompoTrap', function(req, res, next) {
 
  CompoTrap_model.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/CompoTrap_model',(req,res)=>{
  console.log(req.body);
  let doc = new CompoTrap_model(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
///////////////////////////////////////////////////////////////
router.get('/showCompoSimp', function(req, res, next) {
 
  CompoSimp_model.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/CompoSimp_model',(req,res)=>{
  console.log(req.body);
  let doc = new CompoSimp_model(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
///////////////////////////////////////////////////////////////
router.get('/shownewton', function(req, res, next) {
 
  newton_model.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});


router.post('/newton_model',(req,res)=>{
  console.log(req.body);
  let doc = new newton_model(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})
///////////////////////////////////////////////////////////////
module.exports = router;
