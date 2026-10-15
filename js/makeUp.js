/* =========================================================
   1. タブ切り替えに使うHTML要素を取得する
========================================================= */

// 「ルーティン」ボタン
const routineButton = document.getElementById("routine-button");

// 「使用アイテム」ボタン
const itemsButton = document.getElementById("items-button");

// メイク手順が入っている部分
const routinePanel = document.getElementById("routine-panel");

// 使用アイテム一覧が入っている部分
const itemsPanel = document.getElementById("items-panel");


/* =========================================================
   2. 「使用アイテム」を押したとき
========================================================= */

itemsButton.addEventListener("click", () => {

    // ルーティンを非表示
    routinePanel.hidden = true;

    // 使用アイテムを表示
    itemsPanel.hidden = false;


    // -----------------------------------------------------
    // 使用アイテムをふわっと表示するための処理
    // -----------------------------------------------------

    // 一度 is-show を外す
    // これによって、何度押してもアニメーションを再実行できる
    itemsPanel.classList.remove("is-show");

    // ブラウザが一度画面を描画してから is-show を付ける
    requestAnimationFrame(() => {
        itemsPanel.classList.add("is-show");
    });


    // -----------------------------------------------------
    // タブの見た目を変更
    // -----------------------------------------------------

    // ルーティンの選択状態を解除
    routineButton.classList.remove("is-active");

    // 使用アイテムを選択状態にする
    itemsButton.classList.add("is-active");


    // -----------------------------------------------------
    // aria-pressed
    // 読み上げ機能などに現在の選択状態を伝える
    // -----------------------------------------------------

    routineButton.setAttribute("aria-pressed", "false");
    itemsButton.setAttribute("aria-pressed", "true");
});


/* =========================================================
   3. 「ルーティン」を押したとき
========================================================= */

routineButton.addEventListener("click", () => {

    // ルーティンを表示
    routinePanel.hidden = false;

    // 使用アイテムを非表示
    itemsPanel.hidden = true;


    // タブの見た目を変更
    itemsButton.classList.remove("is-active");
    routineButton.classList.add("is-active");


    // 現在の選択状態を設定
    itemsButton.setAttribute("aria-pressed", "false");
    routineButton.setAttribute("aria-pressed", "true");
});


/* =========================================================
   4. 商品詳細に表示する情報
========================================================= */

/*
    HTMLの

    data-product="concealer"
    data-product="primer"

    などと、下の名前が対応している。

    name
        商品名

    kind
        商品の種類

    image
        表示する写真

    description
        詳細画面に表示する説明

    review / price / sourceUrl
        複数サイトの口コミの要約、参考価格、画面に表示する参考サイト。
        参照先は各商品のコメントに記載。価格は2026年10月15日確認。
*/

