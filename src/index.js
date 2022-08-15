import "./styles.css";

const addBtnClick = () => {
  const inputText = document.getElementById("inputText").value;
  document.getElementById("inputText").value = "";
  //alert(inputText);

  createInCompleteList(inputText);
};

//未完了のTODOリストから指定の要素を削除する関数
const unfinishedBtnFunc = (target) => {
  document.getElementById("unfinishedList").removeChild(target);
};

//未完了リストに追加する関数
const createInCompleteList = (text) => {
  //liタグ生成
  const li = document.createElement("li");
  li.className = "li";

  //divタグ生成
  const div = document.createElement("div");
  div.className = "flexRow";

  //pタグ生成
  const pTag = document.createElement("p");
  pTag.innerText = text;

  //button（完了）生成
  const finBtn = document.createElement("button");
  finBtn.innerText = "完了";
  finBtn.addEventListener("click", () => {
    //押されたボタンの祖先のliを削除
    unfinishedBtnFunc(finBtn.closest(".li"));

    const addTargetLi = finBtn.closest(".li");
    const addTargetDiv = finBtn.parentNode;
    //「未完了のTODO」の<p>のテキスト取得
    const text = addTargetDiv.firstElementChild.innerText;
    addTargetLi.textContent = null;
    //div.flexRow生成
    const div = document.createElement("div");
    div.className = "flexRow";
    //div.flexRowの子要素のpタグ生成
    const pTag = document.createElement("p");
    pTag.innerText = text;
    //div.flexRowの子要素の戻すボタン生成
    const backBtn = document.createElement("button");
    backBtn.innerText = "戻す";
    backBtn.addEventListener("click", () => {
      const delTargetLi = backBtn.closest(".li");
      document.getElementById("finishedList").removeChild(delTargetLi);
      const delTargetDiv = backBtn.parentNode;
      //「未完了のTODO」の<p>のテキスト取得
      const text = delTargetDiv.firstElementChild.innerText;
      createInCompleteList(text);
    });

    //finBtnの親要素に子要素を入れていく
    addTargetLi.appendChild(div);
    div.appendChild(pTag);
    div.appendChild(backBtn);

    document.getElementById("finishedList").appendChild(addTargetLi);

    //document.documentElement("li").appendChild(backBtn);
  });

  //button（削除）生成
  const delBtn = document.createElement("button");
  delBtn.innerText = "削除";
  delBtn.addEventListener("click", () => {
    //押されたボタンの祖先のliを削除
    unfinishedBtnFunc(delBtn.closest(".li"));
  });
  //divにpタグ（入力したテキスト）を入れる
  div.appendChild(pTag);
  //divにbutton（完了）を入れる
  div.appendChild(finBtn);
  //divにbutton（削除）を入れる
  div.appendChild(delBtn);

  //liにdivタグ（.flexRow）を入れる
  li.appendChild(div);

  //「未完了のTODO」に入力したテキストのリストliを追加
  document.getElementById("unfinishedList").appendChild(li);
};

document
  .getElementById("addBtn")
  .addEventListener("click", () => addBtnClick());
