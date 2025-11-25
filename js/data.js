// --- Data Helper ---
const formatVar = (text) => `<span class="var">${text}</span>`;

// --- Constants (Default Values) ---
const DEFAULTS = {
    LG_PA: 28500, LG_RUNS: 2800, LG_HITS: 6900,
    LG_2B: 1150, LG_3B: 120, LG_HR: 485, LG_BB: 2300,
    LG_AB: 28750, LG_HBP: 300, LG_SF: 190, LG_SH: 550
};

// --- 統一された詳細設定の定義 (11項目) ---
const ADVANCED_LEAGUE_INPUTS = [
    {id:'lg_pa', label:'リーグ総打席', type:'number', advanced:true, default: DEFAULTS.LG_PA},
    {id:'lg_runs', label:'リーグ総得点', type:'number', advanced:true, default: DEFAULTS.LG_RUNS},
    {id:'lg_ab', label:'リーグ総打数', type:'number', advanced:true, default: DEFAULTS.LG_AB}, 
    {id:'lg_hits', label:'リーグ総安打', type:'number', advanced:true, default: DEFAULTS.LG_HITS},
    {id:'lg_2b', label:'リーグ総二塁打', type:'number', advanced:true, default: DEFAULTS.LG_2B},
    {id:'lg_3b', label:'リーグ総三塁打', type:'number', advanced:true, default: DEFAULTS.LG_3B},
    {id:'lg_hr', label:'リーグ総本塁打', type:'number', advanced:true, default: DEFAULTS.LG_HR},
    {id:'lg_bb', label:'リーグ総四球', type:'number', advanced:true, default: DEFAULTS.LG_BB},
    {id:'lg_hbp', label:'リーグ総死球', type:'number', advanced:true, default: DEFAULTS.LG_HBP},
    {id:'lg_sf', label:'リーグ総犠飛', type:'number', advanced:true, default: DEFAULTS.LG_SF},
    {id:'lg_sh', label:'リーグ総犠打', type:'number', advanced:true, default: DEFAULTS.LG_SH}
];

// Park Factors
const PARK_FACTORS = {
    'avg': {name: '平均', pf: 1.00},
    'jingu': {name: '明治神宮', pf: 1.19},
    'yoko': {name: '横浜', pf: 1.04},
    'mazda': {name: 'マツダ', pf: 0.99},
    'tokyo': {name: '東京ドーム', pf: 0.97},
    'koshien': {name: '甲子園', pf: 0.92},
    'nagoya': {name: 'バンテリン', pf: 0.86},
    'escon': {name: 'エスコン', pf: 1.06},
    'zozo': {name: 'ZOZOマリン', pf: 1.06},
    'paypay': {name: 'PayPay', pf: 1.05},
    'belluna': {name: 'ベルーナ', pf: 0.97},
    'kyocera': {name: '京セラ', pf: 0.95},
    'rakuten': {name: '楽天モバイル', pf: 0.94}
};

