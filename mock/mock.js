const Mock = require('mockjs');
const mockConfig =require('./mock.config');
const Config  = require( '../src/config');

Object.keys(mockConfig).forEach((key)=>{
    let data = mockConfig[key];
    let regexp = new RegExp(Config.apiHost+key+'.*');
    Mock.mock(regexp,data);
});