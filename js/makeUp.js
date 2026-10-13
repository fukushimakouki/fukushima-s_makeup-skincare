/* =========================================================
   1. タブ切り替えに使うHTMLの要素を取得する
========================================================= */

// getElementByIdは、指定したidの要素を探す命令。
const routineButton = document.getElementById("routine-button");
const itemsButton = document.getElementById("items-button");
const routinePanel = document.getElementById("routine-panel");
const itemsPanel = document.getElementById("items-panel");

// 使用アイテムを押したら、商品一覧を表示する。
// hidden=trueは非表示、falseは表示。
itemsButton.addEventListener("click", () => {
    routinePanel.hidden = true;
    itemsPanel.hidden = false;

    // クラスを外す・付けることで、選んだタブを強調する。
    routineButton.classList.remove("is-active");
    itemsButton.classList.add("is-active");

    // setAttributeは、HTMLの属性の値を変更するもの。
    // 読み上げ機能にも、ボタンの選択状態を伝える。
    routineButton.setAttribute("aria-pressed", "false");
    itemsButton.setAttribute("aria-pressed", "true");
});

// ルーティンを押したら、手順を表示する。
routineButton.addEventListener("click", () => {
    routinePanel.hidden = false;
    itemsPanel.hidden = true;

    itemsButton.classList.remove("is-active");
    routineButton.classList.add("is-active");

    itemsButton.setAttribute("aria-pressed", "false");
    routineButton.setAttribute("aria-pressed", "true");
});


/* =========================================================
   2. 詳細画面に表示する商品情報
========================================================= */

// primerなどの名前は、HTMLのdata-productと対応する。
//
// name        → 商品名
// kind        → 商品の種類
// image       → 写真のファイルの場所
// description → 説明文
//
// 商品名・説明文・写真を変更するときは、この中を書き換える。
// imageがnullの商品は「写真準備中」を表示する。
//
// 下地とファンデーションは、今ある2商品一緒の写真を使う。

const products = {
    primer: {
        name: "エレガンス モデリング カラーベース UV",
        kind: "化粧下地",
        image: "images/エレガンスとアルビオンのベースメイク撮影.png",
        description: "ベースメイクに使う下地です。"
    },

    foundation: {
        name: "アルビオン スタジオ ミルク ファンデーション",
        kind: "ファンデーション",
        image: "images/エレガンスとアルビオンのベースメイク撮影.png",
        description: "下地の後に使うファンデーションです。"
    },

    eyemakeup: {
        name: "アイメイク用品",
        kind: "アイメイク",
        image: null,
        description: "使用している商品の紹介を準備中です。"
    },

    finish: {
        name: "仕上げ用品",
        kind: "仕上げ",
        image: null,
        description: "使用している商品の紹介を準備中です。"
    }
};


/* =========================================================
   3. 詳細画面と、内容を書き換える場所を取得する
========================================================= */

const itemDialog = document.getElementById("item-dialog");
const dialogImage = document.getElementById("dialog-image");

// 写真がない場合に表示する「写真準備中」の文字。
const dialogNoImage = document.getElementById("dialog-no-image");

const dialogKind = document.getElementById("dialog-kind");
const dialogTitle = document.getElementById("dialog-title");
const dialogDescription = document.getElementById("dialog-description");


/* =========================================================
   4. 詳細ボタンを押したときの処理
========================================================= */

// data-productが付いたbuttonをすべて探す。
// forEachで、見つかったボタンを1つずつ処理する。
// 商品一覧とルーティンの両方のボタンが対象になる。

document.querySelectorAll("button[data-product]").forEach((button) => {

    button.addEventListener("click", () => {

        // 例：data-product="primer"なら、
        // productsの中にあるprimerの商品情報を取り出す。
        const product = products[button.dataset.product];

        // 対応する商品がなければ、ここで処理を終える。
        if (!product) {
            return;
        }

        // textContentは、HTMLの要素の中の文字を変更するもの。
        dialogKind.textContent = product.kind;
        dialogTitle.textContent = product.name;
        dialogDescription.textContent = product.description;

        // 写真がある商品と、まだない商品を分ける。
        if (product.image) {

            // 写真がある場合は、画像を設定して表示する。
            dialogImage.src = product.image;
            dialogImage.alt = product.name;
            dialogImage.hidden = false;

            // 「写真準備中」は隠す。
            dialogNoImage.hidden = true;

        } else {

            // 写真がない場合は、画像を隠す。
            dialogImage.hidden = true;

            // removeAttributeは、指定した属性を外すもの。
            // 前に表示していた商品の画像の指定を外す。
            dialogImage.removeAttribute("src");
            dialogImage.alt = "";

            // 「写真準備中」の文字を表示する。
            dialogNoImage.hidden = false;
        }

        // 詳細画面を開く。
        itemDialog.showModal();

        // 背景のスクロールを止めるためのクラスを付ける。
        document.body.classList.add("dialog-open");
    });
});


/* =========================================================
   5. 暗い背景を押したら詳細画面を閉じる
========================================================= */

itemDialog.addEventListener("click", (event) => {

    // event.targetは、実際にクリックされた要素。
    // 写真や文章など、内部の要素を押した場合は終了する。
    if (event.target !== itemDialog) {
        return;
    }

    // 詳細画面の四辺の位置を取得する。
    const rect = itemDialog.getBoundingClientRect();

    // clientX・clientYは、クリックした位置。
    // ||は「または」。
    // 四辺のどれかを超えていれば、外側を押したと判定する。
    const outside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

    if (outside) {
        itemDialog.close();
    }
});


/* =========================================================
   6. 閉じたら、背景のスクロールを戻す
========================================================= */

// ×はform method="dialog"の仕組みで閉じる。
// Escはブラウザーの標準機能で閉じる。
// 背景クリックは、上のJSで閉じる。
// どの方法でも、閉じたときにこの処理が実行される。

itemDialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
});