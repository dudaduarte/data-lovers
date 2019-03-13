# Data Lovers



## Preâmbulo

Segundo um [estudo da IBM](https://www-01.ibm.com/common/ssi/cgi-bin/ssialias?htmlfid=WRL12345USEN),
90% dos dados que existem hoje foram criados durante os últimos dois anos.
A cada dia geramos 2,5 trilhões de bytes de dados, uma cifra sem precedentes.
Apesar disso, os dados por sozinhos são de pouca utilidade. Para que essas
grandes quantidades de dados se convertam em **informação** fácil de ler para
os usuários, temos que entendê-los e processá-los. Uma maneira simples
de se fazer isso seria criando _interfaces_ e _visualizações_.
Na seguinte imagem, você pode ver de que forma, com os dados que vemos na parte
esquerda, é possível construir uma interface amigável e legível para o usuário.

![json-interface](https://lh4.googleusercontent.com/Tn-RPXS26pVvOTdUzRT1KVaJ-_QbFs9SpcGLxSPE43fgbHaXtFgMUInuDt7kV41DkT1j8Tt29V0LxQW7SMtC6digOIhfTXSBKdwI08wUwhD3RAqlwy0hjfmhZ2BFe91mtmCSEqysfgk)

Você pode ver os detalhes dos dados neste [link](https://gist.github.com/lalogf/dd4aa3017a9f8aa8f90dfbca382c4dc9#file-student-json)
e a interface construída neste [link](https://app.talento.laboratoria.la/profile/HFOoMpOreBU2psCcjjLg5O2EWEv2).

## Resumo do projeto

Neste projeto **você desenvolverá uma _página web_ para visualizar um
_conjunto (set) de dados_** que se adeque ao que seu usuário necessita.
Fornecemos a vocês uma série de dados de diferentes _temáticas_
para que explore e decida com o que gostaria de trabalhar. Nós elegemos
especificamente estes sets de dados porque acreditamos que se adequem bem a esta
etapa de sua aprendizagem.
Uma vez definida sua área de interesse, entenda quem é seu usuario e o que ele
necessita saber ou ver exatamente; assim já poderá criar uma interface que o
ajude a interagir e entender melhor os dados.
Estes são os dados que propomos:

* [Indicadores de desenvolvimento](src/data/worldbank/worldbank.json):
  Indicadores de desenvolvimento do Banco Mundial de alguns países (Brasil, Chile, México e Peru). Estes dados incluim indicadores
  demográficos, econômicos e comerciais.
* [Pokémon](src/data/pokemon/pokemon.json):
  Neste set você encontrará uma lista com os 151 Pokémons da região de Kanto,
  junto com suas respectivas estatísticas usadas no jogo [Pokémon GO](pokemongolive.com).
* [Steam notícias](src/data/steam/steam.json):
  Lista de notícias relacionadas aos jogos presentes na plataforma [Steam](https://store.steampowered.com/).
* [League of Legends - Challenger leaderboard](src/data/lol/lol.json):
  Este set de dados mostra a lista de jogadores em uma liga do
  jogo League of Legends (LoL). Você pode revisar a documentação de sua API
  neste link [link](https://developer.riotgames.com/api-methods/).
* [Pessoas feridas por meios de transporte nos EUA](src/data/injuries/injuries.json).
  Este set nos mostra o número de pessoas feridas em acidentes em
  meios de transporte, com a data anual desde 1960 e categorizada por
  tipo de transporte (aéreo, barco, automóvel, moto, bicicleta, etc).

Como produto final você terá que criar uma página web que permita **visualizar
os dados, filtrá-los, ordená-los e fazer algum cálculo agregado**. Como esclarecimento,
ao falar de cálculo agregado, nos referimos a diferentes cálculos que se pode fazer
com os dados e trazer informações ainda mais relevantes para o usuário. Uma opção
seriam cálculos estatísticos com média, mínimo e máximo. Por exepmplo, se temos
uma coleção que representa um grupo de pessoas e cada pessoa está representada
com um _objeto_ com uma _propriedade_ `altura`, poderíamos calcular a
altura média em um grupo, entre outras coisas.

Esperamos que cada set de dados esteja acompanhado de uma identidade gráfica
condizente. Você pode pesquisar na internet para ter referências sobre cada um
dos temas e trabalhar em uma identidade para sua página.

## Definição do usuário

O primeiro passo para a definição do usuário - cujas necessidades queremos atender com o nosso produto - foi determinar com qual dos temas propostos na seção "Resumo do Projeto" iríamos trabalhar. Escolhemos o banco de dados do Pokémon e, sendo assim, determinamos que os nossos usuários ideais seriam homens e mulheres de 10 a 25 anos, que jogam os jogos do pokémon (sejam os de gameboy/emulador ou os de celular, como o pokémon go) e que eventualmente necessitem acessar informações básicas sobre pokémons específicos - por exemplo, contra que tipos de pokémons ele é forte ou fraco em batalha - para tomar decisões nos seus jogos. 

## Definição e implementação do projeto

Determinados os usuários ideais bem como suas necessidades, pensamos num produto para atendê-las: um site com os 151 pokémons de Kanto, disponíveis para o usuário acessar e consultar informações - como qual seu tipo, fraquezas, raridade, peso e altura. 
A partir desse objetivo, criamos uma primeira versão de interface e logo percebemos os seus problemas: não era simples em termos de navegação, exigindo que o usuário ficasse constantemente rolando o scroll de cima para baixo, para clicar em um pokemon (na parte de baixo da página) e ver suas informações (que apareciam na parte de cima).
Essa primeira versão da interface é essa:

![interface 1](https://github.com/dudaduarte/data-lovers/blob/branchsave/images/interface/design-carla.png)

A segunda interface criada para esse projeto foi pensada de modo a solucionar o problema descrito acima, que foi encontrado na primeira interface. O painel de pokémons ficaria do lado direito e as informações do pokémon clicado apareceria do lado esquerdo, facilitando a navegação. As informações do pokémon selecionado apareceriam escritas num card em um sistema de galeria em carrossel.

![interface 2](https://github.com/dudaduarte/data-lovers/blob/branchsave/images/interface/Projeto2.png)

Finalmente, meramente por uma escolha estética, preferimos eliminar a galeria em carrossel e decidimos por exibir os cards de informações de maneira simples (sem galeria) em cima da fotografia do pokémon, que estaria posicionado acima da grama da fotografia do background. Foi criado, então, o protótipo para simulação simples das atividades do usuário no site: https://marvelapp.com/882a1e8. Enviamos os links para alguns amigos que se encaixavam no que pensamos como usuário ideal e vimos que o protótipo desenvolvido estava funcionando de acordo com as nossas expectativas. Poucas alterações foram feitas no protótipo, apenas algumas mudanças estéticas foram ocorrendo paralelamente ao desenvolvimento do código.

A implementação começou paralelamente à criação do protótipo e buscou atender a todos os objetivos previstos na apresentação do projeto - com exceção à parte do hacker edition.
