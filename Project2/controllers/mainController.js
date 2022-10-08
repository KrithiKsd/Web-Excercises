
exports.index = (req, res) => {
    res.render('index');
};

exports.contact = (req, res) => {
    res.render('./new/contact');
};

exports.about = (req, res) => {
    res.render('./new/about');
};

exports.newtrade = (req, res)=>{
    res.render('newtrade');
};



