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

    // hidden は、要素を非表示にするかどうかの設定。
    // true は「非表示にする」、false は「表示する」。
    routinePanel.hidden = true;
    itemsPanel.hidden = false;

    // classList は、その要素に付いているクラスを扱うもの。
    // remove は、指定したクラスを外す。
    // ルーティンボタンの強調表示を外す。
    routineButton.classList.remove("is-active");

    // add は、指定したクラスを付ける。
    // 使用アイテムボタンを強調表示する。
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

const products = {

    // HTMLの data-product="cleansing" に対応。
    cleansing: {
        name: "ビオレ パーフェクトオイル",
        kind: "クレンジングオイル",
        image: "images/水面に横たうビオレ パーフェクトオイル-1.png",
        description: "メイク落としや皮脂を落とすために使っています。"
    },

    // HTMLの data-product="facewash" に対応。
    facewash: {
        name: "ビオレ ザフェイス",
        kind: "洗顔料",
        image: "images/淡い水面に浮かぶビオレ ザ フェイス.png",
        description: "朝と夜の洗顔に使っています。"
    },

    // HTMLの data-product="toner" に対応。
    toner: {
        name: "アヌア PDRNヒアルロン酸 ハイドレイティングミスト",
        kind: "化粧水",
        image: "images/水面に立つターコイズミスト-2.png",
        description: "朝と夜の保湿に使っています。洗顔後の肌に化粧水をなじませます。"
    },

    // HTMLの data-product="serum" に対応。
    serum: {
        name: "アヌア PDRNヒアルロン酸カプセル100セラム 30ml",
        kind: "美容液",
        image: "images/水面に佇むターコイズ美容液-4.png",
        description: "夜の保湿とニキビ対策に使っています。化粧水の後に美容液をなじませます。"
    },

    // HTMLの data-product="milk" に対応。
    milk: {
        name: "アクアレーベル トリートメントミルク ブライトニング",
        kind: "乳液",
        image: "images/水面に佇む青いアクアレーベル-5.png",
        description: "夜の保湿に使っています。化粧水と美容液の後に乳液をなじませます。"
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