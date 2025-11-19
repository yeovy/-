import React, { useState } from 'react';
import { UserInput, LoadingStatus } from '../types';
import { PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface InputFormProps {
  onSubmit: (input: UserInput) => void;
  status: LoadingStatus;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, status }) => {
  const [rawText, setRawText] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [sector, setSector] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) return;
    onSubmit({ rawText, companyName, sector });
  };

  const isLoading = status === LoadingStatus.ANALYZING || status === LoadingStatus.GENERATING;

  const inputClasses = "w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 bg-white text-black placeholder-gray-500";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <SparklesIcon className="h-6 w-6 text-blue-600" />
          애로사항 입력
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          겪고 계신 어려움이나 제도 개선이 필요한 내용을 자유롭게 작성해주세요. <br/>
          AI가 내용을 분석하여 공식 건의서 양식으로 변환합니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">기업명 (선택)</label>
            <input
              type="text"
              className={inputClasses}
              placeholder="예: (주)부산로지스"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">업종 (선택)</label>
            <input
              type="text"
              className={inputClasses}
              placeholder="예: 제조업, 물류업"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            건의 내용 <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={8}
            className={`${inputClasses} resize-none`}
            placeholder="구체적인 상황, 문제점, 원하시는 개선 방향 등을 자유롭게 적어주세요."
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !rawText.trim()}
            className={`
              flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white
              transition-all duration-200
              ${isLoading || !rawText.trim() 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-900 hover:bg-blue-800 hover:shadow-lg transform hover:-translate-y-0.5'}
            `}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                분석 및 생성 중...
              </>
            ) : (
              <>
                보고서 자동 생성
                <PaperAirplaneIcon className="ml-2 h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;