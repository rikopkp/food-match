
// ==============================
// Shoku↔match
// script.js ①
// ==============================

const screens = document.querySelectorAll(".screen");

let currentQuestion = 0;
let answers = [];
let mainType = null;
let subType = null;
let selectedJob = null;
let likedJobs = [];

let user = JSON.parse(
  localStorage.getItem("shokumatchUser")
) || null;


// ==============================
// 画面切り替え
// ==============================

function showScreen(id) {

  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(id);

  if (target) {
    target.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "auto"
  });

  if (id === "jobs") {
    renderJobs();
  }

  if (id === "likes") {
    renderLikes();
  }

  if (id === "profile") {
    renderProfile();
  }
}


// data-screen があるボタンを動かす

document
  .querySelectorAll("[data-screen]")
  .forEach(button => {

    button.addEventListener("click", () => {

      const screen =
        button.dataset.screen;

      showScreen(screen);

    });

  });


// ==============================
// 診断スタート
// ==============================

const startButton =
  document.getElementById(
    "startDiagnosisButton"
  );

const startButton2 =
  document.getElementById(
    "startDiagnosisButton2"
  );


function startDiagnosis() {

  currentQuestion = 0;
  answers = [];

  showScreen("diagnosis");

  renderQuestion();
}


if (startButton) {
  startButton.addEventListener(
    "click",
    startDiagnosis
  );
}


if (startButton2) {
  startButton2.addEventListener(
    "click",
    startDiagnosis
  );
}


// ==============================
// 12問
// ==============================

const questions = [

  {
    text:
      "初対面の人とも、比較的すぐに打ち解けられる？",

    a:
      "はい。話すことはけっこう好き！",

    b:
      "どちらかというと様子を見る",

    scoreA: "social",
    scoreB: "calm"
  },

  {
    text:
      "忙しい時間帯の仕事はどう感じる？",

    a:
      "忙しい方が燃える！",

    b:
      "落ち着いて働ける方が好き",

    scoreA: "active",
    scoreB: "calm"
  },

  {
    text:
      "仕事ではどちらを重視する？",

    a:
      "チームで協力すること",

    b:
      "自分の仕事を正確にこなすこと",

    scoreA: "team",
    scoreB: "precise"
  },

  {
    text:
      "新しい仕事を任されたら？",

    a:
      "とりあえず挑戦してみたい！",

    b:
      "やり方を理解してから始めたい",

    scoreA: "challenge",
    scoreB: "precise"
  },

  {
    text:
      "お客様との会話についてどう思う？",

    a:
      "たくさん話せると楽しい",

    b:
      "必要な接客を丁寧にしたい",

    scoreA: "social",
    scoreB: "precise"
  },

  {
    text:
      "周りが困っていたらどうする？",

    a:
      "すぐ声をかけて手伝う",

    b:
      "自分の担当を終えてから手伝う",

    scoreA: "team",
    scoreB: "balance"
  },

  {
    text:
      "働くお店を選ぶなら？",

    a:
      "活気があってにぎやかなお店",

    b:
      "落ち着いた雰囲気のお店",

    scoreA: "active",
    scoreB: "calm"
  },

  {
    text:
      "仕事を覚える時は？",

    a:
      "実際にやりながら覚える",

    b:
      "説明を聞いてから丁寧に覚える",

    scoreA: "challenge",
    scoreB: "precise"
  },

  {
    text:
      "後輩や新人が入ってきたら？",

    a:
      "自分から教えたり声をかけたい",

    b:
      "聞かれたらしっかり教えたい",

    scoreA: "leader",
    scoreB: "calm"
  },

  {
    text:
      "仕事で評価されるなら、どちらが嬉しい？",

    a:
      "周りを盛り上げてくれた",

    b:
      "仕事が丁寧で安心できる",

    scoreA: "social",
    scoreB: "precise"
  },

  {
    text:
      "急なトラブルが起きた時は？",

    a:
      "すぐ動いて対応する",

    b:
      "状況を見て最善策を考える",

    scoreA: "leader",
    scoreB: "balance"
  },

  {
    text:
      "理想の働き方に近いのは？",

    a:
      "刺激があって成長できる",

    b:
      "無理なく長く続けられる",

    scoreA: "challenge",
    scoreB: "balance"
  }

];


// ==============================
// 質問表示
// ==============================

