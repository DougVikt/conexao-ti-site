// Calendário acadêmico da Conexão TI.
//
// Datas oficiais da comunidade: adicione objetos neste array.
// Datas pessoais: cada aluno pode adicionar pelo botão "Adicionar prazo";
// elas ficam salvas apenas no navegador dele (localStorage).
//
// Campos:
//   titulo*     — texto curto (ex.: "Prova de Banco de Dados")
//   tipo*       — "prova" | "trabalho" | "evento" | "outro"
//   data*       — "AAAA-MM-DD"
//   hora        — "HH:MM" (opcional; sem hora = dia inteiro)
//   disciplina  — matéria ou curso (opcional)
//   local       — sala, plataforma ou link (opcional)
//   descricao   — observações (opcional)
//
// Exemplo:
// {
//     id: "prova-banco-2026-2",
//     titulo: "Prova de Banco de Dados",
//     tipo: "prova",
//     data: "2026-11-20",
//     hora: "19:00",
//     disciplina: "Banco de Dados",
//     local: "Cruzeiro do Sul Virtual",
//     descricao: "Conteúdo: modelagem, SQL e normalização."
// }

const calendarioDados = [];
