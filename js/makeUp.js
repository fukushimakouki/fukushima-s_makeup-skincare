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

// HTMLのdata-productと、下の商品名の目印が対応する。
// 商品名・写真・詳しい説明を、ここにまとめる。
const products = {
    // 青髭隠しに使うコンシーラー
    concealer: {
        name: "COSCOS パーフェクトマットコンシーラー スカーレットオレンジ",
        kind: "オレンジコンシーラー",
        image: "images/image(20261013-043211).png",
        description: "青髭を隠すために使っているオレンジコンシーラーです。オレンジの色補正で髭の青みを目立ちにくくし、肌色を整えます。半練りタイプで肌に密着し、上からファンデーションを重ねることもできます。"
    },

    // ファンデーションを塗る前の下地
    primer: {
        name: "エレガンス モデリング カラーベース UV",
        kind: "化粧下地",
        image: "images/image(20261013-043250).png",
        description: "肌の凹凸や色ムラを補正し、なめらかな肌に整える肌色補正メイクアップベースです。紫外線を防ぐ機能もあり、ファンデーションを重ねる前の下地として使っています。"
    },

    // 肌をカバーして仕上がりを整える
    foundation: {
        name: "アルビオン スタジオ ミルク ファンデーション",
        kind: "ファンデーション",
        image: "images/image(20261013-043324).png",
        description: "うるおいを与えながら肌の気になる部分をカバーする、乳液発想のファンデーションです。なめらかに広がって肌になじみ、ツヤのある仕上がりに整えます。下地の後に使っています。"
    },

    // メイクの崩れを防ぐミスト
    mist: {
        name: "コーセー メイク キープ ミスト EX",
        kind: "メイクキープミスト",
        image: "images/image(20261013-043542).png",
        description: "汗・水・皮脂による化粧崩れや、表情の動きによるメイクのヨレを防ぐ仕上げ用ミストです。私のルーティンではファンデーションの後に使い、ベースメイクをキープするために取り入れています。"
    },

    // 最後に使うフェイスパウダー
    powder: {
        name: "パーフェクトダイアリー トランスルーシェント ブルーリング ルースパウダー 2.0",
        kind: "フェイスパウダー",
        image: "images/download.png",
        description: "余分な皮脂を吸着して肌をさらさらに保ち、毛穴や凹凸を自然にぼかすルースパウダーです。メイクの最後に重ねて、テカリを抑えながら肌の表面をさらっと整えるために使っています。"
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