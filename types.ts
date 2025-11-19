export enum LoadingStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  GENERATING = 'GENERATING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

// Structure for the AI generated report
export interface PolicyReport {
  title: string;             // 제목
  currentStatus: string;     // 1. 현황 및 실태
  problemAnalysis: string;   // 2. 문제점 및 발생 원인 (유기적 결합)
  requestDetails: string;    // 3. 요청사항
  improvementPlan: string;   // 4. 개선방안 (정책 제언)
  expectedEffects: string;   // 5. 기대효과
  relevantLaws: string;      // 6. 건의 분야 및 관련 법령
  
  // Metadata
  policyCategory: string;    // 카테고리 (헤더 표시용)
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface UserInput {
  rawText: string;
  companyName?: string;
  sector?: string;
}