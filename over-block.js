(function() {
    'use strict';
    
    
    var _instance,
        OverBlock = function() {this.init()};
    
    OverBlock.prototype = {
        create: function() {
            if (_instance == null) {
                _instance = new OverBlock();
            }
            return _instance;
        },
        init: function() {
            this.checkForAds();
            this.setupEventListener();
            console.log("Over-Block init");
        },
        checkForAds: function() {
            var startTime = Date.now();
            var divs = document.querySelectorAll('div');
            console.log("Checking " + divs.length + " elements for ads");
            for (var i = 0, len = divs.length; i < len; i++) {
                if (divs[i].style.zIndex > 990) {
                    console.log("Ad Detected: ");
                    console.log(divs[i]);
                    divs[i].parentNode.removeChild(divs[i]);
                    console.log("Ad removed");
                }
            }
            console.log("Scan completed in " + (Date.now() - startTime) + "ms");
        },
        setupEventListener: function() {
            var self = this;
            this._config = { attributes: true, childList: true, characterData: true };
            
            clearTimeout(this._timeout);
            this._observer = new MutationObserver(function(mutations) {
                clearTimeout(self._timeout);
                self._timeout = setTimeout(self.checkForAds.bind(self), 1000);
                // mutations.forEach(function(mutation) {
                //     console.log(mutation);
                // });
            });
            
            this._observer.observe(document.body, this._config);
            console.log("Over-Block active");
        },
        disable: function() {
            if (this._observer) {
                this._observer.disconnect();
            }
        }
    };
    
    OverBlock.prototype.create();
}())