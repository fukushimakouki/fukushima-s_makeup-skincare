// 画面を覆う演出用のdivを作る。
// HTMLに毎回書かなくても、JSで追加できる。
const transitionLayer = document.createElement("div");

transitionLayer.className = "page-transition";
transitionLayer.setAttribute("aria-hidden", "true");

document.body.appendChild(transitionLayer);

// リンク先のファイル名と、演出の種類を対応させる。
const pageEffects = {
    "index.html": "top",
    "skinCare.html": "skincare",
    "makeUp.html": "makeup"
};

// 演出中かどうかを保存する。
let isTransitioning = false;

// ページ内でクリックされたときに動く。
document.addEventListener("click", (event) => {

    // 通常の左クリックだけを対象にする。
    // Ctrlなどを押して別タブで開く操作はそのまま使える。
    if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
    ) {
        return;
    }

    // 押した場所から、一番近いaタグを探す。
    // リンク内の写真や文字を押しても取得できる。
    const link = event.target.closest("a[href]");

    if (!link) {
        return;
    }

    // 新しいタブへのリンクやダウンロードは対象外。
    if (
        (link.target && link.target !== "_self") ||
        link.hasAttribute("download")
    ) {
        return;
    }

    // リンク先のURLを取得する。
    const destination = new URL(link.href, location.href);

    // 外部サイトへのリンクは対象外。
    if (destination.origin !== location.origin) {
        return;
    }

    // URLの最後にあるファイル名を取り出す。
    // フォルダーのURLはindex.htmlとして扱う。
    const fileName =
        destination.pathname.split("/").pop() || "index.html";

    const effect = pageEffects[fileName];

    // 指定した3ページ以外には演出を付けない。
    if (!effect) {
        return;
    }

    // 今いるページへのリンクも通常どおりにする。
    if (
        destination.pathname === location.pathname &&
        destination.search === location.search
    ) {
        return;
    }

    // 動きを減らす設定なら、そのまま移動する。
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    // すぐに移動するのを一度止める。
    event.preventDefault();

    // 連打されても演出を重ねない。
    if (isTransitioning) {
        return;
    }

    isTransitioning = true;

    // キーボード操作のときはリンクの中央から広げる。
    const rect = link.getBoundingClientRect();

    const x = event.detail === 0
        ? rect.left + rect.width / 2
        : event.clientX;

    const y = event.detail === 0
        ? rect.top + rect.height / 2
        : event.clientY;

    // クリック位置をCSSへ渡す。
    transitionLayer.style.setProperty("--click-x", `${x}px`);
    transitionLayer.style.setProperty("--click-y", `${y}px`);

    // リンク先に対応する演出を開始する。
    transitionLayer.className =
        `page-transition page-transition--${effect} is-running`;

    // 色が画面を覆ってから、リンク先へ移動する。
    setTimeout(() => {
        location.assign(destination.href);
    }, effect === "top" ? 600 : 650);
});

// ブラウザーの「戻る」で戻ったとき、演出を解除する。
window.addEventListener("pageshow", () => {
    transitionLayer.className = "page-transition";
    isTransitioning = false;
});
