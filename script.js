/* =========================================
   Shoku↔match
   Prototype JavaScript
========================================= */

"use strict";


/* =========================================
   APP STATE
========================================= */

const state = {
  currentQuestion: 0,
  answers: [],
  mainType: null,
  subType: null,
  likedJobs: [],
  selectedJob: null,
  registered: false,
  user: {
    username: "",
    age: "",
    experience: "",
    workStatus: ""
  }
};


/* =========================================
   QUESTIONS
========================================= */

const questions = [
  {
    text: "忙しい時間帯、あなたはどちらに近い？",
    answers: [
      {
        text: "周りを見ながら、みんなをサポートする",
        scores: { social: 2, team: 2 }
      },
      {
        text: "自分の仕事に集中して、確実に進める",
        scores: { calm: 2, precise: 2 }
      }
    ]
  },

  {
    text: "初対面のお客様との会話は？",
    answers: [
      {
        text: "むしろ楽しい。自分から話せる",
        scores: { social: 3, active: 1 }
      },
      {
        text: "必要な会話ができればOK",
        scores: { calm: 2, precise: 1 }
      }
    ]
  },

  {
    text: "働くなら、どんなお店が好き？",
    answers: [
      {
        text: "にぎやかで活気のあるお店",
        scores: { active: 3, social: 1 }
      },
      {
        text: "落ち着いていて、丁寧に働けるお店",
        scores: { calm: 3, precise: 1 }
      }
    ]
  },

  {
    text: "新しい仕事を覚えるときは？",
    answers: [
      {
        text: "まずやってみながら覚えたい",
        scores: { challenge: 3, active: 1 }
      },
      {
        text: "説明を聞いて理解してから始めたい",
        scores: { precise: 3, calm: 1 }
      }
    ]
  },

  {
    text: "スタッフ同士の関係はどうしたい？",
    answers: [
      {
        text: "仲良くワイワイ。仕事以外でも話したい",
        scores: { team: 3, social: 2 }
      },
      {
        text: "仲は良くしたいけど、適度な距離感もほしい",
        scores: { balance: 3, calm: 1 }
      }
    ]
  },

  {
    text: "接客で一番大切だと思うのは？",
    answers: [
      {
        text: "明るさや親しみやすさ",
        scores: { social: 3, active: 1 }
      },
      {
        text: "丁寧さや正確さ",
        scores: { precise: 3, calm: 1 }
      }
    ]
  },

  {
    text: "急なトラブルが起きたら？",
    answers: [
      {
        text: "状況を見て、その場で考えて動く",
        scores: { challenge: 2, leader: 2 }
      },
      {
        text: "まず確認して、確実な方法で対応する",
        scores: { precise: 2, balance: 2 }
      }
    ]
  },

  {
    text: "ものすごく忙しい日はどう感じる？",
    answers: [
      {
        text: "時間が早く感じるし、結構好き",
        scores: { active: 3, challenge: 1 }
      },
      {
        text: "できれば落ち着いたペースで働きたい",
        scores: { calm: 3, balance: 1 }
      }
    ]
  },

  {
    text: "新人スタッフが入ってきたら？",
    answers: [
      {
        text: "自分から声をかけて助ける",
        scores: { team: 2, leader: 2 }
      },
      {
        text: "困っていそうなら声をかける",
        scores: { balance: 3, precise: 1 }
      }
    ]
  },

  {
    text: "仕事で褒められるなら、どちらが嬉しい？",
    answers: [
      {
        text: "『接客が良くて、お客様に好かれてるね』",
        scores: { social: 3, team: 1 }
      },
      {
        text: "『仕事が早くて、ミスが少ないね』",
        scores: { precise: 3, active: 1 }
      }
    ]
  },

  {
    text: "理想の店長・上司は？",
    answers: [
      {
        text: "距離が近く、何でも話しやすい人",
        scores: { team: 2, social: 2 }
      },
      {
        text: "仕事をしっかり教えて、任せてくれる人",
        scores: { leader: 2, challenge: 2 }
      }
    ]
  },

  {
    text: "バイト選びで、より大切なのは？",
    answers: [
      {
        text: "人間関係やお店の雰囲気",
        scores: { team: 3, balance: 1 }
      },
      {
        text: "時給・シフト・仕事内容などの条件",
        scores: { precise: 2, balance: 2 }
      }
    ]
  }
];


/* =========================================
   8 WORK TYPES
========================================= */

