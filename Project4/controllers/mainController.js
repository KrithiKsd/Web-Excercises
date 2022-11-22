
exports.index = (req, res) => {
    res.render('index');
};

//renders to contact page
exports.contact = (req, res) => {
    res.render('./new/contact');
};

//renders to about page
exports.about = (req, res) => {
    res.render('./new/about');
};

//renders to new trade page
exports.newtrade = (req, res)=>{
    res.render('newtrade');
};



