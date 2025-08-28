'use client';

import { useState, ReactNode } from 'react';


export default function DashboardLayout({ children }: { children: ReactNode }) {
 
  const user = {
    name: 'Aluno A',
    role: 'STUDENT',
    avatarUrl: 'https://placehold.co/100x100/E2E8F0/4A5568?text=AA',
  };

  const [isNotificationsOpen, setNotificationsOpen] = useState(false);

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const getSidebarLinks = () => {
    
    return [
      { name: 'Painel', href: '/dashboard', active: true },
      { name: 'Notas e Faltas', href: '#', active: false },
      { name: 'Calendário', href: '#', active: false },
      { name: 'Mural de Avisos', href: '#', active: false },
      { name: 'Atendimento', href: '#', active: false },
    ];
  };

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className={`w-64 flex-shrink-0 bg-slate-800 text-slate-200 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-0' : '-ml-64'} md:ml-0`}>
        <div className="h-16 flex items-center justify-center space-x-3 text-xl font-bold border-b border-slate-700">
          <svg className="h-8 w-8 text-sky-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
          <span className="text-slate-100">Portal Vet+</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {getSidebarLinks().map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${
                link.active
                  ? 'bg-slate-900 text-white'
                  : 'hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span>{link.name}</span>
            </a>
          ))}
        </nav>
        <div className="mt-auto p-4 border-t border-slate-700">
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-700 hover:text-white">
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
            <span>Sair</span>
          </a>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
            {/* Botão para abrir a sidebar em mobile */}
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 rounded-md text-slate-500 hover:bg-slate-100">
                 <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
            </button>
            <div className="flex-1"></div> {/* Espaçador */}
            <div className="flex items-center gap-6">
                {/* Central de Notificações */}
                <div className="relative">
                    <button onClick={() => setNotificationsOpen(!isNotificationsOpen)} className="relative">
                        <svg className="h-6 w-6 text-slate-500 hover:text-slate-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
                        <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>
                    </button>
                    {isNotificationsOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-10">
                            <div className="p-3 border-b font-semibold text-sm">Notificações</div>
                            <div className="divide-y">
                                <a href="#" className="block p-3 hover:bg-slate-50 text-sm"><p className="font-semibold text-slate-800">Nova nota em Zoonoses</p><p className="text-slate-500">O Prof. Carlos Andrade lançou a sua nota da Prova 1.</p></a>
                            </div>
                        </div>
                    )}
                </div>
                {/* Perfil do Utilizador */}
                <div className="flex items-center gap-3">
                    <img className="h-10 w-10 rounded-full object-cover" src={user.avatarUrl} alt="Foto do Utilizador" />
                    <div>
                        <p className="font-semibold text-sm text-slate-700">{user.name}</p>
                        <a href="#" className="text-xs text-slate-500 hover:text-sky-500">Ver Perfil</a>
                    </div>
                </div>
            </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
            {/* O conteúdo da página atual (ex: o painel) será inserido aqui */}
            {children}
        </main>
      </div>
    </div>
  );
}
