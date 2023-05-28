// ready関数を使用することで、htmlが全て読み込まれてからfunction以下の処理を開始することでエラーを防ぐ
// 即時関数は、ローカル環境（グローバル変数などを汚さない場）を簡単に作れるので便利
$(document).ready(function() {

    // 変数を宣言する
    var hands = ["goo", "chee", "pa"];
    var cpuHandIndex = 0;
    var intervalID;

    // 前段のintervalIDをsetInterval関数で定義
    // 中身は即時関数なので、中身が無限ループする。一度だけやりたい場合はsetTimeoutを使用すること
    intervalID = setInterval(function() {
        // cpuのインデックスを更新する
        cpuHandIndex = (cpuHandIndex + 1) % hands.length;
        // html内の#id=cpu-handについて、attrを使ってsrcとして配列のindexに応じた画像に、HTML内のcpu-hand自体を変更する
        // cpuのIndexは「あまり」を基準に算出するので、１、２、３のどれかになる。
        // この関数はミリ秒単位を第二引数に持つので、100にすると0.1秒ごとに画像が切り替わる（1000ミリ秒=1秒）
        $("#cpu-hand").attr("src", "img/" + hands[cpuHandIndex] + ".png");}, 100);
        // 各画像には共通のクラスhandがついているので、そのいずれかがクリックされる事をトリガーとする
        $(".hand").click(function() {
            // 定期実行をストップする。これにより、画像の連続遷移が止まる
            clearInterval(intervalID);
            // 以下の変数にそのidを入れる
            var playerHand = $(this).attr("id");
            // CPUの手をcharで格納
            var cpuHand = hands[cpuHandIndex];
            // 以下の関数はグローバル関数として後段で定義する
            var result = gameResult(playerHand, cpuHand);
            // pタグで文字の出力領域をブランクで準備してあるので、そこにgameResult関数の戻り値をtextで格納
            $("#result").text(result);
        });

        // グローバル関数定義
        function gameResult(playerHand, cpuHand) {
            if (playerHand===cpuHand) {
                return "引き分け";
            }
            if ((playerHand === "goo" && cpuHand === "chee" ) ||
            (playerHand === "chee" && cpuHand === "pa") ||
            (playerHand === "pa" && cpuHand === "goo")) {
                return "あなたの勝ちです、おめでとう。";
            }
            return "あなたの負け〜";
        }

        // ボタンを押したらリセットさせる
        $(".btn.cubic").click(function(){
            window.location.reload();
        })
});