function renderQuestion() {

  const question =
    questions[currentQuestion];

  if (!question) {
    finishDiagnosis();
    return;
  }


  const number =
    document.getElementById(
      "questionNumber"
    );

  const text =
    document.getElementById(
      "questionText"
    );

  const container =
    document.getElementById(
      "answerContainer"
    );

  const progress =
    document.getElementById(
      "progressBar"
    );


  number.textContent =
    `QUESTION ${currentQuestion + 1} / 12`;

  text.textContent =
    question.text;

  progress.style.width =
    `${((currentQuestion + 1) / 12) * 100}%`;

  container.innerHTML = "";


  const buttonA =
    document.createElement("button");

  buttonA.className =
    "answer-button";

  buttonA.type = "button";

  buttonA.textContent =
    question.a;

  buttonA.addEventListener(
    "click",
    () => selectAnswer(
      question.scoreA
    )
  );


  const buttonB =
    document.createElement("button");

  buttonB.className =
    "answer-button";

  buttonB.type = "button";

  buttonB.textContent =
    question.b;

  buttonB.addEventListener(
    "click",
    () => selectAnswer(
      question.scoreB
    )
  );


  container.appendChild(buttonA);
  container.appendChild(buttonB);


  const previous =
    document.getElementById(
      "previousQuestionButton"
    );

  previous.style.visibility =
    currentQuestion === 0
      ? "hidden"
      : "visible";
}


function selectAnswer(type) {

  answers[currentQuestion] = type;

  currentQuestion++;

  if (
    currentQuestion >=
    questions.length
  ) {

    finishDiagnosis();

  } else {

    renderQuestion();

  }
}


document
  .getElementById(
    "previousQuestionButton"
  )
  .addEventListener(
    "click",
    () => {

      if (currentQuestion > 0) {

        currentQuestion--;

        answers.splice(
          currentQuestion,
          1
        );

        renderQuestion();

      }

    }
  );

// ==============================
// script.js ②
// 診断結果
// ==============================

const typeData = {

  social: {
    name: "愛されムードメーカー",
    emoji: "🦦",
    description:
      "人との距離を縮めるのが得意。明るい接客や、お客様との会話を楽しめるタイプです。",
    tags: [
      "接客好き",
      "明るい",
      "コミュ力"
    ],
    workplace:
      "スタッフ同士の距離が近く、お客様との会話も楽しめるお店"
  },

  team: {
    name: "チームの潤滑油",
    emoji: "🐕",
    description:
      "周囲を見ながら自然にサポートできる、チームに欠かせないタイプです。",
    tags: [
      "協調性",
      "気配り",
      "サポート"
    ],
    workplace:
      "チームワークを大切にする、スタッフ同士の仲が良いお店"
  },

  active: {
    name: "パワフルプレイヤー",
    emoji: "🐆",
    description:
      "忙しい状況でもテンポよく動ける、エネルギッシュなタイプです。",
    tags: [
      "行動派",
      "スピード",
      "活気"
    ],
    workplace:
      "忙しい時間帯もみんなで盛り上がれる活気のあるお店"
  },

  calm: {
    name: "癒やしの安定派",
    emoji: "🐨",
    description:
      "落ち着いて周囲を見られる、安心感のあるタイプです。",
    tags: [
      "穏やか",
      "安定",
      "丁寧"
    ],
    workplace:
      "落ち着いた雰囲気で、一人ひとりに丁寧な接客ができるお店"
  },

  precise: {
    name: "信頼の職人タイプ",
    emoji: "🦉",
    description:
      "細かいところまで丁寧に取り組み、仕事の質を大切にするタイプです。",
    tags: [
      "正確",
      "丁寧",
      "職人気質"
    ],
    workplace:
      "技術や丁寧さを評価してくれる、専門性の高いお店"
  },

  challenge: {
    name: "好奇心チャレンジャー",
    emoji: "🐒",
    description:
      "新しいことを覚えたり、未経験の仕事に挑戦することを楽しめるタイプです。",
    tags: [
      "好奇心",
      "成長",
      "挑戦"
    ],
    workplace:
      "新しい仕事をどんどん任せてもらえて成長できるお店"
  },

  leader: {
    name: "頼れるリーダー",
    emoji: "🦁",
    description:
      "周囲を見ながら判断し、必要な時には先頭に立てるタイプです。",
    tags: [
      "責任感",
      "判断力",
      "リーダー"
    ],
    workplace:
      "経験を活かし、将来的にリーダーや店長も目指せるお店"
  },

  balance: {
    name: "万能バランサー",
    emoji: "🦊",
    description:
      "状況に合わせて柔軟に動ける、バランス感覚の高いタイプです。",
    tags: [
      "柔軟",
      "対応力",
      "バランス"
    ],
    workplace:
      "ホール・キッチンなど幅広い仕事に関われるお店"
  }

};


