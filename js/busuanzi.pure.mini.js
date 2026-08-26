!(function () {
  // 你的专属私有化计数 API
  var API_HOST = "https://pv.ligen.net/api/log";

  function setEl(id, val) {
    var el = document.getElementById(id);
    if (el && val !== undefined) {
      el.innerText = val;
      var container = document.getElementById(id.replace("value", "container"));
      if (container) container.style.display = "inline";
    }
  }

  // 提取标准文章 URL（去除锚点和查询参数，避免计数分散）
  var currentUrl = window.location.origin + window.location.pathname;

  fetch(API_HOST + "?url=" + encodeURIComponent(currentUrl))
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (data) {
        setEl("busuanzi_value_page_pv", data.page_pv);
        setEl("busuanzi_value_site_pv", data.site_pv);
        // 若主题有 site_uv / page_uv 元素，也赋上数值避免空白
        setEl("busuanzi_value_site_uv", data.site_pv);
        setEl("busuanzi_value_page_uv", data.page_pv);
      }
    })
    .catch(function (err) {
      console.warn("PV Counter offline:", err);
    });
})();