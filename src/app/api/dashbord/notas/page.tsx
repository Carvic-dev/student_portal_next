// Ficheiro: src/app/dashboard/notas/page.tsx

'use client';

import { useState } from 'react';

// Dados de exemplo que viriam da API
const gradesData = {
  zoonoses: {
    professor: 'Prof. Carlos Andrade',
    assessments: [
      { id: 1, description: 'Prova 1', date: '15/08/2025', weight: '30%', grade: 9.0 },
      { id: 2, description: 'Trabalho Prático', date: '30/08/2025', weight: '20%', grade: 10.0 },
      { id: 3, description: 'Prova 2', date: '20/09/2025', weight: '50%', grade: 9.6 },
      { id: 4, description: 'Pontos Extras (Opcional)', date: '25/09/2025', weight: null, grade: 0.5 },
    ],
    summary: {
      average: 9.5,
      extraPoints: 0.5,
      absences: 2,
      totalClasses: 40,
      status: 'Aprovado',
    },
  },
  portugues: {
    professor: 'Prof. Ana Costa',
    assessments: [
       { id: 1, description: 'Avaliação Contínua 1', date: '10/09/2025', weight: '100%', grade: null },
    ],
    summary: {
      average: null,
      extraPoints: 0,
      absences: 1,
      totalClasses: 32,
      status: 'Em Andamento',
    },
  },
};

type ModuleKey = keyof typeof gradesData;

export default function GradesPage() {
  const [activeTab, setActiveTab] = useState<ModuleKey>('zoonoses');
  const activeModuleData = gradesData[activeTab];

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Minhas Notas e Faltas</h2>
      
      {/* Navegação por Abas (Módulos) */}
      <div className="border-b border-slate-200">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
              <button 
                onClick={() => setActiveTab('zoonoses')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'zoonoses' ? 'border-sky-500 text-sky-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
              >
                Zoonoses
              </button>
              <button 
                onClick={() => setActiveTab('portugues')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'portugues' ? 'border-sky-500 text-sky-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
              >
                Português
              </button>
          </nav>
      </div>

      {/* Conteúdo da Aba Selecionada */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tabela de Notas */}
          <div className="lg:col-span-2">
              <h3 className="font-bold text-lg text-slate-700 mb-1">Detalhes de Avaliações</h3>
              <p className="text-sm text-slate-500 mb-4">Professor(a): {activeModuleData.professor}</p>
              <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                  <table className="min-w-full">
                      <thead className="bg-slate-100">
                          <tr>
                              <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600">Avaliação</th>
                              <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600">Data</th>
                              <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600">Peso</th>
                              <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600">Nota</th>
                          </tr>
                      </thead>
                      <tbody className="text-slate-700">
                        {activeModuleData.assessments.map((item) => (
                           <tr key={item.id} className={`border-b border-slate-200 ${item.weight === null ? 'bg-sky-50' : ''}`}>
                                <td className={`py-3 px-4 ${item.weight === null ? 'text-sm text-sky-800' : ''}`}>{item.description}</td>
                                <td className={`py-3 px-4 ${item.weight === null ? 'text-sm text-sky-800' : ''}`}>{item.date}</td>
                                <td className={`py-3 px-4 ${item.weight === null ? 'text-sm text-sky-800' : 'text-slate-500'}`}>{item.weight || 'N/A'}</td>
                                <td className={`py-3 px-4 font-bold ${item.weight === null ? 'text-sky-600' : ''}`}>{item.grade !== null ? item.grade.toFixed(1) : '--'}</td>
                           </tr>
                        ))}
                      </tbody>
                  </table>
              </div>
          </div>
          {/* Resumo e Status */}
          <div>
              <h3 className="font-bold text-lg text-slate-700 mb-4">Resumo do Módulo</h3>
              <div className="space-y-4">
                  <div className="dashboard-card bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                      <h4 className="text-slate-500 font-medium text-sm">Média Parcial</h4>
                      <p className="text-3xl font-bold text-sky-600 mt-1">{activeModuleData.summary.average?.toFixed(1) || '--'}</p>
                  </div>
                  <div className="dashboard-card bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                      <h4 className="text-slate-500 font-medium text-sm">Pontos Extras</h4>
                      <p className="text-3xl font-bold text-green-500 mt-1">+{activeModuleData.summary.extraPoints.toFixed(1)}</p>
                  </div>
                  <div className="dashboard-card bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                      <h4 className="text-slate-500 font-medium text-sm">Total de Faltas</h4>
                      <p className="text-3xl font-bold text-slate-800 mt-1">{activeModuleData.summary.absences} <span className="text-base font-medium text-slate-500">/ {activeModuleData.summary.totalClasses} aulas</span></p>
                  </div>
                  <div className={`dashboard-card p-5 rounded-lg border ${activeModuleData.summary.status === 'Aprovado' ? 'bg-green-100 border-green-200' : 'bg-amber-100 border-amber-200'}`}>
                      <h4 className={`font-medium text-sm ${activeModuleData.summary.status === 'Aprovado' ? 'text-green-800' : 'text-amber-800'}`}>Status</h4>
                      <p className={`text-2xl font-bold mt-1 ${activeModuleData.summary.status === 'Aprovado' ? 'text-green-700' : 'text-amber-700'}`}>{activeModuleData.summary.status}</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
