/* ===================================================
   data-scores.js — 病情活动度评分数据定义
   每个评分包含：id、name、description、
   输入项（sections / inputs）、计算公式、解读区间
   =================================================== */

window.ScoresData = [
  // ==================== 1. DAS28 评分 ====================
  {
    id: 'das28',
    name: 'DAS28 评分（ESR）',
    year: '',
    category: 'score',
    description: '疾病活动度评分（Disease Activity Score 28 joints），用于评估类风湿关节炎的疾病活动度。计算基于28个关节的压痛和肿胀计数、ESR及患者总体评估。',
    inputs: [
      { id: 'tjc', label: '压痛关节数 TJC28（0-28）', min: 0, max: 28, step: 1, default: '', placeholder: '0', unit: '个' },
      { id: 'sjc', label: '肿胀关节数 SJC28（0-28）', min: 0, max: 28, step: 1, default: '', placeholder: '0', unit: '个' },
      { id: 'esr', label: '血沉 ESR', min: 0, max: 200, step: 1, default: '', placeholder: '0', unit: 'mm/h' },
      { id: 'gh', label: '患者总体评估（VAS 0-100mm）', min: 0, max: 100, step: 1, default: '', placeholder: '0', unit: 'mm' }
    ],
    calculate: function (vals) {
      var tjc = vals.tjc || 0;
      var sjc = vals.sjc || 0;
      var esr = vals.esr || 1; // 避免 ln(0)
      var gh = vals.gh || 0;
      var das28 = 0.56 * Math.sqrt(tjc) + 0.28 * Math.sqrt(sjc) + 0.70 * Math.log(esr) + 0.014 * gh;
      return Math.round(das28 * 100) / 100;
    },
    interpretation: [
      { min: 0, max: 2.59, text: '缓解（Remission）', cls: 'result-remission' },
      { min: 2.6, max: 3.19, text: '低度活动（Low Disease Activity）', cls: 'result-low' },
      { min: 3.2, max: 5.09, text: '中度活动（Moderate Disease Activity）', cls: 'result-moderate' },
      { min: 5.1, max: 999, text: '高度活动（High Disease Activity）', cls: 'result-high' }
    ]
  },

  // ==================== 2. SLEDAI-2K 评分 ====================
  {
    id: 'sledai-2k',
    name: 'SLEDAI-2K 评分',
    year: 'SLEDAI-2K',
    category: 'score',
    description: '系统性红斑狼疮疾病活动度指数（SLE Disease Activity Index 2000）。评估近10天内的表现（癫痫/精神症状/器质性脑综合征/视觉/颅神经/狼疮头痛/CVA/血管炎除外）。共24个描述项，每项按权重计分。',
    sections: [
      {
        title: '8分项（各8分，最高权重）',
        label: '8分',
        type: 'checklist',
        items: [
          { text: '癫痫发作（近期发作，排除代谢/感染/药物因素）', score: 8 },
          { text: '精神病（严重认知障碍、幻觉、妄想等，排除尿毒症/药物因素）', score: 8 },
          { text: '器质性脑病综合征（意识障碍、注意力不集中、定向力减退等，排除代谢/感染/药物因素）', score: 8 },
          { text: '视觉障碍（视网膜病变、棉絮斑、视网膜出血等，排除高血压/感染/药物因素）', score: 8 },
          { text: '颅神经病变（新发感觉/运动神经病，含视神经炎）', score: 8 },
          { text: '狼疮性头痛（严重、持续、麻醉性镇痛药无效，排除其他原因）', score: 8 },
          { text: '脑血管意外（CVA，新发卒中，排除动脉粥样硬化）', score: 8 },
          { text: '血管炎（溃疡、坏疽、指端结节、甲周梗死等）', score: 8 }
        ]
      },
      {
        title: '4分项（各4分）',
        label: '4分',
        type: 'checklist',
        items: [
          { text: '关节炎（≥ 2个关节疼痛 + 炎性体征：肿胀/积液）', score: 4 },
          { text: '肌炎（近端肌痛/无力 + CK/醛缩酶升高 + EMG改变 + 活检阳性）', score: 4 },
          { text: '管型尿（颗粒管型或红细胞管型）', score: 4 },
          { text: '血尿（> 5 RBC/HPF，排除结石、感染等）', score: 4 },
          { text: '蛋白尿（> 0.5 g/24h，新发或近期增加 > 0.5 g/24h）', score: 4 },
          { text: '脓尿（> 5 WBC/HPF，排除感染）', score: 4 }
        ]
      },
      {
        title: '2分项（各2分）',
        label: '2分',
        type: 'checklist',
        items: [
          { text: '新发皮疹（新发或复发的炎性皮疹：蝶形红斑、盘状红斑等）', score: 2 },
          { text: '脱发（新发或复发异常斑片状/弥漫性脱发）', score: 2 },
          { text: '粘膜溃疡（新发或复发口腔或鼻咽部溃疡）', score: 2 },
          { text: '胸膜炎（胸膜性胸痛 + 摩擦音/积液 + 影像学证据）', score: 2 },
          { text: '心包炎（心包性胸痛 + 摩擦音/心电图改变/积液）', score: 2 },
          { text: '低补体（CH50/C3/C4降低，低于正常下限）', score: 2 },
          { text: '抗dsDNA升高（高于正常范围）', score: 2 }
        ]
      },
      {
        title: '1分项（各1分）',
        label: '1分',
        type: 'checklist',
        items: [
          { text: '发热（> 38°C，排除感染因素）', score: 1 },
          { text: '血小板减少（< 100×10⁹/L，排除药物因素）', score: 1 },
          { text: '白细胞减少（< 3.0×10⁹/L，排除药物因素）', score: 1 }
        ]
      }
    ],
    interpretation: [
      { min: 0, max: 0, text: '无活动（Remission）', cls: 'result-remission' },
      { min: 1, max: 5, text: '轻度活动（Mild Activity）', cls: 'result-low' },
      { min: 6, max: 10, text: '中度活动（Moderate Activity）', cls: 'result-moderate' },
      { min: 11, max: 19, text: '高度活动（High Activity）', cls: 'result-high' },
      { min: 20, max: 999, text: '极高度活动（Very High Activity）', cls: 'result-high' }
    ]
  },

  // ==================== 3. FRAX 骨折风险评估 ====================
  {
    id: 'frax',
    name: 'FRAX® 骨折风险评估工具',
    year: 'WHO',
    category: 'score',
    description: '世界卫生组织（WHO）骨折风险评估工具。用于评估未来10年主要骨质疏松性骨折和髋部骨折的概率。以下为核心风险因素评估，精确计算需使用FRAX在线工具。',
    sections: [
      {
        title: '基本信息',
        label: '',
        type: 'checklist',
        items: [
          { text: '年龄 ≥ 65岁', score: 1 },
          { text: '性别：女性', score: 1 },
          { text: 'BMI < 19 kg/m²（低体重）', score: 1 }
        ]
      },
      {
        title: '临床危险因素',
        label: '',
        type: 'checklist',
        items: [
          { text: '既往脆性骨折史（包括椎体骨折X线证据）', score: 2 },
          { text: '父母髋部骨折史', score: 1 },
          { text: '目前吸烟', score: 1 },
          { text: '长期口服糖皮质激素（≥ 5mg/日泼尼松 ≥ 3个月）', score: 2 },
          { text: '确诊类风湿关节炎', score: 1 },
          { text: '继发性骨质疏松症（甲旁亢/甲亢/性腺功能减退/早绝经<45岁/糖尿病I型/吸收不良等）', score: 1 },
          { text: '饮酒 ≥ 3单位/日（约30g纯酒精）', score: 1 }
        ]
      },
      {
        title: 'BMD（骨密度，如有DXA数据）',
        label: '',
        type: 'single-select',
        items: [
          { text: '无BMD数据 / 未知', score: 0 },
          { text: '股骨颈BMD T值 ≥ -1.0（正常）', score: 0 },
          { text: '股骨颈BMD T值 -2.5 ~ -1.0（骨量减少）', score: 2 },
          { text: '股骨颈BMD T值 ≤ -2.5（骨质疏松）', score: 4 }
        ]
      }
    ],
    interpretation: [
      { min: 0, max: 3, text: '低风险：10年主要骨折风险 < 10%，建议保持健康生活方式+充足钙/维生素D', cls: 'result-remission' },
      { min: 4, max: 6, text: '中风险：建议行DXA骨密度检查，评估是否需要药物干预', cls: 'result-moderate' },
      { min: 7, max: 99, text: '高风险：建议启动抗骨质疏松治疗+防跌倒措施，10年主要骨折风险可能 > 20%', cls: 'result-high' }
    ]
  },

  // ==================== 4. BVAS 2003 ====================
  {
    id: 'bvas-2003',
    name: 'BVAS 2003（伯明翰血管炎活动度评分）',
    year: '2003',
    category: 'score',
    description: 'Birmingham Vasculitis Activity Score v.3。用于评估系统性血管炎（尤其是ANCA相关性血管炎）的疾病活动度。评估近4周内的新发/持续/恶化表现。',
    sections: [
      {
        title: '1. 全身表现（最高3分）',
        label: '',
        type: 'single-select',
        items: [
          { text: '无', score: 0 },
          { text: '肌痛', score: 1 },
          { text: '关节痛/关节炎', score: 1 },
          { text: '发热 < 38.5°C', score: 1 },
          { text: '发热 ≥ 38.5°C（排除感染）', score: 2 },
          { text: '体重下降 ≥ 2kg（近1月）', score: 2 }
        ]
      },
      {
        title: '2. 皮肤表现（最高6分）',
        label: '',
        type: 'checklist',
        items: [
          { text: '梗死', score: 2 },
          { text: '紫癜', score: 2 },
          { text: '溃疡', score: 2 },
          { text: '坏疽', score: 4 },
          { text: '其他皮肤血管炎（结节、斑丘疹、网状青斑等）', score: 2 }
        ]
      },
      {
        title: '3. 粘膜/眼部（最高6分）',
        label: '',
        type: 'checklist',
        items: [
          { text: '口腔溃疡/肉芽肿', score: 2 },
          { text: '生殖器溃疡', score: 1 },
          { text: '结膜炎/巩膜炎/葡萄膜炎', score: 2 },
          { text: '视网膜渗出/出血', score: 4 },
          { text: '突发性视力丧失', score: 6 }
        ]
      },
      {
        title: '4. 耳鼻喉（最高6分）',
        label: '',
        type: 'checklist',
        items: [
          { text: '血性鼻腔分泌物/鼻痂/鼻塞（新发或加重）', score: 2 },
          { text: '鼻窦炎/中耳炎', score: 2 },
          { text: '声门下或气管狭窄/哮鸣', score: 4 },
          { text: '传导性耳聋', score: 2 },
          { text: '感音神经性耳聋（突发）', score: 6 }
        ]
      },
      {
        title: '5. 胸部（最高6分）',
        label: '',
        type: 'checklist',
        items: [
          { text: '呼吸困难/喘息（无咯血）', score: 2 },
          { text: '肺结节/纤维化（影像学）', score: 2 },
          { text: '胸腔积液/胸膜炎', score: 4 },
          { text: '肺泡出血/咯血', score: 6 },
          { text: '呼吸衰竭（需机械通气）', score: 6 }
        ]
      },
      {
        title: '6. 心血管（最高6分）',
        label: '',
        type: 'checklist',
        items: [
          { text: '新发脉搏消失/不对称', score: 4 },
          { text: '主动脉瓣关闭不全（新发）', score: 4 },
          { text: '心包炎/心包积液', score: 4 },
          { text: '新发心肌梗死（排除动脉粥样硬化）', score: 6 },
          { text: '心肌病/心力衰竭（排除缺血性/瓣膜性）', score: 6 }
        ]
      },
      {
        title: '7. 腹部（最高9分）',
        label: '',
        type: 'checklist',
        items: [
          { text: '腹痛（非感染/药物性）', score: 3 },
          { text: '血性腹泻', score: 6 },
          { text: '肠穿孔/肠梗死', score: 9 },
          { text: '胰腺炎（排除胆石/酒精/药物性）', score: 9 }
        ]
      },
      {
        title: '8. 肾脏（最高12分）',
        label: '',
        type: 'checklist',
        items: [
          { text: '高血压（舒张压 > 90 mmHg，新发/加重）', score: 2 },
          { text: '蛋白尿 > 1+（> 0.3 g/L）或 > 0.5 g/24h', score: 4 },
          { text: '血尿 ≥ 10 RBC/HPF（排除其他原因）', score: 6 },
          { text: '血肌酐 125-249 μmol/L（新发/升高 > 30%）', score: 8 },
          { text: '血肌酐 250-499 μmol/L', score: 10 },
          { text: '血肌酐 ≥ 500 μmol/L 或 需要透析', score: 12 }
        ]
      },
      {
        title: '9. 神经系统（最高12分）',
        label: '',
        type: 'checklist',
        items: [
          { text: '器质性意识模糊状态/痴呆', score: 3 },
          { text: '癫痫发作（非高血压/代谢性）', score: 4 },
          { text: '脑血管意外（CVA）', score: 9 },
          { text: '脊髓病变（横贯性脊髓炎）', score: 9 },
          { text: '周围神经病：单纯性感觉神经病', score: 3 },
          { text: '多发性单神经炎（运动为主）', score: 6 },
          { text: '颅神经麻痹', score: 6 }
        ]
      }
    ],
    interpretation: [
      { min: 0, max: 0, text: '完全缓解（Remission）', cls: 'result-remission' },
      { min: 1, max: 8, text: '低度活动（Low Activity）', cls: 'result-low' },
      { min: 9, max: 19, text: '中度活动（Moderate Activity）', cls: 'result-moderate' },
      { min: 20, max: 999, text: '高度活动（High Activity / Severe）', cls: 'result-high' }
    ]
  },

  // ==================== 5. ESSDAI + ESSPRI ====================
  {
    id: 'essdai',
    name: 'ESSDAI + ESSPRI（干燥综合征活动度+症状评分）',
    year: 'EULAR',
    category: 'score',
    description: 'ESSDAI（EULAR Sjögren\'s Syndrome Disease Activity Index）：由医生评估12个器官系统的活动度，每项0-3分，分别乘以权重后求和。ESSPRI（EULAR Sjögren\'s Syndrome Patient Reported Index）：由患者自评干燥、疲乏、疼痛三项（0-10分），取均值。',
    sections: [
      {
        title: 'ESSDAI — 全身症状（权重3）',
        label: '',
        type: 'single-select',
        items: [
          { text: '无活动：无发热、无盗汗、无体重下降', score: 0 },
          { text: '轻度：轻微发热（37.5-38.5°C）、盗汗或体重下降 5-10%', score: 3 },
          { text: '中度：明显发热（> 38.5°C）、盗汗或体重下降 > 10%', score: 6 },
          { text: '重度：全身消耗状态', score: 9 }
        ]
      },
      {
        title: 'ESSDAI — 淋巴结病变（权重4）',
        label: '',
        type: 'single-select',
        items: [
          { text: '无活动', score: 0 },
          { text: '轻度：任意部位淋巴结 ≥ 1 cm（单个或成簇）', score: 4 },
          { text: '中度：任意部位淋巴结 ≥ 2 cm（单个或成簇）', score: 8 },
          { text: '重度：淋巴瘤（活检证实）', score: 12 }
        ]
      },
      {
        title: 'ESSDAI — 腺体病变（权重2）',
        label: '',
        type: 'single-select',
        items: [
          { text: '无活动：无肿胀', score: 0 },
          { text: '轻度：小腺体肿胀（腮腺、颌下腺）+ 口干/眼干', score: 2 },
          { text: '中度：大腺体肿胀（腮腺 ≥ 3 cm 或颌下腺/泪腺明显）', score: 4 },
          { text: '重度：巨大腺体肿胀伴并发症（感染/结石等）', score: 6 }
        ]
      },
      {
        title: 'ESSDAI — 关节病变（权重2）',
        label: '',
        type: 'single-select',
        items: [
          { text: '无活动：无关节痛/关节炎', score: 0 },
          { text: '轻度：手、腕、踝、足的关节痛 + 晨僵 > 30分钟', score: 2 },
          { text: '中度：1-5个关节滑膜炎（28关节计数中）', score: 4 },
          { text: '重度：≥ 6个关节滑膜炎', score: 6 }
        ]
      },
      {
        title: 'ESSDAI — 皮肤（权重3）',
        label: '',
        type: 'single-select',
        items: [
          { text: '无活动', score: 0 },
          { text: '轻度：多形性红斑（轻微）', score: 3 },
          { text: '中度：局限性皮肤血管炎（荨麻疹性血管炎或紫癜，限于足/踝）或亚急性皮肤狼疮', score: 6 },
          { text: '重度：弥漫性皮肤血管炎或皮肤溃疡', score: 9 }
        ]
      },
      {
        title: 'ESSDAI — 肺部（权重5）',
        label: '',
        type: 'single-select',
        items: [
          { text: '无活动', score: 0 },
          { text: '轻度：持续咳嗽或支气管扩张（仅HRCT可见）', score: 5 },
          { text: '中度：间质性肺病（ILD）：HRCT异常（磨玻璃影/网格影）+ 肺功能异常（FVC 60-80%预计值）', score: 10 },
          { text: '重度：ILD伴FVC < 60%预计值 或 需辅助通气', score: 15 }
        ]
      },
      {
        title: 'ESSDAI — 肾脏（权重5）',
        label: '',
        type: 'single-select',
        items: [
          { text: '无活动', score: 0 },
          { text: '轻度：肾小管酸中毒不伴肾功能损害，或蛋白尿 0.5-1.0 g/24h', score: 5 },
          { text: '中度：肾小管酸中毒伴肾功能损害（GFR 30-60），或蛋白尿 1.0-2.0 g/24h', score: 10 },
          { text: '重度：GFR < 30 或 蛋白尿 > 2.0 g/24h 或 间质性肾炎需要免疫抑制治疗', score: 15 }
        ]
      },
      {
        title: 'ESSDAI — 肌肉（权重6）',
        label: '',
        type: 'single-select',
        items: [
          { text: '无活动：无肌痛/肌无力', score: 0 },
          { text: '轻度：肌痛 + CK正常 + EMG正常或轻微改变', score: 6 },
          { text: '中度：肌无力（肌力 ≥ 4/5）+ CK升高（1-4倍正常上限）+ EMG肌源性改变', score: 12 },
          { text: '重度：肌无力（肌力 ≤ 3/5）+ CK > 4倍 + 肌肉活检阳性', score: 18 }
        ]
      },
      {
        title: 'ESSDAI — 周围神经病变 PNS（权重5）',
        label: '',
        type: 'single-select',
        items: [
          { text: '无活动', score: 0 },
          { text: '轻度：单纯性感觉神经病（临床+电生理）', score: 5 },
          { text: '中度：运动神经病或多发性单神经炎伴轻度功能障碍', score: 10 },
          { text: '重度：严重功能障碍（活动受限/行走困难）或颅神经受累', score: 15 }
        ]
      },
      {
        title: 'ESSDAI — 中枢神经病变 CNS（权重5）',
        label: '',
        type: 'single-select',
        items: [
          { text: '无活动', score: 0 },
          { text: '轻度：轻度认知障碍或头痛', score: 5 },
          { text: '中度：癫痫发作、横贯性脊髓炎或脑血管炎（轻度功能障碍）', score: 10 },
          { text: '重度：严重功能障碍（意识障碍、截瘫等）', score: 15 }
        ]
      },
      {
        title: 'ESSDAI — 血液系统（权重2）',
        label: '',
        type: 'single-select',
        items: [
          { text: '无活动：无血细胞减少', score: 0 },
          { text: '轻度：自身免疫性血细胞减少：中性粒细胞 < 1.5×10⁹/L 或 Hb 100-120 g/L 或 Plt 100-150×10⁹/L', score: 2 },
          { text: '中度：中性粒细胞 < 1.0×10⁹/L 或 Hb 80-100 g/L 或 Plt 50-100×10⁹/L', score: 4 },
          { text: '重度：中性粒细胞 < 0.5×10⁹/L 或 Hb < 80 g/L 或 Plt < 50×10⁹/L', score: 6 }
        ]
      },
      {
        title: 'ESSDAI — 血清学/生物学（权重1）',
        label: '',
        type: 'single-select',
        items: [
          { text: '无活动', score: 0 },
          { text: '轻度：C3降低 或 C4降低 或 IgG升高（16-20 g/L）', score: 1 },
          { text: '中度：冷球蛋白血症 或 IgG > 20 g/L 或 单克隆丙种球蛋白病', score: 2 },
          { text: '重度：冷球蛋白血症伴血管炎症状', score: 3 }
        ]
      },
      {
        title: 'ESSPRI — 干燥（0-10分视觉模拟评分）',
        label: 'VAS 0-10',
        type: 'single-select',
        items: [
          { text: '0分（无干燥感）', score: 0 },
          { text: '1-3分（轻度）', score: 2 },
          { text: '4-6分（中度）', score: 5 },
          { text: '7-9分（重度）', score: 8 },
          { text: '10分（极度干燥，严重影响生活）', score: 10 }
        ]
      },
      {
        title: 'ESSPRI — 疲乏（0-10分）',
        label: 'VAS 0-10',
        type: 'single-select',
        items: [
          { text: '0分（无疲乏）', score: 0 },
          { text: '1-3分（轻度）', score: 2 },
          { text: '4-6分（中度）', score: 5 },
          { text: '7-9分（重度）', score: 8 },
          { text: '10分（极度疲乏，无法日常活动）', score: 10 }
        ]
      },
      {
        title: 'ESSPRI — 疼痛（0-10分）',
        label: 'VAS 0-10',
        type: 'single-select',
        items: [
          { text: '0分（无疼痛）', score: 0 },
          { text: '1-3分（轻度）', score: 2 },
          { text: '4-6分（中度）', score: 5 },
          { text: '7-9分（重度）', score: 8 },
          { text: '10分（极度疼痛）', score: 10 }
        ]
      }
    ],
    interpretation: [
      { min: 0, max: 13, text: 'ESSDAI 无/轻度活动 | 建议常规随访', cls: 'result-remission' },
      { min: 14, max: 40, text: 'ESSDAI 中度活动 | 建议调整治疗并密切随访', cls: 'result-moderate' },
      { min: 41, max: 999, text: 'ESSDAI 高度活动 | 需要强化治疗，建议紧急专科评估', cls: 'result-high' }
    ]
  }
];
