'use client';

import { useState, useMemo } from 'react';

// Dados de exemplo que viriam da API, agora com mais módulos e status
const modulesData = {
  'zoonoses': {
    name: 'Zoonoses',
    status: 'IN_PROGRESS',
    className: 'Turma 87',
    isMakeup: false,
    professor: 'Prof. Carlos Andrade',
    limitAbsencesPercentage: 0.25,
    assessments: [
      { id: 1, description: 'Prova 1', grade: 7.0 },
      { id: 2, description: 'Prova 2', grade: null },
      { id: 3, description: 'Pontos Extras', grade: 0.5 },
    ],
    summary: { absences: 4, totalClasses: 40 },
  },
  'portugues': {
    name: 'Português',
    status: 'IN_PROGRESS',
    className: 'Turma 88',
    isMakeup: true,
    professor: 'Prof. Ana Costa',
    limitAbsencesPercentage: 0.25,
    assessments: [
       { id: 1, description: 'Avaliação Única', grade: null },
    ],
    summary: { absences: 1, totalClasses: 32 },
  },
  'intro-vet': {
    name: 'Introdução à Vet.',
    status: 'COMPLETED',
    className: 'Turma 86',
    isMakeup: true,
    professor: 'Prof. Sofia Ribeiro',
    limitAbsencesPercentage: 0.25,
    assessments: [
       { id: 1, description: 'Prova Final', grade: 9.5 },
    ],
    summary: { absences: 0, totalClasses: 30 },
  },
  'matematica': {
    name: 'Matemática',
    status: 'PENDING',
    className: null,
    isMakeup: false,
    professor: 'N/A',
    limitAbsencesPercentage: 0.25,
    assessments: [],
    summary: { absences: 0, totalClasses: 30 },
  },
};

type ModuleKey = keyof typeof modulesData;

// Funções de ajuda
const getGradeColor = (grade: number | null) => {
    if (grade === null) return 'text-slate-700';
    if (grade >= 8.5) return 'text-green-600';
    if (grade >= 6.0) return 'text-amber-600';
    return 'text-red-600';
};

const getAbsenceBarInfo = (absences: number, totalClasses: number, limitPercentage: number) => {
    const percentage = (absences / totalClasses) * 100;
    const limitCount = Math.floor(totalClasses * limitPercentage);
    let color = 'bg-green-500';
    if (percentage > 50) color = 'bg-amber-500';
    if (percentage >= (limitPercentage * 100)) color = 'bg-red-500';
    return { percentage, color, limitCount };
};

const getStatusInfo = (status: string) => {
    switch (status) {
        case 'IN_PROGRESS': return { text: 'Em Andamento', color: 'bg-sky-500' };
        case 'PENDING': return { text: 'Pendente', color: 'bg-slate-400' };
        case 'COMPLETED': return { text: 'Concluído', color: 'bg-green-500' };
        default: return { text: 'Indefinido', color: 'bg-slate-400' };
    }
};

