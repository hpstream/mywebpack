var cTicket = function(option,$) {
		this.userId = option;
		this.$ = $;
		this.createTicketUrl = "http://123.56.91.6/web/webApi/ticket/createTicket";
		this.createCSRFUrl = "http://123.56.91.6/web/webApi/ticket/createCSRF";
		this.createTicket();
	};
// (function(win) {
	// $.cTicket = function(option) {
	// 	this.userId = option;
	// 	this.createTicketUrl = "http://123.56.91.6/web/webApi/ticket/createTicket";
	// 	this.createCSRFUrl = "http://123.56.91.6/web/webApi/ticket/createCSRF";
	// 	this.createTicket();
	// };

	cTicket.prototype = {
		setCookie: function(_name, _value, _day) {
			var d = new Date();
			d.setDate(d.getDate() + _day);
			exports.cookie = _name + '=' + _value + ';path=/;expires=' + d.toGMTString();
		},
		createTicket: function() {
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
				complete: function(res) {
					_this.ticket = res.responseText;
					_this.setCookie("ticket", _this.ticket);
					_this.createCSRF(_this.ticket);
				}
			});
		},
		createCSRF: function(ticket) {
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
				complete: function(res) {
					_this.__cf = res.responseText;
				}
			});
		}
	}
	module.exports= function(option,$){
	return new cTicket(option,$);
};
// })($);