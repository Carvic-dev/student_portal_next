'use client';

import React, { useState } from 'react';

// Dados de exemplo que viriam da API
const existingAnnouncements = [
  { id: 'a1', title: 'Prova 1 de Zoonoses', module: 'Zoonoses', turma: 'Turma 87', date: '25 de ago, 2025', content: 'Lembrete: a Prova 1 será aplicada na próxima segunda-feira.', scheduledAt: null, isPinned: true, readCount: 20, totalStudents: 22, isArchived: false },
  { id: 'a2', title: 'Material de Aula - Português', module: 'Português', turma: 'Turma 88', date: '22 de ago, 2025', content: 'Caros alunos, segue em anexo o material da aula de hoje.', files: ['slides_aula_5.pdf'], scheduledAt: null, isPinned: false, readCount: 18, totalStudents: 19, isArchived: false },
  { id: 'a3', title: 'Entrega do Trabalho Prático', module: 'Anatomia I', turma: 'Turma 87', date: '31 de ago, 2025', content: 'O prazo final para a entrega do trabalho prático é hoje.', scheduledAt: '2025-08-31T22:00:00', isPinned: false, readCount: 5, totalStudents: 22, isArchived: false },
  { id: 'a4', title: '[ARQUIVADO] Boas-vindas ao Módulo', module: 'Introdução', turma: 'Turma 86', date: '01 de mar, 2025', content: 'Bem-vindos ao início do curso!', scheduledAt: null, isPinned: false, readCount: 21, totalStudents: 21, isArchived: true },
];

const professorModules = [
    { id: 'm1', name: 'Zoonoses', turma: 'Turma 87' },
    { id: 'm2', name: 'Português', turma: 'Turma 88' },
    { id: 'm3', name: 'Anatomia I', turma: 'Turma 87' },
];

export default function ProfessorAvisosPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState(professorModules[0].id);
  const [files, setFiles] = useState<File[]>([]);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [view, setView] = useState('ativos'); // 'ativos' ou 'arquivados'

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const publicationTime = isScheduled ? `${scheduleDate}T${scheduleTime}` : 'agora';
    console.log({ title, content, selectedModuleId, files, publicationTime });
    alert(`Aviso ${isScheduled ? `agendado para ${scheduleDate} às ${scheduleTime}` : 'publicado com sucesso'}!`);
    setTitle('');
    setContent('');
    setFiles([]);
    setIsScheduled(false);
    setScheduleDate('');
    setScheduleTime('');
  };
  
  const filteredAnnouncements = existingAnnouncements
    .filter(a => view === 'ativos' ? !a.isArchived : a.isArchived)
    .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Mural de Avisos</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário para Publicar Novo Aviso */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-700">Publicar Novo Aviso</h2>
              <button type="button" className="text-sm font-semibold text-teal-600 hover:text-teal-500">Usar Modelo</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-600">Título</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" required />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-slate-600">Conteúdo</label>
                <textarea id="content" rows={5} value={content} onChange={(e) => setContent(e.target.value)} className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" required></textarea>
              </div>
              <div>
                <label htmlFor="module" className="block text-sm font-medium text-slate-600">Destino (Módulo)</label>
                <select id="module" value={selectedModuleId} onChange={(e) => setSelectedModuleId(e.target.value)} className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500">
                  <option value="all">Todos os meus módulos</option>
                  {professorModules.map(mod => <option key={mod.id} value={mod.id}>{mod.name} ({mod.turma})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600">Anexar Ficheiros</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-slate-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none">
                        <span>Carregar ficheiros</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} />
                      </label>
                      <p className="pl-1">ou arraste e solte</p>
                    </div>
                    {files.length > 0 && <p className="text-xs text-slate-500">{files.length} ficheiro(s) selecionado(s)</p>}
                  </div>
                </div>
              </div>
              <div className="space-y-3 pt-4 border-t border-slate-200">
                 <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={isScheduled} onChange={(e) => setIsScheduled(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"/>
                    <span className="text-sm font-medium text-slate-700">Agendar publicação</span>
                  </label>
                
                {isScheduled && (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="scheduleDate" className="block text-xs text-slate-500">Data</label>
                            <input type="date" id="scheduleDate" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} className="mt-1 block w-full text-sm border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" required/>
                        </div>
                        <div>
                            <label htmlFor="scheduleTime" className="block text-xs text-slate-500">Hora</label>
                            <input type="time" id="scheduleTime" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} className="mt-1 block w-full text-sm border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" required/>
                        </div>
                    </div>
                )}
              </div>
              <button type="submit" className="w-full bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors shadow-sm">{isScheduled ? 'Agendar Aviso' : 'Publicar Aviso'}</button>
            </form>
          </div>
        </div>
        
        {/* Lista de Avisos Publicados */}
        <div className="lg:col-span-2">
           <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-700">Meus Avisos Publicados</h2>
              <div className="flex border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                  <button onClick={() => setView('ativos')} className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${view === 'ativos' ? 'bg-white shadow-sm text-teal-700' : 'text-slate-500 hover:bg-slate-200'}`}>Ativos</button>
                  <button onClick={() => setView('arquivados')} className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${view === 'arquivados' ? 'bg-white shadow-sm text-teal-700' : 'text-slate-500 hover:bg-slate-200'}`}>Arquivados</button>
              </div>
            </div>
            <div className="space-y-8">
              {filteredAnnouncements.map(announcement => (
                <div key={announcement.id} className={`border-b border-slate-200 pb-6 last:border-b-0 ${announcement.isPinned ? 'bg-teal-50/50 p-4 rounded-lg' : ''}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-800">{announcement.title}</h3>
                      <p className="text-sm text-slate-500">Publicado em {announcement.date} para <span className="font-semibold text-slate-600">{announcement.module} ({announcement.turma})</span></p>
                    </div>
                    <div className="flex gap-2 items-center">{/* ... action buttons ... */}</div>
                  </div>
                  <p className="mt-2 text-sm text-slate-700">{announcement.content}</p>
                   {announcement.files && ( <div className="mt-3">{/* ... attachments ... */}</div> )}
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">{/* ... read count ... */}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}