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

      {/* Card de Progresso */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 mb-8">
        <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg text-slate-700">Progresso do Curso</h3>
            <span className="font-semibold text-sky-600">{user.modulesCompleted} de {user.totalModules} módulos concluídos</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div className="bg-sky-500 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      {/* Grelha de Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
        
        {/* Card: Prazos Importantes */}
        <div className="dashboard-card bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg text-slate-700 mb-4">Prazos Importantes</h3>
            <ul className="space-y-3">
                <li className="flex items-start gap-3 p-2 rounded-md hover:bg-slate-50">
                    <span className="text-red-500 font-bold">05/09</span>
                    <div>
                        <p className="font-semibold text-slate-800">Prova de Fisiologia</p>
                        <p className="text-sm text-slate-500">A avaliação será sobre o sistema nervoso.</p>
                    </div>
                </li>
                <li className="flex items-start gap-3 p-2 rounded-md hover:bg-slate-50">
                    <span className="text-amber-500 font-bold">12/09</span>
                    <div>
                        <p className="font-semibold text-slate-800">Entrega do Trabalho</p>
                        <p className="text-sm text-slate-500">Prazo final para a entrega do trabalho de Zoonoses.</p>
                    </div>
                </li>
            </ul>
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
