// js/stats_logic.js

let currentStatsData = [];
let sortCol = 'wRC_PLUS';
let sortAsc = false;

// 規定打席数 (143試合 * 3.1)
const REGULATION_PA = 443; 

document.addEventListener('DOMContentLoaded', () => {
    // データが読み込まれていれば初期化
    if (typeof NPB_STATS_DATA !== 'undefined') {
        initStatsBoard();
    } else {
        console.warn("Stats data not found.");
        document.getElementById('stats-loading').textContent = "データがありません";
    }
});

function switchView(viewName) {
    // タブの切り替え表示
    document.querySelectorAll('.view-section').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    
    document.getElementById(`view-${viewName}`).style.display = 'block';
    document.getElementById(`tab-${viewName}`).classList.add('active');
}

function initStatsBoard() {
    // 1. チームリストの生成
    const teamSelect = document.getElementById('filter-team');
    const teams = [...new Set(NPB_STATS_DATA.map(p => p.Team).filter(t => t))];
    teams.forEach(t => {
        const op = document.createElement('option');
        op.value = t;
        op.textContent = t;
        teamSelect.appendChild(op);
    });

    // 2. データの加工と計算
    calculateAdvancedStats();

    // 3. 初回描画
    document.getElementById('stats-loading').style.display = 'none';
    renderStatsTable();
}

function calculateAdvancedStats() {
    // --- リーグ全体の合計値を算出 ---
    const total = NPB_STATS_DATA.reduce((acc, p) => {
        // データにない項目は0として扱う
        const ab = p.AB || 0;
        const bb = p.BB || 0;
        const hbp = p.HBP || 0; // CSVにないかも
        const sf = p.SF || 0;   // CSVにないかも
        const h = p.H || 0;
        const hr = p.HR || 0;
        
        // 簡易PA (HBP, SFがない場合は AB+BB)
        const pa = ab + bb + hbp + sf;

        acc.PA += pa;
        acc.AB += ab;
        acc.H += h;
        acc.BB += bb;
        acc.HBP += hbp;
        acc.SF += sf;
        acc.HR += hr;
        
        // wOBA計算用 (2B, 3Bがあれば精度向上)
        acc._2B += (p['2B'] || 0);
        acc._3B += (p['3B'] || 0);
        
        return acc;
    }, { PA:0, AB:0, H:0, BB:0, HBP:0, SF:0, HR:0, _2B:0, _3B:0 });

    // --- リーグ定数の計算 ---
    // wOBA Scale (概算)
    const woba_scale = 1.24;
    
    // リーグ平均 wOBA (Weightsは一般的な値を使用)
    // wOBA = (0.69×BB + 0.72×HBP + 0.89×1B + 1.27×2B + 1.62×3B + 2.10×HR) / (AB + BB - IBB + SF + HBP)
    // ※ IBBが不明な場合はBBで代用、HBP/SFがない場合は無視
    const single = total.H - total._2B - total._3B - total.HR;
    const woba_numerator = (0.69 * total.BB) + (0.72 * total.HBP) + (0.89 * single) + (1.27 * total._2B) + (1.62 * total._3B) + (2.10 * total.HR);
    const woba_denominator = total.AB + total.BB + total.SF + total.HBP;
    
    const lg_woba = woba_denominator > 0 ? woba_numerator / woba_denominator : 0.320;
    
    // リーグ平均 R/PA (得点期待値、概算で0.12前後)
    // 本来は総得点/総打席だが、得点データがない場合はwOBAから推定
    const lg_r_pa = 0.12; 

    console.log(`League Constants: wOBA=${lg_woba.toFixed(3)}, R/PA=${lg_r_pa}`);

    // --- 各選手の指標計算 ---
    currentStatsData = NPB_STATS_DATA.map(p => {
        const ab = p.AB || 0;
        const h = p.H || 0;
        const bb = p.BB || 0;
        const hbp = p.HBP || 0;
        const sf = p.SF || 0;
        const hr = p.HR || 0;
        const _2b = p['2B'] || 0;
        const _3b = p['3B'] || 0;
        const single = h - _2b - _3b - hr;
        
        // PA (打席数)
        const pa = ab + bb + hbp + sf;
        
        // wOBA
        const w_num = (0.69 * bb) + (0.72 * hbp) + (0.89 * single) + (1.27 * _2b) + (1.62 * _3b) + (2.10 * hr);
        const w_den = ab + bb + sf + hbp; // IBBがあれば除くべきだが簡易化
        const woba = w_den > 0 ? w_num / w_den : 0;

        // wRAA = ((wOBA - lg_wOBA) / wOBA_Scale) * PA
        const wraa = woba_scale > 0 ? ((woba - lg_woba) / woba_scale) * pa : 0;

        // wRC+ = (((wRAA/PA + lg_R/PA) + (lg_R/PA - PF*lg_R/PA)) / lg_R/PA) * 100
        // PF(パークファクター)は1.0と仮定
        let wrc_plus = 0;
        if (pa > 0 && lg_r_pa > 0) {
            const val = (((wraa / pa) + lg_r_pa) / lg_r_pa) * 100;
            wrc_plus = val;
        }

        // その他の指標
        const tb = h + _2b + (2*_3b) + (3*hr); // 塁打 (修正: 単打=1, 2B=2...) 
        // 正確には TB = 1B + 2*2B + 3*3B + 4*HR = H + 2B + 2*3B + 3*HR
        const true_tb = h + _2b + (2*_3b) + (3*hr);

        const avg = ab > 0 ? h / ab : 0;
        const slg = ab > 0 ? true_tb / ab : 0;
        const obp = pa > 0 ? (h + bb + hbp) / pa : 0;
        const ops = obp + slg;
        const iso = slg - avg;
        const bb_k = (p.SO || 0) > 0 ? bb / p.SO : 0;

        return {
            ...p,
            PA_CALC: pa, // 計算したPA
            wOBA: woba,
            wRC_PLUS: wrc_plus,
            AVG: avg,
            OBP: obp,
            SLG: slg,
            OPS: ops,
            ISO: iso,
            BB_K: bb_k
        };
    });
}

