/* =========================================================
   1. タブ切り替えに使うHTMLの要素を取得する
========================================================= */

// const は、名前を付けて値を保存するための書き方。
// document は、今表示しているHTMLのページを表す。
// getElementById("名前") は、そのidが付いたHTMLの要素を探す。

// id="routine-button" のボタンを取得して保存する。
const routineButton = document.getElementById("routine-button");

// id="items-button" のボタンを取得する。
const itemsButton = document.getElementById("items-button");

// 朝・夜のルーティンが入っている部分を取得する。
const routinePanel = document.getElementById("routine-panel");

// 商品一覧が入っている部分を取得する。
const itemsPanel = document.getElementById("items-panel");

/* =========================================================
   2. 「使用アイテム」を押したときの処理
========================================================= */

// addEventListener は、操作が起きたときの処理を登録する。
// "click" は、クリックされたときという意味。
// () => { ... } の中に、クリック後に実行する処理を書く。

itemsButton.addEventListener("click", () => {

    routinePanel.hidden = true;
    itemsPanel.hidden = false;

    itemsPanel.classList.remove("is-show");

    requestAnimationFrame(() => {
        itemsPanel.classList.add("is-show");
    });

    routineButton.classList.remove("is-active");
    itemsButton.classList.add("is-active");
});

/* =========================================================
   3. 「ルーティン」を押したときの処理
========================================================= */

routineButton.addEventListener("click", () => {

    // ルーティンを表示し、商品一覧を非表示にする。
    routinePanel.hidden = false;
    itemsPanel.hidden = true;

    // 使用アイテムの強調を外す。
    itemsButton.classList.remove("is-active");

    // ルーティンを強調する。
    routineButton.classList.add("is-active");
});

/* =========================================================
   4. 詳細画面に表示する商品の情報
========================================================= */

// { } を使って、名前と値の組み合わせをまとめたものを
// 「オブジェクト」という。
//
// products の中に、5商品の情報をまとめている。
//
// cleansing・facewash などは、商品を識別する名前。
// HTMLの data-product の値と同じ名前にしている。
//
// 各商品の中にある項目は、
// name        → 商品名
// kind        → 商品の種類
// image       → 写真のファイルの場所
// description → 詳細画面に表示する説明文
//
// 説明文を変えたいときは、description の文字を変更する。
// review は複数サイトの口コミを要約した文章。参照先は各商品のコメントに記載。
// price・sourceUrl は2026年10月15日に確認した参考価格と、画面に表示する参考サイト。