const workTypes = {
  social: {
    name: "愛されムードメーカー",
    emoji: "🦦",
    description:
      "人との距離を縮めるのが得意で、自然と場を明るくできるタイプ。お客様との会話やスタッフ同士のコミュニケーションを楽しめる環境で魅力を発揮します。",
    tags: [
      "接客が得意",
      "コミュ力",
      "親しみやすい",
      "明るい職場"
    ],
    workplace:
      "スタッフ同士の距離が近く、お客様との会話も楽しめる、明るく活気のあるお店がおすすめです。"
  },

  team: {
    name: "チームの潤滑油",
    emoji: "🐕",
    description:
      "周囲をよく見て、困っている人を自然にサポートできるタイプ。個人プレーより、みんなで協力してお店を回す環境に向いています。",
    tags: [
      "チームワーク",
      "気配り",
      "協調性",
      "仲間重視"
    ],
    workplace:
      "スタッフ同士で声を掛け合いながら働く、チームワークを大切にしているお店がおすすめです。"
  },

  active: {
    name: "パワフルプレイヤー",
    emoji: "🐆",
    description:
      "忙しい状況ほど集中力が上がり、スピード感を楽しめるタイプ。活気のある人気店や回転の速いお店で力を発揮します。",
    tags: [
      "スピード",
      "行動力",
      "忙しい店OK",
      "体力派"
    ],
    workplace:
      "ピークタイムに活気があり、テンポよく仕事を進められる人気店との相性が良さそうです。"
  },

  calm: {
    name: "癒やしの安定派",
    emoji: "🐨",
    description:
      "落ち着いた環境で、一つひとつ丁寧に仕事を進められるタイプ。慌ただしさより、質を大切にする職場に向いています。",
    tags: [
      "落ち着き",
      "丁寧",
      "安定感",
      "マイペース"
    ],
    workplace:
      "客層が落ち着いていて、一人ひとりのお客様に丁寧なサービスができるお店がおすすめです。"
  },

  precise: {
    name: "信頼の職人タイプ",
    emoji: "🦉",
    description:
      "正確さと責任感が強く、任された仕事をきっちり仕上げるタイプ。技術や専門知識を身につけられる環境にも向いています。",
    tags: [
      "正確",
      "責任感",
      "専門性",
      "コツコツ"
    ],
    workplace:
      "仕事をきちんと教えてもらえて、接客や調理のスキルを身につけられるお店がおすすめです。"
  },

  challenge: {
    name: "好奇心チャレンジャー",
    emoji: "🐒",
    description:
      "新しいことを覚えたり、経験したことのない仕事に挑戦するのが得意なタイプ。変化のある環境ほど成長できます。",
    tags: [
      "好奇心",
      "成長志向",
      "新しい挑戦",
      "柔軟"
    ],
    workplace:
      "新メニューや新しい仕事に挑戦でき、幅広い経験を積めるお店との相性が良さそうです。"
  },

  leader: {
    name: "頼れるリーダー",
    emoji: "🦁",
    description:
      "状況を見ながら判断し、周囲を引っ張る力を持つタイプ。責任ある仕事を任されるほど、やりがいを感じやすい傾向があります。",
    tags: [
      "リーダーシップ",
      "判断力",
      "責任感",
      "頼られる"
    ],
    workplace:
      "仕事を任せてもらいやすく、将来的にリーダーや店長を目指せる環境がおすすめです。"
  },

  balance: {
    name: "万能バランサー",
    emoji: "🦊",
    description:
      "人間関係・仕事内容・条件をバランスよく考えられるタイプ。状況に合わせて柔軟に動けることが大きな強みです。",
    tags: [
      "バランス型",
      "柔軟",
      "適応力",
      "安定志向"
    ],
    workplace:
      "働きやすさと仕事内容のバランスが取れ、無理なく長く続けられるお店がおすすめです。"
  }
};


/* =========================================
   DEMO JOB DATA
========================================= */

