import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ReportViewer from './components/ReportViewer';
import { LoadingStatus, PolicyReport, UserInput } from './types';
import { generatePolicyReport } from './services/geminiService';
import { CheckCircleIcon, ExclamationTriangleIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';

const App: React.FC = () => {
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.IDLE);
  const [report, setReport] = useState<PolicyReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showHero, setShowHero] = useState(true);

  const handleFormSubmit = async (input: UserInput) => {
    setShowHero(false); // 폼 제출 시 히어로 섹션 숨김
    setStatus(LoadingStatus.ANALYZING);
    setError(null);
    setReport(null);

    try {
      const result = await generatePolicyReport(input);
      setReport(result);
      setStatus(LoadingStatus.COMPLETED);
    } catch (e: any) {
      console.error(e);
      setError(e.message || "보고서 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setStatus(LoadingStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Header />

      {/* Hero Section (Landing) */}
      {showHero && status === LoadingStatus.IDLE && (
        <div className="bg-blue-900 text-white py-16 px-4 sm:px-6 lg:px-8 transition-all duration-500">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                <BuildingOffice2Icon className="h-16 w-16 text-blue-200" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              기업애로 보고서<br className="hidden sm:block" /> 
              <span className="text-blue-300">작성 및 분석 AGENT</span>
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              복잡한 애로사항을 입력하기만 하세요. <br />
              BIZINTEL이 정부와 지자체에 제출할 수 있는 <strong>완벽한 정책 건의서</strong>로 만들어드립니다.
            </p>
          </div>
        </div>
      )}

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`flex flex-col ${report ? 'lg:flex-row' : 'max-w-3xl mx-auto'} gap-8 transition-all duration-500`}>
          
          {/* Left Column: Input */}
          <div className={`w-full ${report ? 'lg:w-1/3' : ''} transition-all duration-500`}>
            <div className="sticky top-24 space-y-6">
              <InputForm onSubmit={handleFormSubmit} status={status} />
              
              {/* Tips Card */}
              {status === LoadingStatus.IDLE && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <CheckCircleIcon className="h-5 w-5" />
                    작성 팁
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex gap-2">
                      <span className="text-blue-500 font-bold">·</span>
                      <span>구체적인 피해 금액이나 지연 기간을 포함하세요.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-500 font-bold">·</span>
                      <span>관련된 규제나 법령 명칭을 아신다면 적어주세요.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-500 font-bold">·</span>
                      <span>단순 불만보다는 '어떻게 바뀌면 좋을지' 적어주세요.</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* Error Message */}
              {status === LoadingStatus.ERROR && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-red-900 flex items-start animate-pulse">
                   <ExclamationTriangleIcon className="h-6 w-6 mr-3 flex-shrink-0" />
                   <div>
                     <h3 className="font-bold">오류 발생</h3>
                     <p className="text-sm mt-1">{error}</p>
                   </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Result */}
          {report && (
            <div className="w-full lg:w-2/3 animate-fade-in">
              {status === LoadingStatus.COMPLETED && (
                <ReportViewer report={report} />
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-12 no-print">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm mb-2">
            &copy; 2024 Busan Chamber of Commerce & Industry.
          </p>
          <p className="text-xs text-gray-400">
            본 시스템은 Google Gemini 2.5 AI 기술을 기반으로 작동합니다.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;