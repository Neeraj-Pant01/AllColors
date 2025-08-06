exports.sanitizeNoassign = (req,res,next) =>{
  function clean(obj) {
    if (typeof obj !== 'object' || obj == null) return;
    for (const key of Object.keys(obj)) {
      if (key.includes('$') || key.includes('.')) {
        delete obj[key];
      } else {
        clean(obj[key]);
      }
    }
  }
  clean(req.body);
  clean(req.query);
  clean(req.params);
  next();
}