import React from 'react';
import { ChartBarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
                <ChartBarIcon className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-blue-900 tracking-tight">BIZINTEL</span>
            </div>
            <div className="hidden md:block ml-6 pl-6 border-l border-gray-200">
              <span className="text-sm text-gray-500">부산상공회의소 기업애로 AI 분석 시스템</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-gray-500 hover:text-blue-900">이용안내</a>
            <button className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors">
              새 건의 작성
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;