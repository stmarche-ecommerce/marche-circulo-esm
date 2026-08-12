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

export type AccordionSection = {
  title: string;
  body: string[];
};

export type ContactInfo = {
  title: string;
  description: string;
  email?: string;
  phone?: string;
  cards?: Array<{
    title: string;
    email?: string;
    whatsapp?: string;
    phone?: string;
    address?: string;
  }>;
};

export type PageTemplate = "feature" | "grid" | "richText" | "institutional" | "contact";

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
  accordionSections?: AccordionSection[];
  contactInfo?: ContactInfo;
};

export const primaryNavigationItems = [
  { label: "Empório", href: "/emporio" },
  { label: "Sushi", href: "/sushi" },
  { label: "Café", href: "/cafe" },
  // { label: "Brunch", href: "/brunch" },
  // { label: "Delivery", href: "/delivery" },
  // { label: "Produtos", href: "/produtos" },
  { label: "Serviços", href: "/servicos" },
] as const;

export const sitePages: SitePage[] = [
  // {
  //   slug: "brunch",
  //   title: "Brunch",
  //   description: "Conheça o novo espaço de brunch do Santa Maria Empório.",
  //   navLabel: "Brunch",
  //   template: "feature",
  //   hero: {
  //     title: "Um novo espaço para celebrar a manhã",
  //     description:
  //       "Bebidas quentes e frias, refeições leves ou mais elaborados - com o toque de afeto do Santa Maria para transformar qualquer pausa em um momento especial.",
  //     image: "/images/branch.png",
  //   },
  //   alternatingSections: [
  //     {
  //       title: "Um convite para desacelerar",
  //       text: [
  //         "No coração do nosso empório, criamos um espaço onde o tempo parece desacelerar.",
  //         "Ali, entre aromas convidativos e luz suave, os dias começam com mais leveza.",
  //       ],
  //       image: "/images/branch1.jpg",
  //     },
  //     {
  //       title: "Sabores para qualquer humor matinal",
  //       text: [
  //         "Servimos pães artesanais, ovos preparados na hora, frutas frescas, panquecas douradas e uma seleção especial de bebidas quentes e frias.",
  //         "Tudo com aquele toque de afeto e sofisticação que já faz parte da Experiência Santa Maria.",
  //       ],
  //       image: "/images/branch2.jpg",
  //       imageLeft: true,
  //     },
  //     {
  //       title: "Brunch, pausa e reencontro",
  //       text: [
  //         "É brunch, mas também é pausa. É reencontro, é descobrir um novo favorito no cardápio.",
  //         "Um começo de dia comum vira momento de celebração.",
  //       ],
  //       image: "/images/branch3.jpg",
  //     },
  //   ],
  //   intro: [
  //     "O Santa Maria é referência em gastronomia em São Paulo e conta com padaria, rotisserie, confeitaria, sushi, café e fábrica de massas. ",
  //     "Tudo feito com os melhores ingredientes, qualidade e atendimento únicos!",
  //   ],
  // },
  {
    slug: "emporio",
    title: "Empório",
    description: "Descubra os ambientes e categorias do Santa Maria Empório.",
    navLabel: "Empório",
    template: "grid",
    hero: {
      eyebrow: "Santa Maria",
      title: "Empório",
      description:
        "Referência em curadoria e gastronomia em São Paulo, com padaria, rotisserie, confeitaria, hortifrúti, adega, mercearia e produtos importados selecionados com atenção e afeto.",
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
        title: "Hortifrúti",
        description:
          "Frutas, legumes e verduras selecionados todos os dias, com uma curadoria especial de orgânicos.",
        image: "/images/area07.jpg",
      },
      {
        title: "Adega",
        description:
          "Mais de mil rótulos de vinhos do mundo todo, além de destilados e cervejas artesanais.",
        image: "/images/vinhos.jpg",
        href: "/bebidas.pdf",
        external: true,
      },
      {
        title: "Bebidas",
        description:
          "Kombuchas, energéticos naturais, refrigerantes orgânicos, chás, águas saborizadas e muito mais.",
        image: "/images/drinks.jpg",
      },
      {
        title: "Santa Maria Casa",
        description:
          "Itens de decoração e utensílios para presentear e levar mais charme para a rotina.",
        image: "/images/casa.jpg",
      },
      {
        title: "Fábrica de massas",
        description:
          "Massas frescas feitas ao vivo, com ingredientes selecionados e sabor artesanal italiano.",
        image: "/images/floricultura.jpg",
      },
      {
        title: "Saudáveis",
        description:
          "Produtos para dietas restritivas, suplementos e opções que conciliam bem-estar e sabor.",
        image: "/images/saudavel.jpg",
      },
      {
        title: "Frios e laticínios",
        description:
          "Queijos, embutidos, opções veganas e tábuas personalizadas para momentos especiais.",
        image: "/images/frios.jpg",
      },
      {
        title: "Mercearia",
        description:
          "Do essencial ao inesperado, com molhos, conservas, massas, azeites e importados escolhidos com critério.",
        image: "/images/area05.jpg",
      },
      {
        title: "Padaria",
        description:
          "Pães e doces com farinha 100% orgânica, fermentação natural e receitas próprias que já viraram clássicos.",
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
          "Uma seleção de sabores do mundo inteiro, com doces, bolachas, chás, temperos e vinhos.",
        image: "/images/importados.jpg",
      },
    ],
  },
  // {
  //   slug: "produtos",
  //   title: "Nossos Produtos",
  //   description: "Padaria, rotisserie e confeitaria do Santa Maria Empório.",
  //   navLabel: "Nossos Produtos",
  //   template: "feature",
  //   hero: {
  //     title: "Nossos produtos",
  //     description:
  //       "Bebidas quentes e frias, refeições leves ou mais elaborados - com o toque de afeto do Santa Maria para transformar qualquer pausa em um momento especial.",
  //     image: "/images/padaria.jpg",
  //   },
  //   alternatingSections: [
  //     {
  //       title: "Padaria",
  //       text: [
  //         "A padaria do Santa Maria reúne pães e doces produzidos com ingredientes altamente selecionados.",
  //         "Entre os mais pedidos estão pão de cranberry com nozes, pão de granola com pistache, baguete italiana e os famosos cruffins.",
  //       ],
  //       image: "/images/padaria.jpg",
  //     },
  //     {
  //       title: "Rotisserie",
  //       text: [
  //         "Praticidade sem abrir mão da qualidade. Os pratos são feitos artesanalmente todos os dias.",
  //         "Saladas, legumes, tortas, quiches, carnes, massas, acompanhamentos, antepastos e salgados fazem parte da seleção.",
  //       ],
  //       image: "/images/rotisseri.jpg",
  //       imageLeft: true,
  //     },
  //     {
  //       title: "Confeitaria",
  //       text: [
  //         "Doces artesanais elaborados para celebrar a vida, com alto padrao de qualidade e muito sabor.",
  //         "Entre os destaques estão Fraise de Morango, Bolo Mousse de Pistache, Naked Frutas e Tiramisu.",
  //       ],
  //       image: "/images/confeitaria.jpg",
  //     },
  //   ],
  // },
  {
    slug: "servicos",
    title: "Nossos Serviços",
    description: "Conheça os serviços e encomendas do Santa Maria Empório.",
    navLabel: "Nossos Serviços",
    template: "richText",
    hero: {
      title: "Nossos serviços",
      description:
        "Encomendas, personal shopper, eventos e cestas personalizadas: soluções sob medida com toda a solidez gastronômica do Santa Maria.",
      image: "/images/servicos.jpg",
    },
    richTextSections: [
      {
        title: "Encomendas",
        body: [
          "Todos os momentos da sua vida podem ficar melhores com um toque do Santa Maria. Nosso serviço de encomendas atende rotisserie, confeitaria, padaria e tábua de frios.",
          "Basta entrar em contato pelos telefones (11) 3706-5211 e (11) 3706-5210.",
          "A tábua de frios é totalmente personalizada: você pode levar sua própria base ou deixar toda a curadoria por nossa conta.",
        ],
      },
      {
        title: "Personal shopper",
        body: [
          "Nossa loja oferece atendimento gratuito de personal shoppers para apoiar suas compras em qualquer momento.",
          "Eles ajudam desde a escolha do vinho ideal até a montagem de uma cesta personalizada para presentear.",
        ],
      },
      {
        title: "Eventos",
        body: [
          "Seu evento pode acontecer dentro da Experiência Santa Maria.",
          "As reservas e orçamentos para o espaço do restaurante podem ser solicitados pelo e-mail reservas.restaurante@emporiosantamaria.com.br.",
        ],
      },
      {
        title: "Cestas personalizadas",
        body: [
          "Montamos cestas com carinho e atenção ao gosto de quem vai receber.",
          "Você pode incluir os itens preferidos da pessoa e contar com apoio do personal shopper para criar um presente realmente especial.",
        ],
      },
    ],
  },
  {
    slug: "curadoria",
    title: "Curadoria",
    description: "Conteúdos e experiências especiais da curadoria Santa Maria.",
    navLabel: "Curadoria",
    template: "feature",
    hero: {
      title: "Curadoria",
      description:
        "Conteúdos, histórias e referências que ampliam o repertório gastronômico e celebram pequenos prazeres.",
      image: "/images/curadoria1.png",
    },
    alternatingSections: [
      {
        title: "Curadoria Santa Maria",
        text: [
          "Conheça as histórias por trás de iguarias, mergulhe no universo dos vinhos Premier Cru e descubra curiosidades sobre receitas e ingredientes.",
          "Tudo isso você encontra no blog do Empório Santa Maria, em um convite para sentar conosco e conversar sobre alta gastronomia e indulgências do dia a dia.",
        ],
        image: "/images/curadoria1.png",
      },
      {
        title: "Especial: azeite",
        text: [
          "Uma introdução ao universo do azeite, com notas sobre origem, rótulos, usos e harmonização.",
          "Um conteúdo pensado para aprofundar o olhar sobre ingredientes, origens e pequenos detalhes que transformam a experiência à mesa.",
        ],
        image: "/images/azeite.jpg",
        imageLeft: true,
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
      description: "Tudo o que você precisa saber sobre azeite.",
      image: "/images/azeitebg.jpg",
    },
    richTextSections: [
      {
        title: "Um ingrediente milenar",
        body: [
          "Antes da própria escrita existir, o azeite já estava presente no cotidiano da humanidade como alimento, perfume, tratamento medicinal e fonte de iluminação.",
          "Registros arqueológicos apontam sua origem há mais de seis mil anos, com papel central na prosperidade de Creta e na disseminação pelo Mediterrâneo.",
          "A popularidade não tira seu status de iguaria: o segredo está em encontrar exemplares de alta qualidade, capazes de transformar uma refeição com poucas gotas.",
        ],
      },
      {
        title: "Sabores do azeite pelo mundo",
        body: [
          "Italia: Toscana com perfil complexo e final apimentado; Riviera Italiana com notas sutis e delicadas.",
          "Norte da África: azeites dourados, limpos e equilibrados.",
          "Franca: leves e florais. Grécia: intensos, perfumados e ricos. Espanha: frutados e aromaticos, com destaque para a Catalunha e suas notas de amendoas frescas.",
          "Sua versatilidade vai do pão banhado em azeite ao acabamento final de pratos, saladas e molhos.",
        ],
      },
      {
        title: "Lendo o rotulo",
        body: [
          "Azeite de oliva ou tipo único indica um produto refinado e misturado, mais indicado para altas temperaturas.",
          "Azeite virgem possui acidez maior e costuma ser indicado para cozinhar.",
          "Azeite extravirgem e o de mais alta qualidade, sem refinamento e com acidez de ate 0,8%.",
          "Azeite não filtrado, conhecido como flor do azeite, traz rusticidade e intensidade aromatica, sendo recomendado em uso moderado.",
          "Prefira garrafas escuras e opacas e consuma o produto apos aberto para preservar aromas e frescor.",
        ],
      },
      {
        title: "O azeite e divino",
        body: [
          "Na mitologia grega, a oliveira simboliza paz e prosperidade e surge como presente de Athena.",
          "No islamismo, o azeite aparece associado ao cuidado com o corpo e a boa saude.",
          "No catolicismo e no judaismo, tanto a oliveira quanto o azeite ocupam passagens sagradas ligadas a consagração, alianca e transcendencia.",
        ],
      },
    ],
  },
  {
    slug: "sushi",
    title: "Sushi",
    description: "Conheça o sushi bar do Santa Maria Empório.",
    template: "feature",
    hero: {
      eyebrow: "Santa Maria",
      title: "Sushi",
      description:
        "Um dos melhores sushi bars de São Paulo, comandado pelo Chef Marcelo Kunigami, com peixes frescos de alta qualidade e ingredientes selecionados a dedo.",
      image: "/images/foto1.jpg",
    },
    alternatingSections: [
      {
        title: "Sushi Santa Maria",
        text: [
          "O sushi bar do Santa Maria é comandado pelo Chef Marcelo Kunigami, reunindo técnica, frescor e um cuidado rigoroso com cada ingrediente.",
          "Peixes frescos de alta qualidade e ingredientes selecionados a dedo definem uma experiência que valoriza precisão e sensibilidade em cada preparo.",
        ],
        image: "/images/foto1.jpg",
      },
      {
        title: "Alta gastronomia japonesa",
        text: [
          "Entre cortes selecionados, combinações delicadas e preparos precisos, cada visita vira uma experiência de alta gastronomia japonesa em São Paulo.",
        ],
        image: "/images/foto2.png",
        imageLeft: true,
      },
    ],
  },
  {
    slug: "cafe",
    title: "Café",
    description: "Conheça a cafeteria especial do Santa Maria Empório.",
    template: "feature",
    hero: {
      eyebrow: "Santa Maria",
      title: "Café",
      description:
        "Bebidas quentes e frias, refeições leves ou mais elaborados - com o toque de afeto do Santa Maria para transformar qualquer pausa em um momento especial.",
      image: "/images/foto3.jpg",
    },
    alternatingSections: [
      {
        title: "Cafeteria especial",
        text: [
          "No café do Santa Maria, cada pausa pode virar um momento especial, com bebidas quentes e frias, doces, salgados e refeições leves.",
          "O ambiente convida para encontros, conversas tranquilas e respiros ao longo do dia com o cuidado que já faz parte da experiência da casa.",
        ],
        image: "/images/foto3.jpg",
      },
      {
        title: "Pausa com sabor e afeto",
        text: [
          "Tudo é preparado com o mesmo cuidado que marca a experiência da casa, para acompanhar encontros, conversas e pequenos respiros ao longo do dia.",
        ],
        image: "/images/branch2.jpg",
        imageLeft: true,
      },
    ],
  },
  {
    slug: "delivery",
    title: "Delivery",
    description: "Canais de delivery do Santa Maria Empório.",
    template: "grid",
    hero: {
      eyebrow: "Santa Maria",
      title: "Delivery",
      description:
        "Escolha o canal que faz mais sentido para você e receba a Experiência Santa Maria onde estiver.",
      image: "/images/adega.jpg",
    },
    gridItems: [
      {
        title: "Rappi",
        description: "Compre pelo app da Rappi com a curadoria Santa Maria.",
        image: "/images/emporio.jpg",
        href: "https://www.rappi.com.br/lojas/900631375-santa-maria-super-nc",
        external: true,
      },
      {
        title: "iFood",
        description: "Encontre o Santa Maria no iFood e faca seu pedido online.",
        image: "/images/rotisseri.jpg",
        href: "https://www.ifood.com.br",
        external: true,
      },
      {
        title: "WhatsApp",
        description: "Fale direto com a equipe pelo WhatsApp para apoio no atendimento.",
        image: "/images/foto2.png",
        href: "https://wa.me/5511958187139",
        external: true,
      },
    ],
  },
  {
    slug: "historia",
    title: "Nossa História",
    description: "Conheça a história do Santa Maria Empório.",
    template: "institutional",
    hero: {
      title: "Nossa história",
      description:
        "O Santa Maria ajudou a consolidar o conceito de mercado gourmet em São Paulo.",
      image: "/images/nossa-loja.jpg",
    },
    richTextSections: [
      {
        title: "Nossa História",
        body: [
          "O Santa Maria Empório trouxe o conceito de mercado gourmet para a cidade de São Paulo, reunindo um portfólio de itens premium que iam desde selecionadas hortaliças a ingredientes importados, como pães, vinhos, queijos, azeites e peças de decoração. Não demorou para o Santa Maria tornar-se referência de sofisticação entre os mercados da cidade e destino certo para os amantes da boa gastronomia. Em 2007, o mercado foi adquirido pelo grupo St Marche, que comanda a gestão até hoje.",
          "Ao completar 25 anos, no ano de 2018, o Empório passou por uma grande reforma. Agora é possível encontrar um espaço amplo para as compras, com corredores mais largos, uma grande parede de geladeiras com 100 novos cortes de carnes, novidades em rótulos de vinhos e destilados, uma seção dedicada aos vegetais orgânicos e uma padaria ainda mais completa.",
          "O cardápio da rotisserie também tem novidades e ganha pratos como frango assado recheado com manteiga de trufas, camarões cozidos no vapor para finalizar em casa, legumes grelhados, massas secas e frescas de fabricação própria e pratos libaneses.",
          "Na padaria, repleta de novidades, destaque para os Cruffins, bolinhos folhados que misturam massa de croissant e muffin, recheados com creme pâtissier de limão, e uma deliciosa receita autoral de pão de calabresa. No centro do nosso empório, há um corner de Orfeu Cafés Especiais que oferece grãos moídos na hora, uma lembrança da velha tradição de comprar café fresquinho.",
          "O restaurante, instalado no piso superior do empório, também mudou. Com um novo acesso, o espaço ganhou uma adega climatizada que permite a escolha de vinhos em taça para acompanhar as refeições feitas ali. É nesta área que são servidos almoço com buffet variado todos os dias, café da manhã aos finais de semana e também o menu japonês, no almoço e jantar, um clássico do Santa Maria há muitos anos.",
        ],
      },
    ],
  },
  {
    slug: "manifesto",
    title: "Manifesto",
    description: "Manifesto institucional do Santa Maria Empório.",
    template: "institutional",
    hero: {
      title: "Manifesto",
      description:
        "Celebrar a vida todos os dias, com atenção aos detalhes que transformam o cotidiano.",
      image: "/images/foto5.png",
    },
    richTextSections: [
      {
        title: "Celebre a vida todo santo dia",
        body: [
          "Nós somos o Santa Maria Empório. Abrimos a loja todos os dias para quem acredita que a vida não merece ser sem graça.",
          "Celebrar é uma demonstração de afeto a quem está perto de você, inclusive a você mesmo. É manter um amor vivo, uma amizade próxima, o gosto pela vida renovado.",
          "Corremos atrás das pequenas surpresas e prazeres que mudam o seu dia: sabores, aromas, texturas, atenção, conforto, praticidade e carinho.",
          "Santa Maria Empório. Celebre a vida todo santo dia.",
        ],
      },
    ],
  },
  {
    slug: "politica",
    title: "Pol\u00edtica de privacidade",
    description: "Pol\u00edtica de privacidade e prote\u00e7\u00e3o de dados.",
    template: "richText",
    hero: {
      title: "Pol\u00edtica de privacidade",
      description:
        "Transpar\u00eancia, \u00e9tica e cuidado com o tratamento dos dados pessoais.",
      image: "/images/loja.jpg",
    },
    accordionSections: [
      {
        title: "1. Objetivo e abrang\u00eancia",
        body: [
          "Esta Pol\u00edtica de privacidade explica como a Hortus Com\u00e9rcio de Alimentos S.A. (Hortus, Emp\u00f3rio Santa Maria, n\u00f3s ou nosso) realiza o tratamento de dados pessoais de clientes, participantes do Programa C\u00edrculo Santa Maria, visitantes do site, usu\u00e1rios da \u00e1rea do cliente e pessoas que entram em contato com nossos canais de atendimento.",
          "Esta Pol\u00edtica abrange, entre outras atividades, o cadastro e a participa\u00e7\u00e3o no C\u00edrculo Santa Maria, a identifica\u00e7\u00e3o de compras por CPF nas lojas f\u00edsicas do Emp\u00f3rio Santa Maria, a disponibiliza\u00e7\u00e3o de benef\u00edcios, pre\u00e7os exclusivos, descontos personalizados, cupons, ofertas de parceiros, vantagens de anivers\u00e1rio, comunica\u00e7\u00f5es de relacionamento e a\u00e7\u00f5es de m\u00eddia personalizada.",
          "Esta Pol\u00edtica deve ser lida em conjunto com o Regulamento do Programa C\u00edrculo Santa Maria e com outros avisos ou termos espec\u00edficos apresentados em determinados canais ou campanhas.",
        ],
      },
      {
        title: "2. Quem \u00e9 o controlador dos dados",
        body: [
          "A controladora dos dados pessoais tratados no contexto desta Pol\u00edtica \u00e9 a Hortus Com\u00e9rcio de Alimentos S.A., inscrita no CNPJ sob o n\u00ba 09.000.493/0001-31, com endere\u00e7o na Avenida Cidade Jardim, 790, Jardim Paulistano, S\u00e3o Paulo/SP.",
          "Canal de atendimento e de privacidade: sac@emporiosantamaria.com.br.",
        ],
      },
      {
        title: "3. Quais dados pessoais podemos coletar",
        body: [
          "3.1. Dados fornecidos diretamente por voc\u00ea: dados de identifica\u00e7\u00e3o e cadastro, como nome completo, CPF, data de nascimento e informa\u00e7\u00f5es necess\u00e1rias para confirma\u00e7\u00e3o de maioridade.",
          "3.1. Tamb\u00e9m podemos coletar dados de contato, como telefone, e-mail e endere\u00e7o residencial; dados de acesso e seguran\u00e7a, como credenciais de acesso, c\u00f3digos de confirma\u00e7\u00e3o e registros de autentica\u00e7\u00e3o na \u00e1rea do cliente; prefer\u00eancias de comunica\u00e7\u00e3o e dados fornecidos em atendimentos, reclama\u00e7\u00f5es, solicita\u00e7\u00f5es, pesquisas de satisfa\u00e7\u00e3o ou outras intera\u00e7\u00f5es com o Emp\u00f3rio Santa Maria.",
          "3.2. Dados gerados durante o relacionamento e as compras: hist\u00f3rico de compras identificadas pelo CPF, incluindo data, loja, produtos, categorias, quantidades, valores, descontos, cupons e benef\u00edcios utilizados.",
          "3.2. Tamb\u00e9m podemos tratar informa\u00e7\u00f5es sobre participa\u00e7\u00e3o em campanhas, resposta a ofertas e uso de benef\u00edcios do C\u00edrculo Santa Maria, al\u00e9m de dados de relacionamento, frequ\u00eancia de compras, prefer\u00eancias, categorias de interesse e outros indicadores utilizados para melhorar a experi\u00eancia e personalizar benef\u00edcios.",
          "3.2. Registros de eventuais suspeitas de fraude, uso indevido de CPF, cadastros duplicados ou viola\u00e7\u00f5es do Regulamento do Programa tamb\u00e9m podem ser tratados.",
          "3.3. Dados coletados automaticamente: dados de navega\u00e7\u00e3o e uso do site ou da \u00e1rea do cliente, como endere\u00e7o IP, data e hora de acesso, tipo de dispositivo, navegador, p\u00e1ginas acessadas e intera\u00e7\u00f5es realizadas.",
          "3.3. Tamb\u00e9m utilizamos cookies, pixels, identificadores de publicidade e tecnologias semelhantes, al\u00e9m de registros t\u00e9cnicos e de seguran\u00e7a necess\u00e1rios para prote\u00e7\u00e3o dos ambientes digitais e preven\u00e7\u00e3o de acessos n\u00e3o autorizados.",
          "3.4. Dados obtidos de terceiros: podemos receber dados de fornecedores de tecnologia, plataformas de comunica\u00e7\u00e3o, empresas de an\u00e1lise de dados, parceiros de m\u00eddia, empresas do mesmo grupo econ\u00f4mico e outros prestadores que atuem em nosso nome ou apoiem a opera\u00e7\u00e3o do Programa, sempre observadas as finalidades informadas, os contratos aplic\u00e1veis e a legisla\u00e7\u00e3o.",
        ],
      },
      {
        title: "4. Como utilizamos os dados pessoais",
        body: [
          "Podemos utilizar dados pessoais para criar, validar, manter e atualizar o cadastro no C\u00edrculo Santa Maria.",
          "Tamb\u00e9m utilizamos os dados para confirmar identidade, idade e titularidade do CPF e identificar o participante nas compras realizadas nas lojas f\u00edsicas do Emp\u00f3rio Santa Maria.",
          "Os dados podem ser usados para aplicar pre\u00e7os exclusivos, descontos, cupons e demais benef\u00edcios do Programa, personalizar ofertas e benef\u00edcios com base no perfil e no hist\u00f3rico de relacionamento do participante e disponibilizar vantagens de anivers\u00e1rio e outras campanhas de relacionamento.",
          "Ainda podemos tratar os dados para gerenciar prefer\u00eancias de comunica\u00e7\u00e3o, enviar mensagens pelos canais autorizados, realizar atendimento, responder solicita\u00e7\u00f5es, solucionar d\u00favidas e tratar reclama\u00e7\u00f5es.",
          "Os dados tamb\u00e9m podem ser utilizados para prevenir, detectar e investigar fraudes, cadastros duplicados, uso indevido de CPF e outras irregularidades, al\u00e9m de realizar an\u00e1lises estat\u00edsticas, estudos de comportamento e melhoria de produtos, servi\u00e7os, campanhas e experi\u00eancia do cliente.",
          "Por fim, podemos tratar dados para cumprir obriga\u00e7\u00f5es legais, regulat\u00f3rias, fiscais e determina\u00e7\u00f5es de autoridades competentes, exercer direitos em processos judiciais, administrativos ou arbitrais e proteger os direitos, a seguran\u00e7a e os interesses leg\u00edtimos da Hortus, de seus clientes, colaboradores, parceiros e terceiros.",
        ],
      },
      {
        title: "5. Marketing, comunica\u00e7\u00f5es e prefer\u00eancias",
        body: [
          "A ades\u00e3o ao C\u00edrculo Santa Maria \u00e9 independente da autoriza\u00e7\u00e3o para recebimento de comunica\u00e7\u00f5es publicit\u00e1rias. O participante poder\u00e1 escolher separadamente se deseja receber mensagens por e-mail, SMS e WhatsApp.",
          "As prefer\u00eancias poder\u00e3o ser alteradas ou revogadas na \u00e1rea do cliente no site e, quando dispon\u00edvel, pelos mecanismos indicados em cada comunica\u00e7\u00e3o. A retirada do consentimento para marketing n\u00e3o implica o cancelamento da participa\u00e7\u00e3o no Programa.",
          "Mesmo quando o participante n\u00e3o desejar receber publicidade, poderemos enviar comunica\u00e7\u00f5es estritamente necess\u00e1rias \u00e0 opera\u00e7\u00e3o da conta, \u00e0 seguran\u00e7a, ao atendimento, ao cumprimento do Regulamento ou de obriga\u00e7\u00f5es legais.",
          "O uso de telefone para contatos comerciais e a realiza\u00e7\u00e3o de m\u00eddia personalizada em plataformas digitais observar\u00e3o as prefer\u00eancias registradas pelo titular e a legisla\u00e7\u00e3o aplic\u00e1vel.",
        ],
      },
      {
        title: "6. Personaliza\u00e7\u00e3o de ofertas e m\u00eddia",
        body: [
          "Podemos analisar dados cadastrais, hist\u00f3rico de compras, uso de cupons, frequ\u00eancia, categorias de interesse e intera\u00e7\u00f5es com campanhas para oferecer descontos, benef\u00edcios e comunica\u00e7\u00f5es mais relevantes.",
          "Tamb\u00e9m poderemos utilizar identificadores protegidos, pseudonimizados ou tecnicamente transformados para criar p\u00fablicos em plataformas de m\u00eddia e apresentar an\u00fancios personalizados, quando permitido pela legisla\u00e7\u00e3o e pelas prefer\u00eancias do titular.",
        ],
      },
      {
        title: "7. Cookies e tecnologias semelhantes",
        body: [
          "O site e a \u00e1rea do cliente poder\u00e3o utilizar cookies e tecnologias semelhantes para funcionamento, seguran\u00e7a, autentica\u00e7\u00e3o, armazenamento de prefer\u00eancias, an\u00e1lise de uso, medi\u00e7\u00e3o de campanhas e personaliza\u00e7\u00e3o de conte\u00fado ou publicidade.",
          "Quando aplic\u00e1vel, o usu\u00e1rio poder\u00e1 gerenciar cookies por meio do banner ou painel de prefer\u00eancias e das configura\u00e7\u00f5es do navegador. A desativa\u00e7\u00e3o de determinados cookies poder\u00e1 afetar algumas funcionalidades.",
        ],
      },
      {
        title: "8. Com quem podemos compartilhar os dados",
        body: [
          "Podemos compartilhar dados pessoais, conforme necess\u00e1rio, com fornecedores de tecnologia, hospedagem, nuvem, CRM, CDP, sistemas de frente de caixa, desenvolvimento, manuten\u00e7\u00e3o e seguran\u00e7a da informa\u00e7\u00e3o.",
          "Tamb\u00e9m poderemos compartilhar informa\u00e7\u00f5es com prestadores de servi\u00e7os de comunica\u00e7\u00e3o por e-mail, SMS, WhatsApp, telefone e outros canais, empresas de an\u00e1lise de dados, mensura\u00e7\u00e3o, pesquisa, consultoria, publicidade e m\u00eddia.",
          "Parceiros respons\u00e1veis por ofertas ou benef\u00edcios poder\u00e3o receber dados quando o compartilhamento for necess\u00e1rio e estiver devidamente informado ao participante.",
          "Empresas integrantes do mesmo grupo econ\u00f4mico podem tratar dados para finalidades administrativas, operacionais, de seguran\u00e7a ou relacionamento compat\u00edveis com esta Pol\u00edtica.",
          "Os dados tamb\u00e9m podem ser compartilhados com autoridades p\u00fablicas, \u00f3rg\u00e3os reguladores, Poder Judici\u00e1rio ou terceiros, quando necess\u00e1rio para cumprimento de obriga\u00e7\u00e3o legal, ordem v\u00e1lida, defesa de direitos ou preven\u00e7\u00e3o de fraude.",
          "Terceiros envolvidos em reorganiza\u00e7\u00f5es societ\u00e1rias, fus\u00f5es, aquisi\u00e7\u00f5es, incorpora\u00e7\u00f5es, venda de ativos ou outras opera\u00e7\u00f5es empresariais tamb\u00e9m podem participar, observadas as medidas de prote\u00e7\u00e3o aplic\u00e1veis.",
          "Os parceiros e prestadores devem tratar os dados de acordo com suas atribui\u00e7\u00f5es, contratos, instru\u00e7\u00f5es e obriga\u00e7\u00f5es legais. Quando um parceiro atuar como controlador independente, seu pr\u00f3prio aviso de privacidade poder\u00e1 ser aplic\u00e1vel.",
        ],
      },
      {
        title: "9. Transfer\u00eancia internacional de dados",
        body: [
          "Alguns fornecedores de tecnologia, nuvem, comunica\u00e7\u00e3o, an\u00e1lise ou m\u00eddia poder\u00e3o armazenar ou tratar dados em outros pa\u00edses. Nesses casos, adotaremos medidas compat\u00edveis com a legisla\u00e7\u00e3o aplic\u00e1vel e mecanismos adequados de prote\u00e7\u00e3o.",
        ],
      },
      {
        title: "10. Bases legais",
        body: [
          "O tratamento de dados pessoais poder\u00e1 estar fundamentado, conforme cada finalidade, em diferentes hip\u00f3teses legais, incluindo execu\u00e7\u00e3o de contrato ou de procedimentos preliminares, cumprimento de obriga\u00e7\u00e3o legal ou regulat\u00f3ria, exerc\u00edcio regular de direitos, prote\u00e7\u00e3o da vida ou da integridade f\u00edsica, leg\u00edtimo interesse, prote\u00e7\u00e3o do cr\u00e9dito e consentimento.",
          "Quando o consentimento for a base legal aplic\u00e1vel, ele poder\u00e1 ser revogado pelos canais disponibilizados, sem afetar a legalidade dos tratamentos realizados anteriormente \u00e0 revoga\u00e7\u00e3o.",
        ],
      },
      {
        title: "11. Seguran\u00e7a da informa\u00e7\u00e3o",
        body: [
          "Adotamos medidas t\u00e9cnicas, administrativas e organizacionais destinadas a proteger os dados pessoais contra acessos n\u00e3o autorizados, perda, destrui\u00e7\u00e3o, altera\u00e7\u00e3o, divulga\u00e7\u00e3o ou tratamento inadequado. Essas medidas incluem controles de acesso, gest\u00e3o de credenciais, monitoramento, procedimentos internos e requisitos contratuais aplic\u00e1veis aos fornecedores.",
          "Nenhum sistema \u00e9 totalmente imune a incidentes. Caso seja identificado incidente que possa gerar risco ou dano relevante aos titulares, ser\u00e3o adotadas as medidas cab\u00edveis de investiga\u00e7\u00e3o, conten\u00e7\u00e3o, remedia\u00e7\u00e3o e comunica\u00e7\u00e3o, conforme exigido pela legisla\u00e7\u00e3o.",
        ],
      },
      {
        title: "12. Reten\u00e7\u00e3o e elimina\u00e7\u00e3o",
        body: [
          "Os dados pessoais ser\u00e3o mantidos pelo per\u00edodo necess\u00e1rio para cumprir as finalidades descritas nesta Pol\u00edtica, operar o Programa, atender solicita\u00e7\u00f5es, prevenir fraudes, cumprir obriga\u00e7\u00f5es legais ou regulat\u00f3rias, exercer direitos e manter registros exigidos pela legisla\u00e7\u00e3o.",
          "Ap\u00f3s o cancelamento do C\u00edrculo Santa Maria, determinados dados poder\u00e3o permanecer armazenados pelo per\u00edodo necess\u00e1rio \u00e0s finalidades permitidas pela legisla\u00e7\u00e3o. Quando n\u00e3o houver justificativa para conserva\u00e7\u00e3o, os dados poder\u00e3o ser eliminados ou anonimizados.",
        ],
      },
      {
        title: "13. Direitos dos titulares",
        body: [
          "Nos termos da legisla\u00e7\u00e3o aplic\u00e1vel, o titular poder\u00e1 solicitar, conforme o caso, confirma\u00e7\u00e3o da exist\u00eancia de tratamento, acesso aos dados pessoais, corre\u00e7\u00e3o de dados incompletos, inexatos ou desatualizados, anonimiza\u00e7\u00e3o, bloqueio ou elimina\u00e7\u00e3o de dados desnecess\u00e1rios, excessivos ou tratados em desconformidade, portabilidade, informa\u00e7\u00e3o sobre compartilhamento e revis\u00e3o de decis\u00f5es tomadas unicamente com base em tratamento automatizado, quando aplic\u00e1vel.",
          "O titular tamb\u00e9m pode solicitar informa\u00e7\u00e3o sobre a possibilidade de n\u00e3o fornecer consentimento e sobre as consequ\u00eancias da negativa, revoga\u00e7\u00e3o do consentimento, elimina\u00e7\u00e3o dos dados tratados com base no consentimento, ressalvadas as hip\u00f3teses legais de conserva\u00e7\u00e3o, e oposi\u00e7\u00e3o a tratamento realizado em desconformidade com a legisla\u00e7\u00e3o.",
          "Para prote\u00e7\u00e3o do titular, poderemos solicitar informa\u00e7\u00f5es adicionais ou realizar procedimentos de verifica\u00e7\u00e3o de identidade antes de atender a uma solicita\u00e7\u00e3o.",
          "As solicita\u00e7\u00f5es poder\u00e3o ser encaminhadas para sac@emporiosantamaria.com.br.",
        ],
      },
      {
        title: "14. Cancelamento do programa e exclus\u00e3o da conta",
        body: [
          "O participante poder\u00e1 solicitar o cancelamento do C\u00edrculo Santa Maria pela \u00e1rea do cliente, quando essa funcionalidade estiver dispon\u00edvel, ou pelo SAC.",
          "O cancelamento encerra o acesso aos benef\u00edcios, descontos e cupons do Programa, mas n\u00e3o implica necessariamente a elimina\u00e7\u00e3o imediata de todos os dados pessoais, que poder\u00e3o ser conservados quando houver fundamento legal, necessidade de preven\u00e7\u00e3o a fraude ou exerc\u00edcio de direitos.",
        ],
      },
      {
        title: "15. Dados de crian\u00e7as e adolescentes",
        body: [
          "O C\u00edrculo Santa Maria \u00e9 destinado exclusivamente a pessoas com 18 anos ou mais. N\u00e3o buscamos cadastrar intencionalmente crian\u00e7as ou adolescentes no Programa. Caso seja identificado cadastro em desacordo com essa regra, poderemos adotar medidas para bloqueio, exclus\u00e3o ou regulariza\u00e7\u00e3o, conforme aplic\u00e1vel.",
        ],
      },
      {
        title: "16. Links e servi\u00e7os de terceiros",
        body: [
          "Nossos sites, comunica\u00e7\u00f5es ou benef\u00edcios poder\u00e3o conter links para ambientes de terceiros. Esses terceiros possuem pr\u00e1ticas pr\u00f3prias de privacidade e seguran\u00e7a. Recomendamos que o titular leia os respectivos avisos antes de fornecer dados pessoais ou utilizar esses servi\u00e7os.",
        ],
      },
      {
        title: "17. Altera\u00e7\u00f5es nesta pol\u00edtica",
        body: [
          "Esta Pol\u00edtica poder\u00e1 ser atualizada para refletir mudan\u00e7as nas pr\u00e1ticas de tratamento, no Programa, nos canais, nos fornecedores ou na legisla\u00e7\u00e3o. A vers\u00e3o vigente e a data da \u00faltima atualiza\u00e7\u00e3o ser\u00e3o disponibilizadas nos canais oficiais do Emp\u00f3rio Santa Maria.",
          "Quando a altera\u00e7\u00e3o for relevante, poder\u00e3o ser adotados meios adicionais de comunica\u00e7\u00e3o. Mudan\u00e7as que dependam de novo consentimento n\u00e3o ser\u00e3o consideradas aceitas apenas pelo sil\u00eancio ou pela continuidade do uso.",
        ],
      },
      {
        title: "18. Contato e reclama\u00e7\u00f5es",
        body: [
          "Para d\u00favidas sobre esta Pol\u00edtica, solicita\u00e7\u00f5es relacionadas a dados pessoais ou exerc\u00edcio de direitos, o titular poder\u00e1 utilizar os seguintes canais.",
          "E-mail: sac@emporiosantamaria.com.br.",
          "Endere\u00e7o para correspond\u00eancia: Avenida Cidade Jardim, 790, Jardim Paulistano, S\u00e3o Paulo/SP.",
          "Caso o titular entenda que sua solicita\u00e7\u00e3o n\u00e3o foi adequadamente atendida, poder\u00e1 buscar os canais de defesa do consumidor ou a autoridade competente, conforme aplic\u00e1vel.",
        ],
      },
    ],
  },
  {
    slug: "trabalhe",
    title: "Trabalhe Conosco",
    description: "Informações institucionais sobre oportunidades no Santa Maria Empório.",
    template: "contact",
    hero: {
      title: "Trabalhe conosco",
      description: "Faca parte do nosso time.",
      image: "/images/foto2.png",
    },
    contactInfo: {
      title: "Envie seu currículo",
      description: "Encaminhe seu currículo para o e-mail abaixo e conte um pouco sobre sua experiência.",
      email: "seleção@marche.com.br",
    },
  },
  {
    slug: "contato",
    title: "Contato",
    description: "Fale com o Santa Maria Empório.",
    template: "contact",
    hero: {
      title: "Contato",
      description: "Fale conosco para mais informações, encomendas e atendimento.",
      image: "/images/adega2.jpg",
    },
    contactInfo: {
      title: "Quadro Atendimento",
      description: "Preencha o formulario ou fale diretamente com a nossa equipe pelos canais abaixo.",
      email: "contato@emporiosantamaria.com.br",
      phone: "(11) 3706-5211",
      cards: [
        {
          title: "Pedidos e delivery loja",
          whatsapp: "(11) 95818-7139",
          phone: "(11) 3706-5211 / (11) 3706-5210",
        },
        {
          title: "Restaurante do Empório (Sushi Bar)",
          whatsapp: "(11) 98217-0531",
          phone: "(11) 98217-0531",
        },
        {
          title: "Endereco",
          address: "Av. Cidade Jardim, 790 - Jd. Paulistano, Sao Paulo",
        },
      ],
    },
  },
];

export const sitePagesBySlug = Object.fromEntries(
  sitePages.map((page) => [page.slug, page]),
) as Record<string, SitePage>;

export const navigationItems = sitePages.filter((page) => page.navLabel);




