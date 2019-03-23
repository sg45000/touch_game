(function(){
  'use strict';


  //panel数(SIZE*SIZE)
  var SIZE =3;
  //panel幅高さ
  var PANEL_WIDTH = 50;
  //boardの縦横padding
  var BOARD_PADDING = 10;
  //次にクリックするナンバー
  var currentNum = 0;
  //現在の時間(Date.now())
  var startTime;
  //runTimerのId
  var timerId;

  initBoard();

  //panel処理関数
  function createPanel(num){
    var panel;
      panel = document.createElement('div');
      //パネルの数を隠す
      panel.className = 'panel hidden';
      panel.textContent = num;
      //正しいパネルをクリックした時の処理
      panel.addEventListener('click', function(){
        if((this.textContent - 0) === currentNum){
          this.className = 'panel flipped';
          currentNum++;
        }
        //全てクリックした場合タイマーを止める
        if(currentNum === SIZE**2){
          clearTimeout(timerId);
        }
      })
      return panel;
  }

  //boardを作る(または作り直す)
  //initBoard()-->
  function initBoard(){
    var i;
    var panels = [];
    var panel;
    var board = document.getElementById('board');
    //ゲームボードの大きさを決める
    document.getElementById('container').style.width = PANEL_WIDTH * SIZE +
      BOARD_PADDING * 2 + 'px';

    //levelボタンを押したときの処理
    var levelbtns = document.getElementsByClassName('level');
    for(var j =0; j<3;j++){
      var levelbtn=levelbtns[j];
      levelbtn.style.width = PANEL_WIDTH * SIZE / 3 + 'px';
      //levelボタンにクリック時の処理を追加
      levelbtn.addEventListener('click',function(){
        //全levelボタンを灰色にする
        for(var k=0;k<levelbtns.length;k++){
          levelbtns[k].className = "level";
        }
        //選択したlevelに変更しゲームボードをリセットする
        this.className = "level select";
        SIZE = (this.textContent.match(/(\d)/)[0]-0+2);
        clearTimeout(timerId);
        initBoard();
        document.getElementById('score').textContent = "0.00";
        document.getElementById('btn').textContent = "START";
        document.getElementById('btn').className = "";
      });
    }

    //boardにあるパネルをなくなるまで一つずつ消す
    while(board.firstChild){
      board.removeChild(board.firstChild);
    }

    //hiddenされているパネルを作成し、panels配列に格納
    for (i=0;i<SIZE**2;i++){
      // board.appendChild(createPanel(i));
      panels.push(createPanel(i));
    }
    //パネルをランダムに配置する
    while(panels.length){
      panel = panels.splice(Math.floor(Math.random()*panels.length), 1);
      board.appendChild(panel[0]);
    }
  }//<--initBoard()

  //タイマーを実行する
  function runTimer(){
    document.getElementById('score').textContent = ((Date.now()-startTime)/1000).toFixed(2);
    timerId = setTimeout(function(){
      runTimer();},10)
    };


  //スタートボタンにクリック時の処理を追加
  document.getElementById('btn').addEventListener('click',function(){
    var panels = document.getElementsByClassName('panel');
    var i;
    if(typeof timerId !== 'undifined'){
      clearTimeout(timerId);
    }
    currentNum=0;
    initBoard();
    for(i = 0; i < panels.length; i++){
      panels[i].className = 'panel';
    }
    this.textContent = 'RESTART?';
    this.className = 'restart'
    startTime=Date.now();
    runTimer();
  });

})();
