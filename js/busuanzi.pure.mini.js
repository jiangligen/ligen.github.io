var bszCaller, bszTag;
!(function () {
  var readyCallbacks = [];
  var isReady = !1;

  function ready(fn) {
    if (isReady || "interactive" === document.readyState || "complete" === document.readyState) {
      fn.call(document);
    } else {
      readyCallbacks.push(fn);
    }
  }

  function runCallbacks() {
    for (var i = 0; i < readyCallbacks.length; i++) {
      readyCallbacks[i].apply(document);
    }
    readyCallbacks = [];
  }

  function domReady() {
    if (!isReady) {
      isReady = !0;
      runCallbacks.call(window);
      if (document.removeEventListener) {
        document.removeEventListener("DOMContentLoaded", domReady, !1);
      }
    }
  }

  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", domReady, !1);
  } else if (document.attachEvent) {
    document.attachEvent("onreadystatechange", function () {
      if (/loaded|complete/.test(document.readyState)) domReady();
    });
  }

  bszTag = {
    bszs: ["site_pv", "page_pv", "site_uv", "page_uv"],
    texts: function (data) {
      this.bszs.map(function (key) {
        var el = document.getElementById("busuanzi_value_" + key);
        if (el && data && data[key] !== undefined) {
          el.innerHTML = data[key];
        }
      });
    },
    hides: function () {
      this.bszs.map(function (key) {
        var el = document.getElementById("busuanzi_container_" + key);
        if (el) el.style.display = "none";
      });
    },
    shows: function () {
      this.bszs.map(function (key) {
        var el = document.getElementById("busuanzi_container_" + key);
        if (el) el.style.display = "inline";
      });
    }
  };

  bszCaller = {
    fetch: function (url, callback) {
      var targetUrl = "https://cn.vercount.one/api/log?url=" + encodeURIComponent(window.location.href);
      
      fetch(targetUrl)
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          ready(function () {
            try {
              callback(data);
            } catch (err) {
              bszTag.hides();
            }
          });
        })
        .catch(function () {
          bszTag.hides();
        });
    }
  };

  bszCaller.fetch(null, function (data) {
    bszTag.texts(data);
    bszTag.shows();
  });
})();