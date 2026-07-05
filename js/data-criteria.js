/* ===================================================
   data-criteria.js — 诊断分类标准数据定义
   每个标准包含：id、name、year、description、
   sections(表单区间)、threshold(阈值)、resultFormat(结果)
   =================================================== */

window.CriteriaData = [
  // ==================== 1. 类风湿关节炎 2010 ACR/EULAR ====================
  {
    id: 'ra-2010',
    name: '类风湿关节炎 2010 ACR/EULAR 分类标准',
    year: '2010',
    category: 'criteria',
    description: '适用于至少1个关节明确存在滑膜炎（肿胀），且滑膜炎不能用其他疾病更好解释的患者。总分≥6分可诊断为类风湿关节炎。',
    sections: [
      {
        title: 'A. 关节受累情况',
        label: '0-5分',
        type: 'single-select',
        items: [
          { text: '1个大关节（肩/肘/髋/膝/踝）', score: 0 },
          { text: '2-10个大关节', score: 1 },
          { text: '1-3个小关节（掌指/近端指间/第2-5跖趾/拇指指间/腕）', score: 2 },
          { text: '4-10个小关节', score: 3 },
          { text: '>10个关节（至少包括1个小关节）', score: 5 }
        ]
      },
      {
        title: 'B. 血清学（RF / ACPA）',
        label: '0-3分',
        type: 'single-select',
        items: [
          { text: 'RF阴性 且 ACPA阴性', score: 0 },
          { text: 'RF低滴度阳性（≤3倍正常上限）或 ACPA低滴度阳性', score: 2 },
          { text: 'RF高滴度阳性（>3倍正常上限）或 ACPA高滴度阳性', score: 3 }
        ]
      },
      {
        title: 'C. 急性期反应物（CRP / ESR）',
        label: '0-1分',
        type: 'single-select',
        items: [
          { text: 'CRP正常 且 ESR正常', score: 0 },
          { text: 'CRP升高 或 ESR升高', score: 1 }
        ]
      },
      {
        title: 'D. 症状持续时间',
        label: '0-1分',
        type: 'single-select',
        items: [
          { text: '< 6周', score: 0 },
          { text: '≥ 6周', score: 1 }
        ]
      }
    ],
    threshold: 6,
    resultFormat: {
      positive: '总分 ≥ 6 分，符合类风湿关节炎分类标准',
      negative: '总分 < 6 分，不符合类风湿关节炎分类标准，需随访观察'
    }
  },

  // ==================== 2. 系统性红斑狼疮 2019 EULAR/ACR ====================
  {
    id: 'sle-2019',
    name: '系统性红斑狼疮 2019 EULAR/ACR 分类标准',
    year: '2019',
    category: 'criteria',
    description: '入围标准：ANA滴度 ≥ 1:80（HEp-2细胞）或等效阳性。入围后，每个领域仅取最高分，总分 ≥ 10 分即可分类为SLE。',
    sections: [
      {
        title: '入围条件：ANA ≥ 1:80 阳性（HEp-2细胞法）',
        label: '必须满足',
        type: 'single-select',
        items: [
          { text: '否（不满足入围条件，无法继续评估）', score: 0 },
          { text: '是（满足入围条件）', score: 0 }
        ]
      },
      {
        title: '全身表现：发热（排除感染及其他原因）',
        label: '最高2分',
        type: 'single-select',
        items: [
          { text: '无发热', score: 0 },
          { text: '发热（体温 > 38.3°C）', score: 2 }
        ]
      },
      {
        title: '皮肤表现（取最高分）',
        label: '最高6分',
        type: 'single-select',
        items: [
          { text: '无相关皮肤表现', score: 0 },
          { text: '非瘢痕性脱发（广泛性）', score: 2 },
          { text: '口腔溃疡（需临床观察确认）', score: 2 },
          { text: '亚急性皮肤狼疮或盘状狼疮', score: 4 },
          { text: '急性皮肤狼疮（蝶形红斑/大疱性/中毒性表皮坏死松解样/斑丘疹/光敏感）', score: 6 }
        ]
      },
      {
        title: '关节炎（取最高分）',
        label: '最高6分',
        type: 'single-select',
        items: [
          { text: '无关节受累', score: 0 },
          { text: '≥ 2个关节滑膜炎，或 ≥ 2个关节压痛+晨僵 ≥ 30分钟', score: 6 }
        ]
      },
      {
        title: '神经系统表现（取最高分）',
        label: '最高5分',
        type: 'single-select',
        items: [
          { text: '无神经系统受累', score: 0 },
          { text: '谵妄（意识障碍、注意力不集中）', score: 2 },
          { text: '精神病（幻觉、妄想等）', score: 3 },
          { text: '癫痫发作（非药物/代谢等因素所致）', score: 5 }
        ]
      },
      {
        title: '浆膜炎（取最高分）',
        label: '最高6分',
        type: 'single-select',
        items: [
          { text: '无浆膜炎', score: 0 },
          { text: '胸膜或心包积液（影像学证据）', score: 5 },
          { text: '急性心包炎（≥ 2项：心包性胸痛、心包摩擦音、广泛ST段抬高/PR段压低）', score: 6 }
        ]
      },
      {
        title: '血液系统受累（取最高分）',
        label: '最高4分',
        type: 'single-select',
        items: [
          { text: '无血液系统异常', score: 0 },
          { text: '白细胞减少症（< 4.0×10⁹/L，排除药物性）', score: 3 },
          { text: '血小板减少症（< 100×10⁹/L，排除药物性）', score: 4 },
          { text: '自身免疫性溶血性贫血（Coombs试验阳性+溶血证据）', score: 4 }
        ]
      },
      {
        title: '肾脏受累（蛋白尿/肾活检，取最高分）',
        label: '最高10分',
        type: 'single-select',
        items: [
          { text: '无肾脏受累', score: 0 },
          { text: '蛋白尿 > 0.5 g/24h（或尿蛋白/肌酐比值 > 0.5）', score: 4 },
          { text: '肾活检：II类或V类狼疮肾炎（ISN/RPS 2018）', score: 8 },
          { text: '肾活检：III类或IV类狼疮肾炎（ISN/RPS 2018）', score: 10 }
        ]
      },
      {
        title: '抗磷脂抗体（取最高分）',
        label: '最高2分',
        type: 'single-select',
        items: [
          { text: '阴性', score: 0 },
          { text: 'aCL中/高滴度 或 抗β2-GPI中/高滴度 或 LAC阳性', score: 2 }
        ]
      },
      {
        title: '补体（取最高分）',
        label: '最高4分',
        type: 'single-select',
        items: [
          { text: 'C3和C4均正常', score: 0 },
          { text: 'C3降低 或 C4降低', score: 3 },
          { text: 'C3降低 且 C4降低', score: 4 }
        ]
      },
      {
        title: 'SLE特异性抗体（取最高分）',
        label: '最高6分',
        type: 'single-select',
        items: [
          { text: '均阴性', score: 0 },
          { text: '抗dsDNA抗体（高滴度/EIA > 2倍）或 抗Sm抗体阳性', score: 6 }
        ]
      }
    ],
    threshold: 10,
    resultFormat: {
      positive: '总分 ≥ 10 分，符合系统性红斑狼疮分类标准（需先满足入围条件）',
      negative: '总分 < 10 分，不符合SLE分类标准'
    }
  },

  // ==================== 3. 炎性肌病 2017 EULAR/ACR ====================
  {
    id: 'iim-2017',
    name: '炎性肌病 2017 EULAR/ACR 分类标准',
    year: '2017',
    category: 'criteria',
    description: '用于特发性炎性肌病（IIM）的分类诊断，包括多发性肌炎、皮肌炎等。总分按概率分层。',
    sections: [
      {
        title: '发病年龄（首次出现肌无力相关症状的年龄）',
        label: '权重',
        type: 'single-select',
        items: [
          { text: '18-40岁', score: 1.3 },
          { text: '≥ 40岁', score: 2.1 },
          { text: '< 18岁 或 年龄未知', score: 0 }
        ]
      },
      {
        title: '肌无力分布（客观、进行性、对称性）',
        label: '权重',
        type: 'checklist',
        items: [
          { text: '上肢近端肌无力（肩带肌群）', score: 2.2 },
          { text: '下肢近端肌无力（髋带肌群）', score: 2.2 },
          { text: '颈屈肌无力（颈屈肌 ≤ MRC 3级）', score: 1.7 },
          { text: '下肢远端肌无力（踝背屈肌 ≤ MRC 4级）', score: 0.7 }
        ]
      },
      {
        title: '皮肤表现（取最高分）',
        label: '权重',
        type: 'single-select',
        items: [
          { text: '无特征性皮疹', score: 0 },
          { text: 'Gottron丘疹', score: 3.3 },
          { text: 'Gottron征（非关节伸侧）', score: 2.1 },
          { text: '向阳疹（Heliotrope rash）', score: 3.1 }
        ]
      },
      {
        title: '其他皮肤表现',
        label: '权重',
        type: 'single-select',
        items: [
          { text: '无', score: 0 },
          { text: '披肩征（Shawl sign）', score: 2.1 },
          { text: 'V字征（V-sign）', score: 3.1 },
          { text: '技工手（Mechanic\'s hands）', score: 3.2 }
        ]
      },
      {
        title: '实验室检查',
        label: '权重',
        type: 'checklist',
        items: [
          { text: '抗Jo-1抗体阳性', score: 3.9 },
          { text: 'CK升高（>正常上限）', score: 1.3 }
        ]
      },
      {
        title: '肌肉病理（活检）',
        label: '权重',
        type: 'single-select',
        items: [
          { text: '未做活检或无阳性发现', score: 0 },
          { text: '肌纤维坏死（MHC-I表达+CD8+T细胞浸润）', score: 2.3 },
          { text: '束周萎缩（符合皮肌炎）', score: 3.1 }
        ]
      }
    ],
    threshold: 5.5,
    resultFormat: {
      positive: '总分 ≥ 5.5 分，概率 ≥ 55%，符合炎性肌病分类标准（需排除其他肌病）',
      negative: '总分 < 5.5 分，概率 < 55%，建议进一步检查或随访'
    }
  },

  // ==================== 4. IgG4相关性疾病 2019 ACR/EULAR ====================
  {
    id: 'igg4-2019',
    name: 'IgG4相关性疾病 2019 ACR/EULAR 分类标准',
    year: '2019',
    category: 'criteria',
    description: '需首先排除模拟IgG4-RD的疾病（感染、恶性肿瘤等）。入围标准：至少1个特征性器官受累。总分 ≥ 20分可分类为IgG4-RD。',
    sections: [
      {
        title: '入围条件：特征性器官受累（胰腺、胆管、肾脏、腹膜后、大动脉等）',
        label: '必须满足',
        type: 'single-select',
        items: [
          { text: '否', score: 0 },
          { text: '是', score: 0 }
        ]
      },
      {
        title: '病理学表现',
        label: '',
        type: 'checklist',
        items: [
          { text: '密集淋巴浆细胞浸润', score: 4 },
          { text: '席纹状纤维化（Storiform fibrosis）', score: 4 },
          { text: '闭塞性静脉炎', score: 6 },
          { text: 'IgG4+浆细胞 > 10个/HPF（活检）', score: 5 },
          { text: 'IgG4/IgG+浆细胞比值 > 40%', score: 7 },
          { text: '血清IgG4升高（> 135 mg/dL）', score: 6 }
        ]
      }
    ],
    threshold: 20,
    resultFormat: {
      positive: '总分 ≥ 20 分，符合IgG4相关性疾病分类标准',
      negative: '总分 < 20 分，不符合IgG4-RD分类标准'
    }
  },

  // ==================== 5. 干燥综合征 2016 ACR/EULAR ====================
  {
    id: 'ss-2016',
    name: '干燥综合征 2016 ACR/EULAR 分类标准',
    year: '2016',
    category: 'criteria',
    description: '适用于至少具有干燥症状（眼干或口干）或ESSDAI问卷中至少有1项阳性的患者。总分 ≥ 4 分可分类为原发性干燥综合征。',
    sections: [
      {
        title: '唇腺活检：灶性淋巴细胞浸润性涎腺炎（FLS）',
        label: '0-3分',
        type: 'single-select',
        items: [
          { text: '阴性或无此项检查', score: 0 },
          { text: '灶性指数 ≥ 1个灶/4mm²（FLS ≥ 1 focus/4mm²）', score: 3 }
        ]
      },
      {
        title: '抗SSA（Ro）抗体',
        label: '0-3分',
        type: 'single-select',
        items: [
          { text: '阴性', score: 0 },
          { text: '抗SSA/Ro抗体阳性', score: 3 }
        ]
      },
      {
        title: '眼表染色评分（OSS, van Bijsterveld评分 ≥ 5 或 Oxford ≥ 2）',
        label: '0-1分',
        type: 'single-select',
        items: [
          { text: 'OSS < 5 或无此项检查', score: 0 },
          { text: 'OSS ≥ 5 或 角膜荧光素染色 Oxford ≥ 2', score: 1 }
        ]
      },
      {
        title: 'Schirmer试验（无麻醉）',
        label: '0-1分',
        type: 'single-select',
        items: [
          { text: '≥ 5 mm/5min', score: 0 },
          { text: '< 5 mm/5min（至少一只眼）', score: 1 }
        ]
      },
      {
        title: '未刺激全唾液流率',
        label: '0-1分',
        type: 'single-select',
        items: [
          { text: '≥ 0.1 mL/min', score: 0 },
          { text: '< 0.1 mL/min', score: 1 }
        ]
      }
    ],
    threshold: 4,
    resultFormat: {
      positive: '总分 ≥ 4 分，符合原发性干燥综合征分类标准',
      negative: '总分 < 4 分，不符合干燥综合征分类标准'
    }
  },

  // ==================== 6. 结节病 ATS诊断标准 ====================
  {
    id: 'sarcoidosis-ats',
    name: '结节病 ATS/JRS/WASOG 诊断标准',
    year: 'ATS',
    category: 'criteria',
    description: '结节病的诊断需综合临床-影像-病理三联证据，并排除其他肉芽肿性疾病。满足全部三项标准可确诊。',
    sections: [
      {
        title: '标准1：相符的临床和/或影像学表现',
        label: '必须满足',
        type: 'bool',
        items: [
          { text: '临床表现（肺部症状/皮肤/眼/淋巴结/全身症状）+ 影像学（双侧肺门淋巴结肿大/肺部浸润），符合结节病特征', score: 1 }
        ]
      },
      {
        title: '标准2：病理活检证实非干酪样坏死性肉芽肿',
        label: '必须满足',
        type: 'bool',
        items: [
          { text: '组织活检显示非干酪样坏死性上皮样肉芽肿（排除感染性/异物性肉芽肿）', score: 1 }
        ]
      },
      {
        title: '标准3：排除其他肉芽肿性疾病',
        label: '必须满足',
        type: 'bool',
        items: [
          { text: '已排除结核、真菌感染、铍肺、药物性、恶性肿瘤、过敏性肺炎等', score: 1 }
        ]
      }
    ],
    threshold: 3,
    resultFormat: {
      positive: '满足全部3项标准，可确诊结节病',
      negative: '未满足全部3项标准，需进一步鉴别其他肉芽肿性疾病'
    }
  },

  // ==================== 7. 强直性脊柱炎 1984 修改纽约标准 ====================
  {
    id: 'as-1984',
    name: '强直性脊柱炎 1984年 修改纽约分类标准',
    year: '1984',
    category: 'criteria',
    description: '需同时具备影像学标准和至少1项临床标准，方可诊断为强直性脊柱炎。',
    sections: [
      {
        title: '临床标准（至少满足1项）',
        label: '≥1项',
        type: 'checklist',
        items: [
          { text: '腰痛、晨僵持续 ≥ 3个月，活动后改善，休息不缓解', score: 1 },
          { text: '腰椎前屈、侧屈和后伸活动受限（与同龄、同性别正常人比较）', score: 1 },
          { text: '胸廓扩展度下降（≤ 2.5 cm，与同龄、同性别正常人比较）', score: 1 }
        ]
      },
      {
        title: '影像学标准（满足1项即可）',
        label: '≥1项',
        type: 'checklist',
        items: [
          { text: '双侧骶髂关节炎 ≥ II级（X线平片）', score: 1 },
          { text: '单侧骶髂关节炎 III-IV级（X线平片）', score: 1 }
        ]
      }
    ],
    threshold: 2,
    resultFormat: {
      positive: '影像学标准 + 至少1项临床标准均满足，符合强直性脊柱炎诊断',
      negative: '未满足影像学+临床标准，不能诊断强直性脊柱炎'
    }
  },

  // ==================== 8. 中轴型脊柱关节炎 2009 ASAS ====================
  {
    id: 'axspa-2009',
    name: '中轴型脊柱关节炎 2009 ASAS 分类标准',
    year: '2009',
    category: 'criteria',
    description: '适用于腰背痛 ≥ 3个月且发病年龄 < 45岁的患者。分为影像学臂和临床臂。',
    sections: [
      {
        title: '入围条件：腰背痛 ≥ 3个月 且 发病年龄 < 45岁',
        label: '必须满足',
        type: 'single-select',
        items: [
          { text: '否', score: 0 },
          { text: '是', score: 0 }
        ]
      },
      {
        title: '影像学臂：骶髂关节炎（MRI或X线）',
        label: '',
        type: 'single-select',
        items: [
          { text: '无影像学证据', score: 0 },
          { text: 'MRI显示活动性骶髂关节炎（骨髓水肿/骨炎）+ ≥ 1项SpA特征', score: 1 },
          { text: 'X线显示明确骶髂关节炎（≥ 双侧II级/单侧III级）+ ≥ 1项SpA特征', score: 1 }
        ]
      },
      {
        title: '临床臂：HLA-B27阳性 + ≥ 2项SpA特征',
        label: '',
        type: 'single-select',
        items: [
          { text: 'HLA-B27阴性 或 不满足条件', score: 0 },
          { text: 'HLA-B27阳性 + ≥ 2项SpA特征（见下方）', score: 1 }
        ]
      },
      {
        title: 'SpA特征列表（用于计数）',
        label: '',
        type: 'checklist',
        items: [
          { text: '炎性腰背痛', score: 0 },
          { text: '关节炎（外周）', score: 0 },
          { text: '附着点炎（跟腱/跖筋膜等）', score: 0 },
          { text: '葡萄膜炎', score: 0 },
          { text: '指（趾）炎', score: 0 },
          { text: '银屑病', score: 0 },
          { text: '克罗恩病/溃疡性结肠炎', score: 0 },
          { text: 'NSAIDs反应良好', score: 0 },
          { text: 'SpA家族史', score: 0 },
          { text: 'HLA-B27阳性', score: 0 },
          { text: 'CRP升高', score: 0 }
        ]
      }
    ],
    threshold: 1,
    resultFormat: {
      positive: '满足影像学臂或临床臂任一条件，符合中轴型SpA分类标准',
      negative: '不满足条件，建议进一步随访评估'
    }
  },

  // ==================== 9. 银屑病关节炎 2006 CASPAR ====================
  {
    id: 'psa-2006',
    name: '银屑病关节炎 2006 CASPAR 分类标准',
    year: '2006',
    category: 'criteria',
    description: '适用于已存在炎性关节病（外周关节炎、脊柱炎或附着点炎）的患者。总分 ≥ 3 分可分类为银屑病关节炎。',
    sections: [
      {
        title: '入围条件：已存在炎性关节病（关节炎/脊柱炎/附着点炎）',
        label: '必须满足',
        type: 'single-select',
        items: [
          { text: '否', score: 0 },
          { text: '是', score: 0 }
        ]
      },
      {
        title: '1. 银屑病证据',
        label: '2分',
        type: 'single-select',
        items: [
          { text: '无银屑病史', score: 0 },
          { text: '目前有银屑病（皮肤/头皮，由风湿科/皮肤科医生确认）', score: 2 },
          { text: '银屑病史（患者或医生报告）', score: 1 },
          { text: '银屑病家族史（一级或二级亲属）', score: 1 }
        ]
      },
      {
        title: '2. 指甲病变',
        label: '1分',
        type: 'single-select',
        items: [
          { text: '无典型银屑病指甲改变', score: 0 },
          { text: '甲凹陷、甲分离、角化过度（体格检查确认）', score: 1 }
        ]
      },
      {
        title: '3. 指（趾）炎',
        label: '1分',
        type: 'single-select',
        items: [
          { text: '无指（趾）炎史', score: 0 },
          { text: '目前指（趾）炎，或既往由风湿科医生记录', score: 1 }
        ]
      },
      {
        title: '4. 类风湿因子（RF）阴性',
        label: '1分',
        type: 'single-select',
        items: [
          { text: 'RF阳性', score: 0 },
          { text: 'RF阴性（任何方法学，ELISA/比浊法等）', score: 1 }
        ]
      },
      {
        title: '5. X线显示关节旁新骨形成',
        label: '1分',
        type: 'single-select',
        items: [
          { text: '无X线新骨形成', score: 0 },
          { text: '手/足X线显示关节旁新骨形成（排除骨赘）', score: 1 }
        ]
      }
    ],
    threshold: 3,
    resultFormat: {
      positive: '总分 ≥ 3 分，符合银屑病关节炎分类标准（特异性98.7%）',
      negative: '总分 < 3 分，不符合CASPAR分类标准'
    }
  },

  // ==================== 10. 白塞病 1990 ISG ====================
  {
    id: 'bd-1990',
    name: '白塞病 1990年 ISG 分类标准',
    year: '1990',
    category: 'criteria',
    description: '必须有复发性口腔阿弗他溃疡（必要条件），加上其余4项中至少2项。',
    sections: [
      {
        title: '必要条件：复发性口腔溃疡',
        label: '必须满足',
        type: 'single-select',
        items: [
          { text: '无复发性口腔溃疡（每年 ≥ 3次）', score: 0 },
          { text: '有复发性口腔溃疡（医生或患者观察到，≥ 3次/12个月）', score: 1 }
        ]
      },
      {
        title: '1. 复发性生殖器溃疡',
        label: '',
        type: 'single-select',
        items: [
          { text: '无', score: 0 },
          { text: '有（医生或患者观察到，典型部位溃疡或瘢痕）', score: 1 }
        ]
      },
      {
        title: '2. 眼部病变',
        label: '',
        type: 'single-select',
        items: [
          { text: '无', score: 0 },
          { text: '有（前葡萄膜炎、后葡萄膜炎、视网膜血管炎，由眼科确认）', score: 1 }
        ]
      },
      {
        title: '3. 皮肤病变',
        label: '',
        type: 'single-select',
        items: [
          { text: '无', score: 0 },
          { text: '有（结节性红斑、假性毛囊炎、丘脓疱疹、痤疮样结节）', score: 1 }
        ]
      },
      {
        title: '4. 针刺反应（Pathergy test）阳性',
        label: '',
        type: 'single-select',
        items: [
          { text: '阴性', score: 0 },
          { text: '阳性（24-48h后针眼处出现 ≥ 2mm脓疱）', score: 1 }
        ]
      }
    ],
    threshold: 3,
    resultFormat: {
      positive: '口腔溃疡（必要条件）+ ≥ 2项附加标准，符合白塞病分类标准',
      negative: '未满足口腔溃疡必要条件 + ≥ 2项标准，不能分类为白塞病'
    }
  },

  // ==================== 11. 结节性多动脉炎 1990 ACR ====================
  {
    id: 'pan-1990',
    name: '结节性多动脉炎 1990 ACR 分类标准',
    year: '1990',
    category: 'criteria',
    description: 'PAN是累及中、小肌性动脉的坏死性血管炎，不累及微小血管（无肾小球肾炎）。满足 ≥ 3项标准可分类为PAN。',
    sections: [
      {
        title: '10项标准（满足 ≥ 3项）',
        label: '≥3项',
        type: 'checklist',
        items: [
          { text: '体重下降 ≥ 4 kg（非节食或其他因素所致）', score: 1 },
          { text: '网状青斑（四肢或躯干皮肤）', score: 1 },
          { text: '睾丸疼痛或压痛（非感染、创伤或其他因素）', score: 1 },
          { text: '肌痛（除外肩/髋带）、肌无力、下肢压痛', score: 1 },
          { text: '单神经炎或多发性单神经病', score: 1 },
          { text: '舒张压 > 90 mmHg', score: 1 },
          { text: '血肌酐 > 1.5 mg/dL 或 BUN > 40 mg/dL', score: 1 },
          { text: 'HBsAg或抗HBc抗体阳性', score: 1 },
          { text: '动脉造影异常（内脏动脉瘤或血管闭塞，非动脉粥样硬化）', score: 1 },
          { text: '病理：中、小动脉壁中性粒细胞浸润（含多形核白细胞）', score: 1 }
        ]
      }
    ],
    threshold: 3,
    resultFormat: {
      positive: '满足 ≥ 3项标准，符合结节性多动脉炎分类标准',
      negative: '满足 < 3项标准，不符合结节性多动脉炎分类标准'
    }
  },

  // ==================== 12. ANCA相关性血管炎 2022 ACR/EULAR ====================
  {
    id: 'aav-2022',
    name: 'ANCA相关性血管炎 2022 ACR/EULAR 分类标准',
    year: '2022',
    category: 'criteria',
    description: '适用于确诊小/中血管炎的病例。需先排除其他类似疾病（感染、恶性肿瘤、药物性、其他类型血管炎等）。',
    sections: [
      {
        title: 'GPA（肉芽肿性多血管炎）分类标准条目',
        label: 'GPA相关',
        type: 'checklist',
        items: [
          { text: '鼻腔血性分泌物、溃疡、鼻痂、鼻塞或鼻中隔穿孔', score: 3 },
          { text: '肺部影像：结节、肿块或空洞（> 1个月）', score: 2 },
          { text: 'c-ANCA或PR3-ANCA阳性', score: 5 },
          { text: '肾活检：肉芽肿性炎症或寡免疫复合物沉积', score: 2 },
          { text: 'p-ANCA或MPO-ANCA阳性（减分项）', score: -1 },
          { text: '外周血嗜酸性粒细胞 ≥ 1×10⁹/L（减分项）', score: -4 }
        ]
      },
      {
        title: 'MPA（显微镜下多血管炎）分类标准条目',
        label: 'MPA相关',
        type: 'checklist',
        items: [
          { text: 'p-ANCA或MPO-ANCA阳性', score: 6 },
          { text: '肾活检：寡免疫复合物性肾小球肾炎', score: 3 },
          { text: '肺部影像：肺纤维化或间质性肺炎（UIP/NSIP模式）', score: 3 },
          { text: 'c-ANCA或PR3-ANCA阳性（减分项）', score: -1 },
          { text: '血清嗜酸性粒细胞 ≥ 1×10⁹/L（减分项）', score: -3 }
        ]
      }
    ],
    threshold: 6,
    resultFormat: {
      positive: '总分 ≥ 6 分，支持该亚型分类（GPA ≥ 6或MPA ≥ 6），需结合临床综合判断',
      negative: '总分 < 6 分，需进一步检查或考虑其他诊断'
    }
  },

  // ==================== 13. 成人斯蒂尔病 2022 分类标准 ====================
  {
    id: 'aosd-2022',
    name: '成人斯蒂尔病 2022年 分类标准',
    year: '2022',
    category: 'criteria',
    description: '成人Still病的诊断需要排除感染、恶性肿瘤和其他风湿病。主要标准+次要标准组合判断。',
    sections: [
      {
        title: '主要标准（≥ 2项满足）',
        label: '主要',
        type: 'checklist',
        items: [
          { text: '高热 ≥ 39°C，持续 ≥ 1周（每日峰型发热，通常在傍晚/夜间）', score: 2 },
          { text: '关节痛或关节炎 ≥ 2周', score: 2 },
          { text: '典型皮疹（一过性、鲑鱼红色、斑丘疹，伴随发热出现）', score: 2 },
          { text: '白细胞 ≥ 10×10⁹/L 且中性粒细胞 ≥ 80%', score: 2 }
        ]
      },
      {
        title: '次要标准（≥ 2项满足）',
        label: '次要',
        type: 'checklist',
        items: [
          { text: '咽痛（非化脓性）', score: 1 },
          { text: '淋巴结肿大（颈部、腋下等）', score: 1 },
          { text: '肝肿大或脾肿大（体格检查或影像学）', score: 1 },
          { text: '肝功能异常（AST/ALT/LDH升高，排除药物/感染）', score: 1 },
          { text: 'RF和ANA阴性', score: 1 },
          { text: '血清铁蛋白显著升高（≥ 正常上限5倍，或糖基化铁蛋白 ≤ 20%）', score: 1 }
        ]
      }
    ],
    threshold: 5,
    resultFormat: {
      positive: '满足 ≥ 2项主要标准 + ≥ 2项次要标准，符合成人斯蒂尔病诊断（排除感染/肿瘤/其他风湿病后）',
      negative: '不满足标准组合，建议进一步排除性检查'
    }
  },

  // ==================== 14. SAPHO综合征 2003 ====================
  {
    id: 'sapho-2003',
    name: 'SAPHO综合征 2003年 诊断标准',
    year: '2003',
    category: 'criteria',
    description: 'SAPHO = 滑膜炎(Synovitis) + 痤疮(Acne) + 脓疱病(Pustulosis) + 骨肥厚(Hyperostosis) + 骨炎(Osteitis)。需排除感染性骨髓炎和恶性肿瘤。',
    sections: [
      {
        title: '核心表现（满足 ≥ 1项）',
        label: '≥1项',
        type: 'checklist',
        items: [
          { text: '骨关节病变+严重痤疮（聚合性痤疮、暴发性痤疮或化脓性汗腺炎）', score: 1 },
          { text: '骨关节病变+掌跖脓疱病', score: 1 },
          { text: '骨肥厚（前胸壁、脊柱、骶髂关节等）+ 典型皮肤病变', score: 1 },
          { text: '慢性复发性多灶性骨髓炎（CRMO）（任何部位，伴/不伴皮肤病变）', score: 1 }
        ]
      },
      {
        title: '支持性证据',
        label: '',
        type: 'checklist',
        items: [
          { text: '前上胸壁疼痛、肿胀、压痛', score: 0 },
          { text: '影像学：胸锁关节骨肥厚/骨质增生硬化', score: 0 },
          { text: '骨扫描：前胸壁"牛头征"（bullhead sign）', score: 0 },
          { text: '病理：非特异性骨炎/骨髓炎（无菌性）', score: 0 },
          { text: 'ESR/CRP可升高，也可正常', score: 0 }
        ]
      }
    ],
    threshold: 1,
    resultFormat: {
      positive: '符合SAPHO综合征临床诊断（骨关节表现+特征性皮肤病变），需排除感染和肿瘤',
      negative: '不符合SAPHO综合征诊断标准'
    }
  },

  // ==================== 15. 复发性多软骨炎 1975 McAdam ====================
  {
    id: 'rp-1975',
    name: '复发性多软骨炎 1975 McAdam 诊断标准',
    year: '1975',
    category: 'criteria',
    description: '是一种反复发作的软骨结构炎症性疾病，累及耳、鼻、喉、气管支气管树等富含软骨的组织。满足 ≥ 3项或 ≥ 1项+病理阳性。',
    sections: [
      {
        title: 'McAdam标准（满足 ≥ 3项，或 ≥ 1项+软骨活检阳性）',
        label: '≥3项',
        type: 'checklist',
        items: [
          { text: '双侧耳廓软骨炎（红肿、疼痛，非感染性，耳垂不受累）', score: 1 },
          { text: '非侵蚀性、血清阴性炎性多关节炎', score: 1 },
          { text: '鼻软骨炎（鼻梁红肿、疼痛、塌陷/鞍鼻畸形）', score: 1 },
          { text: '眼部炎症（结膜炎、角膜炎、巩膜炎/外层巩膜炎、葡萄膜炎）', score: 1 },
          { text: '呼吸道软骨炎（喉和/或气管软骨炎：声嘶、咳嗽、喘鸣、气管压痛）', score: 1 },
          { text: '耳蜗和/或前庭功能障碍（感音神经性耳聋、耳鸣、眩晕）', score: 1 }
        ]
      },
      {
        title: '软骨活检（耳、鼻、呼吸道）',
        label: '',
        type: 'single-select',
        items: [
          { text: '未做活检或阴性', score: 0 },
          { text: '软骨组织病理符合：软骨基质嗜碱性染色消失+软骨膜炎性浸润', score: 3 }
        ]
      }
    ],
    threshold: 3,
    resultFormat: {
      positive: '满足 ≥ 3项临床标准，或 ≥ 1项+软骨活检阳性，符合复发性多软骨炎诊断',
      negative: '不满足标准，需进一步观察和鉴别诊断'
    }
  },

  // ==================== 16. 系统性硬化症 2013 ACR/EULAR ====================
  {
    id: 'ssc-2013',
    name: '系统性硬化症 2013 ACR/EULAR 分类标准',
    year: '2013',
    category: 'criteria',
    description: '总分 ≥ 9分即可分类为系统性硬化症。各项目取最高分（同类别内不累加，不同类别间累加）。',
    sections: [
      {
        title: '1. 双手皮肤增厚（超越掌指关节MCP）',
        label: '最高9分',
        type: 'single-select',
        items: [
          { text: '无', score: 0 },
          { text: '双手手指皮肤增厚并延伸超过MCP关节（充分条件，直接9分）', score: 9 }
        ]
      },
      {
        title: '2. 手指皮肤增厚（仅计数较高分）',
        label: '最高4分',
        type: 'single-select',
        items: [
          { text: '无', score: 0 },
          { text: '手指肿胀（puffy fingers）', score: 2 },
          { text: '手指硬化（从PIP延伸至MCP但不超过MCP）：硬皮病指', score: 4 }
        ]
      },
      {
        title: '3. 指尖病变（仅计数较高分）',
        label: '最高3分',
        type: 'single-select',
        items: [
          { text: '无', score: 0 },
          { text: '指尖凹陷性瘢痕（digital tip pitting scars）', score: 2 },
          { text: '指端溃疡（digital tip ulcers）', score: 3 }
        ]
      },
      {
        title: '4. 毛细血管扩张',
        label: '2分',
        type: 'single-select',
        items: [
          { text: '无', score: 0 },
          { text: '甲襞毛细血管扩张', score: 2 }
        ]
      },
      {
        title: '5. 甲襞毛细血管异常',
        label: '2分',
        type: 'single-select',
        items: [
          { text: '无', score: 0 },
          { text: '甲襞毛细血管镜检查：巨毛细血管 + 无血管区 + 毛细血管密度减低', score: 2 }
        ]
      },
      {
        title: '6. 肺动脉高压和/或间质性肺病（ILD）',
        label: '最高2分',
        type: 'single-select',
        items: [
          { text: '无', score: 0 },
          { text: 'PAH（右心导管/RHC证实）', score: 2 },
          { text: 'ILD（HRCT证实，典型NSIP/UIP）', score: 2 }
        ]
      },
      {
        title: '7. 雷诺现象',
        label: '3分',
        type: 'single-select',
        items: [
          { text: '无', score: 0 },
          { text: '雷诺现象（寒冷/情绪诱发的手指颜色变白→蓝→红三期变化）', score: 3 }
        ]
      },
      {
        title: '8. SSc相关自身抗体',
        label: '最高3分',
        type: 'single-select',
        items: [
          { text: '均阴性', score: 0 },
          { text: '抗着丝点抗体（ACA）阳性', score: 3 },
          { text: '抗拓扑异构酶I（Scl-70）阳性', score: 3 },
          { text: '抗RNA聚合酶III抗体阳性', score: 3 }
        ]
      }
    ],
    threshold: 9,
    resultFormat: {
      positive: '总分 ≥ 9 分，符合系统性硬化症分类标准（ACR/EULAR 2013）',
      negative: '总分 < 9 分，不符合SSc分类标准'
    }
  },

  // ==================== 17. 抗磷脂综合征 2006 Sydney ====================
  {
    id: 'aps-2006',
    name: '抗磷脂综合征 2006 悉尼修订分类标准',
    year: '2006',
    category: 'criteria',
    description: '需满足 ≥ 1项临床标准 + ≥ 1项实验室标准（实验室标准需间隔 ≥ 12周复测阳性）。',
    sections: [
      {
        title: '临床标准（满足 ≥ 1项）',
        label: '≥1项',
        type: 'checklist',
        items: [
          { text: '血管性血栓形成：≥ 1次动脉/静脉/小血管血栓（影像学或病理证实，无血管壁炎症）', score: 1 },
          { text: '病态妊娠：≥ 1次 ≥ 孕10周形态学正常的胎儿死亡', score: 1 },
          { text: '≥ 1次妊娠 < 34周早产（因子痫/重度先兆子痫/胎盘功能不全）', score: 1 },
          { text: '≥ 3次连续、< 孕10周的自发性流产（排除解剖/内分泌/遗传因素）', score: 1 }
        ]
      },
      {
        title: '实验室标准（满足 ≥ 1项，需间隔 ≥ 12周复测阳性）',
        label: '≥1项',
        type: 'checklist',
        items: [
          { text: 'LAC（狼疮抗凝物）：阳性（按ISTH指南检测）', score: 1 },
          { text: 'aCL（抗心磷脂抗体）：IgG和/或IgM ≥ 40 GPL/MPL 或 ≥ 第99百分位', score: 1 },
          { text: '抗β2-GPI抗体：IgG和/或IgM ≥ 第99百分位', score: 1 }
        ]
      }
    ],
    threshold: 2,
    resultFormat: {
      positive: '满足 ≥ 1项临床标准 + ≥ 1项实验室标准，符合抗磷脂综合征（APS）分类标准',
      negative: '不满足标准组合，需结合临床综合判断（如仅实验室阳性 = aPL携带者）'
    }
  },

  // ==================== 18. 巨细胞动脉炎 ====================
  {
    id: 'gca',
    name: '巨细胞动脉炎（GCA）分类标准',
    year: 'ACR',
    category: 'criteria',
    description: '旧称颞动脉炎。主要累及主动脉及其主要分支，以颞动脉受累最常见。满足 ≥ 3项标准可分类为GCA。',
    sections: [
      {
        title: 'ACR分类标准（满足 ≥ 3项）',
        label: '≥3项',
        type: 'checklist',
        items: [
          { text: '发病年龄 ≥ 50岁', score: 1 },
          { text: '新发头痛（新类型或新部位的局部头痛）', score: 1 },
          { text: '颞动脉异常（压痛或搏动减弱/消失，非动脉粥样硬化）', score: 1 },
          { text: 'ESR升高（≥ 50 mm/h，Westergren法）', score: 1 },
          { text: '颞动脉活检异常：以单核细胞浸润为主的肉芽肿性血管炎，常见多核巨细胞', score: 1 }
        ]
      },
      {
        title: 'GCA紧急征象（提示需警惕）',
        label: '警示',
        type: 'checklist',
        items: [
          { text: '新发视觉症状（一过性黑蒙、复视、视力下降/丧失——前部缺血性视神经病变 AION）', score: 0 },
          { text: '颌跛行（jaw claudication）或舌跛行', score: 0 },
          { text: '颞部头皮压痛或坏死', score: 0 },
          { text: '不明原因发热（FUO）+ ESR/CRP显著升高', score: 0 },
          { text: '风湿性多肌痛（PMR）症状', score: 0 }
        ]
      }
    ],
    threshold: 3,
    resultFormat: {
      positive: '满足 ≥ 3项标准，符合巨细胞动脉炎分类标准（敏感性93.5%，特异性91.2%）',
      negative: '满足 < 3项，不排除GCA——出现视觉/颌跛行等警示征象时应尽早启动大剂量糖皮质激素+颞动脉活检'
    }
  },

  // ==================== 19. 风湿性多肌痛 2022 EULAR/ACR ====================
  {
    id: 'pmr-2022',
    name: '风湿性多肌痛 2022 EULAR/ACR 分类标准',
    year: '2022',
    category: 'criteria',
    description: 'PMR的临床特征结合实验室和超声检查进行评分。总分 ≥ 5分可分类为PMR（仅适用于新发PMR样症状病例）。',
    sections: [
      {
        title: '必要条件（所有患者必须满足）',
        label: '必须全部满足',
        type: 'checklist',
        items: [
          { text: '年龄 ≥ 50岁', score: 0 },
          { text: '双侧肩部疼痛（新发）', score: 0 },
          { text: 'CRP升高 和/或 ESR升高（排除其他病因）', score: 0 }
        ]
      },
      {
        title: '评分项目',
        label: '评分',
        type: 'checklist',
        items: [
          { text: '晨僵持续时间 > 45分钟', score: 2 },
          { text: '髋部疼痛或活动受限', score: 1 },
          { text: 'RF或ACPA阴性（无RA特异性抗体）', score: 2 },
          { text: '无外周关节受累（除肩/髋外）', score: 1 },
          { text: '超声：三角肌下滑囊炎 ≥ 1侧', score: 1 },
          { text: '超声：肱二头肌长头腱鞘炎 ≥ 1侧', score: 1 },
          { text: '超声：盂肱关节滑膜炎 ≥ 1侧', score: 1 },
          { text: '超声：至少一侧髋关节滑膜炎', score: 1 },
          { text: '超声：双侧三角肌下滑囊炎', score: 1 }
        ]
      }
    ],
    threshold: 5,
    resultFormat: {
      positive: '总分 ≥ 5 分（不含必要条件），符合风湿性多肌痛分类标准',
      negative: '总分 < 5 分，需要进一步鉴别其他类似PMR的疾病（晚发RA、RS3PE、炎症性肌病等）'
    }
  }
];
