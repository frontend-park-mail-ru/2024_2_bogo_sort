(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['auth.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"tooltip\">\n                    <input type=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"type") : depth0), depth0))
    + "\" class=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"class") : depth0), depth0))
    + "\" name=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\"\n                        placeholder=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"placeholder") : depth0), depth0))
    + "\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(lookupProperty(helpers,"eq")||(depth0 && lookupProperty(depth0,"eq"))||container.hooks.helperMissing).call(alias3,(depth0 != null ? lookupProperty(depth0,"name") : depth0),"password",(depth0 != null ? lookupProperty(depth0,"form") : depth0),"signup",{"name":"eq","hash":{},"data":data,"loc":{"start":{"line":23,"column":26},"end":{"line":23,"column":70}}}),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":20},"end":{"line":26,"column":27}}})) != null ? stack1 : "")
    + "                </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "                    <span class=\"tooltiptext\">Пароль должен содержать от 8 до 20 символов, включая заглавные и строчные\n                        буквы, цифры и специальные символы</span>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<form action=\"\">\n    <div class=\"auth_wrapper\">\n        <div class=\"features\">\n            <span class=\"features_logo\">Эмпориум</span>\n            <span class=\"feature\"><img src=\"../../static/images/money.svg\" class=\"icon\"> Быстро и удобно продать или\n                купить товары</span>\n            <span class=\"feature\"><img src=\"../../static/images/time.svg\" class=\"icon\"> Найти работу или предложить\n                услугу</span>\n            <span class=\"feature\"><img src=\"../../static/images/tools.svg\" class=\"icon\"> Найти профессионала под\n                специализированную задачу</span>\n        </div>\n\n        <div class=\"auth\">\n            <h1 class=\"authorization\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":14,"column":38},"end":{"line":14,"column":47}}}) : helper)))
    + "</h1>\n            <span class=\"authorization_details\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"info") || (depth0 != null ? lookupProperty(depth0,"info") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"info","hash":{},"data":data,"loc":{"start":{"line":15,"column":48},"end":{"line":15,"column":56}}}) : helper)))
    + "</span>\n            <span class=\"authorization_error\"></span>\n\n            <div class=\"input_wrapper\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"inputs") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":16},"end":{"line":28,"column":25}}})) != null ? stack1 : "")
    + "                <button type=\"button\" class=\"authorization_enter\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"buttontitle") || (depth0 != null ? lookupProperty(depth0,"buttontitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"buttontitle","hash":{},"data":data,"loc":{"start":{"line":29,"column":66},"end":{"line":29,"column":81}}}) : helper)))
    + "</button>\n                <span class=\"registration_link\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"pretext") || (depth0 != null ? lookupProperty(depth0,"pretext") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pretext","hash":{},"data":data,"loc":{"start":{"line":30,"column":48},"end":{"line":30,"column":59}}}) : helper)))
    + " <a class=\"registration_link link\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anchortext") || (depth0 != null ? lookupProperty(depth0,"anchortext") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anchortext","hash":{},"data":data,"loc":{"start":{"line":30,"column":94},"end":{"line":30,"column":108}}}) : helper)))
    + "</a></span>\n            </div>\n        </div>\n    </div>\n</form>";
},"useData":true});
})();