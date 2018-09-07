(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cTicket = function cTicket(option, $) {
	this.userId = option;
	this.$ = $;
	this.createTicketUrl = "http://123.56.91.6/web/webApi/ticket/createTicket";
	this.createCSRFUrl = "http://123.56.91.6/web/webApi/ticket/createCSRF";
	this.createTicket();
};
// (function(win) {
// 	$.cTicket = function(option) {
// 		this.userId = option;
// 		this.createTicketUrl = "http://123.56.91.6/web/webApi/ticket/createTicket";
// 		this.createCSRFUrl = "http://123.56.91.6/web/webApi/ticket/createCSRF";
// 		this.createTicket();
// 	};

cTicket.prototype = {
	setCookie: function setCookie(_name, _value, _day) {
		var d = new Date();
		d.setDate(d.getDate() + _day);
		exports.cookie = _name + '=' + _value + ';path=/;expires=' + d.toGMTString();
	},
	createTicket: function createTicket() {
		var _this = this;
		this.$.ajax({
			type: "post",
			url: _this.createTicketUrl,
			async: false,
			data: {
				userId: _this.userId,
				password: "@#$90lasdjfi3SWERT@#$12958jcsduy8"
			},
			dataType: "json",
			complete: function complete(res) {
				win.ticket = res.responseText;
				_this.setCookie("ticket", win.ticket);
				_this.createCSRF(win.ticket);
			}
		});
	},
	createCSRF: function createCSRF(ticket) {
		var _this = this;
		this.$.ajax({
			type: "post",
			url: _this.createCSRFUrl,
			async: false,
			data: {
				ticket: ticket,
				password: "@#$90lasdjfi3SWERT@#$12958jcsduy8"
			},
			dataType: "json",
			complete: function complete(res) {
				win.__cf = res.responseText;
			}
		});
	}
};

exports.cTicket = function ($) {
	return new cTicket(option, $);
};
// })($);

/***/ })
/******/ ]);
});