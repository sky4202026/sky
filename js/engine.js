/* ===================================================
   engine.js — 通用评分引擎
   根据数据定义动态渲染表单、实时计算分数、展示结果
   =================================================== */

window.RheumaEngine = (function () {
  'use strict';

  /**
   * 渲染一个评分工具到主容器
   * @param {Object} tool — 工具数据定义
   */
  function renderTool(tool) {
    var main = document.getElementById('appMain');
    if (!main) return;

    var html = '<div class="detail-view active" id="detailView">';

    // 描述
    if (tool.description) {
      html += '<div class="detail-description">' + escapeHtml(tool.description) + '</div>';
    }

    // 如果没有 sections 但有 inputs（纯数值计算型评分）
    if (tool.inputs && !tool.sections) {
      html += renderNumberInputs(tool);
    }

    // 如果有 sections（诊断标准 / 混合型评分）
    if (tool.sections) {
      tool.sections.forEach(function (section, idx) {
        html += renderSection(section, idx);
      });
    }

    html += '</div>';
    main.innerHTML = html;

    // 绑定事件
    bindEvents(tool);
  }

  /**
   * 渲染一个区间
   */
  function renderSection(section, idx) {
    var html = '<div class="form-section">';
    html += '<div class="form-section-title">';
    if (section.label) {
      html += '<span class="form-section-label">' + escapeHtml(section.label) + '</span>';
    }
    html += escapeHtml(section.title) + '</div>';

    if (section.type === 'single-select') {
      html += '<div class="option-list">';
      section.items.forEach(function (item) {
        html += '<div class="option-item" data-section="' + idx + '" data-value="' + item.score + '" data-type="single-select">';
        html += '<div class="option-radio"></div>';
        html += '<span class="option-label">' + escapeHtml(item.text) + '</span>';
        html += '<span class="score-badge">' + item.score + '分</span>';
        html += '</div>';
      });
      html += '</div>';
    } else if (section.type === 'checklist') {
      html += '<div class="option-list">';
      section.items.forEach(function (item) {
        html += '<div class="option-item" data-section="' + idx + '" data-value="' + item.score + '" data-type="checklist">';
        html += '<div class="option-checkbox"></div>';
        html += '<span class="option-label">' + escapeHtml(item.text) + '</span>';
        html += '<span class="score-badge">' + item.score + '分</span>';
        html += '</div>';
      });
      html += '</div>';
    } else if (section.type === 'bool') {
      section.items.forEach(function (item) {
        html += '<div class="bool-row">';
        html += '<span class="bool-label">' + escapeHtml(item.text) + '</span>';
        html += '<div class="toggle-switch" data-section="' + idx + '" data-value="' + item.score + '" data-type="bool"></div>';
        html += '</div>';
      });
    }

    // 显示小计（对于 checkboxes）
    if (section.type === 'checklist' || section.type === 'bool') {
      html += '<div class="sub-score">本项得分：<span class="sub-score-value" id="subScore' + idx + '">0</span></div>';
    }
    if (section.type === 'single-select') {
      html += '<div class="sub-score">已选得分：<span class="sub-score-value" id="subScore' + idx + '">-</span></div>';
    }

    html += '</div>';
    return html;
  }

  /**
   * 渲染数值输入型评分
   */
  function renderNumberInputs(tool) {
    var html = '';
    tool.inputs.forEach(function (input) {
      html += '<div class="number-input-row">';
      html += '<span class="number-input-label">' + escapeHtml(input.label) + '</span>';
      html += '<input type="number" class="number-input-field" id="num_' + input.id + '" min="' + (input.min || 0) + '" max="' + (input.max || 999) + '" step="' + (input.step || 1) + '" value="' + (input.default || '') + '" placeholder="' + (input.placeholder || '') + '">';
      if (input.unit) {
        html += '<span class="number-input-unit">' + escapeHtml(input.unit) + '</span>';
      }
      html += '</div>';
    });

    // 布尔型输入混排
    return html;
  }

  /**
   * 绑定事件监听
   */
  function bindEvents(tool) {
    var main = document.getElementById('appMain');

    // 单项选择
    main.querySelectorAll('.option-item[data-type="single-select"]').forEach(function (el) {
      el.addEventListener('click', function () {
        var sectionIdx = parseInt(this.getAttribute('data-section'));
        // 清除同 section 的其他选择
        main.querySelectorAll('.option-item[data-section="' + sectionIdx + '"][data-type="single-select"]').forEach(function (sib) {
          sib.classList.remove('selected');
        });
        // 选中当前
        this.classList.add('selected');
        recalculate(tool);
      });
    });

    // 多选清单
    main.querySelectorAll('.option-item[data-type="checklist"]').forEach(function (el) {
      el.addEventListener('click', function () {
        this.classList.toggle('selected');
        recalculate(tool);
      });
    });

    // 布尔开关
    main.querySelectorAll('.toggle-switch[data-type="bool"]').forEach(function (el) {
      el.addEventListener('click', function () {
        this.classList.toggle('on');
        recalculate(tool);
      });
    });

    // 数值输入
    main.querySelectorAll('.number-input-field').forEach(function (el) {
      el.addEventListener('input', function () {
        recalculate(tool);
      });
    });
  }

  /**
   * 重新计算总分并显示结果
   */
  function recalculate(tool) {
    var main = document.getElementById('appMain');
    var total = 0;
    var sectionScores = [];

    // 计算 sections 分数
    if (tool.sections) {
      tool.sections.forEach(function (section, idx) {
        var sectionTotal = 0;

        if (section.type === 'single-select') {
          var selected = main.querySelector('.option-item[data-section="' + idx + '"][data-type="single-select"].selected');
          if (selected) {
            sectionTotal = parseFloat(selected.getAttribute('data-value'));
          }
        } else if (section.type === 'checklist') {
          main.querySelectorAll('.option-item[data-section="' + idx + '"][data-type="checklist"].selected').forEach(function (el) {
            sectionTotal += parseFloat(el.getAttribute('data-value'));
          });
        } else if (section.type === 'bool') {
          var toggle = main.querySelector('.toggle-switch[data-section="' + idx + '"][data-type="bool"]');
          if (toggle && toggle.classList.contains('on')) {
            sectionTotal += parseFloat(toggle.getAttribute('data-value'));
          }
        }

        total += sectionTotal;
        sectionScores.push(sectionTotal);

        // 更新小计显示
        var subEl = document.getElementById('subScore' + idx);
        if (subEl) {
          if (section.type === 'single-select' && sectionTotal === 0) {
            subEl.textContent = '-';
          } else {
            subEl.textContent = sectionTotal;
          }
        }
      });
    }

    // 计算数值输入
    var numericValues = {};
    if (tool.inputs) {
      tool.inputs.forEach(function (input) {
        var inputEl = document.getElementById('num_' + input.id);
        var val = inputEl ? parseFloat(inputEl.value) : NaN;
        if (isNaN(val)) val = 0;
        numericValues[input.id] = val;
      });

      if (tool.calculate && typeof tool.calculate === 'function') {
        total = tool.calculate(numericValues);
      }
    }

    showResult(tool, total);
  }

  /**
   * 显示结果
   */
  function showResult(tool, total) {
    var resultEl = document.getElementById('resultBar');

    if (!resultEl) {
      // 创建结果条
      resultEl = document.createElement('div');
      resultEl.id = 'resultBar';
      resultEl.className = 'result-bar';
      document.body.appendChild(resultEl);
    }

    var html = '<div class="result-bar-inner">';

    // 分数显示
    html += '<div class="result-score">总分：<strong>' + (typeof total === 'number' ? total : total) + '</strong></div>';

    // 解读
    if (tool.interpretation) {
      // 有解释区间（活动度评分）
      var interp = null;
      for (var i = 0; i < tool.interpretation.length; i++) {
        var r = tool.interpretation[i];
        if (total >= r.min && total <= r.max) {
          interp = r;
          break;
        }
      }
      if (interp) {
        html += '<div class="result-interpretation ' + (interp.cls || '') + '">' + escapeHtml(interp.text) + '</div>';
      }
    } else if (tool.threshold !== undefined) {
      // 有阈值（诊断分类标准）
      if (total >= tool.threshold) {
        html += '<div class="result-interpretation result-positive">' + escapeHtml(tool.resultFormat.positive) + '</div>';
      } else {
        html += '<div class="result-interpretation result-negative">' + escapeHtml(tool.resultFormat.negative) + '</div>';
      }
    }

    html += '</div>';
    resultEl.innerHTML = html;
    resultEl.style.display = 'block';
  }

  /**
   * 隐藏结果条
   */
  function hideResult() {
    var resultEl = document.getElementById('resultBar');
    if (resultEl) {
      resultEl.style.display = 'none';
    }
  }

  /**
   * 重置工具表单
   */
  function resetTool(tool) {
    var main = document.getElementById('appMain');
    main.querySelectorAll('.option-item.selected').forEach(function (el) {
      el.classList.remove('selected');
    });
    main.querySelectorAll('.toggle-switch.on').forEach(function (el) {
      el.classList.remove('on');
    });
    main.querySelectorAll('.number-input-field').forEach(function (el) {
      el.value = el.getAttribute('data-default') || '';
    });
    main.querySelectorAll('.sub-score-value').forEach(function (el) {
      el.textContent = '0';
    });
    hideResult();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Public API
  return {
    renderTool: renderTool,
    recalculate: recalculate,
    showResult: showResult,
    hideResult: hideResult,
    resetTool: resetTool
  };
})();
