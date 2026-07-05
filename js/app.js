/* ===================================================
   app.js — 应用主逻辑
   负责：Tab切换、列表渲染、搜索、导航、状态管理
   =================================================== */

(function () {
  'use strict';

  var currentTab = 'criteria'; // 'criteria' | 'scores'
  var currentTool = null;      // 当前正在使用的工具数据

  // DOM 缓存
  var appMain;
  var appTitle;
  var btnBack;
  var btnReset;

  /**
   * 应用初始化
   */
  function init() {
    appMain = document.getElementById('appMain');
    appTitle = document.getElementById('appTitle');
    btnBack = document.getElementById('btnBack');
    btnReset = document.getElementById('btnReset');

    // 渲染初始页面
    renderTabBar();
    renderSearchBar();
    renderToolList();

    // 绑定导航
    btnBack.addEventListener('click', goBack);
    btnReset.addEventListener('click', resetCurrentTool);
  }

  /**
   * 渲染 Tab 切换栏
   */
  function renderTabBar() {
    var tabBar = document.createElement('div');
    tabBar.className = 'tab-bar';
    tabBar.id = 'tabBar';
    tabBar.innerHTML =
      '<button class="tab-btn active" data-tab="criteria">诊断分类标准</button>' +
      '<button class="tab-btn" data-tab="scores">病情活动度评分</button>';

    tabBar.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tab = this.getAttribute('data-tab');
        if (tab !== currentTab) {
          currentTab = tab;
          tabBar.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
          this.classList.add('active');
          currentTool = null;
          renderToolList();
          showListView();
        }
      });
    });

    appMain.appendChild(tabBar);
  }

  /**
   * 渲染搜索框
   */
  function renderSearchBar() {
    var wrapper = document.createElement('div');
    wrapper.className = 'search-wrapper';
    wrapper.id = 'searchWrapper';
    wrapper.style.position = 'relative';
    wrapper.innerHTML =
      '<svg class="search-icon" viewBox="0 0 20 20" fill="currentColor" width="18" height="18" style="position:absolute;left:28px;top:50%;transform:translateY(-50%);color:var(--color-text-muted);">' +
        '<path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>' +
      '</svg>' +
      '<input type="text" class="search-input" id="searchInput" placeholder="搜索评分工具..." autocomplete="off">';

    appMain.appendChild(wrapper);

    var searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debounce(function () {
      renderToolList(this.value);
    }, 200));
  }

  /**
   * 渲染工具列表
   */
  function renderToolList(query) {
    // 移除旧列表
    var oldList = document.getElementById('toolList');
    if (oldList) oldList.remove();

    var data = currentTab === 'criteria' ? window.CriteriaData : window.ScoresData;
    var q = (query || '').trim().toLowerCase();

    var filtered = data.filter(function (tool) {
      if (!q) return true;
      return tool.name.toLowerCase().indexOf(q) >= 0 ||
             (tool.description && tool.description.toLowerCase().indexOf(q) >= 0);
    });

    var listEl = document.createElement('div');
    listEl.className = 'tool-list';
    listEl.id = 'toolList';

    if (filtered.length === 0) {
      listEl.innerHTML = '<div class="no-results">未找到匹配的工具</div>';
    } else {
      filtered.forEach(function (tool) {
        var card = document.createElement('div');
        card.className = 'tool-card';
        card.innerHTML =
          '<div class="tool-card-body">' +
            '<div class="tool-card-title">' + escapeHtml(tool.name) + '</div>' +
            (tool.year ? '<div class="tool-card-subtitle">' + escapeHtml(tool.year) + '</div>' : '') +
          '</div>' +
          '<svg class="tool-card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path stroke-linecap="round" d="M9 5l7 7-7 7"/></svg>';

        card.addEventListener('click', function () {
          openTool(tool);
        });
        listEl.appendChild(card);
      });
    }

    appMain.appendChild(listEl);
  }

  /**
   * 打开一个评分工具
   */
  function openTool(tool) {
    currentTool = tool;

    // 隐藏列表和搜索
    var tabBar = document.getElementById('tabBar');
    var searchWrapper = document.getElementById('searchWrapper');
    var toolList = document.getElementById('toolList');
    if (tabBar) tabBar.style.display = 'none';
    if (searchWrapper) searchWrapper.style.display = 'none';
    if (toolList) toolList.style.display = 'none';

    // 更新标题
    appTitle.textContent = tool.name;
    appTitle.style.fontSize = '0.9375rem';

    // 显示返回和重置按钮
    btnBack.style.visibility = 'visible';
    btnReset.style.visibility = 'visible';

    // 渲染工具
    RheumaEngine.renderTool(tool);

    // 滚动到顶部
    window.scrollTo(0, 0);
  }

  /**
   * 返回列表视图
   */
  function goBack() {
    currentTool = null;

    // 隐藏结果条
    RheumaEngine.hideResult();

    // 清空主内容并重新渲染列表
    appMain.innerHTML = '';
    renderTabBar();
    renderSearchBar();
    renderToolList();

    // 恢复标题
    appTitle.textContent = '风湿科评分工具';
    appTitle.style.fontSize = '';

    // 隐藏导航按钮
    btnBack.style.visibility = 'hidden';
    btnReset.style.visibility = 'hidden';

    // 滚动到顶部
    window.scrollTo(0, 0);
  }

  /**
   * 显示列表视图
   */
  function showListView() {
    // 移除详情视图
    var detailView = document.getElementById('detailView');
    if (detailView) detailView.remove();

    // 恢复
    var tabBar = document.getElementById('tabBar');
    var searchWrapper = document.getElementById('searchWrapper');
    if (tabBar) tabBar.style.display = '';
    if (searchWrapper) searchWrapper.style.display = '';

    // 清空搜索
    var searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';

    appTitle.textContent = '风湿科评分工具';
    appTitle.style.fontSize = '';
    btnBack.style.visibility = 'hidden';
    btnReset.style.visibility = 'hidden';
    RheumaEngine.hideResult();
  }

  /**
   * 重置当前工具
   */
  function resetCurrentTool() {
    if (currentTool) {
      RheumaEngine.resetTool(currentTool);
    }
  }

  /**
   * 防抖
   */
  function debounce(fn, delay) {
    var timer;
    return function () {
      var ctx = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(ctx, args); }, delay);
    };
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // 启动
  document.addEventListener('DOMContentLoaded', init);
})();
