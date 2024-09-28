(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['header.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<header>\n    <div class=\"logo\">\n        <span>Эмпориум</span>\n        <button type=\"button\" class=\"enter\">Войти</button>\n    </div>\n</header>";
},"useData":true});
})();