const http = require('http')

const port = 3000;

const onRequest = (req, res) =>{
    console.log(req.url);
    res.writeHeader(200,{"Content-Type": "text/plain"})
    res.write(`Hello Server- you asked for ${req.url}`)
    res.end();
};

http.createServer(onRequest).listen(port, () =>{
    //init callback
    console.log(`Server running on ${port}`);
});

