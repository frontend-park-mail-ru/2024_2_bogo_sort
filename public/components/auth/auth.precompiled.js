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
    + "\" placeholder=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"placeholder") : depth0), depth0))
    + "\">\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"auth_wrapper\" hidden></div>\n\n    <div class=\"features\">\n        <span class=\"features_logo\">Эмпориум</span>\n        <span class=\"feature\"><object type=\"image/svg+xml\" data=\"../../static/images/buy_cart.svg\"></object>Быстро и удобно продать или купить товары</span>\n        <span class=\"feature\"><object type=\"image/svg+xml\" data=\"../../static/images/job.svg\"></object>Найти работу или предложить услугу</span>\n        <span class=\"feature\"><object type=\"image/svg+xml\" data=\"../../static/images/wrench.svg\"></object>Найти профессионала под специализированную задачу</span>\n    </div>\n\n    <div class=\"auth\">\n        <span class=\"authorization\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":11,"column":36},"end":{"line":11,"column":45}}}) : helper)))
    + "</span>\n        <span class=\"authorization_details\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"info") || (depth0 != null ? lookupProperty(depth0,"info") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"info","hash":{},"data":data,"loc":{"start":{"line":12,"column":44},"end":{"line":12,"column":52}}}) : helper)))
    + "</span>\n        \n        <div class=\"input_wrapper\">   \n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"inputs") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":12},"end":{"line":17,"column":21}}})) != null ? stack1 : "")
    + "            <button type=\"button\" class=\"authorization_enter\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"buttontitle") || (depth0 != null ? lookupProperty(depth0,"buttontitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"buttontitle","hash":{},"data":data,"loc":{"start":{"line":18,"column":62},"end":{"line":18,"column":77}}}) : helper)))
    + "</button>\n            <span class=\"registration_link\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"pretext") || (depth0 != null ? lookupProperty(depth0,"pretext") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pretext","hash":{},"data":data,"loc":{"start":{"line":19,"column":44},"end":{"line":19,"column":55}}}) : helper)))
    + " <a class=\"registration_link link\" onclick=\"openRegistration()\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anchortext") || (depth0 != null ? lookupProperty(depth0,"anchortext") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anchortext","hash":{},"data":data,"loc":{"start":{"line":19,"column":119},"end":{"line":19,"column":133}}}) : helper)))
    + "</a></span>\n        </div>\n    </div>\n\n</div>\n";
},"useData":true});
})();