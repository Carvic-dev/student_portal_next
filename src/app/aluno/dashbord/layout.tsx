'use client';

import { useState, useEffect } from 'react';

// Este é o componente que será inserido como "children" no nosso DashboardLayout.
export default function DashboardPage() {
  
  // TODO: Obter os dados reais do aluno a partir da API.
  const user = {
    name: 'Aluno A',
    modulesCompleted: 3,
    totalModules: 19,
  };

  const weekSchedule = [
    { day: 'Seg', date: '25', events: [] },
    { day: 'Ter', date: '26', events: [{ time: '19:00', name: 'Português (T88)' }] },
    { day: 'Qua', date: '27', events: [] },
    { day: 'Qui', date: '28', events: [] },
    { day: 'Sex', date: '29', events: [{ time: '08:00', name: 'Zoonoses (T87)' }] },
  ];

  // Estado para guardar o dia atual, garantindo que o código funciona no lado do cliente
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    // Define o dia atual apenas quando o componente é montado no navegador
    setCurrentDay(new Date().toLocaleDateString('pt-BR', { weekday: 'short' }).substring(0, 3));
  }, []);

  const progressPercentage = (user.modulesCompleted / user.totalModules) * 100;

  return (
    <div>
      {/* Cabeçalho de Boas-Vindas */}
      <div className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-8">
        <img className="h-24 w-24 rounded-full object-cover border-4 border-sky-200" src="https://placehold.co/100x100/E2E8F0/4A5568?text=AA" alt="Foto do Aluno" />
        <div>
            <h2 className="text-3xl font-bold text-slate-800">Olá, {user.name}!</h2>
            <p className="text-slate-500 mt-1">Bem-vindo de volta ao seu painel.</p>
        </div>
      </div>

      {/* Grelha Principal de Cards 2x2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Card de Progresso */}
        <div className="dashboard-card bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg text-slate-700">Progresso do Curso</h3>
                <span className="font-semibold text-sky-600">{user.modulesCompleted} de {user.totalModules} concluídos</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div className="bg-sky-500 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
        </div>
        
        {/* Card: Conquistas Recentes */}
        <div className="dashboard-card bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg text-slate-700 mb-4">Conquistas Recentes</h3>
            <div className="flex justify-around items-center">
                <div className="text-center" title="Módulo de Zoonoses Concluído">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                       <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <p className="text-xs mt-2 text-slate-500">Zoonoses</p>
                </div>
                <div className="text-center" title="Primeira Prova com Nota Acima de 9.0">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                        <svg className="h-6 w-6 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
                    </div>
                    <p className="text-xs mt-2 text-slate-500">Nota Alta</p>
                </div>
            </div>
        </div>

        {/* Card: Calendário Semanal */}
        <div className="dashboard-card bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg text-slate-700 mb-4">Minha Semana</h3>
            <div className="grid grid-cols-5 gap-2 text-center">
              {weekSchedule.map((item) => (
                <div key={item.day} className={`p-2 rounded-lg ${item.day.toLowerCase() === currentDay.toLowerCase() ? 'bg-sky-100 border border-sky-300' : 'bg-slate-50'}`}>
                  <p className={`font-bold ${item.day.toLowerCase() === currentDay.toLowerCase() ? 'text-sky-600' : 'text-slate-600'}`}>{item.day}</p>
                  <p className={`text-sm ${item.day.toLowerCase() === currentDay.toLowerCase() ? 'text-sky-500' : 'text-slate-400'}`}>{item.date}</p>
                  <div className="mt-2 space-y-1">
                    {item.events.map(event => (
                      <div key={event.name} className="text-xs bg-sky-200 text-sky-800 p-1 rounded">
                        {event.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
        </div>
        
        {/* Card: Foco da Semana */}
        <div className="dashboard-card bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg text-slate-700 mb-4">Foco da Semana</h3>
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <span className="text-red-500 font-bold mt-1">05/09</span>
                    <div>
                        <p className="font-semibold text-slate-800">Prova de Fisiologia</p>
                        <p className="text-sm text-slate-500">A avaliação será sobre o sistema nervoso.</p>
                    </div>
                </div>
                <div className="border-t pt-4">
                    <p className="text-sm font-semibold text-slate-600 mb-2">💡 Dica de Estudo</p>
                    <p className="text-xs text-slate-500">
                        Revise os diagramas do sistema nervoso central e periférico. Focar nas funções de cada parte pode ajudar a memorizar.
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* Tabela: Resumo de Desempenho */}
      <div className="mt-8">
          <h3 className="font-bold text-lg text-slate-700 mb-4">Meus Módulos</h3>
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
              <table className="min-w-full">
                  <thead className="bg-slate-100">
                      <tr>
                          <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600">Módulo</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600">Status</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600">Média Final</th>
                      </tr>
                  </thead>
                  <tbody className="text-slate-700">
                      <tr className="border-b border-slate-200"><td className="py-3 px-4">Português</td><td><span className="text-amber-600 font-medium">Em Andamento</span></td><td>--</td></tr>
                      <tr className="border-b border-slate-200"><td className="py-3 px-4">Matemática</td><td><span className="text-red-600 font-medium">Pendente</span></td><td>--</td></tr>
                      <tr><td className="py-3 px-4">Zoonoses</td><td><span className="text-sky-600 font-medium">Em Andamento</span></td><td>--</td></tr>
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
}
