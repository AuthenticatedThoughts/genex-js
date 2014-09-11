// This is a browserified snippet of https://github.com/fent/ret.js
// (Copyright (C) 2011 by Roly Fentanes)
var ret=function(){var e=function(e){var s,u,o=0,p={type:t.ROOT,stack:[]},c=p,l=p.stack,i=[],h=function(t){a.error(e,"Nothing to repeat at column "+(t-1))},y=a.strToChars(e);for(s=y.length;s>o;)switch(u=y[o++]){case"\\":switch(u=y[o++]){case"b":l.push(n.wordBoundary());break;case"B":l.push(n.nonWordBoundary());break;case"w":l.push(r.words());break;case"W":l.push(r.notWords());break;case"d":l.push(r.ints());break;case"D":l.push(r.notInts());break;case"s":l.push(r.whitespace());break;case"S":l.push(r.notWhitespace());break;default:l.push(/\d/.test(u)?{type:t.REFERENCE,value:parseInt(u,10)}:{type:t.CHAR,value:u.charCodeAt(0)})}break;case"^":l.push(n.begin());break;case"$":l.push(n.end());break;case"[":var v;"^"===y[o]?(v=!0,o++):v=!1;var R=a.tokenizeClass(y.slice(o),e);o+=R[1],l.push({type:t.SET,set:R[0],not:v});break;case".":l.push(r.anyChar());break;case"(":var C={type:t.GROUP,stack:[],remember:!0};u=y[o],"?"===u&&(u=y[o+1],o+=2,"="===u?C.followedBy=!0:"!"===u?C.notFollowedBy=!0:":"!==u&&a.error(e,"Invalid group, character '"+u+"' after '?' at column "+(o-1)),C.remember=!1),l.push(C),i.push(c),c=C,l=C.stack;break;case")":0===i.length&&a.error(e,"Unmatched ) at column "+(o-1)),c=i.pop(),l=c.options?c.options[c.options.length-1]:c.stack;break;case"|":c.options||(c.options=[c.stack],delete c.stack);var f=[];c.options.push(f),l=f;break;case"{":var A,d,E=/^(\d+)(,(\d+)?)?\}/.exec(y.slice(o));null!==E?(A=parseInt(E[1],10),d=E[2]?E[3]?parseInt(E[3],10):1/0:A,o+=E[0].length,l.push({type:t.REPETITION,min:A,max:d,value:l.pop()})):l.push({type:t.CHAR,value:123});break;case"?":0===l.length&&h(o),l.push({type:t.REPETITION,min:0,max:1,value:l.pop()});break;case"+":0===l.length&&h(o),l.push({type:t.REPETITION,min:1,max:1/0,value:l.pop()});break;case"*":0===l.length&&h(o),l.push({type:t.REPETITION,min:0,max:1/0,value:l.pop()});break;default:l.push({type:t.CHAR,value:u.charCodeAt(0)})}return 0!==i.length&&a.error(e,"Unterminated group"),p},t={ROOT:0,GROUP:1,POSITION:2,SET:3,RANGE:4,REPETITION:5,REFERENCE:6,CHAR:7},r=function(){var e=function(){return[{type:t.RANGE,from:48,to:57}]},r=function(){return[{type:t.CHAR,value:95},{type:t.RANGE,from:97,to:122},{type:t.RANGE,from:65,to:90}].concat(e())},a=function(){return[{type:t.CHAR,value:12},{type:t.CHAR,value:10},{type:t.CHAR,value:13},{type:t.CHAR,value:9},{type:t.CHAR,value:11},{type:t.CHAR,value:160},{type:t.CHAR,value:5760},{type:t.CHAR,value:6158},{type:t.CHAR,value:8192},{type:t.CHAR,value:8193},{type:t.CHAR,value:8194},{type:t.CHAR,value:8195},{type:t.CHAR,value:8196},{type:t.CHAR,value:8197},{type:t.CHAR,value:8198},{type:t.CHAR,value:8199},{type:t.CHAR,value:8200},{type:t.CHAR,value:8201},{type:t.CHAR,value:8202},{type:t.CHAR,value:8232},{type:t.CHAR,value:8233},{type:t.CHAR,value:8239},{type:t.CHAR,value:8287},{type:t.CHAR,value:12288}]};return{words:function(){return{type:t.SET,set:r(),not:!1}},notWords:function(){return{type:t.SET,set:r(),not:!0}},ints:function(){return{type:t.SET,set:e(),not:!1}},notInts:function(){return{type:t.SET,set:e(),not:!0}},whitespace:function(){return{type:t.SET,set:a(),not:!1}},notWhitespace:function(){return{type:t.SET,set:a(),not:!0}},anyChar:function(){return{type:t.SET,set:[{type:t.CHAR,value:10}],not:!0}}}}(),a=function(){function e(e,n){for(var s,u,o=[],p=/\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?(.)/g;null!=(s=p.exec(e));)if(s[1])o.push(r.words());else if(s[2])o.push(r.ints());else if(s[3])o.push(r.whitespace());else if(s[4])o.push(r.notWords());else if(s[5])o.push(r.notInts());else if(s[6])o.push(r.notWhitespace());else if(s[7])o.push({type:t.RANGE,from:(s[8]||s[9]).charCodeAt(0),to:s[10].charCodeAt(0)});else{if(!(u=s[12]))return[o,p.lastIndex];o.push({type:t.CHAR,value:u.charCodeAt(0)})}a(n,"Unterminated character class")}function a(e,t){throw new SyntaxError("Invalid regular expression: /"+e+"/: "+t)}var n="@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?",s={0:0,t:9,n:10,v:11,f:12,r:13};return exports_strToChars=function(e){var t=/(\[\\b\])|\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z\[\\\]\^?])|([0tnvfr]))/g;return e=e.replace(t,function(e,t,r,a,u,o,p){var c=t?8:r?parseInt(r,16):a?parseInt(a,16):u?parseInt(u,8):o?n.indexOf(o):p?s[p]:void 0,l=String.fromCharCode(c);return/[\[\]{}\^$.|?*+()]/.test(l)&&(l="\\"+l),l})},{error:a,tokenizeClass:e,strToChars:exports_strToChars}}(),n={wordBoundary:function(){return{type:t.POSITION,value:"b"}},nonWordBoundary:function(){return{type:t.POSITION,value:"B"}},begin:function(){return{type:t.POSITION,value:"^"}},end:function(){return{type:t.POSITION,value:"$"}}};return e.types=t,e.sets=r,e.util=a,e.positions=n,e}();

