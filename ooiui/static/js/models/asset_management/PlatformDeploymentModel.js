"use strict";
/*
 * ooiui/static/js/models/science/PlatformDeploymentModel.js
 * Model definitions for Platform Deployments
 *
 * Dependencies
 * Libs
 * - ooiui/static/lib/underscore/underscore.js
 * - ooiui/static/lib/backbone/backbone.js
 * - ooiui/static/js/ooi.js
 * - ooiui/static/js/models/science/InstrumentDeploymentModel.js
 * Usage
 */

var PlatformDeploymentModel = OOI.RelationalModel.extend({
  urlRoot: '/api/asset_deployment',
  relation: {
    type: OOI.Relation.hasMany,
    key: 'assetDeployments',
    collectionType: 'AssetCollection',
    reverseRelation: {
      key: 'platform_deployment_id'
    }
  }
});

var PlatformDeploymentCollection = Backbone.Collection.extend({
  url: '/api/asset_deployment',
  model: PlatformDeploymentModel,
  parse: function(response, options) {
    return response.assets;
  },
  byRef: function(array_code_search) {
    var filtered = this.filter(function(mod) {
      if (mod.get("ref_des") == null){
        mod.set("ref_des","__")
      }
      var array_code = mod.get("ref_des")[0]+mod.get("ref_des")[1]
      return array_code === array_code_search;    
      
    });
    return new PlatformDeploymentCollection(filtered);
  }

});