const jobs = [
  {
    id: 1,
    name: "Trattoria LUNA",
    category: "カジュアルイタリアン",
    emoji: "🍝",
    location: "池袋駅 徒歩3分",
    salary: "時給1,450円〜",
    shift: "週2日〜 / 1日4時間〜",
    match: 96,
    tags: [
      "髪色自由",
      "まかない",
      "未経験OK"
    ],
    goodFor: [
      "social",
      "team",
      "active"
    ],
    description:
      "スタッフ同士の距離が近く、明るい雰囲気のカジュアルイタリアン。接客を楽しみながら働きたい方におすすめです。",
    conditions: [
      "交通費支給",
      "まかないあり",
      "髪色自由",
      "未経験OK",
      "週2日から勤務OK"
    ]
  },

  {
    id: 2,
    name: "SUSHI AO",
    category: "寿司・和食",
    emoji: "🍣",
    location: "六本木駅 徒歩5分",
    salary: "時給1,600円〜",
    shift: "週3日〜 / 1日5時間〜",
    match: 92,
    tags: [
      "高時給",
      "和食",
      "接客スキル"
    ],
    goodFor: [
      "precise",
      "calm",
      "challenge"
    ],
    description:
      "落ち着いた空間で、丁寧な接客を学べる寿司・和食店。ワンランク上のサービスを身につけたい方にも向いています。",
    conditions: [
      "交通費支給",
      "制服貸与",
      "研修あり",
      "経験者優遇",
      "社員登用あり"
    ]
  },

  {
    id: 3,
    name: "CAFÉ BLANC",
    category: "カフェ",
    emoji: "☕️",
    location: "表参道駅 徒歩4分",
    salary: "時給1,400円〜",
    shift: "週2日〜 / 1日4時間〜",
    match: 89,
    tags: [
      "カフェ",
      "おしゃれ",
      "学生歓迎"
    ],
    goodFor: [
      "calm",
      "balance",
      "social"
    ],
    description:
      "白を基調とした落ち着いたカフェ。丁寧な接客を大切にしながら、スタッフ同士も協力して働いています。",
    conditions: [
      "交通費支給",
      "スタッフ割引",
      "未経験OK",
      "シフト相談OK",
      "学生歓迎"
    ]
  },

  {
    id: 4,
    name: "YAKITORI TORICO",
    category: "焼鳥・居酒屋",
    emoji: "🍢",
    location: "新宿駅 徒歩4分",
    salary: "時給1,500円〜",
    shift: "週2日〜 / 17:00〜24:00",
    match: 87,
    tags: [
      "にぎやか",
      "高時給",
      "まかない"
    ],
    goodFor: [
      "active",
      "social",
      "team"
    ],
    description:
      "活気のある焼鳥店。忙しい時間帯はスタッフ全員で声を掛け合いながら、お店を盛り上げています。",
    conditions: [
      "深夜手当あり",
      "まかないあり",
      "髪色相談OK",
      "未経験歓迎",
      "WワークOK"
    ]
  },

  {
    id: 5,
    name: "GINZA KAPPOU 凛",
    category: "割烹・日本料理",
    emoji: "🍱",
    location: "銀座駅 徒歩2分",
    salary: "時給1,700円〜",
    shift: "週3日〜 / 1日5時間〜",
    match: 84,
    tags: [
      "高時給",
      "落ち着いた接客",
      "研修あり"
    ],
    goodFor: [
      "precise",
      "calm",
      "leader"
    ],
    description:
      "落ち着いた空間で質の高い接客を学べる日本料理店。丁寧さや正確さを活かしたい方におすすめです。",
    conditions: [
      "交通費全額支給",
      "制服貸与",
      "研修制度",
      "社員登用あり",
      "経験者優遇"
    ]
  }
];


/* =========================================
   ELEMENT HELPERS
========================================= */

function getElement(id) {
  return document.getElementById(id);
}


/* =========================================
   SCREEN CONTROL
========================================= */

function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen");

  screens.forEach((screen) => {
    screen.classList.remove("active");
  });

  const target = getElement(screenId);

  if (!target) {
    console.error("Screen not found:", screenId);
    return;
  }

  target.classList.add("active");

  updateNavigation(screenId);

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
}


function updateNavigation(screenId) {
  const navButtons =
    document.querySelectorAll(
      ".bottom-navigation button"
    );

  navButtons.forEach((button) => {
    button.classList.remove("active-nav");

    if (
      button.dataset.screen === screenId
    ) {
      button.classList.add("active-nav");
    }
  });
}


/* =========================================
   DIAGNOSIS
========================================= */

function startDiagnosis() {
  state.currentQuestion = 0;
  state.answers = [];

  showScreen("diagnosis");

  renderQuestion();
}


function renderQuestion() {
  const question =
    questions[state.currentQuestion];

  if (!question) {
    calculateResult();
    return;
  }

  getElement("questionNumber").textContent =
    `QUESTION ${state.currentQuestion + 1} / ${questions.length}`;

  getElement("progressBar").style.wid