const products = {

    /* -----------------------------------------------------
       コンシーラー
    ----------------------------------------------------- */
    concealer: {
        name: "COSCOS パーフェクトマットコンシーラー スカーレットオレンジ",

        kind: "オレンジコンシーラー",

        image: "images/image(20261013-043211).png",

        description:
            "青髭の青みを目立ちにくくするために使っているオレンジコンシーラーです。髭剃り後に気になる部分へ少量ずつのせ、肌になじませてから下地を重ねています。",
        // レビュー: https://www.cosme.net/variations/990026/review/sk-2/
        // レビュー: https://www.cosmebi.jp/products/detail/10017969
        review: "青みをオレンジで補正し、血色よく見せられるという感想が見られます。肌への密着感も好評で、上からファンデーションを重ねてもなじみやすいようです。",
        price: "1,760円（税込）／2g",
        priceNote: "リベルタ公式オンラインストア掲載価格。",
        sourceUrl: "https://liberta-online.jp/products/02213102",
        sourceName: "リベルタ公式オンラインストア"
    },


    /* -----------------------------------------------------
       化粧下地
    ----------------------------------------------------- */
    primer: {
        name: "エレガンス モデリング カラーベース UV",

        kind: "化粧下地",

        image: "images/image(20261013-043250).png",

        description:
            "ファンデーションを塗る前に使っている化粧下地です。肌の色ムラや質感を整え、ベースメイクをきれいに仕上げるために使っています。",
        // レビュー: https://www.cosme.net/reviews/516415767/
        // レビュー: https://i-voce.jp/cosmetics/10/110983/235695/
        // 価格: https://color-navi.elegance-cosmetics.com/
        review: "色ムラを自然に整え、なめらかな肌に見せられるという感想が見られます。薄く仕上がる点が好評ですが、肌質によっては乾燥を感じることもあるようです。",
        price: "5,500円（税込）／30g",
        priceNote: "エレガンス公式掲載価格。",
        sourceUrl: "https://color-navi.elegance-cosmetics.com/",
        sourceName: "エレガンス公式サイト"
    },


    /* -----------------------------------------------------
       ファンデーション
    ----------------------------------------------------- */
    foundation: {
        name: "アルビオン スタジオ ミルク ファンデーション",

        kind: "ファンデーション",

        image: "images/image(20261013-043324).png",

        description:
            "肌の気になる部分をカバーしながら、自然なツヤのある仕上がりにするために使っています。下地の後に顔全体へ薄くなじませています。",

        // もともと掲載されていた本人の感想をそのまま残す。
        review:
            "カバー力が高く、少量でもよく伸びます。しっとりとした保湿感もあり、使い始めてから肌荒れが減ったように感じています。",
        reviewNote: "",

        // 参考価格はアルビオン公式の商品ページで確認。
        price: "7,150円（税込）／30mL",
        priceNote: "アルビオン公式掲載価格。",

        sourceUrl: "https://albion.co.jp/site/g/gAAAKFK010/",
        sourceName: "アルビオン公式オンラインストア"
    },


    /* -----------------------------------------------------
       メイクキープミスト
    ----------------------------------------------------- */
    mist: {
        name: "コーセー メイク キープ ミスト EX",

        kind: "メイクキープミスト",

        image: "images/image(20261013-043542).png",

        description:
            "完成したメイクを長時間キープするために使っています。汗や皮脂による化粧崩れを抑えるため、ベースメイクの仕上げに顔全体へ吹きかけています。",
        // レビュー: https://www.cosme.net/variations/1084854/
        // レビュー・価格: https://i-voce.jp/cosmetics/14/92072/reviews/
        review: "細かなミストがふんわり広がり、メイクの崩れやマスクへの色移りを抑えやすいという感想が見られます。一方で、肌質や季節によって乾燥を感じる人もいるようです。",
        price: "1,320円（税込）／85mL",
        priceNote: "VOCE掲載の旧製品EXの参考価格。現在は生産終了・リニューアルしています。",
        sourceUrl: "https://i-voce.jp/cosmetics/14/92072/reviews/",
        sourceName: "VOCE"
    },


    /* -----------------------------------------------------
       フェイスパウダー
    ----------------------------------------------------- */
    powder: {
        name: "パーフェクトダイアリー トランスルーシェント ブルーリング ルースパウダー 2.0",

        kind: "フェイスパウダー",

        image: "images/download.png",

        description:
            "ベースメイクの仕上げに使っているフェイスパウダーです。余分な皮脂やテカリを抑え、さらっとした肌に整えるために使っています。",
        // レビュー: https://www.cosme.net/products/10239799/
        // レビュー・価格: https://jp.perfectdiary.com/products/translucent-blurring-loose-powder-version-n
        review: "きめ細かな粉でさらっと仕上がり、時間がたっても崩れにくいという感想が見られます。軽いつけ心地や、厚塗り感が出にくい自然な仕上がりも好評です。",
        price: "3,960円（税込）",
        priceNote: "Perfect Diary公式の2.0掲載価格。",
        sourceUrl: "https://jp.perfectdiary.com/products/translucent-blurring-loose-powder-version-n",
        sourceName: "Perfect Diary公式オンラインストア"
    }
};


/* =========================================================
   5. 商品詳細画面のHTML要素を取得する
========================================================= */

// 商品詳細のdialog全体
const itemDialog = document.getElementById("item-dialog");

// 商品写真
const dialogImage = document.getElementById("dialog-image");

// 写真がない場合の「写真準備中」
const dialogNoImage = document.getElementById("dialog-no-image");

// 商品の種類
const dialogKind = document.getElementById("dialog-kind");

// 商品名
const dialogTitle = document.getElementById("dialog-title");

// 商品説明
const dialogDescription = document.getElementById(
    "dialog-description"
);

