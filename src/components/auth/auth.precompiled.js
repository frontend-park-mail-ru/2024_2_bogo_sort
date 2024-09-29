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
    + "\">\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

<<<<<<< HEAD
  return "<div class=\"auth_wrapper\">   \r\n    <div class=\"features\">\r\n        <span class=\"features_logo\">Эмпориум</span>\r\n        <span class=\"feature\"><img src=\"../../static/images/money.svg\" class=\"icon\"> Быстро и удобно продать или купить товары</span>\r\n        <span class=\"feature\"><img src=\"../../static/images/time.svg\" class=\"icon\"> Найти работу или предложить услугу</span>\r\n        <span class=\"feature\"><img src=\"../../static/images/tools.svg\" class=\"icon\"> Найти профессионала под специализированную задачу</span>\r\n    </div>\r\n\r\n    <div class=\"auth\">\r\n        <span class=\"authorization\">"
=======
  return "<div class=\"auth_wrapper\">   \n    <div class=\"features\">\n        <span class=\"features_logo\">Эмпориум</span>\n        <span class=\"feature\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"35px\" height=\"35px\" viewBox=\"0 0 28 28\" fill=\"none\"><path clip-rule=\"evenodd\" d=\"M1.82047 1C1.36734 1 1 1.35728 1 1.79801V2.39948C1 2.84021 1.36734 3.19749 1.82047 3.19749H3.72716C4.03867 3.19749 4.3233 3.36906 4.46192 3.64038L5.4947 5.93251C5.53326 6.00798 5.56364 6.09443 5.62081 6.15194L10.057 16.4429C10.0129 16.4634 9.97056 16.4883 9.93075 16.5176C8.70163 17.4226 7.87009 18.5878 7.87001 19.7604C7.86996 20.4429 8.16289 21.0807 8.75002 21.5212C9.30752 21.9394 10.0364 22.1118 10.8189 22.1118H10.8446C10.336 22.6308 10.0238 23.3336 10.0238 24.1072C10.0238 25.7049 11.3554 27 12.998 27C14.6406 27 15.9722 25.7049 15.9722 24.1072C15.9722 23.3336 15.66 22.6308 15.1513 22.1118H19.0494C18.5408 22.6308 18.2285 23.3336 18.2285 24.1072C18.2285 25.7049 19.5601 27 21.2027 27C22.8454 27 24.177 25.7049 24.177 24.1072C24.177 23.3336 23.8647 22.6308 23.3561 22.1118H23.9718C24.425 22.1118 24.7923 21.7545 24.7923 21.3138V20.9148C24.7923 20.474 24.425 20.1167 23.9718 20.1167H10.8189C10.3192 20.1167 10.0864 20.0041 10.0028 19.9414C9.94878 19.9009 9.92119 19.8618 9.9212 19.7606C9.92122 19.4917 10.1711 18.8708 11.069 18.1827C11.1084 18.1524 11.1453 18.1194 11.1792 18.084C11.2692 18.1089 11.3635 18.1221 11.4601 18.1221H23.9235C24.4248 18.1221 24.8527 17.7696 24.9351 17.2885L26.9858 5.31837C27.09 4.71036 26.6079 4.1569 25.9742 4.1569H7.35431C7.1981 4.1569 7.05618 4.06597 6.9909 3.92405L5.84968 1.44289C5.71106 1.17157 5.42642 1 5.11492 1H1.82047ZM8.47667 6.15194C8.18952 6.15194 7.99591 6.44552 8.10899 6.70946L12.04 15.8846C12.103 16.0317 12.2476 16.1271 12.4076 16.1271H22.7173C22.9122 16.1271 23.0787 15.9867 23.1116 15.7946L24.6834 6.61948C24.7253 6.37513 24.5371 6.15194 24.2892 6.15194H8.47667ZM11.8698 24.1072C11.8698 23.5012 12.3749 23.0099 12.998 23.0099C13.621 23.0099 14.1261 23.5012 14.1261 24.1072C14.1261 24.7132 13.621 25.2045 12.998 25.2045C12.3749 25.2045 11.8698 24.7132 11.8698 24.1072ZM21.2027 23.0099C20.5797 23.0099 20.0746 23.5012 20.0746 24.1072C20.0746 24.7132 20.5797 25.2045 21.2027 25.2045C21.8258 25.2045 22.3309 24.7132 22.3309 24.1072C22.3309 23.5012 21.8258 23.0099 21.2027 23.0099Z\" fill=\"#000000\" fill-rule=\"evenodd\"/></svg>Быстро и удобно продать или купить товары</span>\n        <span class=\"feature\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"35px\" height=\"35px\" viewBox=\"0 0 48 48\" fill=\"#000000\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"/><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><g id=\"SVGRepo_iconCarrier\"> <g id=\"Layer_2\" data-name=\"Layer 2\"> <g id=\"Icons\"> <g> <rect width=\"48\" height=\"48\" fill=\"none\"/> <path d=\"M29,27H13a2,2,0,0,1,0-4H29a2,2,0,0,1,0,4ZM13,31a2,2,0,0,0,0,4h8a2,2,0,0,0,0-4Zm24-5a2,2,0,0,0-2,2V42H7V8H17a2,2,0,0,0,0-4H5A2,2,0,0,0,3,6V44a2,2,0,0,0,2,2H37a2,2,0,0,0,2-2V28A2,2,0,0,0,37,26Zm7.4-.6a1.9,1.9,0,0,1-2.8,0l-5.1-5.1h0A10.4,10.4,0,0,1,31,22a10.1,10.1,0,0,1-7.1-3H13a2,2,0,0,1,0-4h8.5a9.9,9.9,0,0,1-.5-3,10,10,0,0,1,20,0,10.4,10.4,0,0,1-1.6,5.5h-.1l5.1,5.1A1.9,1.9,0,0,1,44.4,25.4ZM27.5,15a.9.9,0,0,1,1-1h4V13h-3a2,2,0,0,1-2-2V10a2,2,0,0,1,2-2H30V6.1a6,6,0,0,0,0,11.8V16H28.5A.9.9,0,0,1,27.5,15ZM37,12a6,6,0,0,0-5-5.9V8h1.5a.9.9,0,0,1,1,1,.9.9,0,0,1-1,1h-4v1h3a2,2,0,0,1,2,2v1a2,2,0,0,1-2,2H32v1.9l1.6-.5.6-.3a.1.1,0,0,1,.1-.1l.7-.5a.1.1,0,0,1,.1-.1l.6-.6h0l.5-.8h0l.2-.4A5.5,5.5,0,0,0,37,12Z\"/> </g> </g> </g> </g></svg>Найти работу или предложить услугу</span>\n        <span class=\"feature\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" fill=\"#000000\" height=\"35px\" width=\"35px\" version=\"1.1\" id=\"Layer_1\" viewBox=\"0 0 512.002 512.002\" xml:space=\"preserve\"><g><g><path d=\"M509.979,123.286c-3.275-19.319-26.981-26.675-40.675-12.979l-31.568,31.568c-7.91,7.909-20.708,7.908-28.617,0    l-39.029-39.029c-7.909-7.908-7.91-20.707,0-28.616l31.569-31.569c13.78-13.781,6.252-37.417-12.979-40.675    C346.37-5.187,303.906,7.191,273.926,37.17c-30.879,30.879-43.488,76.378-34.023,120.753L23.604,374.223    c-31.468,31.468-31.468,82.671,0,114.139c15.244,15.244,35.511,23.639,57.069,23.639c21.559,0,41.826-8.394,57.07-23.639    l216.296-216.296c43.502,9.315,88.894-2.164,120.756-34.027C504.486,208.349,517.311,166.522,509.979,123.286z M450.855,214.099    c-25.417,25.416-62.63,32.995-97.296,22.955c-5.924-1.714-12.317-0.072-16.679,4.291L113.802,464.422    c-8.849,8.849-20.615,13.722-33.13,13.722c-12.514,0-24.28-4.873-33.128-13.722c-18.267-18.267-18.267-47.991,0-66.258    l223.078-223.078c4.363-4.362,6.006-10.753,4.291-16.679c-10.454-36.096-1.872-72.467,22.955-97.295    c16.946-16.946,39.821-26.549,64.67-27.209l-16.387,16.387c-21.141,21.14-21.144,55.357,0,76.499l39.029,39.029    c21.141,21.141,55.356,21.142,76.499,0l16.417-16.417C477.492,174.076,468.022,196.932,450.855,214.099z\"/></g></g><g><g><circle cx=\"85.757\" cy=\"426.21\" r=\"23.383\"/></g></g></svg>Найти профессионала под специализированную задачу</span>\n    </div>\n\n    <div class=\"auth\">\n        <span class=\"authorization\">"
