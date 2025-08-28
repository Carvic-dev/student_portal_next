// Ficheiro: src/app/dashboard/page.tsx

'use client';

// Este é o componente que será inserido como "children" no nosso DashboardLayout.
export default function DashboardPage() {
  
  // TODO: Obter os dados reais do aluno a partir da API.
  const user = {
    name: 'Aluno A',
  };

  const weekSchedule = [
    { day: 'Seg', date: '25', events: [] },
    { day: 'Ter', date: '26', events: [{ time: '19:00', name: 'Português (T88)' }] },
    { day: 'Qua', date: '27', events: [] },
    { day: 'Qui', date: '28', events: [] },
    { day: 'Sex', date: '29', events: [{ time: '08:00', name: 'Zoonoses (T87)' }] },
  ];

  const today = new Date().toLocaleDateString('pt-BR', { weekday: 'short' }).substring(0, 3);

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

      {/* Grelha de Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Card: Calendário Semanal */}
        <div className="dashboard-card bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg text-slate-700 mb-4">Minha Semana</h3>
            <div className="grid grid-cols-5 gap-2 text-center">
              {weekSchedule.map((item) => (
                <div key={item.day} className={`p-2 rounded-lg ${item.day.toLowerCase() === today.toLowerCase() ? 'bg-sky-100 border border-sky-300' : 'bg-slate-50'}`}>
                  <p className={`font-bold ${item.day.toLowerCase() === today.toLowerCase() ? 'text-sky-600' : 'text-slate-600'}`}>{item.day}</p>
                  <p className={`text-sm ${item.day.toLowerCase() === today.toLowerCase() ? 'text-sky-500' : 'text-slate-400'}`}>{item.date}</p>
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
        
        {/* Card: Avisos Recentes */}
        <div className="dashboard-card bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg text-slate-700 mb-4">Avisos Recentes</h3>
            <ul className="space-y-3">
                <li className="text-slate-600 hover:text-sky-600 cursor-pointer">&rarr; Lembrete: Início das aulas de Português para a Turma 88.</li>
                <li className="text-slate-600 hover:text-sky-600 cursor-pointer">&rarr; Material de apoio de Zoonoses já disponível.</li>
            </ul>
        </div>
      </div>

      {/* Tabela: Resumo de Desempenho */}
      <div className="mt-8">
          <h3 className="font-bold text-lg text-slate-700 mb-4">Resumo de Desempenho</h3>
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
              <table className="min-w-full">
                  <thead className="bg-slate-100">
                      <tr>
                          <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600">Disciplina</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600">Status</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600">Média</th>
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
