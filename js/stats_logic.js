function calculateAdvancedStats() {
    // --- リーグ全体の合計値を算出 ---
    const total = NPB_STATS_DATA.reduce((acc, p) => {
        // 日本語キーからデータを取得
        const pa = p['打席'] || 0;
        const h = p['安打'] || 0;
        const bb = p['四球'] || 0;
        const hbp = p['死球'] || 0;
        const sf = p['犠飛'] || 0;
        const sh = p['犠打'] || 0;
        const hr = p['本塁打'] || 0;
        
        // 打数 = 打席数 － (四死球 + 犠打 + 犠飛 + 打撃妨害 + 走塁妨害)
        // ※データに打撃妨害・走塁妨害がないため0として計算
        const ab = pa - (bb + hbp + sh + sf);

        acc.PA += pa;
        acc.AB += ab;
        acc.H += h;
        acc.BB += bb;
        acc.HBP += hbp;
        acc.SF += sf;
        acc.HR += hr;
        
        // wOBA計算用
        acc._2B += (p['二塁打'] || 0);
        acc._3B += (p['三塁打'] || 0);
        
        return acc;
    }, { PA:0, AB:0, H:0, BB:0, HBP:0, SF:0, HR:0, _2B:0, _3B:0 });

    // --- リーグ定数の計算 ---
    // wOBA Scale (概算)
    const woba_scale = 1.24;
    
    // リーグ平均 wOBA (Weightsは一般的な値を使用)
    const single = total.H - total._2B - total._3B - total.HR;
    const woba_numerator = (0.69 * total.BB) + (0.72 * total.HBP) + (0.89 * single) + (1.27 * total._2B) + (1.62 * total._3B) + (2.10 * total.HR);
    const woba_denominator = total.AB + total.BB + total.SF + total.HBP;
    
    const lg_woba = woba_denominator > 0 ? woba_numerator / woba_denominator : 0.320;
    
    // リーグ平均 R/PA (得点期待値、概算で0.12前後)
    const lg_r_pa = 0.12; 

    console.log(`League Constants: wOBA=${lg_woba.toFixed(3)}, R/PA=${lg_r_pa}`);

    // --- 各選手の指標計算 ---
    currentStatsData = NPB_STATS_DATA.map(p => {
        // 日本語キーからデータを取得
        const pa = p['打席'] || 0;
        const h = p['安打'] || 0;
        const bb = p['四球'] || 0;
        const hbp = p['死球'] || 0;
        const sf = p['犠飛'] || 0;
        const sh = p['犠打'] || 0;
        const hr = p['本塁打'] || 0;
        const _2b = p['二塁打'] || 0;
        const _3b = p['三塁打'] || 0;
        const so = p['三振'] || 0;
        
        // 打数 = 打席数 － (四死球 + 犠打 + 犠飛 + 打撃妨害 + 走塁妨害)
        // ※データに打撃妨害・走塁妨害がないため0として計算
        const ab = pa - (bb + hbp + sh + sf);
        
        const single = h - _2b - _3b - hr;
        
        // wOBA
        const w_num = (0.69 * bb) + (0.72 * hbp) + (0.89 * single) + (1.27 * _2b) + (1.62 * _3b) + (2.10 * hr);
        const w_den = ab + bb + sf + hbp;
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
        const bb_k = so > 0 ? bb / so : 0;

        return {
            ...p,
            // 英語キーを追加 (テーブル描画用)
            AB: ab,
            H: h,
            HR: hr,
            
            // 計算指標
            PA_CALC: pa,
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