>>>>>>> 14b4e26 (minor auth fixes)
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":10,"column":36},"end":{"line":10,"column":45}}}) : helper)))
    + "</span>\n        <span class=\"authorization_details\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"info") || (depth0 != null ? lookupProperty(depth0,"info") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"info","hash":{},"data":data,"loc":{"start":{"line":11,"column":44},"end":{"line":11,"column":52}}}) : helper)))
    + "</span>\n        <span class=\"authorization_error\"></span>\n        \n        <div class=\"input_wrapper\">   \n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"inputs") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":12},"end":{"line":17,"column":21}}})) != null ? stack1 : "")
    + "            <button type=\"button\" class=\"authorization_enter\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"buttontitle") || (depth0 != null ? lookupProperty(depth0,"buttontitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"buttontitle","hash":{},"data":data,"loc":{"start":{"line":18,"column":62},"end":{"line":18,"column":77}}}) : helper)))
    + "</button>\n            <span class=\"registration_link\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"pretext") || (depth0 != null ? lookupProperty(depth0,"pretext") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pretext","hash":{},"data":data,"loc":{"start":{"line":19,"column":44},"end":{"line":19,"column":55}}}) : helper)))
    + " <a class=\"registration_link link\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anchortext") || (depth0 != null ? lookupProperty(depth0,"anchortext") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anchortext","hash":{},"data":data,"loc":{"start":{"line":19,"column":90},"end":{"line":19,"column":104}}}) : helper)))
<<<<<<< HEAD
    + "</a></span>\r\n        </div>\r\n    </div>\r\n</div>";
=======
    + "</a></span>\n        </div>\n    </div>\n</div>";
>>>>>>> 14b4e26 (minor auth fixes)
},"useData":true});
})();