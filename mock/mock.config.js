let config = {
    "/api/op/public/city/areas/get":require('./data/ares.json'),
    "/api/op/public/tag/industry/get":require('./data/industry.json'),
    "/api/op/user/getUserInfo":require('./data/industry.json'),
    "/api/op/targeting/shield/strategy/list":require('./data/shieldlist.json'),
    "/api/op/targeting/shield/pit/list":require('./data/pitlist.json'),
};
module.exports= config;