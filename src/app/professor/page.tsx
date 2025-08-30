'use client';

import React, { useState, useMemo } from 'react';

// Dados de exemplo que viriam da API
const professorData = {
  name: 'Prof. Carlos Andrade',
  email: 'carlos.andrade@email.com',
  avatarUrl: 'https://placehold.co/100x100/E2E8F0/4A5568?text=CA',
  modules: [
    { id: 'm1', name: 'Zoonoses', turma: 'Turma 87', studentCount: 22 },
    { id: 'm2', name: 'Português', turma: 'Turma 88', studentCount: 19 },
    { id: 'm3', name: 'Anatomia I', turma: 'Turma 87', studentCount: 22 },
  ],
  notifications: [
      { id: 'n1', text: 'Maria Souza enviou uma nova mensagem.', type: 'message', read: false },
      { id: 'n2', text: 'A administração publicou um novo aviso geral.', type: 'announcement', read: false },
      { id: 'n3', text: 'Lembrete: Lançar notas da Prova 1 de Zoonoses até amanhã.', type: 'task', read: true },
  ]
};

export default function ProfessorDashboardPage() {
  const [selectedTurma, setSelectedTurma] = useState('all');

  const turmas = useMemo(() => {
    return ['all', ...new Set(professorData.modules.map(m => m.turma))];
  }, [professorData.modules]);

  const filteredModules = useMemo(() => {
    if (selectedTurma === 'all') {
      return professorData.modules;
    }
    return professorData.modules.filter(module => module.turma === selectedTurma);
  }, [professorData.modules, selectedTurma]);

  return (
    <div>
      {/* Cabeçalho de Boas-vindas */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-8">
        <div className="flex items-center space-x-6">
          <img className="h-24 w-24 rounded-full object-cover border-4 border-teal-200" src={professorData.avatarUrl} alt="Foto do Professor" />
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Bem-vindo, {professorData.name}!</h2>
            <p className="text-slate-500 mt-1">{professorData.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Ações Rápidas */}
        <div>
          <h3 className="font-bold text-lg text-slate-700 mb-3">Ações Rápidas</h3>
          <div className="flex flex-wrap gap-4">
            <button className="bg-teal-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-teal-700 transition-colors shadow-sm flex items-center gap-2">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
              Lançar Notas
            </button>
            <button className="bg-sky-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-sky-700 transition-colors shadow-sm flex items-center gap-2">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.313-.153-.614-.343-.9-.573m-1.463-1.463a4.5 4.5 0 10-6.364-6.364 4.5 4.5 0 006.364 6.364m12.727 12.727L18 12.5m3 3l-1.25-1.25m-3 3l-1.25-1.25" /></svg>
              Publicar Aviso
            </button>
            <button className="bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg>
                Adicionar Material
            </button>
            <button className="bg-slate-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-slate-700 transition-colors shadow-sm flex items-center gap-2">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                Enviar Mensagem
            </button>
          </div>
        </div>
        {/* Notificações Recentes */}
        <div>
            <h3 className="font-bold text-lg text-slate-700 mb-3">Notificações Recentes</h3>
            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm space-y-3">
                {professorData.notifications.filter(n => !n.read).map(notification => (
                    <div key={notification.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-slate-50">
                        <div className="mt-1 h-2 w-2 rounded-full bg-sky-500"></div>
                        <p className="text-sm text-slate-600">{notification.text}</p>
                    </div>
                ))}
                 {professorData.notifications.filter(n => !n.read).length === 0 && (
                    <p className="text-sm text-slate-400 text-center p-4">Nenhuma notificação nova.</p>
                 )}
            </div>
        </div>
      </div>
      
      {/* Lista de Módulos */}
      <div>
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h3 className="font-bold text-lg text-slate-700">Meus Módulos Ativos</h3>
            <div>
                <label htmlFor="turma-filter" className="sr-only">Filtrar por turma</label>
                <select 
                  id="turma-filter" 
                  value={selectedTurma}
                  onChange={e => setSelectedTurma(e.target.value)}
                  className="text-sm border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                >
                  {turmas.map(turma => (
                    <option key={turma} value={turma}>
                      {turma === 'all' ? 'Todas as Turmas' : turma}
                    </option>
                  ))}
                </select>
            </div>
        </div>
        <div className="space-y-4">
          {filteredModules.map(module => (
            <div key={module.id} className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-teal-300">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div>
                  <h4 className="font-bold text-slate-800">{module.name}</h4>
                  <p className="text-sm text-slate-600">{module.turma} ({module.studentCount} alunos)</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-sm bg-slate-100 text-slate-700 font-semibold py-1 px-3 rounded-md hover:bg-slate-200">Ver Alunos</button>
                  <button className="text-sm bg-teal-100 text-teal-700 font-semibold py-1 px-3 rounded-md hover:bg-teal-200">Lançar Notas</button>
                </div>
              </div>
            </div>
          ))}
           {filteredModules.length === 0 && (
              <div className="text-center p-8 bg-white rounded-lg border border-dashed border-slate-300">
                  <p className="text-slate-500">Nenhum módulo encontrado para a turma selecionada.</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}