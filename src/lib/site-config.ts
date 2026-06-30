export type HeroConfig = {
  title: string;
  description: string;
  image: string;
  eyebrow?: string;
  align?: "center" | "left";
  compact?: boolean;
};

export type AlternatingSection = {
  title: string;
  text: string[];
  image: string;
  imageLeft?: boolean;
};

export type GridItem = {
  title: string;
  description: string;
  image: string;
  href?: string;
  external?: boolean;
};

export type RichTextSection = {
  title: string;
  body: string[];
};

export type ContactInfo = {
  title: string;
  description: string;
  email?: string;
  phone?: string;
};

export type PageTemplate = "feature" | "grid" | "richText" | "contact";

export type SitePage = {
  slug: string;
  title: string;
  description: string;
  navLabel?: string;
  hero: HeroConfig;
  template: PageTemplate;
  intro?: string[];
  alternatingSections?: AlternatingSection[];
  gridItems?: GridItem[];
  richTextSections?: RichTextSection[];
  contactInfo?: ContactInfo;
};

export const sitePages: SitePage[] = [
  {
    slug: "brunch",
    title: "Brunch",
    description: "Conheca o novo espaco de brunch do Santa Maria Emporio.",
    navLabel: "Brunch",
    template: "feature",
    hero: {
      title: "Um novo espaco para celebrar a manha",
      description:
        "O Santa Maria apresenta uma novidade que merece ser saboreada devagar: nosso novo brunch chegou.",
      image: "/images/branch.png",
      compact: true,
    },
    alternatingSections: [
      {
        title: "Um convite para desacelerar",
        text: [
          "No coracao do nosso emporio, criamos um espaco onde o tempo parece desacelerar.",
          "Ali, entre aromas convidativos e luz suave, os dias comecam com mais leveza.",
        ],
        image: "/images/branch1.jpg",
      },
      {
        title: "Sabores para qualquer humor matinal",
        text: [
          "Servimos paes artesanais, ovos preparados na hora, frutas frescas, panquecas douradas e uma selecao especial de bebidas quentes e frias.",
          "Tudo com aquele toque de afeto e sofisticacao que ja faz parte da experiencia Santa Maria.",
        ],
        image: "/images/branch2.jpg",
        imageLeft: true,
      },
      {
        title: "Brunch, pausa e reencontro",
        text: [
          "E brunch, mas tambem e pausa. E reencontro, e descobrir um novo favorito no cardapio.",
          "Um comeco de dia comum vira momento de celebracao.",
        ],
        image: "/images/branch3.jpg",
      },
    ],
    intro: [
      "Venha viver essa experiencia no Santa Maria Emporio. Todos os dias, a partir das 9h.",
      "Seu cafe da manha nunca mais sera so cafe da manha.",
    ],
  },
  {
    slug: "emporio",
    title: "Emporio",
    description: "Descubra os ambientes e categorias do Santa Maria Emporio.",
    navLabel: "Emporio",
    template: "grid",
    hero: {
      eyebrow: "Santa Maria",
      title: "Emporio",
      description:
        "Referencia em gastronomia e curadoria, com produtos especiais, atendimento atencioso e uma experiencia que transforma a compra em descoberta.",
      image: "/images/bg1.jpg",
    },
    gridItems: [
      {
        title: "Rotisserie",
        description:
          "Mais de 40 pratos artesanais preparados diariamente, entre saladas, carnes, massas, tortas e acompanhamentos.",
        image: "/images/area01.jpg",
      },
      {
        title: "Hortifruti",
        description:
          "Frutas, legumes e verduras selecionados todos os dias, com uma curadoria especial de organicos.",
        image: "/images/area07.jpg",
      },
      {
        title: "Adega",
        description:
          "Mais de mil rotulos de vinhos do mundo todo, alem de destilados e cervejas artesanais.",
        image: "/images/vinhos.jpg",
        href: "/bebidas.pdf",
      },
      {
        title: "Bebidas",
        description:
          "Kombuchas, energeticos naturais, refrigerantes organicos, chas, aguas saborizadas e muito mais.",
        image: "/images/drinks.jpg",
      },
      {
        title: "Santa Maria Casa",
        description:
          "Itens de decoracao e utensilios para presentear e levar mais charme para a rotina.",
        image: "/images/casa.jpg",
      },
      {
        title: "Fabrica de massas",
        description:
          "Massas frescas feitas ao vivo, com ingredientes selecionados e sabor artesanal italiano.",
        image: "/images/floricultura.jpg",
      },
      {
        title: "Saudaveis",
        description:
          "Produtos para dietas restritivas, suplementos e opcoes que conciliam bem-estar e sabor.",
        image: "/images/saudavel.jpg",
      },
      {
        title: "Frios e laticinios",
        description:
          "Queijos, embutidos, opcoes veganas e tabuas personalizadas para momentos especiais.",
        image: "/images/frios.jpg",
      },
      {
        title: "Mercearia",
        description:
          "Do essencial ao inesperado, com molhos, conservas, massas, azeites e importados escolhidos com criterio.",
        image: "/images/area05.jpg",
      },
      {
        title: "Padaria",
        description:
          "Paes e doces com farinha 100% organica, fermentacao natural e receitas proprias que ja viraram classicos.",
        image: "/images/paes.jpg",
      },
      {
        title: "Confeitaria",
        description:
          "Sobremesas artesanais elaboradas com ingredientes selecionados e acabamento refinado.",
        image: "/images/bolos.jpg",
      },
      {
        title: "Importados",
        description:
          "Uma selecao de sabores do mundo inteiro, com doces, bolachas, chas, temperos e vinhos.",
        image: "/images/importados.jpg",
      },
    ],
  },
  {
    slug: "produtos",
    title: "Nossos Produtos",
    description: "Padaria, rotisserie e confeitaria do Santa Maria Emporio.",
    navLabel: "Nossos Produtos",
    template: "feature",
    hero: {
      title: "Nossos produtos",
      description:
        "Fabricacao propria, ingredientes selecionados e um cuidado que aparece em cada detalhe.",
      image: "/images/padaria.jpg",
    },
    alternatingSections: [
      {
        title: "Padaria",
        text: [
          "A padaria do Santa Maria reune paes e doces produzidos com ingredientes altamente selecionados.",
          "Entre os mais pedidos estao pao de cranberry com nozes, pao de granola com pistache, baguete italiana e os famosos cruffins.",
        ],
        image: "/images/padaria.jpg",
      },
      {
        title: "Rotisserie",
        text: [
          "Praticidade sem abrir mao da qualidade. Os pratos sao feitos artesanalmente todos os dias.",
          "Saladas, legumes, tortas, quiches, carnes, massas, acompanhamentos, antepastos e salgados fazem parte da selecao.",
        ],
        image: "/images/rotisseri.jpg",
        imageLeft: true,
      },
      {
        title: "Confeitaria",
        text: [
          "Doces artesanais elaborados para celebrar a vida, com alto padrao de qualidade e muito sabor.",
          "Entre os destaques estao Fraise de Morango, Bolo Mousse de Pistache, Naked Frutas e Tiramisu.",
        ],
        image: "/images/confeitaria.jpg",
      },
    ],
  },
  {
    slug: "servicos",
    title: "Nossos Servicos",
    description: "Conheca os servicos e encomendas do Santa Maria Emporio.",
    navLabel: "Nossos Servicos",
    template: "richText",
    hero: {
      title: "Nossos servicos",
      description:
        "Solidez gastronomica com praticidade, cuidado no atendimento e solucoes sob medida.",
      image: "/images/servicos.jpg",
    },
    richTextSections: [
      {
        title: "Encomendas",
        body: [
          "Todos os momentos da sua vida podem ficar melhores com um toque do Santa Maria. Nosso servico de encomendas atende rotisserie, confeitaria, padaria e tabua de frios.",
          "Basta entrar em contato pelos telefones (11) 3706-5211 e (11) 3706-5210.",
          "A tabua de frios e totalmente personalizada: voce pode levar sua propria base ou deixar toda a curadoria por nossa conta.",
        ],
      },
      {
        title: "Personal shopper",
        body: [
          "Nossa loja oferece atendimento gratuito de personal shoppers para apoiar suas compras em qualquer momento.",
          "Eles ajudam desde a escolha do vinho ideal ate a montagem de uma cesta personalizada para presentear.",
        ],
      },
      {
        title: "Eventos",
        body: [
          "Seu evento pode acontecer dentro da experiencia Santa Maria.",
          "As reservas e orcamentos para o espaco do restaurante podem ser solicitados pelo e-mail reservas.restaurante@emporiosantamaria.com.br.",
        ],
      },
      {
        title: "Cestas personalizadas",
        body: [
          "Montamos cestas com carinho e atencao ao gosto de quem vai receber.",
          "Voce pode incluir os itens preferidos da pessoa e contar com apoio do personal shopper para criar um presente realmente especial.",
        ],
      },
    ],
  },
  {
    slug: "curadoria",
    title: "Curadoria",
    description: "Conteudos e experiencias especiais da curadoria Santa Maria.",
    navLabel: "Curadoria",
    template: "richText",
    hero: {
      title: "Curadoria",
      description:
        "Conteudos, historias e referencias que ampliam o repertorio gastronomico e celebram pequenos prazeres.",
      image: "/images/curadoria1.png",
    },
    richTextSections: [
      {
        title: "Curadoria Santa Maria",
        body: [
          "Conheca as historias por tras de iguarias, mergulhe no universo dos vinhos Premier Cru e descubra curiosidades sobre receitas e ingredientes.",
          "Tudo isso voce encontra no blog do Emporio Santa Maria, em um convite para sentar conosco e conversar sobre alta gastronomia e indulgencias do dia a dia.",
        ],
      },
      {
        title: "Especial: azeite",
        body: [
          "Uma introducao ao universo do azeite, com notas sobre origem, rotulos, usos e harmonizacao.",
        ],
      },
    ],
    gridItems: [
      {
        title: "Azeite",
        description: "Tudo o que voce precisa saber sobre azeite, da origem ao uso cotidiano.",
        image: "/images/azeite.jpg",
        href: "/azeite",
      },
    ],
  },
  {
    slug: "azeite",
    title: "Azeite",
    description: "Pagina especial de curadoria sobre azeites.",
    template: "richText",
    hero: {
      title: "Azeite",
      description: "Tudo o que voce precisa saber sobre azeite.",
      image: "/images/azeitebg.jpg",
    },
    richTextSections: [
      {
        title: "Um ingrediente milenar",
        body: [
          "Antes da propria escrita existir, o azeite ja estava presente no cotidiano da humanidade como alimento, perfume, tratamento medicinal e fonte de iluminacao.",
          "Registros arqueologicos apontam sua origem ha mais de seis mil anos, com papel central na prosperidade de Creta e na disseminacao pelo Mediterraneo.",
          "A popularidade nao tira seu status de iguaria: o segredo esta em encontrar exemplares de alta qualidade, capazes de transformar uma refeicao com poucas gotas.",
        ],
      },
      {
        title: "Sabores do azeite pelo mundo",
        body: [
          "Italia: Toscana com perfil complexo e final apimentado; Riviera Italiana com notas sutis e delicadas.",
          "Norte da Africa: azeites dourados, limpos e equilibrados.",
          "Franca: leves e florais. Grecia: intensos, perfumados e ricos. Espanha: frutados e aromaticos, com destaque para a Catalunha e suas notas de amendoas frescas.",
          "Sua versatilidade vai do pao banhado em azeite ao acabamento final de pratos, saladas e molhos.",
        ],
      },
      {
        title: "Lendo o rotulo",
        body: [
          "Azeite de oliva ou tipo unico indica um produto refinado e misturado, mais indicado para altas temperaturas.",
          "Azeite virgem possui acidez maior e costuma ser indicado para cozinhar.",
          "Azeite extravirgem e o de mais alta qualidade, sem refinamento e com acidez de ate 0,8%.",
          "Azeite nao filtrado, conhecido como flor do azeite, traz rusticidade e intensidade aromatica, sendo recomendado em uso moderado.",
          "Prefira garrafas escuras e opacas e consuma o produto apos aberto para preservar aromas e frescor.",
        ],
      },
      {
        title: "O azeite e divino",
        body: [
          "Na mitologia grega, a oliveira simboliza paz e prosperidade e surge como presente de Athena.",
          "No islamismo, o azeite aparece associado ao cuidado com o corpo e a boa saude.",
          "No catolicismo e no judaismo, tanto a oliveira quanto o azeite ocupam passagens sagradas ligadas a consagracao, alianca e transcendencia.",
        ],
      },
    ],
  },
  {
    slug: "historia",
    title: "Nossa Historia",
    description: "Conheca a historia do Santa Maria Emporio.",
    template: "richText",
    hero: {
      title: "Nossa historia",
      description:
        "O Santa Maria ajudou a consolidar o conceito de mercado gourmet em São Paulo.",
      image: "/images/nossa-loja.jpg",
    },
    richTextSections: [
      {
        title: "Uma referencia em Sao Paulo",
        body: [
          "O Santa Maria Emporio trouxe o conceito de mercado gourmet para a cidade, com um portfolio premium que unia hortalicas selecionadas, ingredientes importados, vinhos, queijos, azeites e objetos de decoracao.",
          "Em 2007, o negocio passou a integrar o grupo St Marche, que segue na gestao da marca.",
        ],
      },
      {
        title: "A renovacao dos 25 anos",
        body: [
          "Em 2018, ao completar 25 anos, o emporio passou por uma grande reforma e ganhou corredores mais amplos, nova parede de geladeiras, expansao da adega, secao dedicada aos organicos e uma padaria ainda mais completa.",
          "A rotisserie incorporou novas receitas, a fabrica de massas ganhou destaque e o corner de cafes especiais reforcou a tradicao de comprar cafe moido na hora.",
          "O restaurante no piso superior tambem foi renovado, com novo acesso, adega climatizada e experiencias que incluem buffet, cafe da manha aos finais de semana e menu japones.",
        ],
      },
    ],
  },
  {
    slug: "manifesto",
    title: "Manifesto",
    description: "Manifesto institucional do Santa Maria Emporio.",
    template: "richText",
    hero: {
      title: "Manifesto",
      description:
        "Celebrar a vida todos os dias, com atencao aos detalhes que transformam o cotidiano.",
      image: "/images/foto5.png",
    },
    richTextSections: [
      {
        title: "Celebre a vida todo santo dia",
        body: [
          "Nos somos o Santa Maria Emporio. Abrimos a loja todos os dias para quem acredita que a vida nao merece ser sem graca.",
          "Celebrar e uma demonstracao de afeto a quem esta perto de voce, inclusive a voce mesmo. E manter um amor vivo, uma amizade proxima, o gosto pela vida renovado.",
          "Corremos atras das pequenas surpresas e prazeres que mudam o seu dia: sabores, aromas, texturas, atencao, conforto, praticidade e carinho.",
          "Santa Maria Emporio. Celebre a vida todo santo dia.",
        ],
      },
    ],
  },
  {
    slug: "politica",
    title: "Politica de Privacidade",
    description: "Politica de privacidade e protecao de dados.",
    template: "richText",
    hero: {
      title: "Politica de privacidade",
      description:
        "Transparencia, etica e cuidado com o tratamento dos dados pessoais.",
      image: "/images/loja.jpg",
    },
    richTextSections: [
      {
        title: "Privacidade e protecao de dados",
        body: [
          "O Emporio Santa Maria busca garantir o mais alto nivel de transparencia e etica em suas atividades, e esse compromisso tambem se estende ao tratamento dos dados pessoais.",
          "Esta politica se aplica a clientes, fornecedores, prestadores de servicos, participantes de eventos, candidatos e demais pessoas cujos dados possam ser tratados em interacoes com a empresa, o site e as redes sociais.",
          "A empresa declara adotar praticas de seguranca e governanca, politicas internas, mecanismos de supervisao e acoes educativas para preservar a privacidade e mitigar riscos.",
        ],
      },
      {
        title: "Coleta, finalidades e bases legais",
        body: [
          "Os dados podem ser coletados em compras presenciais ou remotas, formularios de contato, atendimento ao consumidor, participacao em eventos, processos seletivos, interacoes em redes sociais, uso de wifi, imagens de monitoramento e relacoes com fornecedores.",
          "Entre os dados tratados estao identificacao civil, contatos, dados de pagamento, endereco, historico de compras, preferencias, dados de navegacao, imagens e informacoes profissionais, sempre vinculados a finalidades especificas.",
          "As bases legais incluem execucao de contrato, cumprimento de obrigacao legal, exercicio regular de direitos, consentimento e legitimo interesse, conforme a natureza da interacao.",
        ],
      },
      {
        title: "Cookies, compartilhamento e retencao",
        body: [
          "O site pode utilizar cookies e tecnologias de rastreamento para personalizacao da experiencia, analise de trafego, seguranca e melhoria dos servicos.",
          "Os dados podem ser compartilhados com terceiros envolvidos nas operacoes, como instituicoes financeiras, provedores de tecnologia, logistica, marketing, auditoria, recrutamento e assessorias, sempre com objetivo operacional e nunca para comercializacao de dados.",
          "A retencao ocorre pelo tempo necessario para as finalidades declaradas, cumprimento de obrigacoes legais, protecao de direitos e manutencao de backup e seguranca.",
        ],
      },
      {
        title: "Direitos do titular",
        body: [
          "O titular pode solicitar confirmacao de tratamento, acesso, correcao, anonimizacao, bloqueio, eliminacao, portabilidade, informacoes sobre compartilhamento e revogacao de consentimento, nos termos da LGPD.",
          "Solicitacoes podem ser feitas por meio do encarregado pelo tratamento de dados no e-mail privacidade@marche.com.br.",
          "A politica informa versoes anteriores e aponta atualizacao em setembro de 2022.",
        ],
      },
    ],
  },
  {
    slug: "trabalhe",
    title: "Trabalhe Conosco",
    description: "Informacoes institucionais sobre oportunidades no Santa Maria Emporio.",
    template: "contact",
    hero: {
      title: "Trabalhe conosco",
      description: "Faca parte do nosso time.",
      image: "/images/foto2.png",
    },
    contactInfo: {
      title: "Envie seu curriculo",
      description: "Encaminhe seu curriculo para o e-mail abaixo e conte um pouco sobre sua experiencia.",
      email: "selecao@marche.com.br",
    },
  },
  {
    slug: "contato",
    title: "Contato",
    description: "Fale com o Santa Maria Emporio.",
    template: "contact",
    hero: {
      title: "Contato",
      description: "Fale conosco para mais informacoes, encomendas e atendimento.",
      image: "/images/adega2.jpg",
    },
    contactInfo: {
      title: "Atendimento Santa Maria",
      description: "Preencha o formulario ou fale diretamente com a nossa equipe pelos canais abaixo.",
      email: "contato@emporiosantamaria.com.br",
      phone: "(11) 3706-5211",
    },
  },
];

export const sitePagesBySlug = Object.fromEntries(
  sitePages.map((page) => [page.slug, page]),
) as Record<string, SitePage>;

export const navigationItems = sitePages.filter((page) => page.navLabel);
