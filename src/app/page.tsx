'use client'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Budget Loop</h1>
        <p className="text-center text-lg">Sistema de controle financeiro pessoal</p>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Transações</h2>
            <p>Gerencie suas receitas e despesas</p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Orçamentos</h2>
            <p>Controle seus gastos por categoria</p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Metas</h2>
            <p>Defina e acompanhe objetivos financeiros</p>
          </div>
        </div>
      </div>
    </main>
  )
}

