// Ficheiro: src/app/(professor)/dashboard/lancar-notas/page.tsx

'use client';

import { useState, useMemo } from 'react';

// Dados de exemplo que viriam da API
const studentsData = [
  { id: '1', matricula: '20251001', name: 'Ana Beatriz Lima', grade: 9.5, absences: 0, extraPoints: 0.5 },
  { id: '2', matricula: '20251002', name: 'Bruno Costa e Silva', grade: 8.0, absences: 2, extraPoints: 0.0 },
  { id: '3', matricula: '20251003', name: 'Carla Dias Ferreira', grade: 10.0, absences: 0, extraPoints: 1.0 },
  { id: '4', matricula: '20251004', name: 'Daniel Martins', grade: 6.5, absences: 1, extraPoints: 0.0 },
  { id: '5', matricula: '20251005', name: 'Eduarda Farias', grade: 7.5, absences: 3, extraPoints: 0.0 },
  { id: '6', matricula: '20251006', name: 'Felipe Almeida', grade: 4.0, absences: 0, extraPoints: 0.0 },
  { id: '7', matricula: '20251007', name: 'Gabriela Nogueira', grade: 8.8, absences: 1, extraPoints: 0.0 },
  { id: '8', matricula: '20251008', name: 'Heitor Vasconcelos', grade: null, absences: 2, extraPoints: 0.0 },
];