function finishDiagnosis() {

  const scores = {};

  Object.keys(typeData)
    .forEach(type => {
      scores[type] = 0;
    });


  answers.forEach(type => {

    if (scores[type] !== undefined) {
      scores[type]++;
    }

  });


  const ranking =
    Object.keys(scores)
      .sort(
        (a, b) =>
          scores[b] - scores[a]
      );


  mainType = ranking[0];
  subType = ranking[1];


  const main =
    typeData[mainType];

  const sub =
    typeData[subType];


  document.getElementById(
    "resultEmoji"
  ).textContent =
    main.emoji;


  document.getElementById(
    "resultTitle"
  ).textContent =
    main.name;


  document.getElementById(
    "resultDescription"
  ).textContent =
    main.description;


  document.getElementById(
    "subTypeName"
  ).textContent =
    sub.name;


  document.getElementById(
    "subTypeEmoji"
  ).textContent =
    sub.emoji;


  document.getElementById(
    "workplaceDescription"
  ).textContent =
    main.workplace;


  const tags =
    document.getElementById(
      "resultTags"
    );

  tags.innerHTML = "";

  main.tags.forEach(tag => {

    const span =
      document.createElement("span");

    span.textContent = tag;

    tags.appendChild(span);

  });


  localStorage.setItem(
    "shokumatchType",
    mainType
  );


  showScreen("result");
}


document
  .getElementById(
    "restartDiagnosisButton"
  )
  .addEventListener(
    "click",
    startDiagnosis
  );


// ==============================
// 求人データ
// ==============================

const jobs = [

  {
    id: 1,
    name: "Trattoria LUNA",
    category:
      "カジュアルイタリアン",
    location:
      "池袋駅 徒歩3分",
    salary:
      "時給 1,450円〜",
    shift:
      "週2日〜 / 1日4時間〜",
    match: 96,
    emoji: "🍝",
    tags: [
      "未経験OK",
      "まかないあり",
      "髪色自由"
    ],
    description:
      "スタッフ同士の距離が近い、明るくカジュアルなイタリアン。接客を楽しみながら働きたい方におすすめです。",
    conditions: [
      "交通費支給",
      "まかないあり",
      "制服貸与",
      "未経験歓迎"
    ]
  },

  {
    id: 2,
    name: "SUSHI AO",
    category:
      "寿司・和食",
    location:
      "六本木駅 徒歩5分",
    salary:
      "時給 1,600円〜",
    shift:
      "週3日〜 / 1日5時間〜",
    match: 92,
    emoji: "🍣",
    tags: [
      "高時給",
      "経験者歓迎",
      "落ち着いた職場"
    ],
    description:
      "落ち着いた空間で、丁寧な接客や仕事を身につけられる寿司店です。",
    conditions: [
      "交通費支給",
      "昇給あり",
      "制服貸与",
      "経験者優遇"
    ]
  },

  {
    id: 3,
    name: "CAFÉ BLANC",
    category:
      "カフェ",
    location:
      "表参道駅 徒歩4分",
    salary:
      "時給 1,400円〜",
    shift:
      "週2日〜 / 1日4時間〜",
    match: 89,
    emoji: "☕️",
    tags: [
      "カフェ",
      "未経験OK",
      "おしゃれ"
    ],
    description:
      "白を基調とした落ち着いたカフェ。丁寧な接客を大切にしています。",
    conditions: [
      "未経験歓迎",
      "交通費支給",
      "社員登用あり",
      "シフト相談OK"
    ]
  },

  {
    id: 4,
    name: "YAKITORI TORICO",
    category:
      "焼鳥・居酒屋",
    location:
      "新宿駅 徒歩4分",
    salary:
      "時給 1,500円〜",
    shift:
      "週2日〜 / 1日4時間〜",
    match: 87,
    emoji: "🍢",
    tags: [
      "活気あり",
      "学生歓迎",
      "まかない"
    ],
    description:
      "元気な接客が魅力の焼鳥店。にぎやかな職場が好きな方におすすめです。",
    conditions: [
      "まかないあり",
      "交通費支給",
      "未経験歓迎",
      "深夜手当あり"
    ]
  },

  {
    id: 5,
    name: "GINZA KAPPOU 凛",
    category:
      "割烹・日本料理",
    location:
      "銀座駅 徒歩2分",
    salary:
      "時給 1,700円〜",
    shift:
      "週3日〜 / 1日5時間〜",
    match: 84,
    emoji: "🍱",
    tags: [
      "高時給",
      "日本料理",
      "接客スキル"
    ],
    description:
      "上質な接客や日本料理の知識を身につけられる、落ち着いた割烹店です。",
    conditions: [
      "交通費支給",
      "昇給あり",
      "制服貸与",
      "経験者歓迎"
    ]
  }

];


