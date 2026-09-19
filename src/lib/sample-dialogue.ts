import type { Dialogue } from "./dialogues";

// Fictional editorial sample. No statement below is an actual interview quotation.
export const sampleDialogue: Dialogue = {
  slug: "sample",
  status: "template",
  cover: "/images/stock/laboratory.webp",
  translations: {
    ja: {
      title: "再生医療の未来を、期待と根拠のあいだで考える。",
      category: "再生医療 × 医師の対話",
      introduction:
        "新しい医療に出会ったとき、私たちは何を期待し、何を確かめるべきなのか。架空の医師・再生医療研究者である藤森 悠を迎え、研究と診療の距離、患者さんに伝える言葉、これからの医療の姿を考える。「人間交差点」の世界観を描いた、創作の対談です。",
      guest: {
        name: "藤森 悠",
        role: "医師・再生医療研究者（架空の人物）",
        monogram: "YF",
        biography:
          "研究と患者さんの生活をつなぐことに関心を持つ医師、という設定の架空のゲスト。実在する人物・医療機関とは関係がなく、学歴・所属・専門資格・診療実績を示すものではありません。",
      },
      coverAlt:
        "青い手袋でフラスコを持つ研究者と実験器具。Pexelsの研究イメージ写真。",
      coverCaption:
        "研究のイメージ写真：Chokniti Khongchum / Pexels。実際の対談、出演者、ノリス美容クリニックの研究設備を撮影したものではありません。",
      sections: [
        {
          id: "origins",
          title: "「可能性」を、どう受け止めるか。",
          exchanges: [
            {
              question:
                "再生医療という言葉には、未来への期待が込められています。藤森先生は、どのような視点で向き合っていますか。",
              answer: [
                "再生医療は、損なわれた細胞や組織の機能を修復したり、置き換えたりすることを目指す研究や医療の領域です。ただ、ひとつの完成した治療法を指す言葉ではありません。どの病気に、どの方法を使うのかによって、確かめるべきことは違います。",
                "私は「何ができるようになるか」と同じくらい、「いま、何が分かっているか」を大切にしたいですね。未来を語る言葉と、目の前の選択を支える言葉。その二つを丁寧につなぐことが医師の仕事だと思います。",
              ],
            },
            {
              question:
                "研究室で見えた可能性を、患者さんの治療へつなぐには何が必要でしょうか。",
              answer: [
                "実験で興味深い結果が出たことと、人に使う治療として有効性や安全性が確かめられたことは、同じではありません。臨床研究を通じた検証が必要です。",
                "研究を一つの「橋」にたとえるなら、向こう岸が見えたからといって、すぐに渡れるわけではない。土台を確かめながら、一歩ずつ架けていく。私はその地道な時間にも、研究の価値があると考えています。",
              ],
            },
          ],
          image: "/images/stock/microscope.webp",
          imageAlt:
            "顕微鏡で試料を観察する研究者。出演者とは無関係のイメージ写真。",
          caption:
            "研究のイメージ写真：Edward Jenner / Pexels。特定の治療の効果や臨床実績を示す写真ではありません。",
        },
        {
          id: "values",
          title: "分からないことまで、きちんと伝える。",
          exchanges: [
            {
              question:
                "新しい治療について尋ねられたとき、どんな会話から始めたいですか。",
              answer: [
                "まず「何に困っているのか」「どんな暮らしを取り戻したいのか」を聞きたいです。同じ言葉で相談されても、その背景は一人ひとり異なるはずですから。",
                "そのうえで、期待できること、リスク、まだ不確かなこと、ほかの選択肢、費用や通院の負担を一緒に整理します。説明を終えたかどうかより、相手が自分の言葉で質問できるようになったかを大切にしたいですね。",
              ],
            },
            {
              question:
                "「分からない」と伝えることに、難しさを感じる場面もありそうです。",
              answer: [
                "あります。でも、曖昧な部分を隠して安心してもらうことと、不確かさも共有したうえで信頼してもらうことは違うと思うんです。",
                "「ここまでは分かっています。ここから先は、まだ確かめているところです」と分けて話す。その姿勢があるからこそ、期待も現実的なものになる。すぐに決めず、持ち帰って考えたり、別の医師に相談したりできる余白も大切にしたいです。",
              ],
            },
          ],
        },
        {
          id: "future",
          title: "進歩の先に、どんな日常を描くか。",
          exchanges: [
            {
              question: "これからの再生医療に、どんな未来を期待していますか。",
              answer: [
                "技術の名前だけが先に知られるのではなく、どんな人の、どんな困りごとに役立つのかが、より具体的に語られる未来です。研究者、臨床医、そして患者さんが、それぞれの立場から問いを持ち寄れるといいですね。",
                "研究室で生まれる問いと、診察室で生まれる問いは少し違います。その違いを埋めるのではなく、交差させる。そこから次の研究につながる気づきが生まれるのではないでしょうか。",
              ],
            },
            {
              question:
                "最後に、新しい医療の情報に触れる読者へ、ひと言お願いします。",
              answer: [
                "期待を持つことは大切です。同時に、疑問を持つことも大切にしてほしい。「何が根拠なのか」「自分の場合はどうなのか」と尋ねることは、決して失礼ではありません。",
                "医療は、説明を受けて終わるものではなく、問いを交わしながら考えていくもの。その対話の時間を、私たち医師も守っていきたいと思います。",
              ],
            },
          ],
          image: "/images/stock/stethoscope.webp",
          imageAlt: "書類の上に置かれた聴診器。診療を表すイメージ写真。",
          caption:
            "医療のイメージ写真：Pixabay / Pexels。実際の診療記録ではありません。",
        },
      ],
      quote:
        "期待を持つことと、根拠を確かめること。その両方を、対話の真ん中に。",
      afterword: [
        "この架空の対談で描いたのは、新しい技術を語るときほど、目の前の人の暮らしから考えるという姿勢です。研究の進歩と、患者さんが納得して選ぶための時間。そのどちらも大切にする医療のあり方を、二人の会話に重ねました。",
        "「人間交差点」では、異なる経験を持つ人同士が出会い、問いを交わす場をつくっていきます。今回はその読み心地を伝えるための創作サンプルであり、千原先生ご本人の発言や対談後記ではありません。",
      ],
      credits:
        "創作サンプル：登場するゲスト、質問・回答、引用、後記はすべて編集上の創作です。千原先生の実際の発言・見解や診療内容を示すものではありません。\n写真：Chokniti Khongchum、Edward Jenner、Pixabay / Pexels。写真の人物は登場人物ではありません。\n医学的な記述は一般的な情報です。個別の治療を推奨したり、効果を保証したりする記事ではありません。",
    },
    en: {
      title: "Regenerative medicine: between hope and evidence.",
      category: "Regenerative medicine × A conversation between doctors",
      introduction:
        "When we encounter a new medical approach, what should we hope for—and what should we ask? This fictional conversation introduces Dr. Yu Fujimori, an imagined physician and regenerative medicine researcher, to explore the distance between research and care. It is a sample story for Human Crossroads, not an actual interview.",
      guest: {
        name: "Yu Fujimori",
        role: "Physician & regenerative medicine researcher — fictional character",
        monogram: "YF",
        biography:
          "An invented guest whose interests connect laboratory research with patients’ everyday lives. This character is not associated with a real individual or institution; no real qualifications, appointments or clinical achievements are being claimed.",
      },
      coverAlt:
        "A gloved researcher holding a flask beside laboratory equipment. Illustrative stock photograph from Pexels.",
      coverCaption:
        "Illustrative research photograph: Chokniti Khongchum / Pexels. This does not depict an actual interview, the speakers or Norris Beauty Clinic’s research facilities.",
      sections: [
        {
          id: "origins",
          title: "What do we mean by possibility?",
          exchanges: [
            {
              question:
                "Regenerative medicine carries a great deal of hope. What perspective would you bring to it?",
              answer: [
                "It is a field that seeks to repair or replace damaged cells and tissues. But the phrase does not describe a single, finished treatment. The questions we need to ask depend on both the condition and the approach.",
                "I would give “What do we know now?” as much attention as “What might become possible?” There is the language of tomorrow, and there is the language that supports a decision today. A physician needs to connect the two carefully.",
              ],
            },
            {
              question:
                "What does it take to bring a laboratory finding into patient care?",
              answer: [
                "An interesting experimental result is not the same as evidence that a treatment is effective and safe in people. That requires clinical investigation.",
                "I imagine research as building a bridge. Seeing the opposite bank does not mean we can already cross. We need to establish the foundations, step by step. That patient work is part of what makes research valuable.",
              ],
            },
          ],
          image: "/images/stock/microscope.webp",
          imageAlt:
            "A researcher examining samples with a microscope; not one of the fictional speakers.",
          caption:
            "Illustrative research photograph: Edward Jenner / Pexels. It does not demonstrate a treatment outcome or clinical achievement.",
        },
        {
          id: "values",
          title: "Making room for what we do not know.",
          exchanges: [
            {
              question:
                "Where would you begin when someone asks about a new treatment?",
              answer: [
                "With their life: “What is troubling you?” and “What would you like to be able to do?” The same question about a treatment can come from very different personal circumstances.",
                "Then we can discuss potential benefits, risks, uncertainties, alternatives and the practical costs in time and money. I would want the person to feel able to ask questions in their own words, rather than simply listen to an explanation.",
              ],
            },
            {
              question:
                "Is it difficult to say that something is still unknown?",
              answer: [
                "It can be. But reassurance created by hiding uncertainty is different from trust built by sharing it.",
                "We can say, “This is what we know, and this is what is still being investigated.” That distinction makes hope more realistic. People also need space to take information home, consider it and speak with another physician if they wish.",
              ],
            },
          ],
        },
        {
          id: "future",
          title: "The everyday life beyond the science.",
          exchanges: [
            {
              question:
                "What future would you like to see for regenerative medicine?",
              answer: [
                "One where we talk more specifically about whose difficulties an approach might help, rather than only its name. Researchers, clinicians and patients all bring different questions.",
                "The questions that arise at a laboratory bench and in a consultation are not identical. Bringing them into conversation, rather than smoothing away the differences, may help us find the next question worth studying.",
              ],
            },
            {
              question:
                "What would you say to a reader encountering new medical information?",
              answer: [
                "Keep your hope, but also keep your questions. Asking “What is the evidence?” or “What does this mean in my situation?” is not impolite.",
                "Care should leave room for an exchange of questions. Protecting that time is part of the physician’s responsibility, too.",
              ],
            },
          ],
          image: "/images/stock/stethoscope.webp",
          imageAlt:
            "A stethoscope on paperwork, used as an illustrative medical photograph.",
          caption:
            "Illustrative medical photograph: Pixabay / Pexels. This is not a record of an actual consultation.",
        },
      ],
      quote:
        "Keep hope and evidence together, at the heart of the conversation.",
      afterword: [
        "This fictional dialogue explores an approach that begins with people’s everyday lives, even when discussing new technology. Scientific progress and the time someone needs to make an informed choice both deserve attention.",
        "Human Crossroads is a space for perspectives to meet. This sample demonstrates the series’ reading experience; neither the interview nor this afterword records Dr. Chihara’s actual statements or opinions.",
      ],
      credits:
        "Fictional editorial sample: the guest, questions, answers, quotation and afterword are invented. They do not represent Dr. Chihara’s actual statements, views or clinical practice.\nPhotography: Chokniti Khongchum, Edward Jenner and Pixabay / Pexels. People in stock photographs are not the speakers.\nMedical passages provide general information, not a recommendation for individual treatment or a promise of results.",
    },
    zh: {
      title: "再生医疗的未来：在期待与证据之间。",
      category: "再生医疗 × 医师对话",
      introduction:
        "面对一种新的医疗方式，我们可以期待什么，又应该确认什么？本篇邀请虚构的医师、再生医疗研究者藤森悠，探讨研究与诊疗之间的距离、与患者沟通的语言，以及未来医疗的模样。这是「人生交汇点」的虚构对谈示例，并非真实采访。",
      guest: {
        name: "藤森 悠",
        role: "医师・再生医疗研究者（虚构人物）",
        monogram: "YF",
        biography:
          "以连接实验室研究与患者日常生活为兴趣方向的虚构医师。与现实中的个人或医疗机构无关，不代表任何真实学历、职务、专业资质或诊疗成果。",
      },
      coverAlt:
        "戴手套的研究人员在实验器材旁手持烧瓶。来自Pexels的科研示意照片。",
      coverCaption:
        "科研示意照片：Chokniti Khongchum / Pexels。并非实际对谈、对谈人物或诺里斯美容诊所研究设施的照片。",
      sections: [
        {
          id: "origins",
          title: "如何理解医疗的「可能性」。",
          exchanges: [
            {
              question:
                "再生医疗承载着人们对未来的期待。您会以怎样的视角看待它？",
              answer: [
                "再生医疗是以修复或替代受损细胞、组织为目标的研究与医疗领域。但这个词并不代表某一种已经成熟的治疗。针对什么疾病、采用什么方法，需要确认的问题各不相同。",
                "我希望把「现在已经知道什么」放在与「未来可能做到什么」同样重要的位置。一种语言描绘未来，另一种语言支撑今天的选择。医师需要认真连接这两者。",
              ],
            },
            {
              question: "从实验室的发现走向患者的治疗，需要经历什么？",
              answer: [
                "实验中出现有价值的结果，与证明一种治疗对人有效且安全，并不是一回事。后者需要通过临床研究加以验证。",
                "我把研究想象成架桥。看到对岸，并不意味着已经能够渡过去。需要一步一步确认基础。耐心完成这些工作，本身也是研究的价值。",
              ],
            },
          ],
          image: "/images/stock/microscope.webp",
          imageAlt: "研究人员使用显微镜观察样本，与对谈人物无关的示意照片。",
          caption:
            "科研示意照片：Edward Jenner / Pexels。不用于展示特定治疗的效果或临床成果。",
        },
        {
          id: "values",
          title: "把尚未知晓的部分，也说清楚。",
          exchanges: [
            {
              question: "当有人询问一种新的治疗方式时，您希望从哪里开始交流？",
              answer: [
                "先了解对方的生活：「现在最困扰您的是什么？」「您希望重新做到什么？」即使提出同样的问题，每个人背后的经历也可能不同。",
                "之后，再一起梳理可能的获益、风险、不确定性、其他选择，以及时间和费用上的负担。我在意的不只是解释是否完成，而是对方能否用自己的语言继续提问。",
              ],
            },
            {
              question: "承认「还不知道」，会不会是一件困难的事？",
              answer: [
                "有时会。但隐藏不确定性换来的安心，与坦诚分享后建立的信任，是不同的。",
                "我们可以明确区分：「这些是已经知道的，那些仍在研究中。」期待因此才能更贴近现实。同时，也应留出时间，让人们把信息带回去思考，或听取另一位医师的意见。",
              ],
            },
          ],
        },
        {
          id: "future",
          title: "科学进步之后，我们希望怎样生活。",
          exchanges: [
            {
              question: "您希望再生医疗拥有怎样的未来？",
              answer: [
                "比起只谈技术名称，我更期待大家能够具体地讨论：它可能帮助谁，解决怎样的困难。研究人员、临床医师与患者，都可以带来自己的问题。",
                "实验台前产生的问题，与诊室里产生的问题不完全相同。让这些不同的视角相遇，而不是抹平差异，或许就能找到下一个值得研究的问题。",
              ],
            },
            {
              question: "最后，您想对接触新医疗信息的读者说些什么？",
              answer: [
                "保留期待，也保留疑问。「依据是什么？」「对我的情况意味着什么？」这样提问并不失礼。",
                "医疗应当为问题的交流留下空间。守护这样的时间，也是医师的责任。",
              ],
            },
          ],
          image: "/images/stock/stethoscope.webp",
          imageAlt: "放在文件上的听诊器，医疗示意照片。",
          caption: "医疗示意照片：Pixabay / Pexels。并非实际诊疗记录。",
        },
      ],
      quote: "把期待与证据，一起放在对话的中心。",
      afterword: [
        "这篇虚构对谈描绘的是一种从人的日常生活出发思考新技术的态度。科学的进步，与一个人为充分知情而作出选择所需要的时间，都值得重视。",
        "「人生交汇点」希望成为不同经历相遇、问题彼此交汇的空间。本篇用于展示系列的阅读体验，对谈与后记均非千原医师本人的真实发言或观点。",
      ],
      credits:
        "虚构对谈示例：嘉宾、提问、回答、引语及后记均为创作，不代表千原医师的真实发言、观点或诊疗内容。\n摄影：Chokniti Khongchum、Edward Jenner、Pixabay / Pexels。图库照片中的人物并非对谈人物。\n医学部分仅为一般信息，不构成个别治疗建议或疗效保证。",
    },
  },
};