export default function LaunchGradesPage() {
  const [students, setStudents] = useState(studentsData);
  const [selectedModule, setSelectedModule] = useState('zoonoses-t87');
  const [selectedAssessment, setSelectedAssessment] = useState('prova-1');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleInputChange = (studentId: string, field: 'grade' | 'absences' | 'extraPoints', value: string) => {
    const numericValue = value === '' ? null : Number(value);
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, [field]: numericValue } : student
    ));
  };
  
  const assessmentSummary = useMemo(() => {
    const gradedStudents = students.filter(s => s.grade !== null);
    if (gradedStudents.length === 0) {
      return { average: 0, maxGrade: 0, minGrade: 0, count: 0 };
    }
    const grades = gradedStudents.map(s => s.grade as number);
    const sum = grades.reduce((acc, grade) => acc + grade, 0);
    const average = sum / gradedStudents.length;
    const maxGrade = Math.max(...grades);
    const minGrade = Math.min(...grades);
    return { average, maxGrade, minGrade, count: gradedStudents.length };
  }, [students]);

  const gradeDistribution = useMemo(() => {
    const distribution = [
      { range: '0-2', count: 0 }, { range: '2-4', count: 0 },
      { range: '4-6', count: 0 }, { range: '6-8', count: 0 },
      { range: '8-10', count: 0 },
    ];
    students.forEach(student => {
      if (student.grade !== null) {
        if (student.grade <= 2) distribution[0].count++;
        else if (student.grade <= 4) distribution[1].count++;
        else if (student.grade <= 6) distribution[2].count++;
        else if (student.grade <= 8) distribution[3].count++;
        else distribution[4].count++;
      }
    });
    return distribution;
  }, [students]);

  const maxCountInDistribution = useMemo(() => Math.max(...gradeDistribution.map(d => d.count), 1), [gradeDistribution]);

  const filteredStudents = useMemo(() => {
    return students
      .filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(student => {
        if (filterStatus === 'all') return true;
        if (filterStatus === 'lancado') return student.grade !== null;
        if (filterStatus === 'pendente') return student.grade === null;
        return true;
      });
  }, [students, searchTerm, filterStatus]);

  return (
    <div>
      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-slate-800">Lançar Notas e Faltas</h2>
        <button className="bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-teal-700 transition-colors shadow-sm flex items-center gap-2">
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
          Salvar Alterações
        </button>
      </div>

      {/* Bloco 1: Seleção */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
        <div>
          <label htmlFor="module-select" className="block text-sm font-medium text-slate-700 mb-1">Módulo</label>
          <select id="module-select" value={selectedModule} onChange={e => setSelectedModule(e.target.value)} className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
            <option value="zoonoses-t87">Zoonoses (Turma 87)</option>
            <option value="portugues-t88">Português (Turma 88)</option>
          </select>
        </div>
        <div>
          <label htmlFor="assessment-select" className="block text-sm font-medium text-slate-700 mb-1">Avaliação</label>
          <select id="assessment-select" value={selectedAssessment} onChange={e => setSelectedAssessment(e.target.value)} className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
            <option value="prova-1">Prova 1</option>
            <option value="prova-2">Prova 2</option>
            <option value="pontos-extras">Pontos Extras</option>
          </select>
        </div>
        <div className="flex items-end">
          <div className="flex flex-wrap gap-2">
            <button className="bg-slate-200 text-slate-800 font-semibold py-2 px-3 rounded-lg hover:bg-slate-300 transition-colors text-sm">Nova Avaliação</button>
            <button className="bg-slate-100 text-slate-600 font-semibold py-2 px-3 rounded-lg hover:bg-slate-200 transition-colors text-sm">Editar Avaliação</button>
          </div>
        </div>
      </div>

      {/* Bloco 2: Painel de Ações e Resumo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Resumo da Avaliação com Gráfico */}
        <div className="space-y-4">
            <h3 className="font-bold text-lg text-slate-700">Resumo da Avaliação</h3>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <div className="flex flex-wrap justify-around items-center text-center mb-6 space-y-4 md:space-y-0">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Média</p>
                        <p className="text-3xl font-bold text-slate-800">{assessmentSummary.average.toFixed(1)}</p>
                    </div>
                    <div className="hidden md:block border-l border-slate-200 h-12"></div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Maior Nota</p>
                        <p className="text-3xl font-bold text-green-600">{assessmentSummary.maxGrade.toFixed(1)}</p>
                    </div>
                    <div className="hidden md:block border-l border-slate-200 h-12"></div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Menor Nota</p>
                        <p className="text-3xl font-bold text-red-600">{assessmentSummary.minGrade.toFixed(1)}</p>
                    </div>
                    <div className="hidden md:block border-l border-slate-200 h-12"></div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Lançamentos</p>
                        <p className="text-3xl font-bold text-slate-800">{assessmentSummary.count} / {students.length}</p>
                    </div>
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500 mb-2">Distribuição de Notas</p>
                    <div className="flex justify-between items-end h-32 gap-2 border-b border-slate-200 pb-1 pt-4">
                        {gradeDistribution.map(item => (
                            <div key={item.range} className="flex-1 flex flex-col items-center justify-end">
                                <div 
                                    className="w-full bg-teal-400 rounded-t-md hover:bg-teal-500 transition-all flex items-center justify-center text-xs font-bold text-white"
                                    style={{ height: `${(item.count / maxCountInDistribution) * 100}%` }}
                                    title={`${item.count} aluno(s)`}
                                >
                                  {item.count > 0 ? item.count : ''}
                                </div>
                                <p className="text-xs text-slate-500 mt-1">{item.range}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        {/* Ferramentas */}
        <div className="space-y-4">
            <h3 className="font-bold text-lg text-slate-700">Ferramentas</h3>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col gap-3">
                <button className="flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors text-sm">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                    Exportar Modelo Excel
                </button>
                <button className="flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors text-sm">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V7.5M19.5 6h.008v.008H19.5V6z" /></svg>
                    Importar de Excel
                </button>
                <div className="relative group text-center">
                    <button disabled className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-colors text-sm opacity-50 cursor-not-allowed">
                        <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.25 21.75l-.648-1.178a3.375 3.375 0 00-2.455-2.456L12 17.25l1.178-.648a3.375 3.375 0 002.455-2.456L16.25 13l.648 1.178a3.375 3.375 0 002.456 2.456L20.25 18l-1.178.648a3.375 3.375 0 00-2.456 2.456z" /></svg>
                        Importar de Imagem (IA)
                    </button>
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-slate-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                        Em breve
                    </span>
                </div>
                <button className="flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors text-sm">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6 18.75m0-4.921l-1.657-.783a2.25 2.25 0 00-2.243.042L1.5 14.25l4.5 2.1m14.527-7.962l-4.5-2.1m0 0a2.25 2.25 0 00-2.243-.043L13.5 14.25l4.5-2.1m-4.5 2.1l-1.657.783a2.25 2.25 0 01-2.243-.042L9.75 14.25l-4.5-2.1m0 0l-1.473 6.786a2.25 2.25 0 002.244 2.087l3.938-1.134a2.25 2.25 0 001.387-1.387L15 4.25l-6.72 9.579z" /></svg>
                    Gerar Folha de Impressão
                </button>
            </div>
        </div>
      </div>
      
      {/* Bloco 3: Lista de Alunos */}
      <div>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="relative flex-grow">
            <label htmlFor="search-student" className="sr-only">Pesquisar aluno</label>
            <input
              type="text"
              id="search-student"
              placeholder="Pesquisar aluno por nome..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg border-slate-300"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
            </span>
          </div>
          <div>
            <label htmlFor="status-filter" className="sr-only">Filtrar por status</label>
            <select 
              id="status-filter"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="h-full px-4 py-2 border rounded-lg border-slate-300 bg-white"
            >
              <option value="all">Todos</option>
              <option value="lancado">Lançado</option>
              <option value="pendente">Pendente</option>
            </select>
          </div>
        </div>


        {/* Tabela de Lançamento de Notas */}
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600">Matrícula</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600">Nome do Aluno</th>
                <th className="w-28 text-center py-3 px-4 font-semibold text-sm text-slate-600">Nota</th>
                <th className="w-28 text-center py-3 px-4 font-semibold text-sm text-slate-600">Faltas</th>
                <th className="w-32 text-center py-3 px-4 font-semibold text-sm text-slate-600">Pontos Extras</th>
                <th className="w-32 text-center py-3 px-4 font-semibold text-sm text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {filteredStudents.map((student, index) => (
                <tr key={student.id} className={`border-b border-slate-200 ${index % 2 === 1 ? 'bg-slate-50' : ''}`}>
                  <td className="py-2 px-4">{student.matricula}</td>
                  <td className="py-2 px-4">{student.name}</td>
                  <td className="py-2 px-4">
                    <input 
                      type="number" 
                      className="w-full text-center p-1 border rounded-md border-slate-300" 
                      value={student.grade ?? ''}
                      onChange={e => handleInputChange(student.id, 'grade', e.target.value)}
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input 
                      type="number" 
                      className="w-full text-center p-1 border rounded-md border-slate-300" 
                      value={student.absences ?? ''}
                      onChange={e => handleInputChange(student.id, 'absences', e.target.value)}
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input 
                      type="number" 
                      step="0.1" 
                      className="w-full text-center p-1 border rounded-md border-slate-300" 
                      value={student.extraPoints ?? ''}
                      onChange={e => handleInputChange(student.id, 'extraPoints', e.target.value)}
                    />
                  </td>
                  <td className="py-2 px-4 text-center">
                      {student.grade !== null ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                              Lançado
                          </span>
                      ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-600"></span>
                              Pendente
                          </span>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