// ==============================
// 求人一覧
// ==============================

function renderJobs(
  searchText = ""
) {

  const list =
    document.getElementById(
      "jobList"
    );

  if (!list) return;

  list.innerHTML = "";


  const word =
    searchText
      .toLowerCase()
      .trim();


  const filtered =
    jobs.filter(job => {

      const target =
        `${job.name}
         ${job.category}
         ${job.location}
         ${job.tags.join(" ")}`.toLowerCase();

      return target.includes(word);

    });


  filtered.forEach(job => {

    const card =
      document.createElement("article");

    card.className =
      "job-card";


    const liked =
      likedJobs.includes(job.id);


    card.innerHTML = `

      <div class="job-image">
        ${job.emoji}
      </div>

      <div class="job-card-body">

        <div class="job-match">
          相性 ${job.match}%
        </div>

        <h2>
          ${job.name}
        </h2>

        <p>
          ${job.category}
        </p>

        <p>
          📍 ${job.location}
        </p>

        <strong>
          ${job.salary}
        </strong>

        <div class="tag-container left">
          ${job.tags
            .map(
              tag =>
                `<span>${tag}</span>`
            )
            .join("")}
        </div>

        <div class="job-actions">

          <button
            class="card-like-button"
            data-like="${job.id}"
            type="button"
          >
            ${liked ? "♥" : "♡"}
          </button>

          <button
            class="detail-button"
            data-job="${job.id}"
            type="button"
          >
            詳しく見る
          </button>

        </div>

      </div>
    `;


    list.appendChild(card);

  });


  document
    .querySelectorAll(
      "[data-job]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          openJob(
            Number(
              button.dataset.job
            )
          );

        }
      );

    });


  document
    .querySelectorAll(
      "[data-like]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          toggleLike(
            Number(
              button.dataset.like
            )
          );

        }
      );

    });

}


// ==============================
// 検索
// ==============================

const jobSearch =
  document.getElementById(
    "jobSearch"
  );


if (jobSearch) {

  jobSearch.addEventListener(
    "input",
    event => {

      renderJobs(
        event.target.value
      );

    }
  );

}


// ==============================
// 求人詳細
// ==============================

function openJob(id) {

  selectedJob =
    jobs.find(
      job => job.id === id
    );

  if (!selectedJob) return;


  document.getElementById(
    "detailImage"
  ).textContent =
    selectedJob.emoji;


  document.getElementById(
    "detailMatch"
  ).textContent =
    `${selectedJob.match}%`;


  document.getElementById(
    "detailName"
  ).textContent =
    selectedJob.name;


  document.getElementById(
    "detailCategory"
  ).textContent =
    selectedJob.category;


  document.getElementById(
    "detailLocation"
  ).textContent =
    selectedJob.location;


  document.getElementById(
    "detailSalary"
  ).textContent =
    selectedJob.salary;


  document.getElementById(
    "detailShift"
  ).textContent =
    selectedJob.shift;


  document.getElementById(
    "detailDescription"
  ).textContent =
    selectedJob.description;


  const tags =
    document.getElementById(
      "detailTags"
    );

  tags.innerHTML =
    selectedJob.tags
      .map(
        tag =>
          `<span>${tag}</span>`
      )
      .join("");


  const conditions =
    document.getElementById(
      "detailConditions"
    );

  conditions.innerHTML =
    selectedJob.conditions
      .map(
        item =>
          `<li>${item}</li>`
      )
      .join("");


  updateDetailLike();

  showScreen("jobDetail");
}


// ==============================
// LIKE
// ==============================

