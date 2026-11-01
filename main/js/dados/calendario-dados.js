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

const calendarioDados = [
    {
    id: "atividade-01-10-2026",
    titulo: "Entrega de atividades praticas",
    tipo: "atividade",
    data: "2026-11-01",
    hora: "23:59",
    disciplina: "Pensamento Computacional e Algoritimo",
    local: "online",
    descricao: ""
},
{
    id: "prova-06-11-2026",
    titulo: "Prova",
    tipo: "prova",
    data: "2026-11-06",
    hora: "00:59",
    disciplina: "Pensamento Computacional e Algoritimo",
    local: "online",
    descricao: ""
},
{
    id: "prova-07-11-2026",
    titulo: "Prova",
    tipo: "prova",
    data: "2026-11-07",
    hora: "00:00",
    disciplina: "Pensamento Computacional e Algoritimo",
    local: "online",
    descricao: ""
},
{
    id: "prova-08-11-2026",
    titulo: "Prova",
    tipo: "prova",
    data: "2026-11-08",
    hora: "00:00",
    disciplina: "Pensamento Computacional e Algoritimo",
    local: "online",
    descricao: ""
},
{
    id: "prova-09-11-2026",
    titulo: "Prova",
    tipo: "prova",
    data: "2026-11-09",
    hora: "23:59",
    disciplina: "Pensamento Computacional e Algoritimo",
    local: "online",
    descricao: ""
},
{
    id: "materia-01-11-2026",
    titulo: "Inicio da materia",
    tipo: "materia",
    data: "2026-11-03",
    hora: "00:00",
    disciplina: "De acordo com sua grade",
    local: "online",
    descricao: ""
}
];