// replacement for _
function _contains(n,r){for(var t=0,e=n.length;e>t;t++)if(n[t]===r)return!0;return!1}
function _intersection(n){if(null==n)return[];for(var r=[],t=arguments.length,e=0,i=n.length;i>e;e++){var f=n[e];if(!_contains(r,f)){for(var o=1;t>o&&_contains(arguments[o],f);o++);o===t&&r.push(f)}}return r}
function _difference(n,r){var t=[];return n.forEach(function(n){_contains(r,n)||(t[t.length]=n)},this),t}

"use strict";

var genex = function (regex, charset, quantifier) {
  if (Object.prototype.toString.call(regex) == '[object RegExp]') {
    regex = regex.source;
  } else if (typeof regex != 'string') {
    regex = String(regex);
  }

  try {
    var tokens = ret(regex);
  } catch (exception) {
    return false;
  }

  var group = [];
  var genex = {
    charset: ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
    count: function () {
      function count(input) {
        var result = 0;

        if ((input.type === ret.types.ROOT) || (input.type === ret.types.GROUP)) {
          if (input.hasOwnProperty('stack')) {
            input.options = [input.stack];
          }

          input.options.forEach(function (stack) {
            var value = 1;

            stack.forEach(function (node) {
              value *= Math.max(1, count(node));
            });

            result += value;
          });
        } else if (input.type === ret.types.SET) {
          var set = [];

          input.set.forEach(function (stack) {
            if (stack.type === ret.types.SET) {
              var data = [];

              stack.set.forEach(function (node) {
                if (node.type === ret.types.RANGE) {
                  for (var i = node.from; i <= node.to; ++i) {
                    data.push(i);
                  }
                } else if (node.type === ret.types.CHAR) {
                  data.push(node.value);
                }
              });

              set = set.concat((stack.not) ? _difference(genex.charset, data) : _intersection(genex.charset, data));
            } else if (stack.type === ret.types.RANGE) {
              for (var i = stack.from; i <= stack.to; ++i) {
                set.push(i);
              }
            } else if (stack.type === ret.types.CHAR) {
              set.push(stack.value);
            }
          });

          result = ((input.not) ? _difference(genex.charset, set) : _intersection(genex.charset, set)).length;
        } else if (input.type === ret.types.REPETITION) {
          if (input.max === Infinity) {
            result = input.max;
          } else if ((input.value = count(input.value)) > 1) {
            if (input.min === input.max) {
              result = Math.pow(input.value, input.min);
            } else {
              result = (Math.pow(input.value, input.max + 1) - 1) / (input.value - 1);

              if (input.min > 0) {
                result -= (Math.pow(input.value, input.min + 0) - 1) / (input.value - 1);

                if (isNaN(result)) {
                  result = Infinity;
                }
              }
            }
          } else {
            result = input.max - input.min + 1;
          }
        } else if ((input.type === ret.types.REFERENCE) || (input.type === ret.types.CHAR)) {
          result = 1;
        }

        return Math.max(1, result);
      }

      if (Array.isArray(genex.charset) !== true) {
        genex.charset = genex.charset.split('').map(function (value) {
          return value.charCodeAt(0);
        });
      }

      return count(tokens);
    },
    generate: function (callback) {
      function generate(input) {
        if ((input.type === ret.types.ROOT) || (input.type === ret.types.GROUP)) {
          if (input.hasOwnProperty('stack')) {
            input.options = [input.stack];
          }

          input.options = input.options.map(function (stack) {
            if (stack.length === 0) {
              stack = [null];
            }

            return new Stack(stack.map(function (node) {
              return generate(node);
            }));
          });

          if (input.options.length > 1) {
            input.options = [new Option(input.options)];
          }

          input.options = input.options.shift();

          if ((input.type === ret.types.GROUP) && (input.remember)) {
            group.push(input.options);
          }

          return input.options;
        } else if (input.type === ret.types.SET) {
          var set = [];

          input.set.forEach(function (stack) {
            if (stack.type === ret.types.SET) {
              var data = [];

              stack.set.forEach(function (node) {
                if (node.type === ret.types.RANGE) {
                  for (var i = node.from; i <= node.to; ++i) {
                    data.push(i);
                  }
                } else if (node.type === ret.types.CHAR) {
                  data.push(node.value);
                }
              });

              set = set.concat((stack.not) ? _difference(genex.charset, data) : _intersection(genex.charset, data));
            } else if (stack.type === ret.types.RANGE) {
              for (var i = stack.from; i <= stack.to; ++i) {
                set.push(i);
              }
            } else if (stack.type === ret.types.CHAR) {
              set.push(stack.value);
            }
          });

          set = ((input.not) ? _difference(genex.charset, set) : _intersection(genex.charset, set)).map(function (value) {
            return String.fromCharCode(value);
          });

          if (set.length > 0) {
            return new Set(set);
          }
        } else if (input.type === ret.types.REPETITION) {
          return new Repetition(generate(input.value), input.min, input.max);
        } else if ((input.type === ret.types.REFERENCE) && (group.hasOwnProperty(input.value - 1))) {
          return new Reference(group[input.value - 1]);
        } else if (input.type === ret.types.CHAR) {
          return new Set([String.fromCharCode(input.value)]);
        }

        return new Set(['']);
      }

      if (Array.isArray(genex.charset) !== true) {
        genex.charset = genex.charset.split('').map(function (value) {
          return value.charCodeAt(0);
        });
      }

      var iterator = generate(tokens);

      if (typeof callback === 'function') {
        iterator.forEach(function (value) {
          callback(iterator.current());
        });
      } else {
        for (iterator.rewind(); iterator.valid(); iterator.next()) {
          console.log(iterator.current());
        }
      }

      return true;
    },
  };

  return genex;
};