// 全商品で共通の、感想・参考価格・参考サイトの表示場所。
const dialogReview = document.getElementById("dialog-review");
const dialogReviewNote = document.getElementById("dialog-review-note");
const dialogPrice = document.getElementById("dialog-price");
const dialogPriceNote = document.getElementById("dialog-price-note");
const dialogSource = document.getElementById("dialog-source");


/* =========================================================
   6. 「商品詳細を見る」を押したとき
========================================================= */

/*
    button[data-product]

    は、

    data-product="concealer"

    のような属性を持っているボタンを
    すべて取得するという意味。
*/

document
    .querySelectorAll("button[data-product]")
    .forEach((button) => {

        button.addEventListener("click", () => {

            /*
                押したボタンの data-product を取得。

                例

                data-product="primer"

                ↓

                products.primer

                の情報が取り出される。
            */

            const product =
                products[button.dataset.product];


            // 商品情報が見つからない場合は何もしない
            if (!product) {
                return;
            }


            /* ---------------------------------------------
               商品名などを書き換える
            --------------------------------------------- */

            dialogKind.textContent =
                product.kind;

            dialogTitle.textContent =
                product.name;

            dialogDescription.textContent =
                product.description;


            /* ---------------------------------------------
               商品写真を変更
            --------------------------------------------- */

            if (product.image) {

                // 商品写真を設定
                dialogImage.src =
                    product.image;

                // altにも商品名を設定
                dialogImage.alt =
                    product.name;

                // 写真を表示
                dialogImage.hidden =
                    false;

                // 「写真準備中」を非表示
                dialogNoImage.hidden =
                    true;

            } else {

                // 写真がない場合
                dialogImage.hidden =
                    true;

                // 前の商品画像を消す
                dialogImage.removeAttribute(
                    "src"
                );

                dialogImage.alt = "";

                // 「写真準備中」を表示
                dialogNoImage.hidden =
                    false;
            }


            /* ---------------------------------------------
               商品詳細画面を開く
            --------------------------------------------- */
            // 押した商品に合わせて感想・価格・参考サイトを書き換える。
            dialogReview.textContent = product.review;
            dialogReviewNote.textContent = product.reviewNote ??
                "複数サイトのレビューを参考にまとめています。";
            dialogReviewNote.hidden = !dialogReviewNote.textContent;
            dialogPrice.textContent = product.price;
            dialogPriceNote.textContent = `${product.priceNote}2026年10月15日確認。価格は販売店や時期によって異なります。`;
            dialogSource.href = product.sourceUrl;
            dialogSource.textContent = `参考サイト：${product.sourceName} ↗`;
            dialogSource.setAttribute("aria-label", `${product.name}の参考サイト：${product.sourceName}（新しいタブで開きます）`);

            // 前に開いた商品のスクロール位置を先頭に戻す。
            itemDialog.scrollTop = 0;
            itemDialog.showModal();


            /*
                詳細画面を開いている間、
                背景ページをスクロールできないようにする
            */

            document.body.classList.add(
                "dialog-open"
            );
        });
    });


/* =========================================================
   7. 商品詳細の暗い背景を押したとき
========================================================= */

itemDialog.addEventListener(
    "click",
    (event) => {

        /*
            dialogの中の写真や文章を押した場合は
            何もしない。

            dialog自体を押した場合だけ
            背景クリックの判定へ進む。
        */

        if (event.target !== itemDialog) {
            return;
        }


        /*
            dialog本体が画面のどこにあるか取得する。

            left
            right
            top
            bottom

            の位置が取得できる。
        */

        const rect =
            itemDialog.getBoundingClientRect();


        /*
            クリックした場所が
            dialog本体より外側かどうか調べる。
        */

        const outside =

            event.clientX < rect.left ||

            event.clientX > rect.right ||

            event.clientY < rect.top ||

            event.clientY > rect.bottom;


        // 外側なら商品詳細を閉じる
        if (outside) {
            itemDialog.close();
        }
    }
);


/* =========================================================
   8. 商品詳細を閉じたとき
========================================================= */

/*
    ×ボタン
    Escキー
    背景クリック

    どの方法で閉じても
    closeイベントが実行される。
*/

itemDialog.addEventListener(
    "close",
    () => {

        /*
            bodyから dialog-open を外して、
            ページを再びスクロールできるようにする。
        */

        document.body.classList.remove(
            "dialog-open"
        );
    }
);