const products = {

    // HTMLの data-product="cleansing" に対応。
    cleansing: {
        name: "ビオレ パーフェクトオイル",
        kind: "クレンジングオイル",
        image: "images/水面に横たうビオレ パーフェクトオイル-1.png",
        description: "メイク落としや皮脂を落とすために使っています。",
        // レビュー: https://www.cosme.net/variations/541903/review/msf-1/
        // レビュー: https://review.kakaku.com/review/K0000491565/
        review: "メイクになじませやすく、すっきり洗い流せるという感想が見られます。濡れた手で使える手軽さも好評ですが、洗浄後に乾燥を感じる人もいるようです。",
        price: "1,355円（税込）／230mL",
        priceNote: "@cosme SHOPPING掲載価格。",
        sourceUrl: "https://www.cosme.com/products/detail.php?product_id=37745",
        sourceName: "@cosme SHOPPING"
    },

    // HTMLの data-product="facewash" に対応。
    facewash: {
        name: "ビオレ ザフェイス 泡洗顔料 スムースクリア",
        kind: "洗顔料",
        image: "images/淡い水面に浮かぶビオレ ザ フェイス.png",
        description: "朝と夜の洗顔に使っています。",
        // レビュー: https://www.cosme.net/products/10235225/
        // レビュー・価格: https://www.yodobashi.com/community/product/100000001007734363/review.html
        review: "弾力のある泡でやさしく洗えて、洗い上がりがさっぱりするという感想が見られます。泡立てる手間がなく、忙しい朝にも使いやすい点が好評です。",
        price: "786円（税込）／200mL",
        priceNote: "ヨドバシ.com掲載価格。",
        sourceUrl: "https://www.yodobashi.com/community/product/100000001007734363/review.html",
        sourceName: "ヨドバシ.com"
    },

    // HTMLの data-product="toner" に対応。
    toner: {
        name: "アヌア PDRNヒアルロン酸 ハイドレイティングミスト",
        kind: "化粧水",
        image: "images/水面に立つターコイズミスト-2.png",
        description: "朝と夜の保湿に使っています。洗顔後の肌に化粧水をなじませます。",
        // レビュー・価格: https://www.cosme.net/products/10284288/
        // レビュー: https://shopping.yahoo.co.jp/products/z803tj3p8j
        review: "細かなミストが顔全体に広がり、軽いつけ心地でもしっとりするという感想が見られます。ベタつきにくく、日中の乾燥が気になるときにも使いやすいようです。",
        price: "2,380円（税込）／100mL",
        priceNote: "@cosme掲載価格。",
        sourceUrl: "https://www.cosme.net/products/10284288/",
        sourceName: "@cosme"
    },

    // HTMLの data-product="serum" に対応。
    serum: {
        name: "アヌア PDRNヒアルロン酸カプセル100セラム 30ml",
        kind: "美容液",
        image: "images/水面に佇むターコイズ美容液-4.png",
        description: "夜の保湿とニキビ対策に使っています。化粧水の後に美容液をなじませます。",
        // レビュー: https://www.cosme.net/variations/1191661/review/msf-1/
        // レビュー・価格: https://anuashop.jp/products/side0011
        review: "さらっとなじむのに、肌がもちっとしっとりするという感想が見られます。ベタつきにくくメイク前にも使いやすい一方、保湿感には個人差があるようです。",
        price: "3,450円（税込）／30mL",
        priceNote: "Anua公式の通常価格（セール価格を除く）。",
        sourceUrl: "https://anuashop.jp/products/side0011",
        sourceName: "Anua公式オンラインショップ"
    },

    // HTMLの data-product="milk" に対応。
    milk: {
        name: "アクアレーベル トリートメントミルク ブライトニング",
        kind: "乳液",
        image: "images/水面に佇む青いアクアレーベル-5.png",
        description: "夜の保湿に使っています。化粧水と美容液の後に乳液をなじませます。",
        // レビュー: https://www.cosme.net/products/10250518/review/agg-35/agl-39/rf-1/
        // レビュー: https://review.rakuten.co.jp/review/item/1/261122_11254107/1.1/
        review: "なめらかに広がり、しっとりするのにベタつきにくいという感想が見られます。重すぎない使い心地や続けやすい価格が、毎日の保湿ケア用として好評です。",
        price: "1,650円（税込）／130mL",
        priceNote: "資生堂公式の参考小売価格。感想は「しっとり」タイプを参照。",
        sourceUrl: "https://www.shiseido.co.jp/aqua/stepcare/white/",
        sourceName: "資生堂 アクアレーベル公式サイト"
    }
};

/* =========================================================
   5. 詳細画面と、その中の要素を取得する
========================================================= */

// <dialog id="item-dialog"> を取得する。
// 開いたり閉じたりする詳細画面そのもの。
const itemDialog = document.getElementById("item-dialog");

// 詳細画面の写真を取得する。
const dialogImage = document.getElementById("dialog-image");

// 「洗顔料」「化粧水」などを表示する部分を取得する。
const dialogKind = document.getElementById("dialog-kind");

// 商品名を表示する見出しを取得する。
const dialogTitle = document.getElementById("dialog-title");

// 商品の説明文を表示する部分を取得する。
const dialogDescription = document.getElementById("dialog-description");

// ファンデーションと同じ、感想・参考価格・参考サイトの欄。
const dialogReview = document.getElementById("dialog-review");
const dialogPrice = document.getElementById("dialog-price");
const dialogPriceNote = document.getElementById("dialog-price-note");
const dialogSource = document.getElementById("dialog-source");

/* =========================================================
   6. 商品一覧とルーティンの詳細ボタンに処理を付ける
========================================================= */

// querySelectorAll は、CSSのセレクターで要素をすべて探す。
//
// "button[data-product]" は、
// 「data-product が付いたbuttonタグ」という意味。
//
// 商品一覧のボタンも、ルーティンのボタンも対象になる。
//
// forEach は、見つかった要素を1つずつ取り出して処理する。
// button には、そのとき取り出したボタンが入る。