var Set = function (data) {
  this.i = 0;
  this.data = data;

  this.rewind = function () {
    this.i = 0;
  };

  this.valid = function () {
    return this.i < this.data.length;
  };

  this.current = function () {
    return this.data[this.i];
  };

  this.next = function () {
    ++this.i;
  };

  this.clone = function () {
    return new Set(this.data);
  };
};

var Stack = function (data) {
  if (data.length === 0) {
    data = new Set(['']);
  }

  this.data = data;

  this.rewind = function () {
    for (var i in this.data) {
      this.data[i].rewind();
    }
  };

  this.valid = function () {
    return this.data[0].valid();
  };

  this.current = function () {
    var result = '';

    for (var i in this.data) {
      result += this.data[i].current();
    }

    return result;
  };

  this.next = function () {
    if (this.valid()) {
      var i = this.data.length;

      while (this.data[--i].next(), i > 0 && !this.data[i].valid()) {
        this.data[i].rewind();
      }
    }
  };

  this.clone = function () {
    return new Stack(this.data.map(function (iterator) {
      return iterator.clone();
    }));
  };

  this.forEach = function (callback) {
    for (this.rewind(); this.valid(); this.next()) {
      callback(this.current());
    }
  };
};

var Option = function (data) {
  this.i = 0;
  this.data = data;

  this.rewind = function () {
    this.i = 0;

    for (var i in this.data) {
      this.data[i].rewind();
    }
  };

  this.valid = function () {
    return this.i < this.data.length;
  };

  this.current = function () {
    return this.data[this.i].current();
  };

  this.next = function () {
    if (this.valid()) {
      this.data[this.i].next();

      while (this.valid() && !this.data[this.i].valid()) {
        ++this.i;
      }
    }
  };

  this.clone = function () {
    return new Option(this.data.map(function (iterator) {
      return iterator.clone();
    }));
  };

  this.forEach = function (callback) {
    for (this.rewind(); this.valid(); this.next()) {
      callback(this.current());
    }
  };
};

var Reference = function (data) {
  this.i = 0;
  this.data = data;

  this.rewind = function () {
    this.i = 0;
  };

  this.valid = function () {
    return this.i < this.data.length;
  };

  this.current = function () {
    return this.data.current();
  };

  this.next = function () {
    ++this.i;
  };

  this.clone = function () {
    return new Reference(this.data);
  };
};

var Repetition = function (data, min, max) {
  var stack = [];

  for (var i = 0; i < min; ++i) {
    stack.push(data.clone());
  }

  if (max > min) {
    stack.push(new Option([new Set(['']), new Repetition(data, 1, max - min)]));
  }

  return new Stack(stack);
};

if (typeof module != 'undefined' && module.exports)
  module.exports = genex;
else
  window.genex = genex;