export default function GradesPage() {
  const [selectedModuleKey, setSelectedModuleKey] = useState<ModuleKey>('zoonoses');
  
  const activeModuleData = modulesData[selectedModuleKey];

  const calculatedSummary = useMemo(() => {
    const currentAssessments = activeModuleData.assessments.filter(a => a.description.toLowerCase().indexOf('extra') === -1 && a.grade !== null);
    const extraPoints = activeModuleData.assessments.find(a => a.description.toLowerCase().indexOf('extra') !== -1)?.grade || 0;
    
    if (currentAssessments.length === 0) return { average: null, rawAverage: null, extraPoints, status: 'Em Andamento' };

    const sumOfGrades = currentAssessments.reduce((sum, a) => sum + (a.grade || 0), 0);
    const rawAverage = sumOfGrades / currentAssessments.length;
    const finalAverage = rawAverage + extraPoints;
    
    let status = 'Em Andamento';
    if(activeModuleData.status === 'COMPLETED'){
        status = finalAverage >= 6.0 ? 'Aprovado' : 'Reprovado';
    }

    return { average: finalAverage, rawAverage, extraPoints, status };
  }, [activeModuleData]);

  const absenceInfo = getAbsenceBarInfo(activeModuleData.summary.absences, activeModuleData.summary.totalClasses, activeModuleData.limitAbsencesPercentage);

  const modulesByStatus = Object.entries(modulesData).reduce((acc, [key, value]) => {
    const status = value.status;
    if (!acc[status]) acc[status] = [];
    acc[status].push({ key, ...value });
    return acc;
  }, {} as Record<string, (typeof modulesData[ModuleKey] & {key: string})[]>);

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Minhas Notas e Faltas</h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Coluna de Navegação dos Módulos */}
        <aside className="w-full md:w-1/3 lg:w-1/4">
            <div className="space-y-6">
                {modulesByStatus['IN_PROGRESS'] && (
                    <div>
                        <h3 className="font-semibold text-slate-500 mb-2">Em Andamento ({modulesByStatus['IN_PROGRESS'].length})</h3>
                        <ul className="space-y-1">
                            {modulesByStatus['IN_PROGRESS'].map(module => (
                                <li key={module.key}>
                                    <button onClick={() => setSelectedModuleKey(module.key as ModuleKey)} className={`w-full text-left p-3 rounded-md text-sm ${selectedModuleKey === module.key ? 'bg-sky-100 text-sky-800' : 'hover:bg-slate-100'}`}>
                                        <div className="flex items-center gap-3">
                                            <span className="h-2 w-2 rounded-full bg-sky-500"></span>
                                            <div>
                                                <p className="font-semibold">{module.name}</p>
                                                <p className="text-xs text-slate-500">{module.className}</p>
                                            </div>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {modulesByStatus['PENDING'] && (
                    <div>
                        <h3 className="font-semibold text-slate-500 mb-2">Pendentes ({modulesByStatus['PENDING'].length})</h3>
                        <ul className="space-y-1">
                             {modulesByStatus['PENDING'].map(module => (
                                <li key={module.key}>
                                    <button onClick={() => setSelectedModuleKey(module.key as ModuleKey)} className={`w-full text-left p-3 rounded-md text-sm ${selectedModuleKey === module.key ? 'bg-sky-100 text-sky-800' : 'hover:bg-slate-100'}`}>
                                        <div className="flex items-center gap-3">
                                            <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                                            <p className="font-semibold">{module.name}</p>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {modulesByStatus['COMPLETED'] && (
                    <div>
                        <h3 className="font-semibold text-slate-500 mb-2">Concluídos ({modulesByStatus['COMPLETED'].length})</h3>
                        <ul className="space-y-1">
                            {modulesByStatus['COMPLETED'].map(module => (
                                <li key={module.key}>
                                    <button onClick={() => setSelectedModuleKey(module.key as ModuleKey)} className={`w-full text-left p-3 rounded-md text-sm ${selectedModuleKey === module.key ? 'bg-sky-100 text-sky-800' : 'hover:bg-slate-100'}`}>
                                        <div className="flex items-center gap-3">
                                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                            <div>
                                                <p className="font-semibold">{module.name}</p>
                                                <p className="text-xs text-slate-500">{module.className}</p>
                                            </div>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </aside>

        {/* Conteúdo do Módulo Selecionado */}
        <div className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Tabela de Notas */}
                <div className="lg:col-span-2">
                    <h3 className="font-bold text-xl text-slate-800 mb-1">Detalhes de: {activeModuleData.name}</h3>
                    <div className="text-sm text-slate-500 mb-4">
                        <span>Professor(a): {activeModuleData.professor}</span> | 
                        <span className="ml-2 font-medium">{activeModuleData.className} {activeModuleData.isMakeup && <span className="text-amber-600">(Reposição)</span>}</span>
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                        <table className="min-w-full">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600">Avaliação</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600">Nota</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700">
                                {activeModuleData.assessments.length > 0 ? activeModuleData.assessments.map((item) => (
                                <tr key={item.id} className={`border-b border-slate-200`}>
                                        <td className={`py-3 px-4`}>{item.description}</td>
                                        <td className={`py-3 px-4 font-bold ${getGradeColor(item.grade)}`}>{item.grade !== null ? item.grade.toFixed(1) : '--'}</td>
                                </tr>
                                )) : (
                                    <tr><td colSpan={2} className="p-4 text-center text-slate-500">Nenhuma avaliação para este módulo ainda.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Resumo e Status */}
                <div>
                    <h3 className="font-bold text-lg text-slate-700 mb-4">Resumo do Módulo</h3>
                    <div className="space-y-4">
                        <div className="dashboard-card bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                            <h4 className="text-slate-500 font-medium text-sm">Média das Avaliações</h4>
                            <p className="text-2xl font-bold text-slate-800">{calculatedSummary.rawAverage?.toFixed(1) || '--'}</p>
                        </div>
                        <div className="dashboard-card bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                            <h4 className="text-slate-500 font-medium text-sm">Pontos Extras</h4>
                            <p className="text-2xl font-bold text-green-600">+{calculatedSummary.extraPoints.toFixed(1)}</p>
                        </div>
                        <div className="dashboard-card bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                            <h4 className="text-slate-500 font-medium text-sm">Média Final</h4>
                            <p className="text-2xl font-bold text-sky-600">{calculatedSummary.average?.toFixed(1) || '--'}</p>
                        </div>
                        <div className="dashboard-card bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                            <h4 className="text-slate-500 font-medium text-sm mb-2">Risco de Faltas ({absenceInfo.limitCount} é o limite)</h4>
                            <div className="w-full bg-slate-200 rounded-full h-4">
                                <div className={`${absenceInfo.color} h-4 rounded-full text-white text-xs flex items-center justify-center`} style={{ width: `${absenceInfo.percentage}%` }}>
                                    {activeModuleData.summary.absences}
                                </div>
                            </div>
                        </div>
                        <div className={`dashboard-card p-5 rounded-lg border ${calculatedSummary.status === 'Aprovado' ? 'bg-green-100 border-green-200' : 'bg-amber-100 border-amber-200'}`}>
                            <h4 className={`font-medium text-sm ${calculatedSummary.status === 'Aprovado' ? 'text-green-800' : 'text-amber-800'}`}>Status</h4>
                            <p className={`text-2xl font-bold mt-1 ${calculatedSummary.status === 'Aprovado' ? 'text-green-700' : 'text-amber-700'}`}>{calculatedSummary.status}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
