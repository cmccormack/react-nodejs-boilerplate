module.exports = (app) => {

    ///////////////////////////////////////////////////////////
    // Testing/Debug Middleware
    ///////////////////////////////////////////////////////////
    app.use((req, res, next) => {
      console.debug(`DEBUG originalUrl: ${req.originalUrl}`) 
      next()
    })
  
    
    
    ///////////////////////////////////////////////////////////
    // API
    ///////////////////////////////////////////////////////////

  
  
    ///////////////////////////////////////////////////////////
    // Root Router Handler, Serves Pug rendered index
    ///////////////////////////////////////////////////////////

    const root = path.resolve(__dirname, "..")
    const publicPath = path.join(root, "public")

    app.route('/')
      .get((req, res, next) => {
            res.sendFile(path.join(publicPath, "index.html"))
        })
  
  
    ///////////////////////////////////////////////////////////
    // 404 Not Found Handler
    ///////////////////////////////////////////////////////////
    app.use((req, res, next) => {
      res.status(404)
      .type('text')
      .send('Page Not Found');
    })
  
  
    ///////////////////////////////////////////////////////////
    // Error Handler
    ///////////////////////////////////////////////////////////
    app.use((err, req, res, next) => {
      // console.error(err.message)
  
      res.send({success: false, error: err.message})
    })
  }