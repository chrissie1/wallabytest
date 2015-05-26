String.prototype.trunc = String.prototype.trunc ||
        function (n) {
            return this.length > n ? this.substr(0, n) + '&hellip;' : this;
        };
