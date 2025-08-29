'use client';

import { useState } from 'react';

// Dados de exemplo que viriam da API
const studentsData = [
  { id: '1', matricula: '20251001', name: 'Ana Beatriz Lima', grade: 9.5, absences: 0, extraPoints: 0.5 },
  { id: '2', matricula: '20251002', name: 'Bruno Costa e Silva', grade: 8.0, absences: 2, extraPoints: 0.0 },
  { id: '3', matricula: '20251003', name: 'Carla Dias Ferreira', grade: 10.0, absences: 0, extraPoints: 1.0 },
  { id: '4', matricula: '20251088', name: 'Aluno A', grade: null, absences: 1, extraPoints: 0.0 },
];

export default function GradeEntryPage() {
  const [students, setStudents] = useState(studentsData);

  // Função para lidar com a mudança nos inputs
  const handleInputChange = (id: string, field: 'grade' | 'absences' | 'extraPoints', value: string) => {
    const numericValue = value === '' ? null : parseFloat(value);
    setStudents(students.map(student => 
      student.id === id ? { ...student, [field]: numericValue } : student
    ));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-slate-800">Lançar Notas e Faltas</h2>
        <button className="bg-teal-500 text-white font-semibold py-2 px-5 rounded-lg hover:bg-teal-600 transition-colors shadow-sm">
          Salvar Alterações
        </button>
      </div>

      {/* Filtros e Controles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
        <div>
          <label htmlFor="module-select" className="block text-sm font-medium text-slate-700">Módulo/Turma</label>
          <select id="module-select" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
            <option>Zoonoses (Turma 87)</option>
            <option>Anatomia (Turma 87)</option>
          </select>
        </div>
        <div>
          <label htmlFor="assessment-select" className="block text-sm font-medium text-slate-700">Avaliação</label>
          <select id="assessment-select" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
            <option>Prova 1</option>
            <option>Trabalho Prático</option>
            <option>Pontos Extras</option>
          </select>
        </div>
        <div className="flex items-end">
          <div className="flex gap-2">
            <button className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors text-sm">Nova Avaliação</button>
          </div>
        </div>
      </div>

      {/* Ações de Importação e Impressão */}
      <div className="flex flex-wrap gap-2 mb-6">
          <button className="flex items-center gap-2 bg-white text-slate-700 font-semibold py-2 px-4 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors text-sm">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
              Importar do Excel
          </button>
          <a href="#" className="flex items-center gap-2 bg-white text-slate-700 font-semibold py-2 px-4 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors text-sm">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6 18.25m0 0l2.147 2.147M6 18.25l2.147-2.147M18 18.25l-2.147 2.147M18 18.25l-2.147-2.147m0 0L12 5.25l-2.147 2.147" /></svg>
              Gerar Folha de Impressão
          </a>
      </div>

      {/* Tabela de Lançamento de Notas */}
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full" id="grade-entry-table">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600">Nome do Aluno</th>
              <th className="w-28 text-center py-3 px-4 font-semibold text-sm text-slate-600">Nota</th>
              <th className="w-28 text-center py-3 px-4 font-semibold text-sm text-slate-600">Faltas</th>
              <th className="w-32 text-center py-3 px-4 font-semibold text-sm text-slate-600">Pontos Extras</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            {students.map((student, index) => (
              <tr key={student.id} className={`border-b border-slate-200 ${index % 2 === 1 ? 'bg-slate-50' : ''}`}>
                <td className="py-2 px-4 font-medium">{student.name}</td>
                <td className="py-2 px-4">
                  <input 
                    type="number" 
                    step="0.1"
                    value={student.grade ?? ''}
                    onChange={(e) => handleInputChange(student.id, 'grade', e.target.value)}
                    className="w-full text-center p-1 border rounded-md border-slate-300" 
                  />
                </td>
                <td className="py-2 px-4">
                  <input 
                    type="number" 
                    value={student.absences ?? ''}
                    onChange={(e) => handleInputChange(student.id, 'absences', e.target.value)}
                    className="w-full text-center p-1 border rounded-md border-slate-300" 
                  />
                </td>
                <td className="py-2 px-4">
                  <input 
                    type="number" 
                    step="0.1"
                    value={student.extraPoints ?? ''}
                    onChange={(e) => handleInputChange(student.id, 'extraPoints', e.target.value)}
                    className="w-full text-center p-1 border rounded-md border-slate-300" 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
