import { GoogleGenAI, Type } from "@google/genai";
import { PolicyReport, UserInput } from "../types";

// 초기화 로직을 함수 안으로 이동 (Lazy Initialization)
// 이렇게 해야 API 키가 없는 상태에서도 화면이 하얗게 죽지 않습니다.
let ai: GoogleGenAI | null = null;

const getAIClient = () => {
  if (!ai) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key가 설정되지 않았습니다. Vercel 환경변수를 확인해주세요.");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export const generatePolicyReport = async (input: UserInput): Promise<PolicyReport> => {
  const client = getAIClient();
  const modelId = "gemini-2.5-flash";

  const systemInstruction = `
    당신은 대한민국 부산상공회의소의 수석 정책 분석관입니다. 
    사용자가 입력한 기업 애로사항을 바탕으로 정부 부처나 국회에 제출할 공식 '정책 건의서'를 작성해야 합니다.

    [작성 원칙 - 중요]
    1. 문체: 철저한 개조식(Bullet Points)으로 작성하십시오. 서술형 문장을 지양하십시오.
    2. 종결어미: 반드시 명사형 또는 '~함', '~음', '~임', '~중임' 등으로 간결하게 끝맺으십시오. (예: '발생함', '시급함', '불가피함')
    3. 구조화 기호 및 줄바꿈:
       - 핵심 내용: ● (동그라미) 사용
       - 부가 설명: - (하이픈) 사용
       - **줄바꿈**: 가독성을 위해 각 항목(● 또는 -) 작성 후 줄바꿈을 한 번 하십시오.
    4. 분석 심도: 단순 나열이 아닌, 법적/제도적 원인을 깊이 있게 파고드십시오.
    5. 관련 법령 찾기: 건의 내용과 관련된 구체적인 대한민국 법령(예: 근로기준법 제52조, 조세특례제한법 등)이나 소관 부처, 산업 분류를 반드시 명시하십시오.

    [보고서 구조]
    1. 현황 및 실태: 현재 기업이 처한 상황 (객관적 데이터/사실 위주 개조식 나열)
    2. 문제점 및 발생 원인: 무엇이 문제이며 왜 발생하는지 유기적으로 결합 (인과관계가 드러나도록 개조식 서술)
    3. 요청사항: 기업이 구체적으로 무엇을 원하는지 명확히 요약
    4. 개선방안(정책 제언): 정부나 지자체의 구체적 조치 (법령 개정안 등)
    5. 기대효과: 국가/지역 경제에 미치는 긍정적 영향
    6. 건의 분야 및 관련 법령: 관련 법규, 소관 부처, 해당 산업 분야 명시
  `;

  const prompt = `
    [기업 정보]
    기업명: ${input.companyName || "익명 기업"}
    업종: ${input.sector || "미지정"}

    [민원 내용]
    ${input.rawText}

    위 내용을 분석하여 6단계 양식의 정책 건의서를 작성해주십시오. 
    반드시 '개조식(~함, ~음)' 문체를 사용하십시오.
  `;

  const response = await client.models.generateContent({
    model: modelId,
    contents: prompt,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: "건의서의 핵심을 관통하는 임팩트 있는 한 줄 제목 (예: ~관련 법령 개정 건의)",
          },
          currentStatus: {
            type: Type.STRING,
            description: "1. 현황 및 실태. ●와 - 기호를 사용.",
          },
          problemAnalysis: {
            type: Type.STRING,
            description: "2. 문제점 및 발생 원인. 유기적 결합.",
          },
          requestDetails: {
             type: Type.STRING,
             description: "3. 요청사항. 핵심 요약.",
          },
          improvementPlan: {
            type: Type.STRING,
            description: "4. 개선방안. 구체적 대안.",
          },
          expectedEffects: {
            type: Type.STRING,
            description: "5. 기대효과.",
          },
          relevantLaws: {
             type: Type.STRING,
             description: "6. 건의 분야. 법령명, 소관 부처 나열.",
          },
          policyCategory: {
            type: Type.STRING,
            description: "상단 태그용 대분류 (세제, 노무, 환경, 입지, 판로, 금융, 기타)",
          },
          priority: {
            type: Type.STRING,
            enum: ["HIGH", "MEDIUM", "LOW"],
            description: "중요도",
          },
        },
        required: [
          "title",
          "currentStatus",
          "problemAnalysis",
          "requestDetails",
          "improvementPlan",
          "expectedEffects",
          "relevantLaws",
          "policyCategory",
          "priority",
        ],
      },
    },
  });

  if (response.text) {
    return JSON.parse(response.text) as PolicyReport;
  }

  throw new Error("Failed to generate report");
};