function toggleLike(id) {

  if (likedJobs.includes(id)) {

    likedJobs =
      likedJobs.filter(
        jobId => jobId !== id
      );

  } else {

    if (likedJobs.length >= 3) {

      alert(
        "LIKEは現在3店舗までです。プロフィールを完成させると、今後上限を増やせる仕様にする予定です。"
      );

      return;

    }

    likedJobs.push(id);

  }


  localStorage.setItem(
    "shokumatchLikes",
    JSON.stringify(likedJobs)
 );
  
// ==============================
// 会員登録
// ==============================

const registerForm =
  document.getElementById(
    "registerForm"
  );


registerForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();


    user = {

      username:
        document.getElementById(
          "username"
        ).value.trim(),

      age:
        document.getElementById(
          "age"
        ).value,

      experience:
        document.getElementById(
          "experience"
        ).value,

      workStatus:
        document.getElementById(
          "workStatus"
        ).value

    };


    localStorage.setItem(
      "shokumatchUser",
      JSON.stringify(user)
    );


    alert(
      "登録が完了しました！"
    );


    renderProfile();

    showScreen("profile");

  }
);


// ==============================
// 登録画面 戻る
// ==============================

document
  .getElementById(
    "registerBackButton"
  )
  .addEventListener(
    "click",
    () => {

      showScreen("profile");

    }
  );


// ==============================
// マイページ
// ==============================

function renderProfile() {

  const username =
    document.getElementById(
      "profileUsername"
    );

  const status =
    document.getElementById(
      "profileStatus"
    );

  const age =
    document.getElementById(
      "profileAge"
    );

  const experience =
    document.getElementById(
      "profileExperience"
    );

  const workStatus =
    document.getElementById(
      "profileWorkStatus"
    );


  if (user) {

    username.textContent =
      user.username;

    status.textContent =
      "基本プロフィール登録済み";

    age.textContent =
      `${user.age}歳`;

    experience.textContent =
      user.experience;

    workStatus.textContent =
      user.workStatus;


    document.getElementById(
      "completionPercentage"
    ).textContent =
      "55%";


    document.getElementById(
      "completionBar"
    ).style.width =
      "55%";


    document.getElementById(
      "completeProfileButton"
    ).textContent =
      "プロフィールを編集する";

  } else {

    username.textContent =
      "ゲストユーザー";

    status.textContent =
      "プロフィールを完成させましょう";

    age.textContent =
      "未設定";

    experience.textContent =
      "未設定";

    workStatus.textContent =
      "未設定";


    document.getElementById(
      "completionPercentage"
    ).textContent =
      "35%";


    document.getElementById(
      "completionBar"
    ).style.width =
      "35%";


    document.getElementById(
      "completeProfileButton"
    ).textContent =
      "プロフィールを登録する";

  }


  const savedType =
    mainType ||
    localStorage.getItem(
      "shokumatchType"
    );


  if (
    savedType &&
    typeData[savedType]
  ) {

    document.getElementById(
      "profileTypeEmoji"
    ).textContent =
      typeData[savedType].emoji;


    document.getElementById(
      "profileType"
    ).textContent =
      typeData[savedType].name;

  }

}


// ==============================
// プロフィール登録ボタン
// ==============================

document
  .getElementById(
    "completeProfileButton"
  )
  .addEventListener(
    "click",
    () => {

      if (user) {

        document.getElementById(
          "username"
        ).value =
          user.username || "";

        document.getElementById(
          "age"
        ).value =
          user.age || "";

        document.getElementById(
          "experience"
        ).value =
          user.experience || "";

        document.getElementById(
          "workStatus"
        ).value =
          user.workStatus || "";

      }

      showScreen("register");

    }
  );


// ==============================
// 応募
// ==============================

const applyModal =
  document.getElementById(
    "applyModal"
  );


document
  .getElementById(
    "applyButton"
  )
  .addEventListener(
    "click",
    () => {

      if (!user) {

        alert(
          "応募するには、先に無料会員登録をお願いします。"
        );

        showScreen("register");

        return;

      }


      applyModal.classList.add(
        "show"
      );

    }
  );


document
  .getElementById(
    "closeApplyButton"
  )
  .addEventListener(
    "click",
    () => {

      applyModal.classList.remove(
        "show"
      );

    }
  );


document
  .getElementById(
    "confirmApplyButton"
  )
  .addEventListener(
    "click",
    () => {

      applyModal.classList.remove(
        "show"
      );


      if (selectedJob) {

        alert(
          ${selectedJob.name}の応募情報入力画面は、次の段階で実装します！
        );

      }

    }
  );


// モーダルの外側を押して閉じる

applyModal.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      applyModal
    ) {

      applyModal.classList.remove(
        "show"
      );

    }

  }
);


// ==============================
// 初期表示
// ==============================

renderProfile();
renderJobs();
renderLikes();

showScreen("home");

console.log(
  "Shoku↔match loaded!"
);