// Icon Definitions
const icons = {
    search: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
    sun: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
    moon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
    barChart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bar-chart"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>`,
    calculator: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calculator"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="10" y2="18"/><line x1="8" x2="8" y1="10" y2="18"/><line x1="12" x2="12" y1="10" y2="18"/><line x1="8" x2="16" y1="14" y2="14"/></svg>`,
    gear: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.44a2 2 0 0 1-2 2h-.44a2 2 0 0 0-2 2v.44a2 2 0 0 1-2 2H2v.44a2 2 0 0 0 2 2h.44a2 2 0 0 1 2 2v.44a2 2 0 0 0 2 2h.44a2 2 0 0 1 2 2v.44a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.44a2 2 0 0 1 2-2h.44a2 2 0 0 0 2-2v-.44a2 2 0 0 1 2-2h.44v-.44a2 2 0 0 0-2-2h-.44a2 2 0 0 1-2-2v-.44a2 2 0 0 0-2-2h-.44a2 2 0 0 1-2-2V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
    sparkle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="m12 3-1.83 2.66-2.67 1.84 2.67 1.84L12 13l1.83-2.66 2.67-1.84-2.67-1.84L12 3z"/><path d="m20.2 16.2-1.22 1.8-1.78 1.22 1.78 1.22 1.22 1.8 1.22-1.8 1.78-1.22-1.78-1.22-1.22-1.8z"/><path d="m4.64 10.36-1.15 1.68-1.57 1.08 1.57 1.08 1.15 1.68 1.15-1.68 1.57-1.08-1.57-1.08-1.15-1.68z"/></svg>`,
    loader: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`,
    trash: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 3h6"/></svg>`,
    save: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-save"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>`,
    clipboard: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-copy"><rect width="8" height="4" x="8" y="2"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M15 22v-3a3 3 0 0 0-3-3l-2.5 2.5"/><path d="M8 13l2.5 2.5"/></svg>`
};

// --- Terms Database ---
const terms = [
        {
            id: "war", category: "tot", title: "WAR (野手)", full: "Wins Above Replacement (Batter)",
            short: "打撃、走塁、守備を総合的に評価して野手の貢献度を表す指標",
            desc: "代替可能な控え選手（リプレイスメント・レベルの選手）が出場する場合に比べ、どれだけ勝利数を増やしたかによって計算される。",
            formula: `(wRAA + UZR + BaseRunning + ポジション補正 + 代替水準補正) ÷ RPW`,
            criteria: "2.0: レギュラー / 5.0: スター / 8.0: MVP",
            related: ["wraa", "uzr", "woba", "rpw"],
            aiMode: true,
            inputs: [
                {id:'pa', label:'打席数'}, {id:'ab', label:'打数'},
                {id:'h', label:'安打'}, {id:'d', label:'二塁打'}, {id:'t', label:'三塁打'}, {id:'hr', label:'本塁打'}, 
                {id:'bb', label:'四球'}, {id:'hbp', label:'死球', default:0}, 
                {id:'sf', label:'犠飛', default:0}, {id:'sh', label:'犠打', default:0},
                {id:'sb', label:'盗塁'}, {id:'cs', label:'盗塁死'},
                
                {id:'stadium', label:'本拠地', type:'select', options: Object.keys(PARK_FACTORS).reduce((acc, key) => ({...acc, [key]: PARK_FACTORS[key].name}), {})},
                {id:'pos', label:'守備位置', type:'select', options:{'dh':'DH', '1b':'一塁', 'lf':'左翼', 'rf':'右翼', '3b':'三塁', '2b':'二塁', 'cf':'中堅', 'ss':'遊撃', 'c':'捕手'}},
                {id:'def', label:'守備評価', type:'select', options:{'0':'平均的 (0)', '5':'上手い (+5)', '10':'名手 (+10)', '15':'神 (+15)', '-5':'苦手 (-5)', '-10':'下手 (-10)'}},
                
                // --- 統一された詳細設定 ---
                ...ADVANCED_LEAGUE_INPUTS
            ],
            calc: (d) => {
                const C = calcDerived(d);
                const est = estimateDetails(d);
                const fr = C.fitting_ratio; // 補正係数

                // 1. Calculate wOBA (Coefficients scaled by fitting_ratio)
                const woba_denom = d.ab + d.bb - est.ibb + d.hbp + d.sf;

                const woba_num = 
                    (0.692 * fr) * (d.bb - est.ibb) +
                    (0.73  * fr) * d.hbp +
                    (0.966 * fr) * est.roe +
                    (0.865 * fr) * est.s +
                    (1.334 * fr) * d.d +
                    (1.725 * fr) * d.t +
                    (2.065 * fr) * d.hr;

                const woba_val = woba_denom > 0 ? woba_num / woba_denom : 0;
                
                // 2. wRAA
                const raw_wRAA = ((woba_val - C.lg_woba) / C.woba_scale) * d.pa;

                // 3. Park Adj
                const pf = PARK_FACTORS[d.stadium].pf;
                const home_ratio = 0.5;
                const pf_coef = (home_ratio * pf) + ((1 - home_ratio) * (6 - pf) / 5);
                const parkAdj = (1 - pf_coef) * C.lg_r_pa * d.pa;
                
                const battingRuns = raw_wRAA + parkAdj;
                
                // 4. Pos Adj
                const posVals = {'dh':-15.1, '1b':-14.1, 'lf':-12.0, 'rf':-5.0, '3b':-4.8, '2b':3.4, 'cf':4.2, 'ss':10.3, 'c':18.1};
                const posAdj = (posVals[d.pos] || 0) * (d.pa / 600);
                
                // 5. UZR & BaseRunning
                const uzr = parseFloat(d.def) || 0;
                const baseRunning = (d.sb * 0.2) - (d.cs * 0.4);
                
                // 6. Replacement Level
                const repRuns = C.rep_per_pa * d.pa;
                
                // 7. Calc WAR
                const totalRuns = battingRuns + uzr + baseRunning + posAdj + repRuns;
                return (totalRuns / C.rpw).toFixed(1);
            }
        },
        {
            id: "wrc_plus", category: "bat", title: "wRC+", full: "weighted Runs Created Plus",
            short: "打撃の傑出度を評価する指標",
            desc: "打席あたりの得点創出の多さを、平均的な打者を100とした場合のパーセンテージで評価する指標",
            formula: `(((wRAA/打席 + R/PA) + (R/PA - PF補正係数×R/PA)) ÷ R/PA) × 100`,
            criteria: "100: 平均 / 160: MVP候補 / 200: 歴史的",
            related: ["woba", "wraa"],
            aiMode: true,
            inputs: [
                {id:'pa', label:'打席数'}, {id:'ab', label:'打数'},
                {id:'h', label:'安打'}, {id:'d', label:'二塁打'}, {id:'t', label:'三塁打'}, {id:'hr', label:'本塁打'}, 
                {id:'bb', label:'四球'}, {id:'hbp', label:'死球', default:0}, 
                {id:'sf', label:'犠飛', default:0}, {id:'sh', label:'犠打', default:0},

                {id:'stadium', label:'本拠地', type:'select', options: Object.keys(PARK_FACTORS).reduce((acc, key) => ({...acc, [key]: PARK_FACTORS[key].name}), {})},
                
                // --- 統一された詳細設定 ---
                ...ADVANCED_LEAGUE_INPUTS
            ],
            calc: (d) => {
                const C = calcDerived(d);
                const est = estimateDetails(d);
                const fr = C.fitting_ratio;
                const pf = PARK_FACTORS[d.stadium].pf;
                
                // wOBA
                const woba_denom = d.ab + d.bb - est.ibb + d.hbp + d.sf;
                const woba_num = 
                    (0.692 * fr) * (d.bb - est.ibb) +
                    (0.73  * fr) * d.hbp +
                    (0.966 * fr) * est.roe +
                    (0.865 * fr) * est.s +
                    (1.334 * fr) * d.d +
                    (1.725 * fr) * d.t +
                    (2.065 * fr) * d.hr;
                const woba_val = woba_denom > 0 ? woba_num / woba_denom : 0;
                
                // wRAA
                const raw_wraa = ((woba_val - C.lg_woba) / C.woba_scale) * d.pa;
                
                // Park Adj
                const home_ratio = 0.5;
                const pf_coef = (home_ratio * pf) + ((1 - home_ratio) * (6 - pf) / 5);
                const parkAdj = (1 - pf_coef) * C.lg_r_pa * d.pa;

                // wRC+ Calc
                const wrc_plus_val = (((raw_wraa + parkAdj) / d.pa) + C.lg_r_pa) / C.lg_r_pa * 100;
                
                return wrc_plus_val.toFixed(0);
            }
        },
        {
            id: "pit_war", category: "tot", title: "WAR (投手)", full: "Wins Above Replacement (Pitcher)",
            short: "投球を総合的に評価して投手の貢献度を表す指標",
            desc: "代替可能な控え選手に比べ、どれだけ勝利数を増やしたかによって計算される。<br>SPRAR (先発としての貢献) と RPRAR (救援としての貢献) を足し合わせ、RPWで割って算出する",
            formula: `(SPRAR + RPRAR) ÷ RPW`,
            criteria: "2.0: ローテ投手 / 4.0: エース",
            related: ["fip", "tra", "rsaa", "rpw"],
            aiMode: true,
            inputs: [
                {id:'ip', label:'投球回'}, {id:'so', label:'奪三振'}, {id:'bb', label:'与四球'}, {id:'hr', label:'被本塁打'},
                {id:'role', label:'役割', type:'select', options:{'sp':'先発', 'rp':'救援'}},
                {id:'stadium', label:'本拠地', type:'select', options: Object.keys(PARK_FACTORS).reduce((acc, key) => ({...acc, [key]: PARK_FACTORS[key].name}), {})},
                
                // --- 統一された詳細設定 ---
                ...ADVANCED_LEAGUE_INPUTS
            ],
            calc: (d) => {
                const C = calcDerived(d);

                // 1. FIP Calculation (Standard Constant approx 3.10)
                const fip = (13 * d.hr + 3 * d.bb - 2 * d.so) / d.ip + 3.10; // Simple FIP constant is approx 3.10

                // 2. League Parameters
                // C.lg_ra9 is calculated inside calcDerived using the new comprehensive inputs
                const lg_ra9 = C.lg_ra9;

                // 3. Park Adjustment
                const pf = PARK_FACTORS[d.stadium].pf;
                // Park Adjusted League RA9
                const lg_ra9_park = lg_ra9 * pf;

                // 4. Runs Above Average (RAA) based on FIP
                // RAA = (League RA - Pitcher FIP) * IP / 9
                const raa = (lg_ra9_park - fip) * (d.ip / 9);

                // 5. Replacement Level Adjustment
                // SP: +0.38 runs/9, RP: +0.47 runs/9 (approx)
                const rep_bonus = d.role === 'sp' ? 0.38 : 0.47;
                const rep_runs = rep_bonus * (d.ip / 9);

                // 6. RAR (Runs Above Replacement) -> SPRAR or RPRAR
                const rar = raa + rep_runs;
                
                // Since inputs only allow one role, SPRAR+RPRAR is just RAR
                return (rar / C.rpw).toFixed(1);
            }
        },
        {
            id: "rpw", category: "tot", title: "RPW", full: "Runs Per Win",
            short: "勝利を1つ増やすのに必要な得点数",
            desc: "「1勝の重み」を得点換算したもの。",
            formula: `20 × (リーグ総得点 ÷ リーグ総投球回)`,
            criteria: "約8.5 ～ 10.0",
            related: ["war", "pythag"],
            inputs: [
                {id:'lg_runs', label:'リーグ総得点'},
                {id:'lg_pa', label:'リーグ総打席'}
                // IPはPAから推定されるため、ここではPAを使用
            ],
            calc: (d) => {
                const est_lg_ip = d.lg_pa / 4.25; // Estimate IP from PA
                return (20 * (d.lg_runs / est_lg_ip)).toFixed(2);
            }
        },
        {
            id: "wpa", category: "tot", title: "WPA", full: "Win Probability Added",
            short: "勝利確率をどれだけ変動させたかを示す",
            desc: "状況（点差、イニング、走者、アウト）ごとの勝利確率を、プレイ前後でどれだけ増やしたかによって評価する。サヨナラホームランなどは非常に高い値になる",
            formula: `プレイ後の勝利確率 - プレイ前の勝利確率`,
            criteria: "状況に依存",
            related: ["re24"]
        },
        {
            id: "re24", category: "tot", title: "RE24", full: "Run Expectancy 24",
            short: "状況別の「得点期待値」の増減を示す",
            desc: "24種類の状況（無死一塁など）における得点期待値をどれだけ改善させたかを測る。",
            formula: `プレイ後期待値 - プレイ前期待値 + 得点`,
            criteria: "0: 平均",
            related: ["wpa"]
        },
        {
            id: "pythag", category: "tot", title: "Pythagenpat", full: "Pythagorean Expectation",
            short: "得失点から予測される「本来あるべき勝率」",
            desc: "実際の勝率がこれより高いと「運が良い」または「接戦に強い（監督の采配が良い）」とされる。未来の勝率予測に役立つとして重視される",
            formula: `${formatVar('得点')}^x ÷ (${formatVar('得点')}^x + ${formatVar('失点')}^x) <br><small style="font-size:0.7em; color:#94a3b8;">x = (得点+失点)^0.287</small>`,
            criteria: "実際の勝率との乖離を確認",
            inputs: [
                {id:'rs', label:'得点'}, {id:'ra', label:'失点'}
            ],
            calc: (d) => {
                const x = Math.pow((d.rs + d.ra), 0.287);
                return (Math.pow(d.rs, x) / (Math.pow(d.rs, x) + Math.pow(d.ra, x))).toFixed(3);
            }
        },
        {
            id: "pf", category: "tot", title: "PF", full: "Park Factor",
            short: "球場の特性（打者有利/投手有利）を表す数値",
            desc: "1.00が平均。1.00より大きければ打者有利、小さければ投手有利とされる。セイバーメトリクスでは、選手の成績を比較する際にこのPF補正をかけることが常識となっている",
            formula: `(本拠地での試合あたり得点 + 失点) ÷ (本拠地以外での試合あたり得点 + 失点)`,
            criteria: "1.00: 中立 / 1.20: ヒッターズパーク",
            related: ["wrc_plus"]
        },

        /* ---------------- 打撃 (Batting) ---------------- */
        {
            id: "avg", category: "std", title: "AVG", full: "Batting Average",
            short: "打率",
            formula: `${formatVar('安打')} ÷ ${formatVar('打数')}`,
            criteria: ".250: 平均 / .300: 優秀",
            inputs: [{id:'h', label:'安打'}, {id:'ab', label:'打数'}],
            calc: (d) => (d.h / d.ab).toFixed(3).replace(/^0/,'')
        },
        {
            id: "obp", category: "std", title: "OBP", full: "On Base Percentage",
            short: "出塁率",
            desc: "打率よりも得点との相関が高いため、セイバーメトリクスでは打率より重視される。四死球を選べる打者は価値が高いと評価される",
            formula: `(${formatVar('安打')} + ${formatVar('四球')} + ${formatVar('死球')}) ÷ (${formatVar('打数')} + ${formatVar('四球')} + ${formatVar('死球')} + ${formatVar('犠飛')})`,
            criteria: ".320: 平均 / .400: 優秀",
            related: ["ops", "isod"],
            inputs: [{id:'h', label:'安打'}, {id:'bb', label:'四球'}, {id:'hbp', label:'死球'}, {id:'ab', label:'打数'}, {id:'sf', label:'犠飛'}],
            calc: (d) => ((d.h+d.bb+d.hbp)/(d.ab+d.bb+d.hbp+d.sf)).toFixed(3).replace(/^0/,'')
        },
        {
            id: "slg", category: "std", title: "SLG", full: "Slugging Percentage",
            short: "長打率",
            desc: "打率のような名前だが「1打数あたりの期待塁打数」を表す。単打=1、本塁打=4として計算する",
            formula: `${formatVar('塁打')} ÷ ${formatVar('打数')}`,
            criteria: ".400: 平均 / .500: パワーヒッター",
            related: ["ops", "iso"],
            inputs: [{id:'tb', label:'塁打'}, {id:'ab', label:'打数'}],
            calc: (d) => (d.tb / d.ab).toFixed(3).replace(/^0/,'')
        },
        {
            id: "ops", category: "std", title: "OPS", full: "On-base Plus Slugging",
            short: "出塁率 + 長打率",
            desc: "計算が簡単でありながら、チームの得点数と非常に高い相関を持つ指標。現在では公式記録としても採用されることが多い",
            formula: `${formatVar('出塁率')} + ${formatVar('長打率')}`,
            criteria: ".730: 平均 / .800: 優秀 / 1.000: 最強",
            related: ["woba", "xr"],
            inputs: [
                {id:'h', label:'安打'}, {id:'bb', label:'四球'}, {id:'hbp', label:'死球'}, 
                {id:'ab', label:'打数'}, {id:'sf', label:'犠飛'}, {id:'tb', label:'塁打'}
            ],
            calc: (d) => {
                const obp = (d.h+d.bb+d.hbp)/(d.ab+d.bb+d.hbp+d.sf);
                const slg = d.tb / d.ab;
                return (obp + slg).toFixed(3).replace(/^0/,'');
            }
        },
        {
            id: "woba", category: "bat", title: "wOBA", full: "weighted On-Base Average",
            short: "各イベントを得点価値で重み付けした「真の出塁率」",
            desc: "OPSの欠点を修正し、各イベント（単打、本塁打、四球など）が得点にどれだけ貢献したかを係数化して計算する。係数は年度ごとに変動する",
            formula: `(0.69×${formatVar('四球')} + 0.72×${formatVar('死球')} + 0.89×${formatVar('単打')} + 1.27×${formatVar('二塁打')} + 1.62×${formatVar('三塁打')} + 2.10×${formatVar('本塁打')}) ÷ ${formatVar('打席')}`,
            criteria: ".320: 平均 / .400: MVP級",
            related: ["ops", "wrc_plus"],
            inputs: [
                {id:'pa', label:'打席'}, {id:'ab', label:'打数'},
                {id:'s', label:'単打'}, {id:'d', label:'二塁打'}, {id:'t', label:'三塁打'}, {id:'hr', label:'本塁打'}, 
                {id:'bb', label:'四球'}, {id:'hbp', label:'死球', default:0}, 
                {id:'sf', label:'犠飛', default:0}, {id:'sh', label:'犠打', default:0},

                // --- 統一された詳細設定 ---
                ...ADVANCED_LEAGUE_INPUTS
            ],
            calc: (d) => {
                const C = calcDerived(d);
                const est = estimateDetails(d);
                const fr = C.fitting_ratio;
                
                const woba_denom = d.ab + d.bb - est.ibb + d.hbp + d.sf;
                const woba_num = 
                    (0.692 * fr) * (d.bb - est.ibb) +
                    (0.73  * fr) * d.hbp +
                    (0.966 * fr) * est.roe +
                    (0.865 * fr) * d.s + 
                    (1.334 * fr) * d.d +
                    (1.725 * fr) * d.t +
                    (2.065 * fr) * d.hr;
                    
                return woba_denom > 0 ? (woba_num / woba_denom).toFixed(3).replace(/^0/,'') : "---";
            }
        },
        {
            id: "wraa", category: "bat", title: "wRAA", full: "weighted Runs Above Average",
            short: "平均的な打者より「何点」多く取ったかを示す",
            desc: "積み上げ指標。出場数が多く、かつ打撃成績が良いほど数値が高くなる。WARの打撃構成要素として使われる。<br>式中の<strong>wOBAScale（約1.24）</strong>は、wOBAを出塁率のスケール（.320前後が平均）に合わせるために掛けられていた係数を、得点単位に戻すために割るもの",
            formula: `(${formatVar('wOBA')} - リーグ平均wOBA) ÷ wOBAScale × ${formatVar('打席')}`,
            criteria: "0: 平均 / +20: 一流",
            related: ["war", "woba"]
        },
        {
            id: "iso", category: "bat", title: "ISO", full: "Isolated Power",
            short: "打率を除いた純粋な長打力",
            desc: "長打率から打率を引いて算出する。単打を無視し、二塁打以上を打つ能力のみを評価する",
            formula: `${formatVar('長打率')} - ${formatVar('打率')}`,
            criteria: ".140: 平均 / .250: 強打者",
            inputs: [
                {id:'slg', label:'長打率', default: 0.400}, 
                {id:'avg', label:'打率', default: 0.250}
            ],
            calc: (d) => (d.slg - d.avg).toFixed(3).replace(/^0/,'')
        },
        {
            id: "babip", category: "bat", title: "BABIP", full: "Batting Average on Balls In Play",
            short: "インプレー打球のヒット率（運の指標）",
            desc: "本塁打以外のフェアゾーンに飛んだ打球がヒットになった割合。極端に高い/低い場合は「運」や「守備」の影響が強い",
            formula: `(${formatVar('安打')}-${formatVar('本塁打')}) ÷ (${formatVar('打数')}-${formatVar('三振')}-${formatVar('本塁打')}+${formatVar('犠飛')})`,
            criteria: ".300前後が基準",
            inputs: [{id:'h', label:'安打'}, {id:'hr', label:'本塁打'}, {id:'ab', label:'打数'}, {id:'so', label:'三振'}, {id:'sf', label:'犠飛'}],
            calc: (d) => ((d.h - d.hr) / (d.ab - d.so - d.hr + d.sf)).toFixed(3).replace(/^0/,'')
        },
        {
            id: "bb_k", category: "bat", title: "BB/K", full: "Walk to Strikeout Ratio",
            short: "三振1つに対する四球の数",
            desc: "選球眼とコンタクト能力のバランスを示す。1.0を超えれば非常に優秀な打者とされる",
            formula: `${formatVar('四球')} ÷ ${formatVar('三振')}`,
            criteria: "0.4: 平均 / 1.0以上: 優秀",
            inputs: [{id:'bb', label:'四球'}, {id:'so', label:'三振'}],
            calc: (d) => (d.bb / d.so).toFixed(2)
        },
        {
            id: "k_pct", category: "bat", title: "K%", full: "Strikeout Percentage",
            short: "打席に占める三振の割合",
            desc: "三振が少ないほどコンタクト能力が高いとされるが、現代野球では長打とのトレードオフとしてある程度許容される傾向がある",
            formula: `${formatVar('三振')} ÷ ${formatVar('打席')}`,
            criteria: "20%: 平均 / 10%以下: コンタクト巧者",
            inputs: [{id:'so', label:'三振'}, {id:'pa', label:'打席'}],
            calc: (d) => ((d.so / d.pa) * 100).toFixed(1) + '%'
        },
        {
            id: "bb_pct", category: "bat", title: "BB%", full: "Walk Percentage",
            short: "打席に占める四球の割合",
            desc: "選球眼の良さを示す。打率が低くてもBB%が高い選手は出塁能力が高く、チームへの貢献度は大きいとされる",
            formula: `${formatVar('四球')} ÷ ${formatVar('打席')}`,
            criteria: "8%: 平均 / 10%以上: 選球眼が良い",
            inputs: [{id:'bb', label:'四球'}, {id:'pa', label:'打席'}],
            calc: (d) => ((d.bb / d.pa) * 100).toFixed(1) + '%'
        },
        {
            id: "rc", category: "bat", title: "RC", full: "Runs Created",
            short: "打者が創出した総得点数",
            desc: "ビル・ジェームズが考案した古典的な指標。安打や四球などの出塁能力と、長打力を掛け合わせて得点能力を推定する",
            formula: `(出塁能力A × 進塁能力B) ÷ (打席C)`,
            criteria: "積み上げ型指標",
            inputs: [{id:'h', label:'安打'}, {id:'bb', label:'四球'}, {id:'tb', label:'塁打'}, {id:'ab', label:'打数'}, {id:'sf', label:'犠飛'}],
            calc: (d) => {
                // Basic RC Formula
                const a = d.h + d.bb;
                const b = d.tb;
                const c = d.ab + d.bb;
                return ((a * b) / c).toFixed(1);
            }
        },
        {
            id: "rc27", category: "bat", title: "RC27", full: "Runs Created per 27 Outs",
            short: "この打者9人で打線を組んだ時の1試合予想得点",
            desc: "RCを27アウト（1試合分）に換算したもの。打者の得点能力を直感的に理解しやすい",
            formula: `RC ÷ (${formatVar('打数')}-${formatVar('安打')}+${formatVar('盗塁死')}+${formatVar('併殺')}+${formatVar('犠打')}+${formatVar('犠飛')}) × 27`,
            criteria: "4.5点: 平均",
            inputs: [{id:'h', label:'安打'}, {id:'bb', label:'四球'}, {id:'tb', label:'塁打'}, {id:'ab', label:'打数'}],
            calc: (d) => {
                const rc = ((d.h + d.bb) * d.tb) / (d.ab + d.bb);
                const outs = d.ab - d.h; 
                return (rc / outs * 27).toFixed(2);
            }
        },
        {
            id: "xr", category: "bat", title: "XR", full: "Extrapolated Runs",
            short: "各プレーに得点価値係数を掛けて算出する得点力",
            desc: "RCと似ているが、より各イベント（単打0.5点、本塁打1.44点など）の得点貢献を線形的に足し合わせて評価する指標",
            formula: `0.5×${formatVar('単打')} + 0.72×${formatVar('二塁打')} + 1.44×${formatVar('HR')} + 0.34×(${formatVar('四球')}+${formatVar('死球')})...`,
            criteria: "RC27と同様に評価可能",
            related: ["rc27"],
            inputs: [{id:'s', label:'単打'}, {id:'d', label:'二塁打'}, {id:'t', label:'三塁打'}, {id:'hr', label:'本塁打'}, {id:'bb', label:'四死球'}],
            calc: (d) => (0.5*d.s + 0.72*d.d + 1.04*d.t + 1.44*d.hr + 0.34*d.bb).toFixed(1)
        },
        {
            id: "ab_hr", category: "bat", title: "AB/HR", full: "At Bats per Home Run",
            short: "HR1本打つのにかかる打数",
            formula: `${formatVar('打数')} ÷ ${formatVar('本塁打')}`,
            criteria: "20.0以下: 本塁打打者",
            inputs: [{id:'ab', label:'打数'}, {id:'hr', label:'本塁打'}],
            calc: (d) => (d.ab / d.hr).toFixed(1)
        },
        {
            id: "pa_bb", category: "bat", title: "PA/BB", full: "Plate Appearances per Walk",
            short: "四球を1つ選ぶのにかかる打席数",
            formula: `${formatVar('打席')} ÷ ${formatVar('四球')}`,
            inputs: [{id:'pa', label:'打席'}, {id:'bb', label:'四球'}],
            calc: (d) => (d.pa / d.bb).toFixed(1)
        },
        {
            id: "isod", category: "bat", title: "IsoD", full: "Isolated Discipline",
            short: "四死球による出塁能力",
            desc: "出塁率から打率を引いて算出する。選球眼の良さを示す",
            formula: `${formatVar('出塁率')} - ${formatVar('打率')}`,
            criteria: "0.06: 平均 / 0.10: 選球眼良",
            inputs: [{id:'obp', label:'出塁率'}, {id:'avg', label:'打率'}],
            calc: (d) => (d.obp - d.avg).toFixed(3).replace(/^0/,'')
        },
        {
            id: "gpa", category: "bat", title: "GPA", full: "Gross Production Average",
            short: "OPSより打率に近い感覚で評価できる指標",
            desc: "OPSは出塁率を過小評価する傾向があるため、出塁率に1.8倍の重みをかけてバランスを取り、さらに打率のようなスケールに変換したもの",
            formula: `(1.8 × ${formatVar('出塁率')} + ${formatVar('長打率')}) ÷ 4`,
            criteria: ".250: 平均",
            inputs: [{id:'obp', label:'出塁率'}, {id:'slg', label:'長打率'}],
            calc: (d) => ((1.8 * d.obp + d.slg) / 4).toFixed(3).replace(/^0/,'')
        },
        {
            id: "seca", category: "bat", title: "SecA", full: "Secondary Average",
            short: "打率以外の要素（四球、長打、盗塁）での貢献度",
            desc: "ビル・ジェームズ考案。「打率」に含まれない攻撃力を測る",
            formula: `(${formatVar('塁打')}-${formatVar('安打')} + ${formatVar('四球')} + ${formatVar('盗塁')} - ${formatVar('盗塁死')}) ÷ ${formatVar('打数')}`,
            criteria: ".250: 平均 / .400: 超優秀",
            inputs: [{id:'tb', label:'塁打'}, {id:'h', label:'安打'}, {id:'bb', label:'四球'}, {id:'sb', label:'盗塁'}, {id:'cs', label:'盗塁死'}, {id:'ab', label:'打数'}],
            calc: (d) => ((d.tb - d.h + d.bb + d.sb - d.cs) / d.ab).toFixed(3).replace(/^0/,'')
        },
        {
            id: "noi", category: "bat", title: "NOI", full: "New Offensive Index",
            short: "出塁率＋長打率÷3",
            desc: "OPSの簡易修正版。出塁率の価値を長打率の3倍と見積もって計算する。",
            formula: `(${formatVar('出塁率')} + ${formatVar('長打率')} ÷ 3) × 1000`,
            criteria: "450: 平均 / 550: 優秀",
            inputs: [{id:'obp', label:'出塁率'}, {id:'slg', label:'長打率'}],
            calc: (d) => ((d.obp + d.slg / 3) * 1000).toFixed(0)
        },
        
        /* ---------------- 投球 (Pitching) ---------------- */
        {
            id: "era", category: "std", title: "ERA", full: "Earned Run Average",
            short: "防御率",
            formula: `${formatVar('自責点')} × 9 ÷ ${formatVar('投球回')}`,
            criteria: "3.00: 平均",
            inputs: [{id:'er', label:'自責点'}, {id:'ip', label:'投球回'}],
            calc: (d) => (d.er * 9 / d.ip).toFixed(2)
        },
        {
            id: "whip", category: "std", title: "WHIP", full: "Walks plus Hits per Inning Pitched",
            short: "1回あたりに出したランナーの数",
            formula: `(${formatVar('被安打')} + ${formatVar('与四球')}) ÷ ${formatVar('投球回')}`,
            criteria: "1.30: 平均 / 1.00未満: エース",
            inputs: [{id:'h', label:'被安打'}, {id:'bb', label:'与四球'}, {id:'ip', label:'投球回'}],
            calc: (d) => ((d.h + d.bb) / d.ip).toFixed(2)
        },
        {
            id: "fip", category: "pit", title: "FIP", full: "Fielding Independent Pitching",
            short: "守備の影響を除外した「真の防御率」",
            desc: "投手の責任である三振・四球・被本塁打のみで評価する。防御率よりも将来の成績予測に役立つ",
            formula: `(13×${formatVar('本塁打')} + 3×(${formatVar('四球')}+${formatVar('死球')}) - 2×${formatVar('三振')}) ÷ ${formatVar('投球回')} + 3.10`,
            criteria: "防御率スケール",
            inputs: [{id:'hr', label:'被本塁打'}, {id:'bb', label:'与四球'}, {id:'hbp', label:'与死球'}, {id:'so', label:'奪三振'}, {id:'ip', label:'投球回'}],
            calc: (d) => ((13*d.hr + 3*(d.bb+d.hbp) - 2*d.so)/d.ip + 3.10).toFixed(2)
        },
        {
            id: "xfip", category: "pit", title: "xFIP", full: "Expected FIP",
            short: "被本塁打の代わりに「フライボール数」を用いたFIPの進化版",
            desc: "HR/FB（フライに対する本塁打の割合）をリーグ平均値に置き換えて計算する。被本塁打の運要素を排除し、より純粋な実力を測る。",
            formula: `(13 × (FB × LgHR/LgFB) + 3 × (BB - IBB + HBP) - 2 × SO) ÷ IP + 定数`,
            criteria: "防御率スケール",
            aiMode: true,
            inputs: [
                {id:'ip', label:'投球回'}, {id:'so', label:'奪三振'}, {id:'bb', label:'与四球'}, {id:'hbp', label:'与死球'},
                // 変更: 実数入力廃止 -> 傾向選択へ
                {id:'gb_type', label:'打球傾向(GB%)', type:'select', options:{
                    '55':'55% (超ゴロP)', 
                    '50':'50% (ゴロP)', 
                    '45':'45% (平均)', 
                    '40':'40% (フライP)', 
                    '35':'35% (超フライP)'
                }},
                // --- 統一された詳細設定 ---
                ...ADVANCED_LEAGUE_INPUTS
            ],
            calc: (d) => {
                // 打球内訳を推定
                estimateBattedBalls(d);
                
                const C = calcDerived(d);
                const est_ibb = d.bb * 0.04;
                
                // d.fb は estimateBattedBalls で生成されている
                const term1 = 13 * C.lg_xfip_ratio * d.fb;
                const term2 = 3 * (d.bb - est_ibb + d.hbp);
                const term3 = 2 * d.so;
                
                // xFIP = (13 * lg_xfip_ratio * FB + 3 * (BB - IBB + HBP) - 2 * SO) / IP + xfip_constant
                const val = (term1 + term2 - term3) / d.ip + C.xfip_constant;
                
                return isFinite(val) ? val.toFixed(2) : "---";
            }
        },
        {
            id: "siera", category: "pit", title: "SIERA", full: "Skill-Interactive Earned Run Average",
            short: "打球の質や三振・四球を考慮した、FIPより精度の高い指標",
            desc: "投球の「質」を最も正確に反映するとされる指標。ゴロ率や三振、四球のバランスから算出される。",
            // formula: `6.145 - 16.99(SO/PA) + 11.43(BB/PA) - 1.86((GB-FB-PU)/PA) + ...`,
            formula: `6.145 - 16.99(SO/PA) + 11.43(BB/PA) - 1.86((GB-FB-PU)/PA) + 7.65((SO/PA)²) - 6.66(((GB-FB-PU)/PA)²) + 10.13(SO/PA)((GB-FB-PU)/PA) - 5.20(BB/PA)((GB-FB-PU)/PA)`,
            criteria: "失点率スケール (3.00: 優秀)",
            related: ["fip", "xfip", "tra"],
            aiMode: true,
            inputs: [
                {id:'ip', label:'投球回'}, {id:'so', label:'奪三振'}, {id:'bb', label:'与四球'}, 
                {id:'hr', label:'被本塁打'}, // 必須項目に変更
                // 変更: 実数入力廃止 -> 傾向選択へ
                {id:'gb_type', label:'打球傾向(GB%)', type:'select', options:{
                    '55':'55% (超ゴロP)', 
                    '50':'50% (ゴロP)', 
                    '45':'45% (平均)', 
                    '40':'40% (フライP)', 
                    '35':'35% (超フライP)'
                }},
                {id:'bf', label:'打者数'}, // 必須項目に変更
                
                // --- 統一された詳細設定の追加 ---
                ...ADVANCED_LEAGUE_INPUTS
            ],
            calc: (d) => {
                // 打球内訳を推定
                estimateBattedBalls(d);

                const pa = d.bf;
                // ゼロ除算防止 (打者数(bf)が0の場合は計算不可)
                if (!pa || pa === 0) return "---";

                // SIERA計算 (Updated Formula)
                // SIERA = 6.145 – 16.986*(SO/PA) + 11.434*(BB/PA) – 1.858*((GB-FB-PU)/PA) 
                //       + 7.653*((SO/PA)^2) - 6.664*(((GB-FB-PU)/PA)^2)
                //       + 10.130*(SO/PA)*((GB-FB-PU)/PA) – 5.195*(BB/PA)*((GB-FB-PU)/PA)
                
                const A = d.so / pa;
                const B = d.bb / pa;
                const C_val = (d.gb - d.fb - d.pu) / pa;
                
                const val = 6.145 
                    - 16.986 * A 
                    + 11.434 * B 
                    - 1.858 * C_val 
                    + 7.653 * (A * A) 
                    - 6.664 * (C_val * C_val) 
                    + 10.130 * A * C_val 
                    - 5.195 * B * C_val;
                
                return isFinite(val) ? val.toFixed(2) : "---";
            }
        },
        {
            id: "tra", category: "pit", title: "tRA", full: "True Runs Allowed",
            short: "打球の種類（ゴロ・フライなど）も考慮した指標",
            desc: "FIPを発展させ、各打球種別（ライナー、ゴロ、フライ）の期待失点値を割り当てて算出する指標。",
            formula: `( (0.297×BB + 0.327×HBP - 0.108×SO + 1.401×HR + 0.036×GB - 0.124×PU + 0.132×FB + 0.289×LD) ÷ (SO + 0.745×GB + 0.304×LD + 0.994×PU + 0.675×FB) × 27 ) + 定数`,
            criteria: "失点率スケール",
            related: ["fip"],
            aiMode: true,
            inputs: [
                {id:'ip', label:'投球回'}, {id:'so', label:'奪三振'}, {id:'bb', label:'与四球'}, {id:'hbp', label:'与死球'}, {id:'hr', label:'被HR'},
                {id:'gb_type', label:'打球傾向(GB%)', type:'select', options:{
                    '55':'55% (超ゴロP)', 
                    '50':'50% (ゴロP)', 
                    '45':'45% (平均)', 
                    '40':'40% (フライP)', 
                    '35':'35% (超フライP)'
                }},
                // --- 統一された詳細設定 ---
                ...ADVANCED_LEAGUE_INPUTS
            ],
            calc: (d) => {
                estimateBattedBalls(d);
                const C = calcDerived(d);
                
                // tRA計算 (Updated Formula)
                const numerator = 
                    0.297 * d.bb + 
                    0.327 * d.hbp - 
                    0.108 * d.so + 
                    1.401 * d.hr + 
                    0.036 * d.gb - 
                    0.124 * d.pu + 
                    0.132 * d.fb + 
                    0.289 * d.ld;
                    
                const denominator = 
                    d.so + 
                    0.745 * d.gb + 
                    0.304 * d.ld + 
                    0.994 * d.pu + 
                    0.675 * d.fb;
                
                if (denominator === 0) return "---";

                // tRA Raw (Base value)
                const tra_raw = (numerator / denominator) * 27;
                
                // 定数加算 (リーグRA9に合わせる補正)
                const val = tra_raw + C.tra_constant;
                
                return isFinite(val) ? val.toFixed(2) : "---";
            }
        },
        {
            id: "k_9", category: "pit", title: "K/9", full: "Strikeouts per 9",
            short: "奪三振率",
            formula: `${formatVar('奪三振')} × 9 ÷ ${formatVar('投球回')}`,
            criteria: "7.0: 平均 / 9.0: ドクターK",
            inputs: [{id:'so', label:'奪三振'}, {id:'ip', label:'投球回'}],
            calc: (d) => (d.so * 9 / d.ip).toFixed(2)
        },
        {
            id: "bb_9", category: "pit", title: "BB/9", full: "Walks per 9",
            short: "与四球率",
            formula: `${formatVar('与四球')} × 9 ÷ ${formatVar('投球回')}`,
            criteria: "3.0: 平均 / 2.0以下: 制球良",
            inputs: [{id:'bb', label:'与四球'}, {id:'ip', label:'投球回'}],
            calc: (d) => (d.bb * 9 / d.ip).toFixed(2)
        },
        {
            id: "k_pct_pit", category: "pit", title: "K%", full: "Strikeout Percentage (Pitcher)",
            short: "対戦打者に占める奪三振の割合",
            desc: "奪三振率(K/9)よりも投球回数に依存せず、投手の支配力を正確に表す指標",
            formula: `${formatVar('奪三振')} ÷ ${formatVar('打者数')}`,
            criteria: "20%: 平均 / 30%: 優秀",
            inputs: [{id:'so', label:'奪三振'}, {id:'bf', label:'打者数'}],
            calc: (d) => ((d.so / d.bf) * 100).toFixed(1) + '%'
        },
        {
            id: "bb_pct_pit", category: "pit", title: "BB%", full: "Walk Percentage (Pitcher)",
            short: "対戦打者に占める与四球の割合",
            desc: "与四球率(BB/9)よりも投球回数に依存せず、制球力を正確に表す指標",
            formula: `${formatVar('与四球')} ÷ ${formatVar('打者数')}`,
            criteria: "8%: 平均 / 5%以下: 優秀",
            inputs: [{id:'bb', label:'与四球'}, {id:'bf', label:'打者数'}],
            calc: (d) => ((d.bb / d.bf) * 100).toFixed(1) + '%'
        },
        {
            id: "k_bb_pit", category: "pit", title: "K/BB", full: "K-to-BB Ratio",
            short: "奪三振と与四球の比率",
            desc: "投手の完成度・安定感を示す重要指標。3.5を超えると非常に優秀とされる",
            formula: `${formatVar('奪三振')} ÷ ${formatVar('与四球')}`,
            criteria: "2.5: 平均 / 4.0: 非常に優秀",
            inputs: [{id:'so', label:'奪三振'}, {id:'bb', label:'与四球'}],
            calc: (d) => (d.so / d.bb).toFixed(2)
        },
        {
            id: "gb_pct", category: "pit", title: "GB%", full: "Ground Ball Percentage (Est)",
            short: "打球傾向設定に基づく推定ゴロ率",
            desc: "選択された打球傾向設定から算出されたゴロ率を表示する",
            formula: `推定値`,
            criteria: "45%: 平均 / 50%超: ゴロP",
            aiMode: true,
            inputs: [
                {id:'gb_type', label:'打球傾向(GB%)', type:'select', options:{
                    '55':'55% (超ゴロP)', 
                    '50':'50% (ゴロP)', 
                    '45':'45% (平均)', 
                    '40':'40% (フライP)', 
                    '35':'35% (超フライP)'
                }}
            ],
            calc: (d) => d.gb_type ? d.gb_type + '%' : "45%"
        },
        {
            id: "fb_pct", category: "pit", title: "FB%", full: "Fly Ball Percentage (Est)",
            short: "打球傾向設定に基づく推定フライ率",
            desc: "選択された打球傾向設定から算出されたフライ率（内野フライ含む）を表示する",
            formula: `推定値`,
            criteria: "35%: 平均",
            aiMode: true,
            inputs: [
                {id:'gb_type', label:'打球傾向(GB%)', type:'select', options:{
                    '55':'55% (超ゴロP)', 
                    '50':'50% (ゴロP)', 
                    '45':'45% (平均)', 
                    '40':'40% (フライP)', 
                    '35':'35% (超フライP)'
                }}
            ],
            calc: (d) => {
                const gb = parseFloat(d.gb_type || 45);
                // LD 21%固定と仮定した場合の残り
                const fb = 100 - gb - 21;
                return fb + '%';
            }
        },

        /* ---------------- 守備 (Fielding) ---------------- */
        {
            id: "uzr", category: "fld", title: "UZR", full: "Ultimate Zone Rating",
            short: "守備による失点防止量（平均比）",
            desc: "1.02などで採用される守備指標のスタンダード。グラウンドをゾーンに分割し、打球ごとの処理難易度に応じて貢献度を算出する",
            formula: "加点方式",
            criteria: "0: 平均 / +15: ゴールドグラブ",
            // 入力された守備評価(def)をそのまま返す簡易実装
            inputs: [{id:'def', label:'守備評価'}], 
            calc: (d) => d.def ? parseFloat(d.def).toFixed(1) : "---"
        },
        {
            id: "der", category: "fld", title: "DER", full: "Defensive Efficiency Ratio",
            short: "本塁打以外のインプレー打球をアウトにした割合",
            desc: "チーム全体の守備力を測る指標。1-被BABIP",
            formula: `1 - ((${formatVar('被安打')} - ${formatVar('被HR')}) ÷ (${formatVar('打者')} - ${formatVar('三振')} - ${formatVar('四球')} - ${formatVar('死球')} - ${formatVar('被HR')}))`,
            criteria: ".700前後が平均",
            inputs: [{id:'h', label:'被安打'}, {id:'hr', label:'被HR'}, {id:'bf', label:'打者数'}, {id:'so', label:'奪三振'}, {id:'bb', label:'与四球'}, {id:'hbp', label:'与死球'}],
            calc: (d) => (1 - ((d.h - d.hr) / (d.bf - d.so - d.bb - d.hbp - d.hr))).toFixed(3).replace(/^0/,'')
        },
        {
            id: "drs", category: "fld", title: "DRS", full: "Defensive Runs Saved",
            short: "UZRと並ぶ守備指標",
            desc: "UZRと同様のコンセプトだが、測定方法が異なる。MLBではUZRと共にゴールドグラブ賞の選考基準となる",
            formula: "加点方式",
            criteria: "+15以上: 最高レベル"
        },
        {
            id: "rf", category: "fld", title: "RF", full: "Range Factor",
            short: "1試合あたりに関与したアウトの数",
            desc: "守備範囲の広さを示すとされる指標だが、投手の奪三振能力などに影響を受けるため、UZRなどより精度は低い",
            formula: `(${formatVar('刺殺')}+${formatVar('補殺')}) ÷ ${formatVar('守備回')} × 9`,
            inputs: [{id:'po', label:'刺殺'}, {id:'a', label:'補殺'}, {id:'inn', label:'守備回'}],
            calc: (d) => ((d.po + d.a) / d.inn * 9).toFixed(2)
        },
        {
            id: "fp", category: "fld", title: "FP%", full: "Fielding Percentage",
            short: "守備率",
            desc: "失策をしなかった割合。守備範囲の広さは考慮されないため、現代のセイバーメトリクスでは重要視されない",
            formula: `(${formatVar('刺殺')}+${formatVar('補殺')}) ÷ (${formatVar('刺殺')}+${formatVar('補殺')}+${formatVar('失策')})`,
            inputs: [{id:'po', label:'刺殺'}, {id:'a', label:'補殺'}, {id:'e', label:'失策'}],
            calc: (d) => ((d.po + d.a)/(d.po + d.a + d.e)).toFixed(3).replace(/^0/,'')
        },

        /* ---------------- 走塁 (Running) ---------------- */
        {
            id: "wsb", category: "fld", title: "wSB", full: "weighted Stolen Base Runs",
            short: "盗塁による得点貢献",
            desc: "盗塁成功によるプラスと、盗塁死によるマイナス（成功よりペナルティが大きい）を合算したもの",
            formula: `0.2×${formatVar('盗塁')} - 0.4×${formatVar('盗塁死')}`,
            desc: "係数は概算値。盗塁死のマイナスは成功のプラスより大きいとされる",
            inputs: [{id:'sb', label:'盗塁'}, {id:'cs', label:'盗塁死'}],
            calc: (d) => (0.2*d.sb - 0.4*d.cs).toFixed(1)
        },
        {
            id: "sb_pct", category: "fld", title: "SB%", full: "Stolen Base Percentage",
            short: "盗塁成功率",
            formula: `${formatVar('盗塁')} ÷ (${formatVar('盗塁')} + ${formatVar('盗塁死')})`,
            criteria: "70%以上が損益分岐点",
            inputs: [{id:'sb', label:'盗塁'}, {id:'cs', label:'盗塁死'}],
            calc: (d) => ((d.sb / (d.sb + d.cs)) * 100).toFixed(1) + '%'
        },

        /* ---------------- その他 ---------------- */
        {
            id: "p_ip", category: "pit", title: "P/IP", full: "Pitches per Inning",
            short: "1イニングあたりの投球数",
            formula: `${formatVar('投球数')} × 9 ÷ ${formatVar('投球回')}`,
            criteria: "15球以下: 省エネ",
            inputs: [{id:'np', label:'球数'}, {id:'ip', label:'投球回'}],
            calc: (d) => d.np > 0 ? (d.np / d.ip).toFixed(1) : "---"
        },
        {
            id: "rsaa", category: "pit", title: "RSAA", full: "Runs Saved Above Average",
            short: "平均的な投手に比べて、どれだけ失点を防いだかを示す",
            desc: "防御率と投球回を基に算出する積み上げ系指標。WARの投球版の簡易計算に使われることがある",
            formula: `(リーグ平均防御率 - ${formatVar('防御率')}) × ${formatVar('投球回')} ÷ 9`,
            criteria: "プラスなら平均以上",
            inputs: [
                {id:'er', label:'自責点'}, 
                {id:'ip', label:'投球回'},
                // リーグ平均防御率の代わりに、詳細設定から推定できるようにする
                ...ADVANCED_LEAGUE_INPUTS
            ],
            calc: (d) => {
                // ERAを計算 (入力がない場合は自責点から計算)
                const my_era = d.er ? (d.er * 9 / d.ip) : 0;
                
                // リーグ平均防御率を詳細設定から推定
                const C = calcDerived(d);
                const lg_era = C.lg_era_est;
                
                return ((lg_era - my_era) * d.ip / 9).toFixed(1);
            }
        },
        {
            id: "ta", category: "bat", title: "TA", full: "Total Average",
            short: "攻撃の効率性を測る古典的指標",
            desc: "獲得した塁数を、消費したアウト数で割ったもの。OPS普及以前によく使われていた指標。",
            formula: `(${formatVar('塁打')}+${formatVar('四球')}+${formatVar('死球')}+${formatVar('盗塁')}) ÷ (${formatVar('打数')}-${formatVar('安打')}+${formatVar('盗塁死')}+${formatVar('併殺打')})`,
            criteria: "0.700: 平均 / 1.000: 優秀",
            inputs: [
                {id:'tb', label:'塁打'}, {id:'bb', label:'四球'}, {id:'hbp', label:'死球'}, {id:'sb', label:'盗塁'},
                {id:'ab', label:'打数'}, {id:'h', label:'安打'}, {id:'cs', label:'盗塁死'}, {id:'gidp', label:'併殺打'}
            ],
            calc: (d) => {
                const num = d.tb + d.bb + d.hbp + d.sb;
                const denom = d.ab - d.h + d.cs + d.gidp;
                return denom > 0 ? (num / denom).toFixed(3) : "---";
            }
        },
        {
            id: "psn", category: "bat", title: "PSN", full: "Power-Speed Number",
            short: "パワーとスピードの兼備レベルを示す",
            desc: "本塁打数と盗塁数の調和平均。トリプルスリーなどを狙う選手のバランス評価に使われる。",
            formula: `(2 × ${formatVar('本塁打')} × ${formatVar('盗塁')}) ÷ (${formatVar('本塁打')} + ${formatVar('盗塁')})`,
            criteria: "20.0: 一流 / 30.0: 超一流",
            inputs: [{id:'hr', label:'本塁打'}, {id:'sb', label:'盗塁'}],
            calc: (d) => {
                return (d.hr + d.sb) > 0 ? ((2 * d.hr * d.sb) / (d.hr + d.sb)).toFixed(2) : "0.00";
            }
        },
        {
            id: "tto_pct", category: "bat", title: "TTO%", full: "Three True Outcomes Percentage",
            short: "「運に左右されない結果」の割合",
            desc: "打席結果が守備の影響を受けない「三振、四球、本塁打」のいずれかで終わった割合。現代野球ではこの割合が増加傾向にある。",
            formula: `(${formatVar('三振')} + ${formatVar('四球')} + ${formatVar('本塁打')}) ÷ ${formatVar('打席')}`,
            criteria: "35%: 平均 / 50%: 極端なパワーヒッター",
            inputs: [{id:'so', label:'三振'}, {id:'bb', label:'四球'}, {id:'hr', label:'本塁打'}, {id:'pa', label:'打席'}],
            calc: (d) => ((d.so + d.bb + d.hr) / d.pa * 100).toFixed(1) + '%'
        },
        {
            id: "pa_so", category: "bat", title: "PA/K", full: "Plate Appearances per Strikeout",
            short: "1三振するまでにかかる打席数",
            desc: "三振の少なさ（コンタクト能力）を示す指標。K%の逆数的な意味合いを持つ。",
            formula: `${formatVar('打席')} ÷ ${formatVar('三振')}`,
            criteria: "5.0: 平均 / 10.0: 三振しない",
            inputs: [{id:'pa', label:'打席'}, {id:'so', label:'三振'}],
            calc: (d) => (d.so > 0 ? (d.pa / d.so).toFixed(1) : "---")
        },
        {
            id: "hr_fb_bat", category: "bat", title: "HR/FB", full: "HR per Fly Ball (Batter)",
            short: "フライが本塁打になる確率",
            desc: "パワーの指標。これが極端に高い場合は運が良いか、真のパワーヒッターかのどちらかである。",
            formula: `${formatVar('本塁打')} ÷ ${formatVar('フライ総数')}`,
            criteria: "10%: 平均 / 20%: パワーヒッター",
            related: ["xfip"]
        },
        {
            id: "hard_pct", category: "bat", title: "Hard%", full: "Hard Contact Percentage",
            short: "強い打球（95mph以上）の割合",
            desc: "Statcastデータに基づく指標。打球速度が速いほどヒットや長打になる確率は高まる。",
            formula: "打球速度95マイル以上の打球数 ÷ 全打球数",
            criteria: "35%: 平均 / 50%: エリート"
        },
        {
            id: "barrel_pct", category: "bat", title: "Barrel%", full: "Barrel Percentage",
            short: "「バレル」ゾーンに入った打球の割合",
            desc: "打球速度と角度の組み合わせが、長打になる確率が最も高いゾーン（バレル）に入った割合。",
            formula: "バレル打球数 ÷ 打球数 (BBE)",
            criteria: "6-9%: 平均 / 15%以上: エリート",
            related: ["xwoba"]
        },
        {
            id: "xwoba", category: "bat", title: "xwOBA", full: "Expected wOBA",
            short: "打球の質から推定されるwOBA",
            desc: "打球速度と角度から「本来なるはずだった結果」を算出し、三振・四球と合わせて計算したwOBA。運の要素を排除した真の実力。",
            formula: "Statcast推定",
            criteria: ".320: 平均",
            related: ["woba"]
        },
        {
            id: "xba", category: "bat", title: "xBA", full: "Expected Batting Average",
            short: "期待打率",
            desc: "打球速度・角度・スプリントスピードなどから推定される「本来あるべき打率」。",
            formula: "Statcast推定",
            related: ["avg", "babip"]
        },
        {
            id: "whiff_pct", category: "bat", title: "Whiff%", full: "Whiff Percentage",
            short: "空振り率（スイング対比）",
            desc: "振ったスイングのうち、空振りになった割合。コンタクト能力の低さを示す。",
            formula: "空振り数 ÷ スイング総数",
            criteria: "25%: 平均"
        },
        {
            id: "chase_pct", category: "bat", title: "O-Swing%", full: "Outside Zone Swing % (Chase Rate)",
            short: "ボール球スイング率",
            desc: "ストライクゾーンから外れた球を振ってしまった割合。選球眼の悪さや積極性を示す。",
            formula: "ゾーン外スイング ÷ ゾーン外投球数",
            criteria: "30%: 平均 / 20%: 選球眼良"
        },
        {
            id: "zone_pct", category: "bat", title: "Zone%", full: "Zone Percentage",
            short: "ストライクゾーンへの投球割合",
            desc: "相手投手がどれだけゾーン内で勝負してきているかを示す。強打者ほど避けられやすく、Zone%は下がる傾向がある。",
            formula: "ゾーン内投球数 ÷ 全投球数",
            criteria: "48-51%: 平均"
        },
        {
            id: "swstr_pct", category: "bat", title: "SwStr%", full: "Swinging Strike Percentage",
            short: "空振り率（全投球対比）",
            desc: "全投球のうち空振りを奪った割合。投手視点では奪三振能力、打者視点ではコンタクト難易度。",
            formula: "空振り数 ÷ 全投球数",
            criteria: "10-12%: 平均"
        },
        {
            id: "ubr", category: "fld", title: "UBR", full: "Ultimate Base Running",
            short: "盗塁以外の走塁貢献",
            desc: "タッチアップや一塁からの長打での生還など、盗塁以外の走塁による得点貢献を得点価値化したもの。",
            formula: "加点方式",
            criteria: "0: 平均"
        },
        {
            id: "wgdp", category: "bat", title: "wGDP", full: "Weighted GIDP Runs",
            short: "併殺打による得点損失",
            desc: "平均的な選手と比較して、併殺打によってどれだけ得点機会を潰したか（あるいは回避したか）を示す。",
            formula: "併殺打数 × 損失価値係数",
            criteria: "0: 平均"
        },
        {
            id: "bsr", category: "fld", title: "BsR", full: "Base Running Runs",
            short: "走塁総合貢献 (wSB + UBR + wGDP)",
            desc: "盗塁(wSB)、走塁(UBR)、併殺回避(wGDP)をすべて合計した、走塁による総合的な得点貢献。",
            formula: "wSB + UBR + wGDP",
            criteria: "0: 平均 / +6.0: 神足"
        },
    
        /* ---------------- 投手 (Pitching) ---------------- */
        {
            id: "ra9", category: "pit", title: "RA9", full: "Runs Allowed per 9 Innings",
            short: "9イニングあたりの失点率",
            desc: "防御率(ERA)とは異なり、自責点ではなく「総失点」を用いて計算する。実際に防いだ失点量を示す。",
            formula: `${formatVar('失点')} × 9 ÷ ${formatVar('投球回')}`,
            criteria: "4.00前後: 平均",
            inputs: [{id:'r', label:'失点'}, {id:'ip', label:'投球回'}],
            calc: (d) => (d.r * 9 / d.ip).toFixed(2)
        },
        {
            id: "h_9", category: "pit", title: "H/9", full: "Hits per 9",
            short: "9イニングあたりの被安打数",
            desc: "打たれにくさを示すが、運や守備力の影響を受けやすい。",
            formula: `${formatVar('被安打')} × 9 ÷ ${formatVar('投球回')}`,
            criteria: "8.5: 平均",
            inputs: [{id:'h', label:'被安打'}, {id:'ip', label:'投球回'}],
            calc: (d) => (d.h * 9 / d.ip).toFixed(2)
        },
        {
            id: "hr_9", category: "pit", title: "HR/9", full: "Home Runs per 9",
            short: "9イニングあたりの被本塁打数",
            desc: "一発病の傾向を示す。被本塁打はFIP計算において最も重いウェイトを占める。",
            formula: `${formatVar('被本塁打')} × 9 ÷ ${formatVar('投球回')}`,
            criteria: "1.0: 平均 / 0.5: 優秀",
            inputs: [{id:'hr', label:'被本塁打'}, {id:'ip', label:'投球回'}],
            calc: (d) => (d.hr * 9 / d.ip).toFixed(2)
        },
        {
            id: "k_minus_bb", category: "pit", title: "K-BB%", full: "Strikeout minus Walk Percentage",
            short: "奪三振率と与四球率の差",
            desc: "K/BBよりも投手の能力を素直に反映するとされる指標。投手の基礎能力を測るのに最適。",
            formula: `${formatVar('K%')} - ${formatVar('BB%')}`,
            criteria: "15%: 平均 / 20%: 優秀 / 25%: エース",
            inputs: [{id:'so', label:'奪三振'}, {id:'bb', label:'与四球'}, {id:'bf', label:'打者数'}],
            calc: (d) => (((d.so - d.bb) / d.bf) * 100).toFixed(1) + '%'
        },
        {
            id: "lob_pct", category: "pit", title: "LOB%", full: "Left On Base Percentage",
            short: "残塁率（粘り強さ）",
            desc: "出塁させたランナーをどれだけホームに還さなかったか。72%前後が平均で、極端に高い・低い場合は運の影響が疑われる。",
            formula: `(${formatVar('安打')}+${formatVar('四死球')}-${formatVar('失点')}) ÷ (${formatVar('安打')}+${formatVar('四死球')}-1.4×${formatVar('HR')})`,
            criteria: "70-72%: 平均",
            inputs: [{id:'h', label:'被安打'}, {id:'bb', label:'与四球'}, {id:'hbp', label:'与死球'}, {id:'r', label:'失点'}, {id:'hr', label:'被本塁打'}],
            calc: (d) => {
                const num = d.h + d.bb + d.hbp - d.r;
                const denom = d.h + d.bb + d.hbp - (1.4 * d.hr);
                return denom > 0 ? ((num / denom) * 100).toFixed(1) + '%' : "---";
            }
        },
        {
            id: "gb_fb_ratio", category: "pit", title: "GB/FB", full: "Ground Ball to Fly Ball Ratio",
            short: "ゴロとフライの比率",
            desc: "1.0を超えるとゴロ投手、下回るとフライ投手傾向。ゴロ投手は長打を浴びにくいが、守備の影響を受けやすい。",
            formula: `${formatVar('ゴロ')} ÷ ${formatVar('フライ')}`,
            criteria: "1.0: 平均 / 1.5以上: ゴロP",
            // 打球傾向入力から計算
            aiMode: true,
            inputs: [{id:'gb_type', label:'打球傾向(GB%)', type:'select', options:{'55':'55% (超ゴロP)', '50':'50% (ゴロP)', '45':'45% (平均)', '40':'40% (フライP)', '35':'35% (超フライP)'}}],
            calc: (d) => {
                const gb = parseFloat(d.gb_type);
                const fb = 100 - gb - 21; // LD 21% fixed
                return (gb / fb).toFixed(2);
            }
        },
        {
            id: "gmsc", category: "pit", title: "GmSc", full: "Game Score",
            short: "先発投手の1試合ごとの投球評価",
            desc: "50を基準とし、イニング数、奪三振、被安打、失点などから算出されるスコア。100に近づくほど伝説的な投球。",
            formula: `50 + アウト1つにつき1点 + 5回以降1回につき2点 + 三振1点 - 被安打2点 - 自責点4点...`,
            criteria: "50: 平均 / 60: QSレベル / 90: 最高",
            inputs: [{id:'ip', label:'投球回'}, {id:'so', label:'奪三振'}, {id:'h', label:'被安打'}, {id:'r', label:'失点'}, {id:'er', label:'自責点'}, {id:'bb', label:'与四球'}],
            calc: (d) => {
                const outs = Math.floor(d.ip) * 3 + (d.ip % 1 * 10);
                const inn_bonus = d.ip > 4 ? (d.ip - 4) * 2 : 0; // 簡易計算
                return (50 + outs + inn_bonus + d.so - (2 * d.h) - (4 * d.er) - (2 * (d.r - d.er)) - d.bb).toFixed(0);
            }
        },
        {
            id: "qs", category: "pit", title: "QS", full: "Quality Start",
            short: "先発投手の最低限の責任回数",
            desc: "先発して6イニング以上を投げ、自責点3以内に抑えた試合数。",
            criteria: "達成率50%以上でローテ定着"
        },
        {
            id: "hqs", category: "pit", title: "HQS", full: "High Quality Start",
            short: "QSより厳しい基準",
            desc: "7イニング以上を投げ、自責点2以内に抑えた試合数。エース級の指標。",
            criteria: "エースの証"
        },
        {
            id: "csw_pct", category: "pit", title: "CSW%", full: "Called Strikes + Whiffs Percentage",
            short: "見逃し＋空振り率",
            desc: "全投球のうち、見逃しストライクと空振りを奪った割合。K%やSIERAとの相関が強く、投手の「支配力」を示す。",
            formula: "(見逃しS + 空振り) ÷ 全投球",
            criteria: "30%: 優秀"
        },
        {
            id: "stuff_plus", category: "pit", title: "Stuff+", full: "Stuff Plus",
            short: "「球威」の傑出度",
            desc: "球速、回転数、変化量など物理的特性のみから「どれだけ打たれにくい球か」を評価した指標。100が平均。",
            formula: "トラッキングデータ解析",
            criteria: "100: 平均 / 120: エース級"
        },
        {
            id: "location_plus", category: "pit", title: "Location+", full: "Location Plus",
            short: "「コマンド（制球）」の傑出度",
            desc: "ストライクゾーンの適切な位置に投げられているかを評価した指標。100が平均。",
            criteria: "100: 平均"
        },
        {
            id: "pitching_plus", category: "pit", title: "Pitching+", full: "Pitching Plus",
            short: "Stuff+とLocation+の総合評価",
            desc: "球威と制球を総合した投手の能力値。将来の成績予測に役立つ。",
            criteria: "100: 平均"
        },
        {
            id: "sv_pct", category: "pit", title: "SV%", full: "Save Percentage",
            short: "セーブ成功率",
            desc: "セーブ機会に対してセーブに成功した割合。",
            formula: `${formatVar('セーブ')} ÷ (${formatVar('セーブ')} + ${formatVar('救援失敗')})`,
            criteria: "90%以上: 絶対的守護神",
            inputs: [{id:'sv', label:'セーブ'}, {id:'bs', label:'救援失敗(BS)'}],
            calc: (d) => (d.sv + d.bs) > 0 ? ((d.sv / (d.sv + d.bs)) * 100).toFixed(1) + '%' : "---"
        },
        {
            id: "hld", category: "pit", title: "HLD", full: "Hold",
            short: "ホールド",
            desc: "セーブの条件を満たす局面で登板し、リードを保って降板した救援投手に記録される。",
            criteria: "積み上げ指標"
        },
        {
            id: "bs", category: "pit", title: "BS", full: "Blown Save",
            short: "セーブ失敗",
            desc: "セーブ機会で登板しながら同点または逆転を許した回数。勝利投手になってもBSは記録される。",
            criteria: "少ないほど良い"
        },
        {
            id: "irs_pct", category: "pit", title: "IRS%", full: "Inherited Runners Scored Percentage",
            short: "前の投手が残した走者を還した率",
            desc: "リリーフ投手の「火消し」能力を示す。低いほど優秀。",
            formula: `${formatVar('還した走者')} ÷ ${formatVar('引き継いだ走者')}`,
            criteria: "30%: 平均 / 20%以下: 優秀",
            inputs: [{id:'is', label:'還した走者'}, {id:'ir', label:'引き継いだ走者'}],
            calc: (d) => d.ir > 0 ? ((d.is / d.ir) * 100).toFixed(1) + '%' : "---"
        },
        {
            id: "rs_9", category: "pit", title: "RS/9", full: "Run Support per 9",
            short: "9イニングあたりの援護点",
            desc: "味方打線がどれだけ点を取ってくれたか。勝敗数に大きく影響するが、投手自身の能力ではない。",
            formula: `${formatVar('援護点')} × 9 ÷ ${formatVar('投球回')}`,
            criteria: "4.0: 平均",
            inputs: [{id:'rs_runs', label:'援護点総数'}, {id:'ip', label:'投球回'}],
            calc: (d) => (d.rs_runs * 9 / d.ip).toFixed(2)
        },
        {
            id: "kw_era", category: "pit", title: "kwERA", full: "Kitchen Sink ERA",
            short: "三振と四球のみで計算する簡易防御率予測",
            desc: "被本塁打すら除外し、三振と四球のみで能力を測る。FIPよりもさらに純粋な能力指標。",
            formula: `5.40 - 12 × (${formatVar('K%')} - ${formatVar('BB%')})`,
            criteria: "低いほど優秀",
            inputs: [{id:'so', label:'奪三振'}, {id:'bb', label:'与四球'}, {id:'bf', label:'打者数'}],
            calc: (d) => d.bf > 0 ? (5.40 - 12 * ((d.so - d.bb) / d.bf)).toFixed(2) : "---"
        },
    
        /* ---------------- 守備・総合 (Fielding / Overall) ---------------- */
        {
            id: "rngr", category: "fld", title: "RngR", full: "Range Runs",
            short: "守備範囲による失点抑止",
            desc: "平均的な野手よりどれだけ多くの打球をアウトにしたか（またはヒットにしてしまったか）を点数化したもの。UZRの主要構成要素。",
            criteria: "0: 平均"
        },
        {
            id: "errr", category: "fld", title: "ErrR", full: "Error Runs",
            short: "失策による失点関与",
            desc: "平均的な野手と比較して、失策によってどれだけ失点を増やしたか（減らしたか）。",
            criteria: "0: 平均"
        },
        {
            id: "arm", category: "fld", title: "ARM", full: "Arm Runs",
            short: "送球による失点抑止",
            desc: "外野手の補殺（進塁阻止）による貢献を点数化したもの。肩の強さと正確さを示す。",
            criteria: "0: 平均"
        },
        {
            id: "dpr", category: "fld", title: "DPR", full: "Double Play Runs",
            short: "併殺完成による失点抑止",
            desc: "内野手が併殺を取ることで防いだ失点量。",
            criteria: "0: 平均"
        },
        {
            id: "tz", category: "fld", title: "TZ", full: "Total Zone",
            short: "トータルゾーン",
            desc: "UZRが登場する前に主流だった守備指標。プレイごとのデータではなく、ゾーンごとの集計データを使用する。",
            related: ["uzr", "drs"]
        },
        {
            id: "fraa", category: "fld", title: "FRAA", full: "Fielding Runs Above Average",
            short: "Baseball Prospectus版の守備指標",
            desc: "UZRやDRSとは異なるアプローチで算出される守備貢献度。フレーミングなども考慮される場合がある。",
            criteria: "0: 平均"
        },
        {
            id: "wpa_li", category: "tot", title: "WPA/LI", full: "Context Neutral Wins",
            short: "場面重要度を中立化したWPA",
            desc: "WPA（勝利確率寄与）から「場面の重要度」の影響を取り除いたもの。チャンスで打ったかどうかに関わらず、プレイそのものの価値を評価する。",
            related: ["wpa", "li"]
        },
        {
            id: "li", category: "tot", title: "LI", full: "Leverage Index",
            short: "場面の重要度（レバレッジ）",
            desc: "そのプレイが試合の勝敗にどれだけ影響するかを示す指数。1.0が平均。サヨナラの場面などでは非常に高くなる。",
            criteria: "1.0: 平均 / 2.0以上: 勝負所"
        },
        {
            id: "clutch", category: "tot", title: "Clutch", full: "Clutch",
            short: "勝負強さ",
            desc: "「実際のWPA」と「場面重要度を考慮しない場合のWPA」の差。プラスなら勝負強い、マイナスなら勝負弱いとされるが、年次変動が大きく実力とはみなされにくい。",
            formula: "WPA - (WPA/LI)",
            criteria: "0: 平均"
        },
        {
            id: "cwpa", category: "tot", title: "cWPA", full: "Championship WPA",
            short: "優勝確率への貢献度",
            desc: "WPAが「その試合の勝利」への貢献なら、cWPAは「チームの優勝（ポストシーズン進出）」への貢献度を示す。優勝争いをしている時期の活躍ほど高くなる。",
            criteria: "%表記"
        },
        {
            id: "re", category: "tot", title: "RE", full: "Run Expectancy",
            short: "得点期待値",
            desc: "アウトカウントと走者状況（24パターン）ごとに、そのイニングが終了するまでに平均あと何点入るかを示した数値。",
            criteria: "無死満塁で約2.3点など",
            related: ["re24"]
        },
        {
            id: "linear_weights", category: "tot", title: "LWts", full: "Linear Weights",
            short: "線形加重",
            desc: "wOBAなどの基礎となる考え方。各プレイ（単打、四球など）が得点期待値を平均で何点増やしたかを算出し、係数として用いる手法。",
            related: ["woba", "xr"]
        },
        {
            id: "xera", category: "pit", title: "xERA", full: "Expected ERA",
            short: "予想防御率（Statcast）",
            desc: "打たれた打球の質（xwOBA）に基づいて算出される防御率。xFIPよりもさらに打球の物理的性質を考慮している。",
            related: ["era", "xwoba"]
        },
        {
            id: "dra", category: "pit", title: "DRA", full: "Deserved Run Average",
            short: "最も洗練された防御率指標",
            desc: "Baseball Prospectusが算出。球場、守備、捕手のフレーミング、対戦打者の質、気温などあらゆる要素を調整した「投手の真の責任失点率」。",
            criteria: "失点率スケール"
        },
        {
            id: "wrc", category: "bat", title: "wRC", full: "weighted Runs Created",
            short: "打者が創出した総得点数（wRAAベース）",
            desc: "wRC+の元となる積み上げ指標。平均的な打者と比較したwRAAに、リーグ平均レベルの得点創出数を加えて算出する。RCよりも厳密な得点価値に基づく。",
            formula: `wRAA + (リーグ平均得点率 × 打席数)`,
            criteria: "積み上げ指標",
            related: ["wrc_plus", "wraa"],
            inputs: [
                // wRAA計算用
                {id:'pa', label:'打席数'}, {id:'ab', label:'打数'},
                {id:'h', label:'安打'}, {id:'d', label:'二塁打'}, {id:'t', label:'三塁打'}, {id:'hr', label:'本塁打'}, 
                {id:'bb', label:'四球'}, {id:'hbp', label:'死球'}, {id:'sf', label:'犠飛'},
                {id:'stadium', label:'本拠地', type:'select', options: Object.keys(PARK_FACTORS).reduce((acc, key) => ({...acc, [key]: PARK_FACTORS[key].name}), {})},
                ...ADVANCED_LEAGUE_INPUTS
            ],
            calc: (d) => {
                const C = calcDerived(d);
                const est = estimateDetails(d);
                const fr = C.fitting_ratio;
                const pf = PARK_FACTORS[d.stadium].pf;
    
                // wOBA
                const woba_denom = d.ab + d.bb - est.ibb + d.hbp + d.sf;
                const woba_num = (0.692*fr)*(d.bb-est.ibb) + (0.73*fr)*d.hbp + (0.966*fr)*est.roe + (0.865*fr)*est.s + (1.334*fr)*d.d + (1.725*fr)*d.t + (2.065*fr)*d.hr;
                const woba_val = woba_denom > 0 ? woba_num / woba_denom : 0;
    
                // wRAA
                const raw_wraa = ((woba_val - C.lg_woba) / C.woba_scale) * d.pa;
                const home_ratio = 0.5;
                const pf_coef = (home_ratio * pf) + ((1 - home_ratio) * (6 - pf) / 5);
                const parkAdj = (1 - pf_coef) * C.lg_r_pa * d.pa;
                const wraa = raw_wraa + parkAdj;
    
                // wRC = wRAA + (lg_R/PA * PA)
                return (wraa + (C.lg_r_pa * d.pa)).toFixed(1);
            }
        },
        {
            id: "xslg", category: "bat", title: "xSLG", full: "Expected Slugging Percentage",
            short: "期待長打率",
            desc: "打球速度と角度から、打球が本来どの程度の長打になる確率があったかを推定した指標。実際のSLGとの乖離で運不運を測る。",
            formula: "Statcast推定",
            criteria: ".400: 平均",
            related: ["slg", "xwoba"]
        },
        {
            id: "xwobacon", category: "bat", title: "xwOBAcon", full: "xwOBA on Contact",
            short: "打球のみのxwOBA（三振・四球除く）",
            desc: "バットに当たった打球がどれだけ得点価値を持っていたかを示す。コンタクト能力は無視し、純粋な「破壊力」を評価する。",
            formula: "Statcast推定",
            criteria: ".370前後: 平均"
        },
        {
            id: "barrels_pa", category: "bat", title: "Brls/PA%", full: "Barrels per Plate Appearance",
            short: "打席あたりのバレル率",
            desc: "全打席のうち、バレル打球（長打確率が非常に高い打球）を放った割合。長打力を示す信頼性の高い指標。",
            formula: "バレル数 ÷ 打席数",
            criteria: "4-5%: 平均 / 10%: 超一流"
        },
        {
            id: "la_avg", category: "bat", title: "LA", full: "Average Launch Angle",
            short: "平均打球角度",
            desc: "打球の平均角度。10度〜20度がラインドライブ（安打になりやすい）、25度〜30度がフライ（本塁打になりやすい）とされる。",
            formula: "平均値(度)",
            criteria: "12度: 平均"
        },
        {
            id: "ev_avg", category: "bat", title: "EV", full: "Average Exit Velocity",
            short: "平均打球速度",
            desc: "打球の平均速度。速いほど安打や長打になる確率が高い。近年最も重視される基礎能力の一つ。",
            formula: "平均値(km/h or mph)",
            criteria: "88mph (141km/h): 平均"
        },
        {
            id: "max_ev", category: "bat", title: "MaxEV", full: "Maximum Exit Velocity",
            short: "最高打球速度",
            desc: "その選手が記録した最も速い打球速度。打者のポテンシャル（限界能力）を示す。",
            criteria: "110mph (177km/h)以上: パワーヒッター"
        },
        {
            id: "sweet_spot", category: "bat", title: "SweetSpot%", full: "Sweet Spot Percentage",
            short: "最適角度（8〜32度）の打球割合",
            desc: "ヒットや長打になりやすい角度（スイートスポット）で打球を放った割合。",
            formula: "最適角度打球 ÷ 全打球",
            criteria: "33%: 平均"
        },
        {
            id: "pull_pct", category: "bat", title: "Pull%", full: "Pull Percentage",
            short: "引っ張り方向への打球割合",
            desc: "打球が引っ張り方向（右打者ならレフト側）に飛んだ割合。高いと長打力がある傾向だが、シフトを敷かれやすい。",
            formula: "引張打球 ÷ 全打球",
            criteria: "40%: 平均",
            inputs: [{id:'pull', label:'引張打球数'}, {id:'bbe', label:'全打球数'}],
            calc: (d) => d.bbe > 0 ? ((d.pull/d.bbe)*100).toFixed(1)+'%' : '---'
        },
        {
            id: "oppo_pct", category: "bat", title: "Oppo%", full: "Opposite Field Percentage",
            short: "逆方向への打球割合",
            desc: "打球が流し方向（右打者ならライト側）に飛んだ割合。広角に打てる技術を示す。",
            formula: "逆方向打球 ÷ 全打球",
            criteria: "25%: 平均",
            inputs: [{id:'oppo', label:'逆方向打球数'}, {id:'bbe', label:'全打球数'}],
            calc: (d) => d.bbe > 0 ? ((d.oppo/d.bbe)*100).toFixed(1)+'%' : '---'
        },
        {
            id: "gb_pct_bat", category: "bat", title: "GB% (Bat)", full: "Ground Ball Percentage (Batter)",
            short: "打者のゴロ率",
            desc: "打球に占めるゴロの割合。足の速い選手以外は低い方が好ましいとされる（ゴロは長打になりにくいため）。",
            formula: "ゴロ ÷ 全打球",
            criteria: "45%: 平均",
            inputs: [{id:'gb', label:'ゴロ数'}, {id:'bbe', label:'全打球数'}],
            calc: (d) => d.bbe > 0 ? ((d.gb/d.bbe)*100).toFixed(1)+'%' : '---'
        },
        {
            id: "ld_pct", category: "bat", title: "LD%", full: "Line Drive Percentage",
            short: "ライナー率",
            desc: "打球に占めるライナーの割合。最も安打になりやすい打球。",
            formula: "ライナー ÷ 全打球",
            criteria: "21%: 平均",
            inputs: [{id:'ld', label:'ライナー数'}, {id:'bbe', label:'全打球数'}],
            calc: (d) => d.bbe > 0 ? ((d.ld/d.bbe)*100).toFixed(1)+'%' : '---'
        },
        {
            id: "iffb_pct", category: "bat", title: "IFFB%", full: "Infield Fly Ball Percentage",
            short: "内野フライ率",
            desc: "フライに占める内野フライの割合。ほぼ自動的にアウトになるため、打者にとっては「最悪のフライ」。",
            formula: "内野フライ ÷ 全フライ",
            criteria: "10%: 平均",
            inputs: [{id:'iffb', label:'内野フライ'}, {id:'fb', label:'全フライ'}],
            calc: (d) => d.fb > 0 ? ((d.iffb/d.fb)*100).toFixed(1)+'%' : '---'
        },
        {
            id: "swing_pct", category: "bat", title: "Swing%", full: "Swing Percentage",
            short: "スイング率",
            desc: "全投球に対してスイングした割合。積極性を示す。高すぎるとボール球に手を出しやすくなる傾向がある。",
            formula: "スイング ÷ 全投球",
            criteria: "47%: 平均"
        },
        {
            id: "contact_pct", category: "bat", title: "Contact%", full: "Contact Percentage",
            short: "コンタクト率",
            desc: "スイングした際にバットにボールが当たった（空振りしなかった）割合。",
            formula: "(スイング - 空振り) ÷ スイング",
            criteria: "76%: 平均"
        },
        {
            id: "z_contact_pct", category: "bat", title: "Z-Contact%", full: "Zone Contact Percentage",
            short: "ゾーン内コンタクト率",
            desc: "ストライクゾーン内の球をスイングした際のコンタクト率。この数値が高い打者は三振しにくい。",
            formula: "Statcast計測",
            criteria: "85%: 平均"
        },
        {
            id: "tav", category: "bat", title: "TAv", full: "True Average",
            short: "打撃の総合貢献度（打率スケール）",
            desc: "Baseball Prospectusが算出する総合指標。打率のような感覚で見ることができるが、出塁や長打の価値も適切に含まれている。",
            criteria: ".260: 平均"
        },
    
        /* --- Pitching (Advanced / Statcast) --- */
        {
            id: "era_minus", category: "pit", title: "ERA-", full: "ERA Minus",
            short: "パークファクター補正済み防御率（傑出度）",
            desc: "リーグ平均を100として防御率を指数化したもの。100より低いほど優秀（例：90なら平均より10%優れている）。球場の有利不利も補正される。",
            formula: "100 × (ERA ÷ (LgERA × PF))",
            criteria: "100: 平均 / 80: エース級",
            related: ["era", "fip_minus"],
            inputs: [
                {id:'er', label:'自責点'}, {id:'ip', label:'投球回'},
                {id:'stadium', label:'本拠地', type:'select', options: Object.keys(PARK_FACTORS).reduce((acc, key) => ({...acc, [key]: PARK_FACTORS[key].name}), {})},
                ...ADVANCED_LEAGUE_INPUTS
            ],
            calc: (d) => {
                const era = d.ip > 0 ? (d.er * 9 / d.ip) : 0;
                const C = calcDerived(d);
                const pf = PARK_FACTORS[d.stadium].pf;
                const lg_era = C.lg_era_est; // 推定リーグ防御率
                
                // ERA- = 100 * (ERA / (LgERA * PF)) ※PFはリーグ平均に対するその球場の倍率
                // 簡易式として、球場補正をかけた平均防御率と比較する
                const adj_lg_era = lg_era * pf;
                return adj_lg_era > 0 ? (100 * (era / adj_lg_era)).toFixed(0) : "---";
            }
        },
        {
            id: "fip_minus", category: "pit", title: "FIP-", full: "FIP Minus",
            short: "パークファクター補正済みFIP（傑出度）",
            desc: "ERA-と同様に、FIPをリーグ平均と比較して指数化したもの。100より低いほど優秀。守備の影響を排除した真の投手力を比較するのに最適。",
            formula: "100 × (FIP ÷ (LgFIP × PF))",
            criteria: "100: 平均 / 80: エース級",
            related: ["fip", "era_minus"],
            inputs: [
                {id:'hr', label:'被本塁打'}, {id:'bb', label:'与四球'}, {id:'hbp', label:'与死球'}, {id:'so', label:'奪三振'}, {id:'ip', label:'投球回'},
                {id:'stadium', label:'本拠地', type:'select', options: Object.keys(PARK_FACTORS).reduce((acc, key) => ({...acc, [key]: PARK_FACTORS[key].name}), {})},
                ...ADVANCED_LEAGUE_INPUTS
            ],
            calc: (d) => {
                const fip = d.ip > 0 ? ((13*d.hr + 3*(d.bb+d.hbp) - 2*d.so)/d.ip + 3.10) : 0;
                const C = calcDerived(d);
                // リーグFIPはリーグ防御率に近いと仮定（定数3.10を使っているため）
                // 正確にはリーグごとのFIP定数が必要だが、ここではLgERAを代用基準とする
                const pf = PARK_FACTORS[d.stadium].pf;
                const adj_lg_fip = C.lg_era_est * pf; 
                return adj_lg_fip > 0 ? (100 * (fip / adj_lg_fip)).toFixed(0) : "---";
            }
        },
        {
            id: "era_plus", category: "pit", title: "ERA+", full: "Adjusted ERA+",
            short: "ERA-の逆数版（大きいほど優秀）",
            desc: "リーグ平均防御率を自身の防御率で割ったもの。100が平均で、数値が大きいほど優れている（例：120なら平均より20%良い）。",
            formula: "100 × (LgERA × PF ÷ ERA)",
            criteria: "100: 平均 / 130: 優秀",
            related: ["era_minus"]
        },
        {
            id: "vaa", category: "pit", title: "VAA", full: "Vertical Approach Angle",
            short: "縦の進入角度",
            desc: "ホームベース通過時のボールの縦の角度。高めのストレートはVAAが浅い（地面と平行に近い）ほどホップして見え、空振りが取れやすい。",
            formula: "トラッキングデータ",
            criteria: "-4度台: ホップ型 / -6度台: 沈む球"
        },
        {
            id: "ivb", category: "pit", title: "IVB", full: "Induced Vertical Break",
            short: "伸び（ホップ成分）",
            desc: "重力の影響を除いた縦の変化量。ボールがどれだけ「落ちなかったか」を示す。数値が大きいほど打者の手元で伸びるストレートとなる。",
            formula: "トラッキングデータ",
            criteria: "18インチ以上: ノビがある"
        },
        {
            id: "spin_rate", category: "pit", title: "SpinRate", full: "Spin Rate",
            short: "回転数",
            desc: "ボールが1分間に回転する回数(rpm)。回転数が多いストレートは落ちにくく、カーブは大きく曲がる傾向がある。",
            formula: "回転数/分",
            criteria: "2200rpm: 直球平均"
        },
        {
            id: "bauer_units", category: "pit", title: "Bauer Units", full: "Bauer Units",
            short: "球速に対する回転数の比率",
            desc: "回転数を球速(mph)で割ったもの。球速に関わらず「回転の質」が高いかどうかを判断する目安となる。",
            formula: "回転数 ÷ 球速(mph)",
            criteria: "24.0: 平均",
            inputs: [{id:'spin', label:'回転数(rpm)'}, {id:'velo', label:'球速(mph)'}],
            calc: (d) => d.velo > 0 ? (d.spin / d.velo).toFixed(1) : "---"
        },
        {
            id: "extension", category: "pit", title: "Extension", full: "Extension",
            short: "リリースポイントの前のめり度",
            desc: "プレートからリリース位置までの距離。エクステンションが長いほど打者までの距離が縮まり、体感速度が上がる。",
            formula: "フィート(ft)",
            criteria: "6.3ft: 平均"
        },
        {
            id: "active_spin", category: "pit", title: "Active Spin", full: "Active Spin (Spin Efficiency)",
            short: "有効回転率",
            desc: "ボールの変化に寄与している回転の割合。100%に近いほど綺麗な縦回転（または横回転）で、変化の効率が良い。",
            formula: "有効回転 ÷ 総回転",
            criteria: "直球は高いほど良い"
        },
        {
            id: "meatball_pct", category: "pit", title: "Meatball%", full: "Meatball Percentage",
            short: "ど真ん中失投率",
            desc: "ストライクゾーンの真ん中付近（甘いコース）に投じられた球の割合。低いほどコマンド（制球）が良い。",
            formula: "Statcast計測",
            criteria: "7%: 平均"
        },
        {
            id: "putaway_pct", category: "pit", title: "PutAway%", full: "Put Away Percentage",
            short: "決め球での三振奪取率",
            desc: "2ストライクと追い込んだ状況で、その球種を投じた際に三振を奪えた割合。ウイニングショットの威力。",
            formula: "三振 ÷ 2ストライク後の投球数",
            criteria: "20%: 優秀"
        },
        {
            id: "edge_pct", category: "pit", title: "Edge%", full: "Edge Percentage",
            short: "エッジ（ゾーン境界）投球率",
            desc: "ストライクゾーンの境界線付近（幅ボール1個分）への投球割合。コマンド能力の高さを示す。",
            formula: "Statcast計測",
            criteria: "42%: 平均"
        },
        {
            id: "f_strike_pct", category: "pit", title: "F-Strike%", full: "First Pitch Strike Percentage",
            short: "初球ストライク率",
            desc: "初球でストライク（ファウル・インプレー含む）を取った割合。カウント有利に進める能力。",
            formula: "初球ストライク ÷ 全対戦数",
            criteria: "60%: 平均 / 65%以上: 優秀"
        },
        {
            id: "hr_fb_pit", category: "pit", title: "HR/FB (Pit)", full: "HR per Fly Ball (Pitcher)",
            short: "被フライあたりの被本塁打率",
            desc: "打たれたフライが本塁打になった割合。リーグ平均より極端に高い場合は「運が悪い」可能性があり、xFIPでの補正対象となる。",
            formula: "被本塁打 ÷ 被フライ数",
            criteria: "10-12%: 平均",
            inputs: [{id:'hr', label:'被本塁打'}, {id:'fb', label:'被フライ数'}],
            calc: (d) => d.fb > 0 ? ((d.hr/d.fb)*100).toFixed(1)+'%' : '---'
        },
        {
            id: "pace", category: "pit", title: "Pace", full: "Pace",
            short: "投球間隔（秒）",
            desc: "投手が前の投球から次の投球動作に入るまでの平均秒数。近年はピッチクロック導入により短縮傾向。",
            formula: "秒数",
            criteria: "速いほうが守備のリズムが良いとされる"
        },
    
        /* --- Fielding / Running / Other --- */
        {
            id: "oaa", category: "fld", title: "OAA", full: "Outs Above Average",
            short: "平均より多く取ったアウトの数",
            desc: "Statcastによる守備指標。打球の滞空時間や野手の移動距離から「アウト確率」を算出し、実際にアウトにしたかどうかで貢献度を積算する。",
            formula: "Statcast計測",
            criteria: "0: 平均 / +10: 名手"
        },
        {
            id: "frm", category: "fld", title: "FRM", full: "Catcher Framing",
            short: "フレーミング貢献度",
            desc: "捕手が際どいコースをストライクと判定させる技術（フレーミング）による得点貢献。",
            formula: "CSAA等を換算",
            criteria: "0: 平均"
        },
        {
            id: "pop_time", category: "fld", title: "Pop Time", full: "Pop Time",
            short: "ポップタイム（二塁送球時間）",
            desc: "捕手が捕球してから二塁ベース上の野手が捕球するまでの時間。盗塁阻止能力に直結する。",
            formula: "秒数",
            criteria: "2.0秒: 平均 / 1.8秒: 強肩"
        },
        {
            id: "exchange_time", category: "fld", title: "Exchange", full: "Exchange Time",
            short: "握り替え時間",
            desc: "捕手がボールを捕ってから手から離すまでの時間。ポップタイム短縮には肩の強さより重要とも言われる。",
            formula: "秒数",
            criteria: "0.7秒: 平均"
        },
        {
            id: "raa_fld", category: "fld", title: "RAA (Fld)", full: "Runs Above Average (Fielding)",
            short: "守備による平均比得点貢献",
            desc: "OAAを得点価値に換算した指標。UZRやDRSと同様にWARの守備要素として使われることが多い。",
            criteria: "0: 平均"
        },
        {
            id: "spd", category: "fld", title: "Spd", full: "Speed Score",
            short: "スピードスコア",
            desc: "盗塁成功率、三塁打、得点率、併殺打の少なさなどから算出される、選手の「足の速さ」を0〜10で評価した指標。ビル・ジェームズ考案。",
            formula: "0〜10のスコア",
            criteria: "4.5: 平均 / 7.0: 俊足"
        },
        {
            id: "sprint_speed", category: "fld", title: "Sprint Speed", full: "Sprint Speed",
            short: "スプリントスピード",
            desc: "全力疾走時のトップスピード（フィート/秒）。走力の最も純粋な指標。",
            formula: "ft/sec",
            criteria: "27ft/s: 平均 / 30ft/s: エリート"
        },
        {
            id: "hp_to_1b", category: "fld", title: "HP to 1B", full: "Home to First Base Time",
            short: "一塁到達タイム",
            desc: "打撃インパクトから一塁ベースに到達するまでの時間。左打者の方が有利になる傾向がある。",
            formula: "秒数",
            criteria: "4.3秒: 平均(右) / 4.2秒: 平均(左)"
        },
        {
            id: "baseruns", category: "tot", title: "BaseRuns", full: "BaseRuns",
            short: "チーム得点力の推計式",
            desc: "チームの安打、四球、本塁打などの要素から「理論上の総得点」を算出する。実際の得点との乖離を見ることで、運や勝負強さを分析できる。",
            formula: "BSR = A*B / (A+B) ...",
            criteria: "実際の得点と比較"
        },
        {
            id: "vorp", category: "tot", title: "VORP", full: "Value Over Replacement Player",
            short: "代替選手対比価値",
            desc: "WARの概念の先駆けとなった指標。ポジション補正を含まない攻撃の貢献度を得点数で表す。",
            criteria: "積み上げ指標"
        },
        {
            id: "log5", category: "tot", title: "Log5", full: "Log5 Method",
            short: "対戦勝率予測式",
            desc: "チームAとチームBの勝率から、直接対決した際の勝率を予測する計算式。",
            formula: "(A - A×B) ÷ (A + B - 2×A×B)",
            inputs: [{id:'wa', label:'A勝率(0.xxx)'}, {id:'wb', label:'B勝率(0.xxx)'}],
            calc: (d) => {
                const num = d.wa - (d.wa * d.wb);
                const den = d.wa + d.wb - (2 * d.wa * d.wb);
                return den !== 0 ? (num / den).toFixed(3) : "---";
            }
        },
        {
            id: "pli", category: "tot", title: "pLI", full: "Player Leverage Index",
            short: "平均重要局面指数",
            desc: "その選手が打席（またはマウンド）に立った場面の平均的な重要度。1.0より高い場合、勝敗を分ける重要な場面での起用が多かったことを示す。",
            criteria: "1.0: 平均"
        }            
];