function renderStatsTable() {
    const tbody = document.getElementById('leaderboard');
    const searchVal = document.getElementById('stats-search').value.toLowerCase();
    const teamVal = document.getElementById('filter-team').value;
    const userPaVal = parseInt(document.getElementById('filter-pa').value) || 0;
    const isReg = document.getElementById('filter-regulation').checked;

    // フィルタリング
    let data = currentStatsData.filter(p => {
        // 1. 名前検索
        const matchName = !searchVal || p.Name.toLowerCase().includes(searchVal);
        // 2. チーム検索
        const matchTeam = !teamVal || p.Team === teamVal;
        
        // 3. 打席数フィルタ
        // 規定打席チェックがONなら REGULATION_PA、OFFなら userPaVal を下限にする
        const limit = isReg ? REGULATION_PA : userPaVal;
        const matchPA = p.PA_CALC >= limit;

        return matchName && matchTeam && matchPA;
    });

    // ソート
    data.sort((a, b) => {
        let va = a[sortCol];
        let vb = b[sortCol];
        if (typeof va === 'undefined') va = -9999;
        if (typeof vb === 'undefined') vb = -9999;

        if (va < vb) return sortAsc ? -1 : 1;
        if (va > vb) return sortAsc ? 1 : -1;
        return 0;
    });

    // HTML生成
    const columns = [
        { k: 'Team', label: 'チーム' },
        { k: 'Name', label: '選手名' },
        { k: 'wRC_PLUS', label: 'wRC+', type: 'int', color: true },
        { k: 'OPS', label: 'OPS', type: 'float3', color: true },
        { k: 'wOBA', label: 'wOBA', type: 'float3' },
        { k: 'AVG', label: '打率', type: 'float3' },
        { k: 'HR', label: 'HR', type: 'int' },
        { k: 'PA_CALC', label: '打席', type: 'int' },
        { k: 'AB', label: '打数', type: 'int' },
        { k: 'H', label: '安打', type: 'int' },
        { k: 'ISO', label: 'ISO', type: 'float3' },
        { k: 'BB_K', label: 'BB/K', type: 'float2' }
    ];

    let html = '<thead><tr>';
    columns.forEach(c => {
        const mark = sortCol === c.k ? (sortAsc ? '▲' : '▼') : '';
        html += `<th onclick="changeSort('${c.k}')">${c.label} ${mark}</th>`;
    });
    html += '</tr></thead><tbody>';

    if (data.length === 0) {
        html += '<tr><td colspan="12" style="text-align:center; padding:20px;">該当する選手がいません</td></tr>';
    } else {
        data.forEach(row => {
            html += '<tr>';
            columns.forEach(c => {
                let val = row[c.k];
                let display = val;
                let cls = '';

                if (c.type === 'float3') display = val.toFixed(3).replace(/^0/, '');
                if (c.type === 'float2') display = val.toFixed(2);
                if (c.type === 'int') display = Math.round(val);

                // 色付けロジック
                if (c.color) {
                    if (c.k === 'wRC_PLUS') {
                        if (val >= 160) cls = 'val-elite';
                        else if (val >= 140) cls = 'val-great';
                        else if (val >= 120) cls = 'val-good';
                        else if (val < 80) cls = 'val-bad';
                    }
                    if (c.k === 'OPS') {
                        if (val >= 1.0) cls = 'val-elite';
                        else if (val >= 0.9) cls = 'val-great';
                        else if (val >= 0.8) cls = 'val-good';
                    }
                }

                html += `<td class="${cls}">${display}</td>`;
            });
            html += '</tr>';
        });
    }
    html += '</tbody>';

    tbody.innerHTML = html;
}

function changeSort(key) {
    if (sortCol === key) sortAsc = !sortAsc;
    else {
        sortCol = key;
        sortAsc = false; // 数値は降順が基本
    }
    renderStatsTable();
}
