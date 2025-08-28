// Ficheiro: src/app/login/page.tsx

'use client';

import { useState, FormEvent } from 'react';

export default function LoginPage() {
  // Estados para controlar os campos do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados para controlar o feedback ao utilizador
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Função executada quando o formulário é submetido
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); // Previne o recarregamento da página
    setIsLoading(true);
    setError(null);

    try {
      // 1. Enviar os dados para a nossa rota de API
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // 2. Verificar se o login foi bem-sucedido
      if (!response.ok) {
        // Se a resposta não for 'ok' (ex: status 401), lançamos um erro com a mensagem da API
        throw new Error(data.error || 'Falha no login');
      }

      // 3. Se o login for bem-sucedido:
      // TODO: Guardar o token (data.token) de forma segura (ex: em cookies)
      console.log('Login bem-sucedido!', data);

      // TODO: Redirecionar o utilizador para o seu respetivo painel com base na sua 'role'
      // Por agora, vamos redirecionar para uma página genérica de painel.
      window.location.href = '/dashboard';

    } catch (err) {
      // 4. Se ocorrer um erro, mostramos a mensagem ao utilizador
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-xl shadow-lg overflow-hidden">
        
        {/* Coluna Esquerda: Formulário */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 bg-white flex flex-col justify-center">
          <div className="w-full">
            <div className="text-left mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <svg className="h-10 w-10 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                    <span className="text-2xl font-bold text-slate-800">Portal Vet+</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900">
                    Acesse sua conta
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                    Bem-vindo(a) de volta!
                </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email-address" className="sr-only">Email</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    placeholder="Endereço de e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Palavra-passe</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    placeholder="Palavra-passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="#" className="font-medium text-sky-600 hover:text-sky-500">
                    Esqueceu a sua senha?
                  </a>
                </div>
              </div>

              {error && (
                <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">
                  {error}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative flex w-full justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-300"
                >
                  {isLoading ? 'A entrar...' : 'Entrar'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Coluna Direita: Imagem */}
        <div className="hidden md:block w-1/2">
          <img 
            className="w-full h-full object-cover" 
            src="https://placehold.co/800x1000/a5f3fc/0c4a6e?text=Imagem\nVeterinária" 
            alt="Veterinário a cuidar de um animal" 
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x1000/e0f2fe/0891b2?text=Erro+ao+carregar+imagem'; }}
          />
        </div>
      </div>
    </div>
  );
}