document.querySelectorAll("button[data-product]").forEach((button) => {

    // 取り出したボタンに、クリック時の処理を登録する。
    button.addEventListener("click", () => {

        // dataset は、HTMLの data-〇〇 の値を読み取るもの。
        //
        // 例えば data-product="facewash" なら、
        // button.dataset.product は "facewash" になる。
        //
        // products["facewash"] と書くと、
        // products の中にある洗顔の情報を取り出せる。
        //
        // 押したボタンに対応する商品の情報を、
        // product という名前で保存する。
        const product = products[button.dataset.product];

        // if は、条件によって処理を分ける書き方。
        // !product は「商品の情報が見つからない」という判定。
        //
        // HTMLとJSの商品名が一致しない場合などは、
        // return で、このクリック処理をここで終える。
        if (!product) {
            return;
        }

        // 写真のsrcを、その商品の画像の場所に変更する。
        dialogImage.src = product.image;

        // 写真のaltを、その商品の名前に変更する。
        dialogImage.alt = product.name;

        // textContent は、要素の中の文字を変更するもの。
        // 商品の種類を変更する。
        dialogKind.textContent = product.kind;

        // 商品名を変更する。
        dialogTitle.textContent = product.name;

        // 商品の説明文を変更する。
        dialogDescription.textContent = product.description;

        dialogReview.textContent = product.review;
        dialogPrice.textContent = product.price;
        dialogPriceNote.textContent = `${product.priceNote}2026年10月15日確認。価格は販売店や時期によって異なります。`;
        dialogSource.href = product.sourceUrl;
        dialogSource.textContent = `参考サイト：${product.sourceName} ↗`;
        dialogSource.setAttribute("aria-label", `${product.name}の参考サイト：${product.sourceName}（新しいタブで開きます）`);

        // 前に開いた商品のスクロール位置を先頭に戻す。
        itemDialog.scrollTop = 0;

        // showModal() は、dialogをページの手前に開く命令。
        // 写真と文章を変更してから、詳細画面を開く。
        itemDialog.showModal();

        // bodyに dialog-open というクラスを付ける。
        //
        // CSSに書いた
        // body.dialog-open { overflow: hidden; }
        // が適用され、背景のページのスクロールが止まる。
        document.body.classList.add("dialog-open");
    });
});

/* =========================================================
   7. 詳細画面の外側の暗い背景を押したら閉じる
========================================================= */

// event には、今回のクリックについての情報が入る。
// 押された要素や、押した位置などを調べられる。

itemDialog.addEventListener("click", (event) => {

    // event.target は、実際にクリックされた要素。
    // !== は「同じではない」という意味。
    //
    // 写真や文章など、dialogの中の要素を押した場合は、
    // この背景クリック用の処理をここで終える。
    if (event.target !== itemDialog) {
        return;
    }

    // getBoundingClientRect() は、
    // 要素の表示位置と大きさを調べるもの。
    //
    // rect.left   → 詳細画面の左端
    // rect.right  → 詳細画面の右端
    // rect.top    → 詳細画面の上端
    // rect.bottom → 詳細画面の下端
    const rect = itemDialog.getBoundingClientRect();

    // event.clientX は、画面の左から数えたクリック位置。
    // event.clientY は、画面の上から数えたクリック位置。
    //
    // < は「より小さい」、> は「より大きい」。
    // || は「または」という意味。
    //
    // 左・右・上・下のどれかの端を超えていれば、
    // 「詳細画面の外側を押した」と判定する。
    //
    // outside には、外側ならtrue、内側ならfalseが入る。
    const outside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

    // 外側を押していたら、詳細画面を閉じる。
    if (outside) {
        itemDialog.close();
    }
});

/* =========================================================
   8. 詳細画面が閉じたら、背景のスクロールを戻す
========================================================= */

// "close" は、dialogが閉じたときに発生するイベント。
//
// ×ボタンは、HTMLの <form method="dialog"> の仕組みで閉じる。
// Escキーは、ブラウザーの標準機能で閉じる。
// 暗い背景のクリックは、上に書いたJSで閉じる。
//
// どの方法で閉じても、この処理が実行される。

itemDialog.addEventListener("close", () => {

    // bodyから dialog-open クラスを外す。
    // overflow: hidden の指定が外れ、
    // 背景のページを再びスクロールできるようになる。
    document.body.classList.remove("dialog-open");
});
