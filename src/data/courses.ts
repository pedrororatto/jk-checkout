// Antes de habilitar um produto, confirme no admin do AlpaClass que ele está vinculado ao curso correto.
//
// Allowlist do catálogo. Nome e preço vêm da API da Eduzz (fonte da verdade);
// aqui só se define o que aparece, a categoria e um subtítulo opcional.

export type Category = "adultos" | "adolescentes" | "infantil" | "minicursos";

export type CourseConfig = {
  id: string; // ID numérico MyEduzz
  category: Category;
  alpaclass?: string; // slug do curso na vitrine AlpaClass (capa baixada por `npm run scrape:covers`)
  subtitle?: string; // linha pequena no card (opcional)
  enabled: boolean; // false = não aparece nem pode ser comprado
};

const on = (id: string, category: Category, alpaclass?: string, subtitle?: string): CourseConfig => ({ id, category, alpaclass, subtitle, enabled: true });
const off = (id: string, category: Category, alpaclass?: string): CourseConfig => ({ id, category, alpaclass, enabled: false });

export const courses: CourseConfig[] = [
  // ── Habilitados: série original 3143xxx + aprovados ──
  on("3143518", "infantil", "MaLbbv"), // Vem com Josué (ajuste manual: título infantil)
  on("3143516", "adultos", "uNS1hb"), // Teontologia
  on("3143515", "adultos", "UYANJE"), // Teologia Reformada II - Nossa identidade reformada
  on("3143514", "adultos", "QfhZgT"), // Pregação e Pregadores
  on("3143513", "adultos", "m36m0t"), // Pneumatologia
  on("3143512", "infantil", "EB8LJN"), // Os juízes de Deus (ajuste manual: série "... de Deus" infantil)
  on("3143511", "infantil", "eAm5jS"), // Os animais de Deus (0 - 4 anos)
  on("3143510", "infantil", "OFmvAE"), // Números: A grande jornada (0 a 7 anos)
  on("3143507", "adultos", "MjnyJI"), // No Princípio
  on("3143506", "adultos", "aMyBGZ"), // No Original
  on("3143505", "adultos", "GwYTNr"), // No mundo Espiritual
  on("3143503", "adultos", "lNnQK7"), // No Contexto Histórico
  on("3143502", "adultos", "cPMQ8G"), // Mordomia Cristã
  on("3143499", "adultos", "FQxrHq"), // Missiologia
  on("3143498", "infantil", "UcNaTz"), // Jesus e a salvação (no AlpaClass está em crianças)
  on("3143496", "adultos", "dURLdA"), // Introdução ao Novo Testamento
  on("3143495", "adultos", "tG50Ov"), // Fundamentos da nossa Fé
  on("3143492", "infantil", "xUp60C"), // Êxodo: Quando Deus venceu o Egito (0 a 7 anos)
  on("3143490", "infantil", "TdQjGv"), // Eu sou (0 a 5 anos)
  on("3143489", "adultos", "Zr5fBy"), // Ética Cristã
  on("3143487", "adultos", "zSRt4E"), // Escatologia
  on("3143486", "adultos", "TQO2oV"), // Em defesa da Fé
  on("3143483", "adultos", "eVEabP"), // Eclesiologia
  on("3143482", "adultos"), // Dons e Ministerios (slug ZI4S3R: capa no AlpaClass é a do Discipulado — religar após corrigir lá)
  on("3143479", "adultos", "Nh3rDV"), // Discipulado na Igreja Local
  on("3143478", "adultos", "K7562G"), // Discernindo Heresias
  on("3143476", "infantil", "x1FVqS"), // Deus vai para cozinha (ajuste manual: título infantil)
  on("3143470", "infantil", "yHkZyq"), // Conhecendo a oração (0 a 7 anos)
  on("3143468", "infantil", "fLPiwJ"), // Conhecendo a Deus filho (no AlpaClass está em crianças)
  on("3143467", "infantil", "5uym3t"), // Conhecendo a Deus - Parte 2 (4 a 7 anos)
  on("3143466", "infantil", "JcpT13"), // Conhecendo a Deus - Parte 1 (4 a 7 anos)
  on("3143464", "adultos", "X2Al9H"), // Como ler a bíblia
  on("3143463", "infantil", "euSw7Q"), // Caminhando no deserto (0 a 7 anos)
  on("3143462", "infantil", "MsAitA"), // Caminhando com Jesus (4 a 6 anos)
  on("3143460", "adultos", "9n1QgQ"), // Bibliologia
  on("3143459", "adultos", "7xPZLe"), // Bíblia de A a Z
  on("3143458", "infantil", "HCNjc2"), // As paisagens que Deus fez - ( 0 a 3 anos)
  on("3143457", "infantil", "kfVyrR"), // As crianças da Bíblia (ajuste manual: título infantil)
  on("3143456", "infantil", "GCGVvy"), // As árvores de Deus (ajuste manual: série "... de Deus" infantil)
  on("3143452", "adultos", "dNgAdC"), // Antropologia Bíblica
  on("3140933", "adultos", "GoAXVX"), // Teologia Reformada I – Nossa salvação em cinco pontos
  on("3126766", "adultos", "UEKf6E"), // Introdução ao Antigo Testamento
  on("3114828", "minicursos", "pWScWY"), // Minicurso - Bíblia de A a Z: a jornada do povo de Deus
  on("3114827", "minicursos", "WB57Sj"), // Minicurso - No Original: as Línguas da Bíblia
  on("3114825", "minicursos", "VQzqhH"), // Minicurso - No Mundo Espiritual: os bastidores da batalha espiritual
  on("3114690", "minicursos", "vwEhWn"), // Minicurso - Discipulado: prática na vida e na igreja local
  on("3114681", "minicursos", "B8s7W8"), // Minicurso - No Princípio: como Gênesis molda nossa Cosmovisão

  // ── Adolescentes (Kbças): habilitados em 2026-11-17 sem teste de compra → acesso ──
  on("3145918", "adolescentes", "6kIhAN"), // Introdução à Teologia Reformada
  on("3145913", "adolescentes", "JJrpKz"), // Introdução à Bibliologia
  on("3145719", "adolescentes", "ghr9wM"), // O Espírito Santo e nós
  on("3145711", "adolescentes", "pwc9pv"), // As marcas dos discípulos de Jesus
  on("3145705", "adolescentes", "g5inME"), // A igreja como Deus quer
  on("3145699", "adolescentes", "bXQ6IY"), // A igreja como Deus fez
  on("3149778", "adolescentes", "lkl4BC"), // Ética Cristã Contemporânea
  on("3149771", "adolescentes", "gKSPTf"), // Juízes, monarquia e profetas
  on("3149757", "adolescentes", "WLhRgi"), // O tempo de Jesus
  on("3149756", "adolescentes", "j8SUfk"), // Pentateuco e Josué
  on("3149264", "adolescentes", "IouQSh"), // Salvação
  on("3149256", "adolescentes", "Qa1XAC"), // A Pessoa de Cristo
  on("3149260", "adolescentes", "W1zyxw"), // Teontologia - Kbças Class
  on("3149791", "adolescentes", "uBHPWS"), // Bíblia de A a Z - Kbças Class
  on("3149790", "adolescentes", "quDJl6"), // Como Ler a Bíblia - Kbças Class
  on("3149787", "adolescentes", "bOk9Uj"), // Discipulado na Igreja Local - Kbças Class
  on("3145928", "adolescentes", "tVroLU"), // Missiologia - Kbças Class
  on("3145709", "adolescentes", "ktcFoX"), // Antropologia bíblica - kbças Class

  // ── Desabilitados: vínculo com o AlpaClass ainda não confirmado ──
  off("3145911", "adultos"), // Identidade humana (Parte 2)
  off("3145910", "adultos"), // Identidade humana (Parte 1)
  off("3149784", "adolescentes", "yJJoV3"), // Dons e Ministérios (versão nova — testada, NÃO liberou acesso)
  // "Atos e o início da Igreja" (AlpaClass sHUoaN) não tem produto na Eduzz
  off("3126818", "adultos", "dURLdA"), // John Knox - Introdução ao Novo Testamento (possível duplicado do 3143496)
];
