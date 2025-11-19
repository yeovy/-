import React from 'react';
import { PolicyReport } from '../types';
import { PrinterIcon, BookOpenIcon } from '@heroicons/react/24/outline';

interface ReportViewerProps {
  report: PolicyReport;
}

const ReportViewer: React.FC<ReportViewerProps> = ({ report }) => {
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Tools */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200 no-print">
        <div className="text-sm text-gray-600">
          <span className="font-semibold text-blue-900">분석 완료:</span> AI가 작성한 공식 건의서입니다.
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handlePrint}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            <PrinterIcon className="h-4 w-4 mr-2" />
            인쇄/PDF 저장
          </button>
        </div>
      </div>

      {/* A4 Paper Layout */}
      <div className="a4-paper printable-area text-gray-900 font-serif">
        {/* Report Header */}
        <div className="border-b-4 border-blue-900 pb-6 mb-8">
          <div className="flex justify-between items-end mb-4">
            <span className="text-sm font-bold text-gray-500 tracking-widest">BUSAN CHAMBER OF COMMERCE</span>
            <div className="flex gap-2">
               <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200 rounded">
                {report.policyCategory}
              </span>
              <span className={`px-3 py-1 text-xs font-bold border rounded ${
                report.priority === 'HIGH' ? 'bg-red-100 text-red-800 border-red-200' :
                report.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                'bg-gray-100 text-gray-800 border-gray-200'
              }`}>
                중요도: {report.priority}
              </span>
            </div>
          </div>
          <h1 className="text-3xl font-extrabold leading-tight break-keep text-gray-900">
            {report.title}
          </h1>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 font-sans">
          
          {/* 1. 현황 및 실태 */}
          <section>
            <h2 className="text-xl font-bold mb-2 text-blue-900 flex items-center">
              <span className="mr-2 text-2xl opacity-80">01.</span> 현황 및 실태
            </h2>
            <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-300 text-justify leading-snug whitespace-pre-wrap text-gray-800 text-base">
              {report.currentStatus}
            </div>
          </section>

          {/* 2. 문제점 및 발생 원인 */}
          <section>
            <h2 className="text-xl font-bold mb-2 text-blue-900 flex items-center">
              <span className="mr-2 text-2xl opacity-80">02.</span> 문제점 및 발생 원인
            </h2>
            <div className="bg-white p-2 text-justify leading-snug whitespace-pre-wrap text-gray-800 text-base">
              {report.problemAnalysis}
            </div>
          </section>

          {/* 3. 요청사항 */}
          <section>
             <h2 className="text-xl font-bold mb-2 text-blue-900 flex items-center">
              <span className="mr-2 text-2xl opacity-80">03.</span> 요청사항
            </h2>
            <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-100 text-gray-800 font-medium leading-snug whitespace-pre-wrap text-base">
              {report.requestDetails}
            </div>
          </section>

          {/* 4. 개선방안 (정책 제언) */}
          <section>
            <h2 className="text-xl font-bold mb-2 text-blue-900 flex items-center">
              <span className="mr-2 text-2xl opacity-80">04.</span> 개선방안 (정책 제언)
            </h2>
            <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600">
              <p className="text-blue-900 font-medium leading-snug whitespace-pre-wrap text-base">
                {report.improvementPlan}
              </p>
            </div>
          </section>

          {/* 5. 기대효과 */}
          <section>
            <h2 className="text-xl font-bold mb-2 text-blue-900 flex items-center">
              <span className="mr-2 text-2xl opacity-80">05.</span> 기대효과
            </h2>
            <div className="border-t border-b border-gray-200 py-5 text-gray-800 leading-snug whitespace-pre-wrap text-base">
              {report.expectedEffects}
            </div>
          </section>

          {/* 6. 건의 분야 및 관련 법령 */}
          <section className="mt-6 pt-4 border-t-2 border-dashed border-gray-300">
             <h2 className="text-lg font-bold mb-2 text-gray-700 flex items-center gap-2">
              <BookOpenIcon className="h-5 w-5"/>
              06. 건의 분야 및 관련 법령
            </h2>
            <div className="bg-slate-100 p-4 rounded text-sm text-slate-700 leading-snug font-mono whitespace-pre-wrap">
              {report.relevantLaws}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-900 text-center">
          <p className="text-xl font-bold text-gray-900 tracking-widest">부산상공회의소</p>
          <p className="text-xs text-gray-500 mt-1 tracking-wide">BUSAN CHAMBER OF COMMERCE & INDUSTRY</p>
        </div>
      </div>
    </div>
  );
};

export default ReportViewer;