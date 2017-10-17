const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));
app.use((req, res)=>res.sendfile(__dirname + '/src/index.html'));
app.listen(process.env.PORT || 8080);
