(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['auth.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <input type=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"type") : depth0), depth0))
    + "\" class=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"class") : depth0), depth0))
    + "\" name=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\" placeholder=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"placeholder") : depth0), depth0))
    + "\">\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"auth_wrapper\">   \r\n    <div class=\"features\">\r\n        <span class=\"features_logo\">Эмпориум</span>\r\n        <span class=\"feature\"><img src=\"../../static/images/money.svg\" class=\"icon\"> Быстро и удобно продать или купить товары</span>\r\n        <span class=\"feature\"><img src=\"../../static/images/time.svg\" class=\"icon\"> Найти работу или предложить услугу</span>\r\n        <span class=\"feature\"><img src=\"../../static/images/tools.svg\" class=\"icon\"> Найти профессионала под специализированную задачу</span>\r\n    </div>\r\n\r\n    <div class=\"auth\">\r\n        <span class=\"authorization\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":10,"column":36},"end":{"line":10,"column":45}}}) : helper)))
    + "</span>\r\n        <span class=\"authorization_details\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"info") || (depth0 != null ? lookupProperty(depth0,"info") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"info","hash":{},"data":data,"loc":{"start":{"line":11,"column":44},"end":{"line":11,"column":52}}}) : helper)))
    + "</span>\r\n        <span class=\"authorization_error\"></span>\r\n        \r\n        <div class=\"input_wrapper\">   \r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"inputs") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":12},"end":{"line":17,"column":21}}})) != null ? stack1 : "")
    + "            <button type=\"button\" class=\"authorization_enter\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"buttontitle") || (depth0 != null ? lookupProperty(depth0,"buttontitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"buttontitle","hash":{},"data":data,"loc":{"start":{"line":18,"column":62},"end":{"line":18,"column":77}}}) : helper)))
    + "</button>\r\n            <span class=\"registration_link\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"pretext") || (depth0 != null ? lookupProperty(depth0,"pretext") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pretext","hash":{},"data":data,"loc":{"start":{"line":19,"column":44},"end":{"line":19,"column":55}}}) : helper)))
    + " <a class=\"registration_link link\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anchortext") || (depth0 != null ? lookupProperty(depth0,"anchortext") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anchortext","hash":{},"data":data,"loc":{"start":{"line":19,"column":90},"end":{"line":19,"column":104}}}) : helper)))
    + "</a></span>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
})();