module.exports={name:"@yarnpkg/plugin-typescript",factory:function(e){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(n,s,function(t){return e[t]}.bind(null,s));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=19)}([function(e,t,r){"use strict";function n(e,t,r){const n={"x-algolia-api-key":r,"x-algolia-application-id":t};return{headers:()=>e===l.WithinHeaders?n:{},queryParameters:()=>e===l.WithinQueryParameters?n:{}}}function s(e){let t=0;const r=()=>(t++,new Promise(n=>{setTimeout(()=>{n(e(r))},Math.min(100*t,1e3))}));return e(r)}function a(e,t=((e,t)=>Promise.resolve())){return Object.assign(e,{wait:r=>a(e.then(e=>Promise.all([t(e,r),e])).then(e=>e[1]))})}function o(e){let t=e.length-1;for(;t>0;t--){const r=Math.floor(Math.random()*(t+1)),n=e[t];e[t]=e[r],e[r]=n}return e}function i(e,t){return Object.keys(void 0!==t?t:{}).forEach(r=>{e[r]=t[r](e)}),e}function c(e,...t){let r=0;return e.replace(/%s/g,()=>encodeURIComponent(t[r++]))}r.r(t),r.d(t,"AuthMode",(function(){return l})),r.d(t,"addMethods",(function(){return i})),r.d(t,"createAuth",(function(){return n})),r.d(t,"createRetryablePromise",(function(){return s})),r.d(t,"createWaitablePromise",(function(){return a})),r.d(t,"destroy",(function(){return d})),r.d(t,"encode",(function(){return c})),r.d(t,"shuffle",(function(){return o})),r.d(t,"version",(function(){return u}));const u="4.2.0",d=e=>()=>e.transporter.requester.destroy(),l={WithinQueryParameters:0,WithinHeaders:1}},function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));const n={Delete:"DELETE",Get:"GET",Post:"POST",Put:"PUT"}},function(e,t,r){"use strict";r.r(t),r.d(t,"CallEnum",(function(){return a})),r.d(t,"HostStatusEnum",(function(){return o})),r.d(t,"createApiError",(function(){return x})),r.d(t,"createDeserializationError",(function(){return S})),r.d(t,"createMappedRequestOptions",(function(){return s})),r.d(t,"createRetryError",(function(){return D})),r.d(t,"createStatefulHost",(function(){return c})),r.d(t,"createStatelessHost",(function(){return l})),r.d(t,"createTransporter",(function(){return h})),r.d(t,"createUserAgent",(function(){return f})),r.d(t,"deserializeFailure",(function(){return y})),r.d(t,"deserializeSuccess",(function(){return b})),r.d(t,"isStatefulHostTimeouted",(function(){return d})),r.d(t,"isStatefulHostUp",(function(){return u})),r.d(t,"serializeData",(function(){return j})),r.d(t,"serializeHeaders",(function(){return P})),r.d(t,"serializeQueryParameters",(function(){return O})),r.d(t,"serializeUrl",(function(){return g})),r.d(t,"stackFrameWithoutCredentials",(function(){return v})),r.d(t,"stackTraceWithoutCredentials",(function(){return I}));var n=r(1);function s(e,t){const r=e||{},n=r.data||{};return Object.keys(r).forEach(e=>{-1===["timeout","headers","queryParameters","data","cacheable"].indexOf(e)&&(n[e]=r[e])}),{data:Object.entries(n).length>0?n:void 0,timeout:r.timeout||t,headers:r.headers||{},queryParameters:r.queryParameters||{},cacheable:r.cacheable}}const a={Read:1,Write:2,Any:3},o={Up:1,Down:2,Timeouted:3},i=12e4;function c(e,t=o.Up){return{...e,status:t,lastUpdate:Date.now()}}function u(e){return e.status===o.Up||Date.now()-e.lastUpdate>i}function d(e){return e.status===o.Timeouted&&Date.now()-e.lastUpdate<=i}function l(e){return{protocol:e.protocol||"https",url:e.url,accept:e.accept||a.Any}}const p=(e,t)=>(e=>{const t=e.status;return e.isTimedOut||(({isTimedOut:e,status:t})=>!e&&0==~~t)(e)||2!=~~(t/100)&&4!=~~(t/100)})(e)?t.onRetry(e):(({status:e})=>2==~~(e/100))(e)?t.onSucess(e):t.onFail(e);function m(e,t,r,s){const a=[],i=j(r,s),m=P(e,s),h=r.method,f=r.method!==n.a.Get?{}:{...r.data,...s.data},O={"x-algolia-agent":e.userAgent.value,...e.queryParameters,...f,...s.queryParameters};let x=0;const S=(t,n)=>{const u=t.pop();if(void 0===u)throw D(I(a));const d={data:i,headers:m,method:h,url:g(u,r.path,O),connectTimeout:n(x,e.timeouts.connect),responseTimeout:n(x,s.timeout)},l=e=>{const r={request:d,response:e,host:u,triesLeft:t.length};return a.push(r),r},f={onSucess:e=>b(e),onRetry(r){const s=l(r);return r.isTimedOut&&x++,Promise.all([e.logger.info("Retryable failure",v(s)),e.hostsCache.set(u,c(u,r.isTimedOut?o.Timeouted:o.Down))]).then(()=>S(t,n))},onFail(e){throw l(e),y(e,I(a))}};return e.requester.send(d).then(e=>p(e,f))};return function(e,t){return Promise.all(t.map(t=>e.get(t,()=>Promise.resolve(c(t))))).then(e=>{const r=e.filter(e=>u(e)),n=e.filter(e=>d(e)),s=[...r,...n];return{getTimeout:(e,t)=>(0===n.length&&0===e?1:n.length+3+e)*t,statelessHosts:s.length>0?s.map(e=>l(e)):t}})}(e.hostsCache,t).then(e=>S([...e.statelessHosts].reverse(),e.getTimeout))}function h(e){const{hostsCache:t,logger:r,requester:n,requestsCache:o,responsesCache:i,timeouts:c,userAgent:u,hosts:d,queryParameters:p,headers:h}=e,f={hostsCache:t,logger:r,requester:n,requestsCache:o,responsesCache:i,timeouts:c,userAgent:u,headers:h,queryParameters:p,hosts:d.map(e=>l(e)),read(e,t){const r=s(t,f.timeouts.read),n=()=>m(f,f.hosts.filter(e=>0!=(e.accept&a.Read)),e,r);if(!0!==(void 0!==r.cacheable?r.cacheable:e.cacheable))return n();const o={request:e,mappedRequestOptions:r,transporter:{queryParameters:f.queryParameters,headers:f.headers}};return f.responsesCache.get(o,()=>f.requestsCache.get(o,()=>f.requestsCache.set(o,n()).then(e=>Promise.all([f.requestsCache.delete(o),e]),e=>Promise.all([f.requestsCache.delete(o),Promise.reject(e)])).then(([e,t])=>t)),{miss:e=>f.responsesCache.set(o,e)})},write:(e,t)=>m(f,f.hosts.filter(e=>0!=(e.accept&a.Write)),e,s(t,f.timeouts.write))};return f}function f(e){const t={value:`Algolia for JavaScript (${e})`,add(e){const r=`; ${e.segment}${void 0!==e.version?` (${e.version})`:""}`;return-1===t.value.indexOf(r)&&(t.value=`${t.value}${r}`),t}};return t}function b(e){try{return JSON.parse(e.content)}catch(t){throw S(t.message,e)}}function y({content:e,status:t},r){let n=e;try{n=JSON.parse(e).message}catch(e){}return x(n,t,r)}function g(e,t,r){const n=O(r);let s=`${e.protocol}://${e.url}/${"/"===t.charAt(0)?t.substr(1):t}`;return n.length&&(s+=`?${n}`),s}function O(e){return Object.keys(e).map(t=>(function(e,...t){let r=0;return e.replace(/%s/g,()=>encodeURIComponent(t[r++]))})("%s=%s",t,(e=>"[object Object]"===Object.prototype.toString.call(e)||"[object Array]"===Object.prototype.toString.call(e))(e[t])?JSON.stringify(e[t]):e[t])).join("&")}function j(e,t){if(e.method===n.a.Get||void 0===e.data&&void 0===t.data)return;const r=Array.isArray(e.data)?e.data:{...e.data,...t.data};return JSON.stringify(r)}function P(e,t){const r={...e.headers,...t.headers},n={};return Object.keys(r).forEach(e=>{const t=r[e];n[e.toLowerCase()]=t}),n}function I(e){return e.map(e=>v(e))}function v(e){const t=e.request.headers["x-algolia-api-key"]?{"x-algolia-api-key":"*****"}:{};return{...e,request:{...e.request,headers:{...e.request.headers,...t}}}}function x(e,t,r){return{name:"ApiError",message:e,status:t,transporterStackTrace:r}}function S(e,t){return{name:"DeserializationError",message:e,response:t}}function D(e){return{name:"RetryError",message:"Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.",transporterStackTrace:e}}},function(t,r){t.exports=e("@yarnpkg/core")},function(t,r){t.exports=e("http")},function(t,r){t.exports=e("https")},function(t,r){t.exports=e("@yarnpkg/plugin-essentials")},function(t,r){t.exports=e("semver")},function(e,t,r){const n=r(11);e.exports=n,e.exports.default=n},function(t,r){t.exports=e("crypto")},function(t,r){t.exports=e("url")},function(e,t,r){"use strict";var n=r(12),s=r(13),a=r(14),o=r(0),i=r(15),c=r(16),u=r(17),d=r(18),l=r(2);function p(e,t,r){const p={appId:e,apiKey:t,timeouts:{connect:2,read:5,write:30},requester:d.createNodeHttpRequester(),logger:u.createNullLogger(),responsesCache:n.createNullCache(),requestsCache:n.createNullCache(),hostsCache:s.createInMemoryCache(),userAgent:l.createUserAgent(o.version).add({segment:"Node.js",version:process.versions.node})};return c.createSearchClient({...p,...r,methods:{search:c.multipleQueries,searchForFacetValues:c.multipleSearchForFacetValues,multipleBatch:c.multipleBatch,multipleGetObjects:c.multipleGetObjects,multipleQueries:c.multipleQueries,copyIndex:c.copyIndex,copySettings:c.copySettings,copyRules:c.copyRules,copySynonyms:c.copySynonyms,moveIndex:c.moveIndex,listIndices:c.listIndices,getLogs:c.getLogs,listClusters:c.listClusters,multipleSearchForFacetValues:c.multipleSearchForFacetValues,getApiKey:c.getApiKey,addApiKey:c.addApiKey,listApiKeys:c.listApiKeys,updateApiKey:c.updateApiKey,deleteApiKey:c.deleteApiKey,restoreApiKey:c.restoreApiKey,assignUserID:c.assignUserID,assignUserIDs:c.assignUserIDs,getUserID:c.getUserID,searchUserIDs:c.searchUserIDs,listUserIDs:c.listUserIDs,getTopUserIDs:c.getTopUserIDs,removeUserID:c.removeUserID,hasPendingMappings:c.hasPendingMappings,generateSecuredApiKey:c.generateSecuredApiKey,getSecuredApiKeyRemainingValidity:c.getSecuredApiKeyRemainingValidity,destroy:o.destroy,initIndex:e=>t=>c.initIndex(e)(t,{methods:{batch:c.batch,delete:c.deleteIndex,getObject:c.getObject,getObjects:c.getObjects,saveObject:c.saveObject,saveObjects:c.saveObjects,search:c.search,searchForFacetValues:c.searchForFacetValues,waitTask:c.waitTask,setSettings:c.setSettings,getSettings:c.getSettings,partialUpdateObject:c.partialUpdateObject,partialUpdateObjects:c.partialUpdateObjects,deleteObject:c.deleteObject,deleteObjects:c.deleteObjects,deleteBy:c.deleteBy,clearObjects:c.clearObjects,browseObjects:c.browseObjects,getObjectPosition:c.getObjectPosition,findObject:c.findObject,exists:c.exists,saveSynonym:c.saveSynonym,saveSynonyms:c.saveSynonyms,getSynonym:c.getSynonym,searchSynonyms:c.searchSynonyms,browseSynonyms:c.browseSynonyms,deleteSynonym:c.deleteSynonym,clearSynonyms:c.clearSynonyms,replaceAllObjects:c.replaceAllObjects,replaceAllSynonyms:c.replaceAllSynonyms,searchRules:c.searchRules,getRule:c.getRule,deleteRule:c.deleteRule,saveRule:c.saveRule,saveRules:c.saveRules,replaceAllRules:c.replaceAllRules,browseRules:c.browseRules,clearRules:c.clearRules}}),initAnalytics:()=>e=>a.createAnalyticsClient({...p,...e,methods:{addABTest:a.addABTest,getABTest:a.getABTest,getABTests:a.getABTests,stopABTest:a.stopABTest,deleteABTest:a.deleteABTest}}),initRecommendation:()=>e=>i.createRecommendationClient({...p,...e,methods:{getPersonalizationStrategy:i.getPersonalizationStrategy,setPersonalizationStrategy:i.setPersonalizationStrategy}})}})}p.version=o.version,e.exports=p},function(e,t,r){"use strict";function n(e){const t=[...e.caches],r=t.shift();return void 0===r?s():{get:(e,s,a={miss:()=>Promise.resolve()})=>r.get(e,s,a).catch(()=>n({caches:t}).get(e,s,a)),set:(e,s)=>r.set(e,s).catch(()=>n({caches:t}).set(e,s)),delete:e=>r.delete(e).catch(()=>n({caches:t}).delete(e)),clear:()=>r.clear().catch(()=>n({caches:t}).clear())}}function s(){return{get:(e,t,r={miss:()=>Promise.resolve()})=>t().then(e=>Promise.all([e,r.miss(e)])).then(([e])=>e),set:(e,t)=>Promise.resolve(t),delete:e=>Promise.resolve(),clear:()=>Promise.resolve()}}r.r(t),r.d(t,"createFallbackableCache",(function(){return n})),r.d(t,"createNullCache",(function(){return s}))},function(e,t,r){"use strict";function n(e={serializable:!0}){let t={};return{get(r,n,s={miss:()=>Promise.resolve()}){const a=JSON.stringify(r);if(a in t)return Promise.resolve(e.serializable?JSON.parse(t[a]):t[a]);const o=n(),i=s&&s.miss||(()=>Promise.resolve());return o.then(e=>i(e)).then(()=>o)},set:(r,n)=>(t[JSON.stringify(r)]=e.serializable?JSON.stringify(n):n,Promise.resolve(n)),delete:e=>(delete t[JSON.stringify(e)],Promise.resolve()),clear:()=>(t={},Promise.resolve())}}r.r(t),r.d(t,"createInMemoryCache",(function(){return n}))},function(e,t,r){"use strict";r.r(t),r.d(t,"addABTest",(function(){return i})),r.d(t,"createAnalyticsClient",(function(){return o})),r.d(t,"deleteABTest",(function(){return c})),r.d(t,"getABTest",(function(){return u})),r.d(t,"getABTests",(function(){return d})),r.d(t,"stopABTest",(function(){return l}));var n=r(0),s=r(2),a=r(1);const o=e=>{const t=e.region||"us",r=Object(n.createAuth)(n.AuthMode.WithinHeaders,e.appId,e.apiKey),a=Object(s.createTransporter)({hosts:[{url:`analytics.${t}.algolia.com`}],...e,headers:{...r.headers(),"content-type":"application/json",...e.headers},queryParameters:{...r.queryParameters(),...e.queryParameters}}),o=e.appId;return Object(n.addMethods)({appId:o,transporter:a},e.methods)},i=e=>(t,r)=>e.transporter.write({method:a.a.Post,path:"2/abtests",data:t},r),c=e=>(t,r)=>e.transporter.write({method:a.a.Delete,path:Object(n.encode)("2/abtests/%s",t)},r),u=e=>(t,r)=>e.transporter.read({method:a.a.Get,path:Object(n.encode)("2/abtests/%s",t)},r),d=e=>t=>e.transporter.read({method:a.a.Get,path:"2/abtests"},t),l=e=>(t,r)=>e.transporter.write({method:a.a.Post,path:Object(n.encode)("2/abtests/%s/stop",t)},r)},function(e,t,r){"use strict";r.r(t),r.d(t,"createRecommendationClient",(function(){return o})),r.d(t,"getPersonalizationStrategy",(function(){return i})),r.d(t,"setPersonalizationStrategy",(function(){return c}));var n=r(0),s=r(2),a=r(1);const o=e=>{const t=e.region||"us",r=Object(n.createAuth)(n.AuthMode.WithinHeaders,e.appId,e.apiKey),a=Object(s.createTransporter)({hosts:[{url:`recommendation.${t}.algolia.com`}],...e,headers:{...r.headers(),"content-type":"application/json",...e.headers},queryParameters:{...r.queryParameters(),...e.queryParameters}});return Object(n.addMethods)({appId:e.appId,transporter:a},e.methods)},i=e=>t=>e.transporter.read({method:a.a.Get,path:"1/strategies/personalization"},t),c=e=>(t,r)=>e.transporter.write({method:a.a.Post,path:"1/strategies/personalization",data:t},r)},function(e,t,r){"use strict";r.r(t),r.d(t,"ApiKeyACLEnum",(function(){return we})),r.d(t,"BatchActionEnum",(function(){return Ae})),r.d(t,"ScopeEnum",(function(){return Re})),r.d(t,"StrategyEnum",(function(){return qe})),r.d(t,"SynonymEnum",(function(){return Te})),r.d(t,"addApiKey",(function(){return p})),r.d(t,"assignUserID",(function(){return m})),r.d(t,"assignUserIDs",(function(){return h})),r.d(t,"batch",(function(){return H})),r.d(t,"browseObjects",(function(){return K})),r.d(t,"browseRules",(function(){return B})),r.d(t,"browseSynonyms",(function(){return $})),r.d(t,"chunkedBatch",(function(){return z})),r.d(t,"clearObjects",(function(){return V})),r.d(t,"clearRules",(function(){return L})),r.d(t,"clearSynonyms",(function(){return Q})),r.d(t,"copyIndex",(function(){return f})),r.d(t,"copyRules",(function(){return b})),r.d(t,"copySettings",(function(){return y})),r.d(t,"copySynonyms",(function(){return g})),r.d(t,"createBrowsablePromise",(function(){return i})),r.d(t,"createMissingObjectIDError",(function(){return u})),r.d(t,"createObjectNotFoundError",(function(){return d})),r.d(t,"createSearchClient",(function(){return c})),r.d(t,"createValidUntilNotFoundError",(function(){return l})),r.d(t,"deleteApiKey",(function(){return O})),r.d(t,"deleteBy",(function(){return _})),r.d(t,"deleteIndex",(function(){return J})),r.d(t,"deleteObject",(function(){return X})),r.d(t,"deleteObjects",(function(){return Y})),r.d(t,"deleteRule",(function(){return Z})),r.d(t,"deleteSynonym",(function(){return ee})),r.d(t,"exists",(function(){return te})),r.d(t,"findObject",(function(){return re})),r.d(t,"generateSecuredApiKey",(function(){return j})),r.d(t,"getApiKey",(function(){return P})),r.d(t,"getLogs",(function(){return I})),r.d(t,"getObject",(function(){return ne})),r.d(t,"getObjectPosition",(function(){return se})),r.d(t,"getObjects",(function(){return ae})),r.d(t,"getRule",(function(){return oe})),r.d(t,"getSecuredApiKeyRemainingValidity",(function(){return v})),r.d(t,"getSettings",(function(){return ie})),r.d(t,"getSynonym",(function(){return ce})),r.d(t,"getTask",(function(){return ue})),r.d(t,"getTopUserIDs",(function(){return x})),r.d(t,"getUserID",(function(){return S})),r.d(t,"hasPendingMappings",(function(){return D})),r.d(t,"initIndex",(function(){return w})),r.d(t,"listApiKeys",(function(){return A})),r.d(t,"listClusters",(function(){return R})),r.d(t,"listIndices",(function(){return q})),r.d(t,"listUserIDs",(function(){return T})),r.d(t,"moveIndex",(function(){return k})),r.d(t,"multipleBatch",(function(){return U})),r.d(t,"multipleGetObjects",(function(){return C})),r.d(t,"multipleQueries",(function(){return N})),r.d(t,"multipleSearchForFacetValues",(function(){return E})),r.d(t,"partialUpdateObject",(function(){return de})),r.d(t,"partialUpdateObjects",(function(){return le})),r.d(t,"removeUserID",(function(){return M})),r.d(t,"replaceAllObjects",(function(){return pe})),r.d(t,"replaceAllRules",(function(){return me})),r.d(t,"replaceAllSynonyms",(function(){return he})),r.d(t,"restoreApiKey",(function(){return W})),r.d(t,"saveObject",(function(){return fe})),r.d(t,"saveObjects",(function(){return be})),r.d(t,"saveRule",(function(){return ye})),r.d(t,"saveRules",(function(){return ge})),r.d(t,"saveSynonym",(function(){return Oe})),r.d(t,"saveSynonyms",(function(){return je})),r.d(t,"search",(function(){return Pe})),r.d(t,"searchForFacetValues",(function(){return Ie})),r.d(t,"searchRules",(function(){return ve})),r.d(t,"searchSynonyms",(function(){return xe})),r.d(t,"searchUserIDs",(function(){return F})),r.d(t,"setSettings",(function(){return Se})),r.d(t,"updateApiKey",(function(){return G})),r.d(t,"waitTask",(function(){return De}));var n=r(0),s=r(2),a=r(1),o=r(9);function i(e){const t=r=>e.request(r).then(n=>{if(void 0!==e.batch&&e.batch(n.hits),!e.shouldStop(n))return n.cursor?t({cursor:n.cursor}):t({page:(r.page||0)+1})});return t({})}const c=e=>{const t=e.appId,r=Object(n.createAuth)(void 0!==e.authMode?e.authMode:n.AuthMode.WithinHeaders,t,e.apiKey),a=Object(s.createTransporter)({hosts:[{url:`${t}-dsn.algolia.net`,accept:s.CallEnum.Read},{url:`${t}.algolia.net`,accept:s.CallEnum.Write}].concat(Object(n.shuffle)([{url:`${t}-1.algolianet.com`},{url:`${t}-2.algolianet.com`},{url:`${t}-3.algolianet.com`}])),...e,headers:{...r.headers(),"content-type":"application/x-www-form-urlencoded",...e.headers},queryParameters:{...r.queryParameters(),...e.queryParameters}}),o={transporter:a,appId:t,addAlgoliaAgent(e,t){a.userAgent.add({segment:e,version:t})},clearCache:()=>Promise.all([a.requestsCache.clear(),a.responsesCache.clear()]).then(()=>void 0)};return Object(n.addMethods)(o,e.methods)};function u(){return{name:"MissingObjectIDError",message:"All objects must have an unique objectID (like a primary key) to be valid. Algolia is also able to generate objectIDs automatically but *it's not recommended*. To do it, use the `{'autoGenerateObjectIDIfNotExist': true}` option."}}function d(){return{name:"ObjectNotFoundError",message:"Object not found."}}function l(){return{name:"ValidUntilNotFoundError",message:"ValidUntil not found in given secured api key."}}const p=e=>(t,r)=>{const{queryParameters:s,...o}=r||{},i={acl:t,...void 0!==s?{queryParameters:s}:{}};return Object(n.createWaitablePromise)(e.transporter.write({method:a.a.Post,path:"1/keys",data:i},o),(t,r)=>Object(n.createRetryablePromise)(n=>P(e)(t.key,r).catch(e=>{if(404!==e.status)throw e;return n()})))},m=e=>(t,r,n)=>{const o=Object(s.createMappedRequestOptions)(n);return o.queryParameters["X-Algolia-User-ID"]=t,e.transporter.write({method:a.a.Post,path:"1/clusters/mapping",data:{cluster:r}},o)},h=e=>(t,r,n)=>e.transporter.write({method:a.a.Post,path:"1/clusters/mapping/batch",data:{users:t,cluster:r}},n),f=e=>(t,r,s)=>{return Object(n.createWaitablePromise)(e.transporter.write({method:a.a.Post,path:Object(n.encode)("1/indexes/%s/operation",t),data:{operation:"copy",destination:r}},s),(r,n)=>w(e)(t,{methods:{waitTask:De}}).waitTask(r.taskID,n))},b=e=>(t,r,n)=>f(e)(t,r,{...n,scope:[Re.Rules]}),y=e=>(t,r,n)=>f(e)(t,r,{...n,scope:[Re.Settings]}),g=e=>(t,r,n)=>f(e)(t,r,{...n,scope:[Re.Synonyms]}),O=e=>(t,r)=>{return Object(n.createWaitablePromise)(e.transporter.write({method:a.a.Delete,path:Object(n.encode)("1/keys/%s",t)},r),(r,s)=>Object(n.createRetryablePromise)(r=>P(e)(t,s).then(r).catch(e=>{if(404!==e.status)throw e})))},j=()=>(e,t)=>{const r=Object(s.serializeQueryParameters)(t),n=Object(o.createHmac)("sha256",e).update(r).digest("hex");return Buffer.from(n+r).toString("base64")},P=e=>(t,r)=>e.transporter.read({method:a.a.Get,path:Object(n.encode)("1/keys/%s",t)},r),I=e=>t=>e.transporter.read({method:a.a.Get,path:"1/logs"},t),v=()=>e=>{const t=Buffer.from(e,"base64").toString("ascii").match(/validUntil=(\d+)/);if(null===t)throw{name:"ValidUntilNotFoundError",message:"ValidUntil not found in given secured api key."};return parseInt(t[1],10)-Math.round((new Date).getTime()/1e3)},x=e=>t=>e.transporter.read({method:a.a.Get,path:"1/clusters/mapping/top"},t),S=e=>(t,r)=>e.transporter.read({method:a.a.Get,path:Object(n.encode)("1/clusters/mapping/%s",t)},r),D=e=>t=>{const{retrieveMappings:r,...n}=t||{};return!0===r&&(n.getClusters=!0),e.transporter.read({method:a.a.Get,path:"1/clusters/mapping/pending"},n)},w=e=>(t,r={})=>{const s={transporter:e.transporter,appId:e.appId,indexName:t};return Object(n.addMethods)(s,r.methods)},A=e=>t=>e.transporter.read({method:a.a.Get,path:"1/keys"},t),R=e=>t=>e.transporter.read({method:a.a.Get,path:"1/clusters"},t),q=e=>t=>e.transporter.read({method:a.a.Get,path:"1/indexes"},t),T=e=>t=>e.transporter.read({method:a.a.Get,path:"1/clusters/mapping"},t),k=e=>(t,r,s)=>{return Object(n.createWaitablePromise)(e.transporter.write({method:a.a.Post,path:Object(n.encode)("1/indexes/%s/operation",t),data:{operation:"move",destination:r}},s),(r,n)=>w(e)(t,{methods:{waitTask:De}}).waitTask(r.taskID,n))},U=e=>(t,r)=>{return Object(n.createWaitablePromise)(e.transporter.write({method:a.a.Post,path:"1/indexes/*/batch",data:{requests:t}},r),(t,r)=>Promise.all(Object.keys(t.taskID).map(n=>w(e)(n,{methods:{waitTask:De}}).waitTask(t.taskID[n],r))))},C=e=>(t,r)=>e.transporter.read({method:a.a.Post,path:"1/indexes/*/objects",data:{requests:t}},r),N=e=>(t,r)=>{const n=t.map(e=>({...e,params:Object(s.serializeQueryParameters)(e.params||{})}));return e.transporter.read({method:a.a.Post,path:"1/indexes/*/queries",data:{requests:n},cacheable:!0},r)},E=e=>(t,r)=>Promise.all(t.map(t=>{const{facetName:n,facetQuery:s,...a}=t.params;return w(e)(t.indexName,{methods:{searchForFacetValues:Ie}}).searchForFacetValues(n,s,{...r,...a})})),M=e=>(t,r)=>{const n=Object(s.createMappedRequestOptions)(r);return n.queryParameters["X-Algolia-User-ID"]=t,e.transporter.write({method:a.a.Delete,path:"1/clusters/mapping"},n)},W=e=>(t,r)=>{return Object(n.createWaitablePromise)(e.transporter.write({method:a.a.Post,path:Object(n.encode)("1/keys/%s/restore",t)},r),(r,s)=>Object(n.createRetryablePromise)(r=>P(e)(t,s).catch(e=>{if(404!==e.status)throw e;return r()})))},F=e=>(t,r)=>e.transporter.read({method:a.a.Post,path:"1/clusters/mapping/search",data:{query:t}},r),G=e=>(t,r)=>{const s=Object.assign({},r),{queryParameters:o,...i}=r||{},c=o?{queryParameters:o}:{},u=["acl","indexes","referers","restrictSources","queryParameters","description","maxQueriesPerIPPerHour","maxHitsPerQuery"];return Object(n.createWaitablePromise)(e.transporter.write({method:a.a.Put,path:Object(n.encode)("1/keys/%s",t),data:c},i),(r,a)=>Object(n.createRetryablePromise)(r=>P(e)(t,a).then(e=>(e=>Object.keys(s).filter(e=>-1!==u.indexOf(e)).every(t=>e[t]===s[t]))(e)?Promise.resolve():r())))},H=e=>(t,r)=>{return Object(n.createWaitablePromise)(e.transporter.write({method:a.a.Post,path:Object(n.encode)("1/indexes/%s/batch",e.indexName),data:{requests:t}},r),(t,r)=>De(e)(t.taskID,r))},K=e=>t=>i({...t,shouldStop:e=>void 0===e.cursor,request:r=>e.transporter.read({method:a.a.Post,path:Object(n.encode)("1/indexes/%s/browse",e.indexName),data:r},t)}),B=e=>t=>{const r={hitsPerPage:1e3,...t};return i({...r,shouldStop:e=>e.hits.length<r.hitsPerPage,request:t=>ve(e)("",{...r,...t}).then(e=>({...e,hits:e.hits.map(e=>(delete e._highlightResult,e))}))})},$=e=>t=>{const r={hitsPerPage:1e3,...t};return i({...r,shouldStop:e=>e.hits.length<r.hitsPerPage,request:t=>xe(e)("",{...r,...t}).then(e=>({...e,hits:e.hits.map(e=>(delete e._highlightResult,e))}))})},z=e=>(t,r,s)=>{const{batchSize:a,...o}=s||{},i={taskIDs:[],objectIDs:[]},c=(n=0)=>{const s=[];let u;for(u=n;u<t.length&&(s.push(t[u]),s.length!==(a||1e3));u++);return 0===s.length?Promise.resolve(i):H(e)(s.map(e=>({action:r,body:e})),o).then(e=>(i.objectIDs=i.objectIDs.concat(e.objectIDs),i.taskIDs.push(e.taskID),c(++u)))};return Object(n.createWaitablePromise)(c(),(t,r)=>Promise.all(t.taskIDs.map(t=>De(e)(t,r))))},V=e=>t=>Object(n.createWaitablePromise)(e.transporter.write({method:a.a.Post,path:Object(n.encode)("1/indexes/%s/clear",e.indexName)},t),(t,r)=>De(e)(t.taskID,r)),L=e=>t=>{const{forwardToReplicas:r,...o}=t||{},i=Object(s.createMappedRequestOptions)(o);return r&&(i.queryParameters.forwardToReplicas=1),Object(n.createWaitablePromise)(e.transporter.write({method:a.a.Post,path:Object(n.encode)("1/indexes/%s/rules/clear",e.indexName)},i),(t,r)=>De(e)(t.taskID,r))},Q=e=>t=>{const{forwardToReplicas:r,...o}=t||{},i=Object(s.createMappedRequestOptions)(o);return r&&(i.queryParameters.forwardToReplicas=1),Object(n.createWaitablePromise)(e.transporter.write({method:a.a.Post,path:Object(n.encode)("1/indexes/%s/synonyms/clear",e.indexName)},i),(t,r)=>De(e)(t.taskID,r))},_=e=>(t,r)=>Object(n.createWaitablePromise)(e.transporter.write({method:a.a.Post,path:Object(n.encode)("1/indexes/%s/deleteByQuery",e.indexName),data:t},r),(t,r)=>De(e)(t.taskID,r)),J=e=>t=>Object(n.createWaitablePromise)(e.transporter.write({method:a.a.Delete,path:Object(n.encode)("1/indexes/%s",e.indexName)},t),(t,r)=>De(e)(t.taskID,r)),X=e=>(t,r)=>Object(n.createWaitablePromise)(Y(e)([t],r).then(e=>({taskID:e.taskIDs[0]})),(t,r)=>De(e)(t.taskID,r)),Y=e=>(t,r)=>{const n=t.map(e=>({objectID:e}));return z(e)(n,Ae.DeleteObject,r)},Z=e=>(t,r)=>{const{forwardToReplicas:o,...i}=r||{},c=Object(s.createMappedRequestOptions)(i);return o&&(c.queryParameters.forwardToReplicas=1),Object(n.createWaitablePromise)(e.transporter.write({method:a.a.Delete,path:Object(n.encode)("1/indexes/%s/rules/%s",e.indexName,t)},c),(t,r)=>De(e)(t.taskID,r))},ee=e=>(t,r)=>{const{forwardToReplicas:o,...i}=r||{},c=Object(s.createMappedRequestOptions)(i);return o&&(c.queryParameters.forwardToReplicas=1),Object(n.createWaitablePromise)(e.transporter.write({method:a.a.Delete,path:Object(n.encode)("1/indexes/%s/synonyms/%s",e.indexName,t)},c),(t,r)=>De(e)(t.taskID,r))},te=e=>t=>ie(e)(t).then(()=>!0).catch(e=>{if(404!==e.status)throw e;return!1}),re=e=>(t,r)=>{const{query:n,paginate:s,...a}=r||{};let o=0;const i=()=>Pe(e)(n||"",{...a,page:o}).then(e=>{for(const[r,n]of Object.entries(e.hits))if(t(n))return{object:n,position:parseInt(r,10),page:o};if(o++,!1===s||o>=e.nbPages)throw{name:"ObjectNotFoundError",message:"Object not found."};return i()});return i()},ne=e=>(t,r)=>e.transporter.read({method:a.a.Get,path:Object(n.encode)("1/indexes/%s/%s",e.indexName,t)},r),se=()=>(e,t)=>{for(const[r,n]of Object.entries(e.hits))if(n.objectID===t)return parseInt(r,10);return-1},ae=e=>(t,r)=>{const{attributesToRetrieve:n,...s}=r||{},o=t.map(t=>({indexName:e.indexName,objectID:t,...n?{attributesToRetrieve:n}:{}}));return e.transporter.read({method:a.a.Post,path:"1/indexes/*/objects",data:{requests:o}},s)},oe=e=>(t,r)=>e.transporter.read({method:a.a.Get,path:Object(n.encode)("1/indexes/%s/rules/%s",e.indexName,t)},r),ie=e=>t=>e.transporter.read({method:a.a.Get,path:Object(n.encode)("1/indexes/%s/settings",e.indexName),data:{getVersion:2}},t),ce=e=>(t,r)=>e.transporter.read({method:a.a.Get,path:Object(n.encode)("1/indexes/%s/synonyms/%s",e.indexName,t)},r),ue=e=>(t,r)=>e.transporter.read({method:a.a.Get,path:Object(n.encode)("1/indexes/%s/task/%s",e.indexName,t.toString())},r),de=e=>(t,r)=>Object(n.createWaitablePromise)(le(e)([t],r).then(e=>({objectID:e.objectIDs[0],taskID:e.taskIDs[0]})),(t,r)=>De(e)(t.taskID,r)),le=e=>(t,r)=>{const{createIfNotExists:n,...s}=r||{},a=n?Ae.PartialUpdateObject:Ae.PartialUpdateObjectNoCreate;return z(e)(t,a,s)},pe=e=>(t,r)=>{const{safe:s,autoGenerateObjectIDIfNotExist:o,batchSize:i,...c}=r||{},u=(t,r,s,o)=>Object(n.createWaitablePromise)(e.transporter.write({method:a.a.Post,path:Object(n.encode)("1/indexes/%s/operation",t),data:{operation:s,destination:r}},o),(t,r)=>De(e)(t.taskID,r)),d=Math.random().toString(36).substring(7),l=`${e.indexName}_tmp_${d}`,p=be({appId:e.appId,transporter:e.transporter,indexName:l});let m=[];const h=u(e.indexName,l,"copy",{...c,scope:["settings","synonyms","rules"]});m.push(h);const f=(s?h.wait(c):h).then(()=>{const e=p(t,{...c,autoGenerateObjectIDIfNotExist:o,batchSize:i});return m.push(e),s?e.wait(c):e}).then(()=>{const t=u(l,e.indexName,"move",c);return m.push(t),s?t.wait(c):t}).then(()=>Promise.all(m)).then(([e,t,r])=>({objectIDs:t.objectIDs,taskIDs:[e.taskID,...t.taskIDs,r.taskID]}));return Object(n.createWaitablePromise)(f,(e,t)=>Promise.all(m.map(e=>e.wait(t))))},me=e=>(t,r)=>ge(e)(t,{...r,clearExistingRules:!0}),he=e=>(t,r)=>je(e)(t,{...r,replaceExistingSynonyms:!0}),fe=e=>(t,r)=>Object(n.createWaitablePromise)(be(e)([t],r).then(e=>({objectID:e.objectIDs[0],taskID:e.taskIDs[0]})),(t,r)=>De(e)(t.taskID,r)),be=e=>(t,r)=>{const{autoGenerateObjectIDIfNotExist:s,...a}=r||{},o=s?Ae.AddObject:Ae.UpdateObject;if(o===Ae.UpdateObject)for(const e of t)if(void 0===e.objectID)return Object(n.createWaitablePromise)(Promise.reject({name:"MissingObjectIDError",message:"All objects must have an unique objectID (like a primary key) to be valid. Algolia is also able to generate objectIDs automatically but *it's not recommended*. To do it, use the `{'autoGenerateObjectIDIfNotExist': true}` option."}));return z(e)(t,o,a)},ye=e=>(t,r)=>ge(e)([t],r),ge=e=>(t,r)=>{const{forwardToReplicas:o,clearExistingRules:i,...c}=r||{},u=Object(s.createMappedRequestOptions)(c);return o&&(u.queryParameters.forwardToReplicas=1),i&&(u.queryParameters.clearExistingRules=1),Object(n.createWaitablePromise)(e.transporter.write({method:a.a.Post,path:Object(n.encode)("1/indexes/%s/rules/batch",e.indexName),data:t},u),(t,r)=>De(e)(t.taskID,r))},Oe=e=>(t,r)=>je(e)([t],r),je=e=>(t,r)=>{const{forwardToReplicas:o,replaceExistingSynonyms:i,...c}=r||{},u=Object(s.createMappedRequestOptions)(c);return o&&(u.queryParameters.forwardToReplicas=1),i&&(u.queryParameters.replaceExistingSynonyms=1),Object(n.createWaitablePromise)(e.transporter.write({method:a.a.Post,path:Object(n.encode)("1/indexes/%s/synonyms/batch",e.indexName),data:t},u),(t,r)=>De(e)(t.taskID,r))},Pe=e=>(t,r)=>e.transporter.read({method:a.a.Post,path:Object(n.encode)("1/indexes/%s/query",e.indexName),data:{query:t},cacheable:!0},r),Ie=e=>(t,r,s)=>e.transporter.read({method:a.a.Post,path:Object(n.encode)("1/indexes/%s/facets/%s/query",e.indexName,t),data:{facetQuery:r},cacheable:!0},s),ve=e=>(t,r)=>e.transporter.read({method:a.a.Post,path:Object(n.encode)("1/indexes/%s/rules/search",e.indexName),data:{query:t}},r),xe=e=>(t,r)=>e.transporter.read({method:a.a.Post,path:Object(n.encode)("1/indexes/%s/synonyms/search",e.indexName),data:{query:t}},r),Se=e=>(t,r)=>{const{forwardToReplicas:o,...i}=r||{},c=Object(s.createMappedRequestOptions)(i);return o&&(c.queryParameters.forwardToReplicas=1),Object(n.createWaitablePromise)(e.transporter.write({method:a.a.Put,path:Object(n.encode)("1/indexes/%s/settings",e.indexName),data:t},c),(t,r)=>De(e)(t.taskID,r))},De=e=>(t,r)=>Object(n.createRetryablePromise)(n=>ue(e)(t,r).then(e=>"published"!==e.status?n():void 0)),we={AddObject:"addObject",Analytics:"analytics",Browser:"browse",DeleteIndex:"deleteIndex",DeleteObject:"deleteObject",EditSettings:"editSettings",ListIndexes:"listIndexes",Logs:"logs",Recommendation:"recommendation",Search:"search",SeeUnretrievableAttributes:"seeUnretrievableAttributes",Settings:"settings",Usage:"usage"},Ae={AddObject:"addObject",UpdateObject:"updateObject",PartialUpdateObject:"partialUpdateObject",PartialUpdateObjectNoCreate:"partialUpdateObjectNoCreate",DeleteObject:"deleteObject"},Re={Settings:"settings",Synonyms:"synonyms",Rules:"rules"},qe={None:"none",StopIfEnoughMatches:"stopIfEnoughMatches"},Te={Synonym:"synonym",OneWaySynonym:"oneWaySynonym",AltCorrection1:"altCorrection1",AltCorrection2:"altCorrection2",Placeholder:"placeholder"}},function(e,t,r){"use strict";function n(){return{debug:(e,t)=>Promise.resolve(),info:(e,t)=>Promise.resolve(),error:(e,t)=>Promise.resolve()}}r.r(t),r.d(t,"LogLevelEnum",(function(){return s})),r.d(t,"createNullLogger",(function(){return n}));const s={Debug:1,Info:2,Error:3}},function(e,t,r){"use strict";r.r(t),r.d(t,"createNodeHttpRequester",(function(){return o}));var n=r(4),s=r(5),a=r(10);function o(){const e={keepAlive:!0},t=new n.Agent(e),r=new s.Agent(e);return{send:e=>new Promise(o=>{const i=Object(a.parse)(e.url),c=null===i.query?i.pathname:`${i.pathname}?${i.query}`,u={agent:"https:"===i.protocol?r:t,hostname:i.hostname,path:c,method:e.method,headers:e.headers,...void 0!==i.port?{port:i.port||""}:{}},d=("https:"===i.protocol?s:n).request(u,e=>{let t="";e.on("data",e=>t+=e),e.on("end",()=>{clearTimeout(p),clearTimeout(m),o({status:e.statusCode||0,content:t,isTimedOut:!1})})}),l=(e,t)=>setTimeout(()=>{d.abort(),o({status:0,content:t,isTimedOut:!0})},1e3*e),p=l(e.connectTimeout,"Connection timeout");let m;d.on("error",e=>{clearTimeout(p),clearTimeout(m),o({status:0,content:e.message,isTimedOut:!1})}),d.once("response",()=>{clearTimeout(p),m=l(e.responseTimeout,"Socket timeout")}),void 0!==e.data&&d.write(e.data),d.end()}),destroy:()=>(t.destroy(),r.destroy(),Promise.resolve())}}},function(e,t,r){"use strict";r.r(t);var n=r(3),s=r(6),a=r(7),o=r.n(a),i=r(8),c=r.n(i);const u=e=>{const t={async send(t){try{const r=await n.httpUtils.request(t.url,t.data||null,{configuration:e,headers:t.headers});return{content:r.body,isTimedOut:!1,status:r.statusCode}}catch(e){return{content:e.response.body,isTimedOut:!1,status:e.response.statusCode}}}};return c()("OFCNCOG2CU","e8e1bd300d860104bb8c58453ffa1eb4",{requester:t})},d=e=>e.scope?`${e.scope}__${e.name}`:`${e.name}`,l={hooks:{afterWorkspaceDependencyAddition:async(e,t,r,a)=>{if("types"===r.scope)return;const{project:i}=e,{configuration:c}=i,l=c.makeResolver(),p={project:i,resolver:l,report:new n.ThrowReport};if(!await(async(e,t)=>{var r;const s=n.structUtils.stringifyIdent(e),a=u(t).initIndex("npm-search");try{return"definitely-typed"===(null===(r=(await a.getObject(s,{attributesToRetrieve:["types"]})).types)||void 0===r?void 0:r.ts)}catch(e){return!1}})(r,c))return;const m=d(r);let h=n.structUtils.parseRange(r.range).selector;if(!o.a.validRange(h)){const e=await l.getCandidates(r,new Map,p);h=n.structUtils.parseRange(e[0].reference).selector}const f=o.a.coerce(h);if(null===f)return;const b=`${s.suggestUtils.Modifier.CARET}${f.major}`,y=n.structUtils.makeDescriptor(n.structUtils.makeIdent("types",m),b),g=n.miscUtils.mapAndFind(i.workspaces,e=>{var t,s;const a=null===(t=e.manifest.dependencies.get(r.identHash))||void 0===t?void 0:t.descriptorHash,o=null===(s=e.manifest.devDependencies.get(r.identHash))||void 0===s?void 0:s.descriptorHash;if(a!==r.descriptorHash&&o!==r.descriptorHash)return n.miscUtils.mapAndFind.skip;const i=[];for(const t of n.Manifest.allDependencies){const r=e.manifest[t].get(y.identHash);void 0!==r&&i.push([t,r])}return 0===i.length?n.miscUtils.mapAndFind.skip:i});if(void 0!==g)for(const[t,r]of g)e.manifest[t].set(r.identHash,r);else{try{if(0===(await l.getCandidates(y,new Map,p)).length)return}catch(e){return}e.manifest[s.suggestUtils.Target.DEVELOPMENT].set(y.identHash,y)}},afterWorkspaceDependencyRemoval:async(e,t,r)=>{if("types"===r.scope)return;const s=d(r),a=n.structUtils.makeIdent("types",s);for(const t of n.Manifest.allDependencies){void 0!==e.manifest[t].get(a.identHash)&&e.manifest[t].delete(a.identHash)}},beforeWorkspacePacking:(e,t)=>{t.publishConfig&&t.publishConfig.typings&&(t.typings=t.publishConfig.typings),t.publishConfig&&t.publishConfig.types&&(t.types=t.publishConfig.types)}}};t.default=l}])}};