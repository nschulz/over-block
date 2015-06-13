(function() {
    'use strict';
    
    if (window.top === window) {
    
        var _instance, OverBlock, TAG = "OverBlockExt";
        
        OverBlock = function() {
            if (_instance == null) {
                _instance = this.create();
            }
            return _instance;
        };
    
        OverBlock.prototype = {
            create: function() {
                this.init();
                return this;
            },
            init: function() {
                this.checkForAds();
                this.setupEventListener();
            },
            checkForAds: function() {
                // var startTime = Date.now();
                var divs = document.querySelectorAll('div');
                // console.log("Checking " + divs.length + " elements for ads");
                for (var i = 0, len = divs.length; i < len; i++) {
                    if (divs[i].style.zIndex > 990) {
                        this.log("Ad Detected and removed. id: " + divs[i].id);
                        divs[i].parentNode.removeChild(divs[i]);
                    }
                }
                // console.log("Scan completed in " + (Date.now() - startTime) + "ms");
            },
            setupEventListener: function() {
                var self = this;
                this._config = { attributes: true, childList: true, characterData: true };
            
                clearTimeout(this._timeout);
                this._observer = new MutationObserver(function(mutations) {
                    clearTimeout(self._timeout);
                    self._timeout = setTimeout(self.checkForAds.bind(self), 1500);
                });
            
                this._observer.observe(document.body, this._config);
                this.log("Over-Block active");
            },
            disable: function() {
                if (this._observer) {
                    this._observer.disconnect();
                }
                this.log("Over-Block Disabled");
            },
            log: function(msg) {
                console.log(TAG + ": " + msg);
            }
        };
    
        window.OverBlock = new OverBlock();

    }
}());